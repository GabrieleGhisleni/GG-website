# Notion-driven Projects + Tailwind/Vite rebuild — design spec

- **Date:** 2026-05-20
- **Branch:** `arch-review`
- **Supersedes:** `docs/ARCHITECTURE-REVIEW.md` (cleanup candidates A1, B, C, D, E, F are absorbed into this rebuild; the doc stays in the branch as historical context)
- **Status:** ready for user review

## 1. Goal

Replace the current React 17 + CRA 4 + Bootstrap 4 + Reactstrap + SCSS portfolio with a **Vite + React 18 + Tailwind v4** single-page site. The Projects section is hard-coded from the Notion `projects v2` page (one-shot MCP fetch, already captured) plus the 3 projects that were dropped in the v1→v2 review — re-added by user request.

Outcome: one scrolling page that opens on a hero, briefly says who I am, then surfaces 23 projects with a compact-first / expand-on-click pattern, deployed static to GitHub Pages.

## 2. Approved decisions (recap)

| Topic | Decision |
|---|---|
| Data source | Hard-coded JS file (`src/data/projects.js`). One-shot Notion fetch already done; future updates require re-running the MCP query and editing the file. |
| Build chain | Vite 6 + `@vitejs/plugin-react`. Drops `react-scripts` and the `--openssl-legacy-provider` flag. |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`. Drops Bootstrap, Reactstrap, bootstrap-social, font-awesome, all SCSS and the committed `src/css/`. |
| Icons | `lucide-react`. |
| Routing | None. Single scrolling page; drop `react-router*`, drop `react-scroll`, drop `react-popper`. |
| Animation | `react-type-animation` replaces `react-typist` for the hero rotation. |
| TypeScript | No. Plain JS. Data file is `Object.freeze`-d at module level. |
| Theme | Light only. Brand accent `#0077b6` (deep) / `#3fa6e6` (mid). Fonts: Merriweather (body), Raleway (display), Open Sans (UI). All loaded via a single Google Fonts `<link>` already in use. |
| Language | English UI. |
| Deploy | `gh-pages -d dist`. `homepage` field in `package.json` stays; Vite `base: '/GG-website/'`. |
| Tests | One Vitest smoke test (renders App, asserts the name and that at least 23 cards render). |
| Analytics | None. Drop `countapi-js`. |
| Hero background | Pre-loaded via `<link rel="preload" as="image" fetchpriority="high">` plus an `<img loading="eager" fetchpriority="high">` underlay, with a dark fallback color so there is no white/black flash. |

## 3. Page structure

```
<App>
  <Hero/>
  <About/>
  <Projects>
    <SectionStickyBar/>           ← current section name, sticky
    <ProjectSection/> × 8         ← divider + cards
  </Projects>
  <Footer/>
</App>
```

### 3.1 Hero
- Full-viewport (`min-h-screen`) section.
- Background = `public/assets/images/upscaled_background.webp` rendered as an actual `<img>` underlay (see §6 for the no-flash technique).
- Centered stack:
  - `h1` — "Gabriele Ghisleni" (Raleway, large; `text-5xl md:text-7xl`).
  - `<TypeAnimation>` rotating phrases (see §3.5).
  - Bouncing scroll-down arrow (lucide `ChevronDown`); `onClick` scrolls one viewport down with `window.scrollTo({top: window.innerHeight, behavior: 'smooth'})`.

### 3.2 About
Three short paragraphs (draft in §7). Below the prose: a contact strip with 4 lucide icons + labels — GitHub, LinkedIn, Email (mailto), Download CV (links to `/assets/GabrieleGhisleni_CV.pdf`, kept as-is). The ByteBrush mention folds into the prose as an inline link.

