# Architecture Review — Draft

Status: **draft, pending user selection**. No code has been refactored yet.
Branch: `arch-review`.

This document inventories every file in `src/` and proposes deepening
opportunities — places where the codebase carries shallow modules
(interfaces almost as complex as their implementation) or unreachable code
that fails the deletion test (delete it, nothing observable changes).

Vocabulary (from `improve-codebase-architecture` skill):
- **Module** = thing with interface + implementation.
- **Shallow** = interface as complex as implementation; deletion just moves complexity.
- **Deep** = small interface, lots of behavior; deletion concentrates complexity at callers.
- **Seam** = where the interface lives.

---

## 1. File inventory

### 1.1 Reachable from `<App />`
Walked from `src/index.js` → `App` → `Home` → ... :

| File | Lines | Role | Notes |
|---|---|---|---|
| `src/index.js` | 20 | Mount + global CSS imports | Imports bootstrap, font-awesome, bootstrap-social, react-typist CSS |
| `src/App.js` | 18 | Top-level layout | Imports `./css/style.css` (compiled SCSS) |
| `src/components/Home.jsx` | 16 | Page composition | Renders `HomeHeader` + `HomeDescription` |
| `src/components/HomeHeader.jsx` | 44 | Hero + scroll arrow | Uses `scrollingTop` helpers and `TypeAnimationComponent` |
| `src/components/HomeDescription.jsx` | 45 | About + nested grid | Composes `HomeDevNotes` + `HomeContacts` |
| `src/components/HomeDevNotes.jsx` | 20 | ByteBrush blurb | Pure content |
| `src/components/HomeContacts.jsx` | 36 | Side social list | github / linkedin / mailto / CV |
| `src/components/layout/Footer.jsx` | 49 | Footer bar | Own copy of social-link list |
| `src/components/utils/scrollingTop.jsx` | 28 | Scroll helpers | Reads `#main` / `#mainNav` — neither exists in DOM |
| `src/components/utils/typeAnimation.jsx` | 27 | Hero rotating typist | Uses unmaintained `react-typist`; pushes 100 copies of a JSX cycle |
| `src/reportWebVitals.js` | (CRA default) | Web vitals stub | Called from `index.js`, never wired to a sink |
| `src/scss/main.scss` + 6 partials | small | SCSS entry + theme | Compiled to `src/css/style.css` |
| `src/css/style.css` + `.map` | (generated) | Compiled CSS | **Committed build artifact** |

### 1.2 NOT reachable from `<App />` (dead code)
Confirmed by reading `App.js` → `Home.jsx`. Nothing imports any of these:

| File | Lines | Why dead |
|---|---|---|
| `src/shared/Project_class.jsx` | 99 | Class with `render_project / render_pdf / render_app`; never instantiated by rendered tree |
| `src/shared/projects.js` | 19 | Exports `PROJECTS = [ML, Front, Viz, Geo, Engineering, CSS]` — not imported anywhere |
| `src/shared/projects/project_list.js` | 168 | `PROJECTS_LIST` registry of 18 project objects |
| `src/shared/projects/ml.js` | 43 | Category bundle |
| `src/shared/projects/eng.js` | 34 | Category bundle |
| `src/shared/projects/front.js` | 48 | Category bundle |
| `src/shared/projects/geo.js` | 22 | Category bundle |
| `src/shared/projects/viz.js` | 13 | Category bundle |
| `src/shared/projects/css.js` | 21 | Category bundle |
| `src/shared/hobbies.js` | 24 | `HOBBIES` array — never imported |
| `src/shared/_exclude/customer.jsx` | 30 | Already excluded by `_exclude/` convention |
| `src/shared/_exclude/prj.jsx` | 15 | Same |
| `src/components/layout/Contacts.jsx` | 36 | Layout-level social list; nothing imports it |
| `src/App.css` | 80 | CRA leftover; not imported anywhere; classes (`jumbotron`, `myImg`, `project`, `navTabs`) don't exist in any JSX |
| `src/App.test.js` | 8 | Asserts `getByText(/learn react/i)` — that text isn't on the site; guaranteed-failing CRA stub |

**~480 of ~830 source lines (~58%) are unreachable.**

### 1.3 Build / config
- `package.json` — react-scripts 4.0.3, both `node-sass` (deprecated) and `sass` listed, `--openssl-legacy-provider` flag required.
- `.gitignore` — standard CRA.
- `public/` — static assets, CV pdf, social preview, background image.

---

## 2. Deepening candidates

Each candidate states the problem in the codebase's own vocabulary, what
would change in plain English, and the locality / leverage / testability
payoff. **No interfaces are proposed yet** — those come after you pick.

### Candidate A — Decide the fate of the project-taxonomy subsystem
**Files:** `src/shared/Project_class.jsx`, `src/shared/projects.js`,
`src/shared/projects/*.js`, `src/shared/hobbies.js`, `src/shared/_exclude/`.

**Problem.** A whole "domain model" exists (`Project` class with render
methods, `PROJECTS_LIST` registry of 18 items, six category bundles, a
hobbies array) but **no path from `<App />` reaches it**. It is the
shallowest module possible: the interface is "import these objects" and
the implementation is "but nobody does". Deletion test: deleting all of
it changes nothing observable.

There are also two failure modes baked in:
- `Project_class.jsx` mixes data with rendering (`render_project`,
  `render_pdf`, `render_app`, plus a `jekyll`-string-prefix hack to swap
  icons). If the portfolio sections ever do get wired in, this class is
  the *wrong* shape — rendering should live in a deep React component
  consuming plain data.
- `_exclude/` is a folder-as-feature-flag — a smell when convention is
  doing what an explicit module boundary should do.

**Two routes — please pick:**
- **A1 (delete).** Remove all of it. Lose ~480 lines. The site keeps
  rendering exactly what it does today (hero + about + dev-notes +
  contacts + footer).
- **A2 (resurrect).** Wire the categories back into `Home` as a real
  rendered section. The deepening is then to drop `Project_class.jsx`
  and introduce a deep `<ProjectSection category={ML} />` component
  whose interface is small (one prop) but whose implementation owns the
  whole rendering — including the jekyll / external / pdf variants.

### Candidate B — Collapse `scrollingTop`
**Files:** `src/components/utils/scrollingTop.jsx`,
`src/components/HomeHeader.jsx`.

**Problem.** `calculateAndSetNavHeight` looks up `document.getElementById('main')`
and `#mainNav`. Neither id exists anywhere in the rendered JSX. The helper
silently no-ops, `navHeight` stays `0`, and `scrollDownByNavHeight` ends
up scrolling by `windowHeight - 0`. The seam pretends to manage nav-bar
offset but the nav bar was removed long ago — the abstraction is lying.

**Deletion test.** Replace the three helpers with two inline calls
(`scroll.scrollToTop({smooth: true})` and `scroll.scrollMore(window.innerHeight)`)
in `HomeHeader`. Same behavior, one fewer file, one fewer lying seam.

**Payoff.** Removes a shallow utility module and a `useState`/`useEffect`
pair from `HomeHeader` that exist only to feed a dead value into a dead helper.

### Candidate C — One deep `<SocialLinks />` for the three duplicated lists
**Files:** `src/components/HomeContacts.jsx`,
`src/components/layout/Footer.jsx`,
`src/components/layout/Contacts.jsx` (dead).

**Problem.** Three near-identical hand-rolled `<ul>` of social-icon
anchors. Adding LinkedIn, fixing the broken `<a href="@">` in Footer, or
renaming the CV path means editing N places. Each component is shallow:
the implementation (a `<List>` of `<li><a>`) is the interface.

**Deepening.** Single `<SocialLinks variant="sidebar" | "footer" />` (or
similar) driven by a shared link table. Footer and HomeContacts become
one-liners; `layout/Contacts.jsx` deletes outright.

**Payoff.** Locality (one place to edit), and a real seam: a future
test or storybook entry exercises the link table once.