### 3.3 Projects
- Top: a sticky bar (`h-10`, semi-transparent backdrop blur) showing the title of the section currently in view. Computed with `IntersectionObserver` (single observer instance, observes all 8 section headings, picks the topmost intersecting one).
- For each section in `PROJECT_SECTIONS`:
  - Section divider with section title and project count, e.g. `── AI Agents & Chat Platforms (5) ──`.
  - List of `<ProjectCard>` components.

### 3.4 ProjectCard

Uses the native HTML `<details>`/`<summary>` element. This gives correct keyboard/a11y behavior with zero JS state. Multiple cards can be open simultaneously (default `<details>` behavior — explicitly required).

**Collapsed (`<summary>`):**
- Row 1: name (with `<Star/>` icon if `flagship`), role, date range.
- Row 2: one-sentence summary (extracted from solution paragraph — see §5).
- Row 3: first 4 stack chips + `+N more` if more remain.
- Right edge: `<ChevronDown/>` rotated 0° collapsed, 180° expanded (CSS transition).

**Expanded body (`<details>` content):**
- Full problem paragraph (label: "Problem").
- Full solution paragraph (label: "Solution").
- Full stack chips (all, no `+N`).

**Visual variants:**
- **Flagship**: left accent stripe (`border-l-4 border-brand`); name `text-xl font-semibold`; star icon; card padding `p-6`.
- **Non-flagship**: no stripe; name `text-base font-medium`; no star; card padding `p-4`.

Both variants are visually distinct **but share the same expand/collapse interaction**.

### 3.5 Hero rotating phrases
Replacement for the current `react-typist` 100-iteration JSX loop. New list:

```js
[
  'Data Scientist', 2000,
  'ML Engineer', 2000,
  'AI Engineer', 2000,
  'Full Stack', 2000,
  'Web Developer', 2000,
]
```

Passed to `<TypeAnimation sequence={...} repeat={Infinity} cursor wrapper="span">` from `react-type-animation` (already in `package.json`).

### 3.6 Footer
- Centered horizontal row of 4 lucide icons (GitHub, LinkedIn, Mail, FileDown).
- A separate `< /> Source` link to `https://github.com/GabrieleGhisleni/GG-website` on the right.
- Copyright `© 2026 Ghisleni Gabriele` on the left.
- Removes the broken `<a href="@">` placeholder that the old Footer carried.

## 4. Data shape

File: `src/data/projects.js`

```js
/**
 * @typedef {Object} Project
 * @property {string} slug             - Stable kebab-case key, used as React key.
 * @property {string} name             - Title (no trailing/leading whitespace).
 * @property {boolean} flagship        - True for the 12 ⭐ entries.
 * @property {string} role             - Verbatim, e.g. "architect + full stack core dev".
 * @property {string} start            - "Jul 2025" — month + year.
 * @property {string} end              - "May 2026" — or "ongoing".
 * @property {string} summary          - One-sentence summary (extracted from solution).
 * @property {string} problem          - Full problem paragraph.
 * @property {string} solution         - Full solution paragraph.
 * @property {string[]} stack          - Ordered as in Notion (language → framework → infra).
 * @property {{label: string, url: string}[]} [links] - Optional outbound links inside the body.
 */

/**
 * @typedef {Object} ProjectSection
 * @property {string} slug
 * @property {string} title
 * @property {Project[]} projects
 */

/** @type {readonly ProjectSection[]} */
export const PROJECT_SECTIONS = Object.freeze([ /* … 8 sections … */ ]);
```

Only one project carries a `links` entry: **LLM Elasticsearch Cache** has a LangChain-docs URL in its solution paragraph. The card renders it as a plain anchor inline in the solution text (`target="_blank" rel="noreferrer"`).

## 5. Project enumeration (23 cards across 8 sections)