### Candidate D — Replace `react-typist` with `react-type-animation`
**File:** `src/components/utils/typeAnimation.jsx`.

**Problem.** Implementation builds 100 copies of a
backspace/word/backspace/word JSX block (≈300 nodes) to fake a loop, then
hands them to the unmaintained `react-typist`. `react-type-animation` is
**already in `package.json`** but never imported. `react-typist` triggers
deprecation warnings in `React.StrictMode`.

**Deepening.** The replacement has a real declarative interface:
`<TypeAnimation sequence={[...]} repeat={Infinity} />`. The current
27-line shallow wrapper becomes ~10 lines, the dep tree shrinks, the
warning disappears.

### Candidate E — Stop committing the compiled CSS
**Files:** `src/App.js` (import), `src/css/style.css{,.map}`,
`src/scss/main.scss`, `package.json` (`scss` script + `node-sass` dep).

**Problem.** `style.css` is generated from `main.scss` by `npm run scss`,
but it is also checked into git and is what `App.js` actually imports. Two
sources of truth for the same styles: edit SCSS, forget to recompile, ship
the stale CSS. CRA already supports `.scss` imports natively via the
`sass` package (also in deps).

**Deepening.** `App.js` imports `./scss/main.scss` directly. `src/css/`
disappears from the source tree and from git. `node-sass` (deprecated)
and the `scss` watch script come out of `package.json`.

**Payoff.** One source of truth; the SCSS *is* the styles. Removes one
deprecated dep.

### Candidate F — Delete the CRA leftovers
**Files:** `src/App.css`, `src/App.test.js`, `src/setupTests.js`,
`src/reportWebVitals.js`.

**Problem.** Pure CRA template residue:
- `App.css` is not imported anywhere; it styles `.jumbotron`, `.myImg`,
  `.project`, `.navTabs` — classes that don't exist in the JSX.
- `App.test.js` asserts the page contains the text `"learn react"`; it
  doesn't. The test is guaranteed to fail and is never run.
- `reportWebVitals.js` is called from `index.js` with no callback; it
  measures nothing.
- `setupTests.js` exists to support `App.test.js`.

**Deepening.** Delete them. If we want real tests later, write one
that asserts what the home page actually shows.

### Candidate G — Toolchain modernization (out of scope for "architecture" but adjacent)
react-scripts 4.0.3 + `--openssl-legacy-provider` is the reason `npm
start` needs the legacy OpenSSL flag in three scripts. Not a depth
issue, just churn cost. **Recommend deferring** unless you specifically
want to migrate to react-scripts 5 or Vite — that's a separate piece of
work.

---

## 3. CLAUDE.md plan

`projects/GG-website/CLAUDE.md` (project-level) is what `claude-sync`
expects (see `~/claude-sync/CLAUDE.md`). Today it doesn't exist —
project-specific conventions get re-discovered every session.

Proposed location and scope:

- **`CLAUDE.md` (project root)** — covers: dev-server start command,
  legacy-OpenSSL note, where styles live (after Candidate E),
  deploy command, what `_exclude/` means (or that it was deleted),
  the rendered-tree map (so Claude doesn't get distracted by dead
  code), and the SCSS / CSS source-of-truth rule.
- *(No need for nested CLAUDE.md in `src/components/` etc. — the codebase
  is small enough that one root file is enough.)*

A first draft is in `docs/CLAUDE-draft.md` (committed in this branch,
not yet promoted to `CLAUDE.md`).

---

## 4. Decision needed

Please pick which candidates to pursue. Common bundles:

- **Cleanup only:** A1 + B + E + F  → ~500 lines deleted, two
  deprecated deps removed, no behavior change.
- **Cleanup + DRY:** add C and D on top.
- **Resurrect portfolio:** A2 instead of A1 (drops into a grilling loop
  on the new component shape).

Reply with the list (e.g. "A1, B, C, D, E, F") and I'll drop into the
grilling loop for each before any code moves.