| # | Section | Project | ⭐ | Source |
|---|---|---|---|---|
| 1 | AI Agents & Chat Platforms (5) | AI Wunderkammer | ⭐ | v2 |
| 2 | | Sentovel | ⭐ | v2 |
| 3 | | AskX | ⭐ | v2 |
| 4 | | Cerved Universal Agent API | ⭐ | v2 |
| 5 | | Atoka MCP Server | | v2 |
| 6 | NLP & Text Classification (2) | SDG Text Classifier | ⭐ | v2 |
| 7 | | Long-Text LLM Classification | | v2 |
| 8 | Search & Semantic Infrastructure (2) | AtokaQuery | ⭐ | v2 |
| 9 | | Semantic Search Experiments | | **v1 re-added** |
| 10 | Document Intelligence (4) | Seneca & Seneca Library | ⭐ | v2 |
| 11 | | Management Report Highlights & OCR Benchmark | ⭐ | v2 |
| 12 | | CPORG — Procurement Attachment Extraction | ⭐ | v2 |
| 13 | | Matrix Mirror AI | | v2 |
| 14 | Data Pipelines & ETL (2) | SDG Flow v2 | | v2 |
| 15 | | Public Funding Dependence Score | | v2 |
| 16 | ML Research & Experimentation (3) | LLM Fine-Tuning (Research) | | v2 |
| 17 | | LLM Inference Benchmarks (Research) | | v2 |
| 18 | | MLOps Learning | | **v1 re-added** |
| 19 | Developer Tooling & Infrastructure (4) | Langfuse Freeze (Python + JS) | | v2 |
| 20 | | Live Your Own Life | ⭐ | v2 |
| 21 | | LLM Elasticsearch Cache *(archived)* | | v2 |
| 22 | | pydantic-ai-langfuse *(deprecated)* | | **v1 re-added** |
| 23 | Infrastructure (1) | Internal LLM Infrastructure (Langfuse + LiteLLM) | ⭐ | v2 |

Totals: **12 flagship + 11 non-flagship = 23**.

**Re-added projects use the v1 field structure** (`What it solves` / `Value delivered` / `Stack` + repo path + dates), normalized into the v2 shape:
- `What it solves` → `problem`.
- `Value delivered` → `solution`.
- Created → `start`. Last commit → `end`.
- All three default to `flagship: false`.
- MLOps Learning has no `Value delivered` in v1 — its `solution` will be a one-sentence note that it is a sandbox / learning repo; `summary` mirrors the problem.

### 5.1 Summary-sentence extraction rule
For each project, `summary` = the first sentence of `solution`, trimmed to ≤ 200 chars. Hand-overrides allowed; if a sentence reads awkwardly out of context, edit it in the data file with a `// summary: hand-edited` comment. Cases known in advance to need a hand edit:
- **MLOps Learning** — `solution` is a one-liner; `summary` is the one-liner itself.
- **Langfuse Freeze (Python + JS)** — v2 entry covers both packages; `summary` will explicitly call out "Python + JS twin libraries".
- **pydantic-ai-langfuse** — `summary` must indicate the deprecation up front.

## 6. Background image — preload technique

The current site's last three commits all fight a white/black flash before the hero background paints (`force pre-loading image`). The new implementation makes the image first-class:

1. **In `index.html` `<head>`**, add a preload hint with the literal production path. `base` is fixed at `/GG-website/`, so the path is known at build time:
   ```html
   <link
     rel="preload"
     as="image"
     href="/GG-website/assets/images/upscaled_background.webp"
     fetchpriority="high"
   />
   ```
   In local `vite dev`, this preload 404s harmlessly (dev serves from `/`). The Hero's `<img>` underlay (step 2) loads in both modes via `import.meta.env.BASE_URL`, so the dev experience still gets the image — just without the preload optimization, which is fine for dev.

2. **In the Hero component**, render the image as an actual `<img>` underlay rather than a CSS `background-image`. Browsers prioritize `<img loading="eager" fetchpriority="high">` higher than CSS backgrounds:
   ```jsx
   <section className="relative min-h-screen bg-[#0b1929] text-stone-100">
     <img
       src={`${import.meta.env.BASE_URL}assets/images/upscaled_background.webp`}
       alt=""
       role="presentation"
       loading="eager"
       fetchPriority="high"
       decoding="async"
       className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
     />
     {/* hero content */}
   </section>
   ```
   The `bg-[#0b1929]` fallback color (dark blue-near-black) bridges any frame between paint and image arrival — no white-flash, no black-flash.

3. **Build asset handling:** the image stays in `public/assets/images/` (Vite copies `public/` verbatim into `dist/`). No import; URL is resolved via `import.meta.env.BASE_URL`.

## 7. About-me paragraph — draft (to review)

> I started with a Bachelor's in Philosophy and a Master's in Data Science. Since then I've moved deep into AI and data engineering — designing and shipping production LLM agents, retrieval pipelines, and document-intelligence systems.
>
> Currently at SpazioDati, I architect and build the AI products powering company-intelligence, credit, and procurement use cases — from a centralized agent hub ([AI Wunderkammer](#ai-wunderkammer)) to a graph-based catalog-search agent ([Sentovel](#sentovel)) to OCR/VLM benchmarks on Italian management reports. I also co-own the team's Langfuse + LiteLLM stack that fronts all our LLM traffic, and maintain [ByteBrush](https://gabrieleghisleni.github.io/ByteBrush/) as a public record of what I'm studying.
>
> Off-hours: a side project for a life coach (Stripe + capacity-limited bookings), and table tennis 🏓, hiking ⛰️, climbing 🧗🏼, salsa 💃🏼 when the laptop closes.

Notes:
- Each `<details>` carries `id={`project-${slug}`}` so the inline anchors above (`#ai-wunderkammer`, `#sentovel`) jump straight to the card.
- The "🏓 ⛰️ 🧗🏼 💃🏼" emoji line is carried over verbatim from the existing About — only thing kept from old prose.
- ByteBrush keeps its outbound link (current site dedicates an entire side panel to it; this is a more proportionate placement).

## 8. File-level plan

### 8.1 Files to delete
```
src/App.css                                ← orphaned CRA leftovers
src/App.test.js                            ← stale "learn react" stub
src/setupTests.js                          ← supports stale test
src/reportWebVitals.js                     ← unused
src/css/style.css                          ← committed build artifact
src/css/style.css.map                      ← committed build artifact
src/scss/                                  ← entire SCSS tree
src/components/utils/scrollingTop.jsx      ← queries #main/#mainNav which don't exist
src/components/layout/Contacts.jsx         ← unused
src/components/HomeDevNotes.jsx            ← ByteBrush folds into new About
src/components/HomeContacts.jsx            ← replaced by contact strip in About
src/components/HomeDescription.jsx         ← replaced by new <About/>
src/components/HomeHeader.jsx              ← replaced by new <Hero/>
src/components/Home.jsx                    ← replaced by composition in <App/>
src/components/layout/Footer.jsx           ← rewritten in new location
src/components/utils/typeAnimation.jsx     ← rewritten with react-type-animation
src/shared/                                ← entire dead project-taxonomy subsystem (Project_class, projects/, hobbies, _exclude/)
```

### 8.2 Files to create
```
vite.config.js                             ← Vite + plugin-react + Tailwind v4
index.html                                 ← moved from public/ to repo root (Vite convention)
src/index.css                              ← Tailwind v4 entry with @theme block
src/main.jsx                               ← replaces src/index.js (Vite entry)
src/App.jsx                                ← composes Hero/About/Projects/Footer
src/components/Hero.jsx
src/components/About.jsx
src/components/Projects.jsx
src/components/ProjectSection.jsx
src/components/ProjectCard.jsx
src/components/SectionStickyBar.jsx
src/components/Footer.jsx
src/components/SocialLinks.jsx             ← shared between About + Footer
src/data/projects.js                       ← all 23 projects + 8 sections
src/data/socials.js                        ← { github, linkedin, email, cvHref }
src/test/smoke.test.jsx                    ← Vitest smoke test
CLAUDE.md                                  ← promoted from docs/CLAUDE-draft.md (updated)
```

### 8.3 Files to modify
```
package.json                               ← see §8.4 dependency changes
.gitignore                                 ← add /dist (Vite output)
public/index.html                          ← deleted; replaced by repo-root index.html (Vite)
public/assets/...                          ← unchanged (Vite copies public/)
```

### 8.4 `package.json` changes

**Remove**:
```
@babel/plugin-proposal-private-property-in-object
@testing-library/jest-dom        (re-added below for Vitest)
@testing-library/react           (re-added below for Vitest)
@testing-library/user-event
bootstrap
bootstrap-social
countapi-js
font-awesome
node-sass
react-icons
react-popper
react-router
react-router-dom
react-scripts
react-scroll
react-typist
reactstrap
sass
web-vitals
```

**Keep**:
```
react              (bump 17→18)
react-dom          (bump 17→18)
react-type-animation
gh-pages           (used by deploy script, points at dist/)
```

**Add**:
```
vite
@vitejs/plugin-react
tailwindcss@4
@tailwindcss/vite
lucide-react
vitest
@testing-library/react   (re-added — needed by smoke test)
@testing-library/jest-dom
jsdom                    (Vitest DOM env)
```

**Scripts**:
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

`--openssl-legacy-provider` flag is removed from every script.

### 8.5 `vite.config.js`
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/GG-website/',
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
});
```

### 8.6 `src/index.css`
```css
@import "tailwindcss";

@theme {
  --color-brand: #3fa6e6;
  --color-brand-deep: #0077b6;
  --color-ink: #1a1a1a;
  --font-display: "Raleway", system-ui, sans-serif;
  --font-body: "Merriweather", Georgia, serif;
  --font-sans: "Open Sans", system-ui, sans-serif;
}

/* Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Merriweather&family=Open+Sans:ital,wght@1,300&family=Raleway:wght@400;700;800&display=swap");
```

## 9. CLAUDE.md update

`docs/CLAUDE-draft.md` (already in the branch) is promoted to project root `CLAUDE.md`, **revised** to reflect the new stack:

- Replace "React 17 + react-scripts 4 + node-sass" with "React 18 + Vite + Tailwind v4".
- Drop the `--openssl-legacy-provider` note.
- Replace "Mappa dell'albero renderizzato" with the new component tree (`<App>` → Hero/About/Projects/Footer).
- New "Data" section pointing to `src/data/projects.js` as the source of truth, with the rule: *to update projects, re-run the Notion MCP query on `projects v2` and re-edit `src/data/projects.js` by hand; no automation*.
- Remove the "non aggiungere node-sass" rule (irrelevant) and the "non committare CSS compilato" rule (no more SCSS).
- Keep the "no `<a href="@">` placeholders" rule.
- Add: "Sfondo del hero è preloaded via `<link rel='preload'>` + `<img loading='eager' fetchpriority='high'>` — non rimuovere il fallback `bg-[#0b1929]` né cambiare l'`<img>` in un `background-image` CSS; perderemmo l'eager-load del browser."

## 10. Testing

Single Vitest smoke test, `src/test/smoke.test.jsx`:

```js
import { render, screen } from '@testing-library/react';
import App from '../App';
import { PROJECT_SECTIONS } from '../data/projects';

test('renders portfolio shell and all 23 projects', () => {
  render(<App />);
  expect(screen.getByText('Gabriele Ghisleni')).toBeInTheDocument();
  const allProjects = PROJECT_SECTIONS.flatMap(s => s.projects);
  expect(allProjects).toHaveLength(23);
  for (const p of allProjects) {
    expect(screen.getByText(p.name)).toBeInTheDocument();
  }
});
```

No interaction tests, no a11y axe, no visual regression. The site is small enough that a manual eyeball after `npm run dev` is the real test.

## 11. Out of scope (explicit)

- Dark mode.
- Filtering / search / sort over projects.
- Per-project pages or routes (`/projects/<slug>`).
- Internationalization.
- A11y testing beyond what `<details>/<summary>` and semantic HTML give for free.
- Image carousel or per-project screenshots (Notion has none).
- Re-fetching Notion at build time (manually edit `src/data/projects.js` instead).

## 12. Step-by-step execution order

This is the order in which the implementation plan (next step: `writing-plans`) should advance. Each step is independently reviewable; each leaves the site in a working state on the branch.

1. **Vite + React 18 migration on a clean tree** — add Vite, bump React, remove CRA. The site still renders the old Bootstrap/Reactstrap content. Goal: confirm Vite works before touching styles.
2. **Tailwind v4 + theme + delete SCSS** — add `@tailwindcss/vite`, write `src/index.css`, delete `src/scss/` and `src/css/`. Old components rendered without styles (intentional, bridge state).
3. **Hero rewrite** — new `<Hero/>` with `<img>` underlay, `<link rel="preload">`, `react-type-animation`. Replaces `HomeHeader.jsx` + `typeAnimation.jsx` + `scrollingTop.jsx`.
4. **About rewrite** — new `<About/>` with the §7 prose. Replaces `HomeDescription.jsx` + `HomeDevNotes.jsx` + `HomeContacts.jsx`.
5. **Data file** — write `src/data/projects.js` with all 23 projects.
6. **Projects rewrite** — new `<Projects/>` + `<ProjectSection/>` + `<ProjectCard/>` + `<SectionStickyBar/>`.
7. **Footer rewrite** — new `<Footer/>` with `<SocialLinks/>`.
8. **Cleanup** — delete `src/shared/`, `src/App.css`, `src/components/layout/Contacts.jsx`, `src/components/Home.jsx`, `App.test.js`, `setupTests.js`, `reportWebVitals.js`, `public/index.html` (moved to repo root). Drop deprecated deps from `package.json`.
9. **Smoke test + dev verify** — write `smoke.test.jsx`, run `npm run dev`, eyeball every section.
10. **Build + deploy dry-run** — `npm run build`, `npm run preview`, confirm `dist/` looks correct against `base: /GG-website/`. Do **not** run `npm run deploy` until user gives explicit go-ahead.
11. **Promote CLAUDE.md** — copy `docs/CLAUDE-draft.md` → `/CLAUDE.md` with the §9 edits.

## 13. Open items requiring user input before code starts

None as of the current spec. The 4 confirmation points from the previous turn are resolved:
- About text: rewrite per §7 (user to review the draft inline above).
- CV PDF: keep current `/assets/GabrieleGhisleni_CV.pdf` (no change).
- Hero phrases: 5-item list per §3.5.
- Source-on-GitHub link in Footer: included per §3.6.

## 14. Risks

- **React 18 + reactstrap removal removes Bootstrap classes** — any vestigial Bootstrap-class-name lookups in copy/paste artifacts will silently no-op. Mitigation: nothing in the new component tree references Bootstrap classes; we are doing a rewrite, not a port.
- **Tailwind v4 is new enough** that some third-party tutorials reference v3 syntax (`tailwind.config.js`). v4 uses `@theme` in CSS. Spec calls this out (§8.6) so the implementation plan picks the right syntax.
- **Vite `base` mismatch** between dev (`/`) and prod (`/GG-website/`) bites image preload links. Spec mitigates via `import.meta.env.BASE_URL` in the `<img>` and a deliberate dev-time-404 on the preload (harmless).
- **`gh-pages` package vs `dist/` directory** — current `predeploy` builds to `build/` (CRA convention). Vite uses `dist/`. Scripts updated accordingly in §8.4.
- **Notion drift** — Notion `projects v2` will change. There is no automation; whoever updates the site must re-fetch via MCP and edit `src/data/projects.js`. The CLAUDE.md update records this.
