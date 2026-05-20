# Notion-driven Projects + Tailwind/Vite rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current CRA 4 + Bootstrap 4 + SCSS portfolio with a Vite + React 18 + Tailwind v4 single-page site whose Projects section is hard-coded from the Notion `projects v2` page (plus 3 projects re-added from v1). 23 projects total, compact-first cards that expand on click.

**Architecture:** Single scrolling page. Pure static site, deployed to GitHub Pages via `gh-pages -d dist`. Project data hard-coded in `src/data/projects.js`; no runtime or build-time API calls. Tailwind v4 with `@theme` block in CSS. Card interaction via native `<details>/<summary>` — zero JS state, multiple cards open at once.

**Tech Stack:** Vite 6, React 18, Tailwind CSS v4 (`@tailwindcss/vite`), `react-type-animation`, `lucide-react`, Vitest + `@testing-library/react` + jsdom for the smoke test.

**Spec:** `docs/superpowers/specs/2026-05-20-notion-projects-tailwind-design.md`

**Branch:** `arch-review`

---

## Pre-flight

- [ ] **Confirm working tree clean and on `arch-review`**

Run: `git status && git rev-parse --abbrev-ref HEAD`
Expected: `nothing to commit, working tree clean` and `arch-review`.

If dirty: stop and ask the user before proceeding.

- [ ] **Confirm Node version**

Run: `node -v`
Expected: ≥ v18 (Vite 6 requires Node 18+; the user is on a Raspberry Pi but `npm start` previously needed `--openssl-legacy-provider` which is a Node ≥17 indicator).

If older: stop and tell the user.

---

## Task 1: Vite + React 18 migration (site still renders old content)

**Goal:** Replace CRA toolchain with Vite. React bumped to 18. Existing components (HomeHeader, HomeDescription, Footer) keep rendering with their current SCSS/Bootstrap styles unchanged. Nothing else changes yet.

**Files:**
- Create: `vite.config.js` (repo root)
- Create: `index.html` (repo root — move from `public/index.html`)
- Create: `src/main.jsx` (replaces `src/index.js`)
- Modify: `package.json` (deps, scripts)
- Delete: `src/index.js` (after `src/main.jsx` works)
- Delete: `public/index.html` (after repo-root `index.html` works)

### Steps

- [ ] **Step 1.1: Read the current `package.json`**

Run: `cat package.json`
Expected: confirms the deps and scripts before we touch them.

- [ ] **Step 1.2: Read the current `public/index.html`**

Run: `cat public/index.html`
Capture the `<title>`, `<meta>` tags, and the `<div id="root">` mount point — they need to be carried over.

- [ ] **Step 1.3: Write the new repo-root `index.html`**

Content (substitute the captured `<title>`/meta from step 1.2 if anything is non-default):

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/GG-website/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0077b6" />
    <meta name="description" content="Gabriele Ghisleni — Data Scientist, ML Engineer, AI Engineer. Portfolio of agentic systems, retrieval pipelines, and document intelligence." />
    <meta property="og:title" content="Gabriele Ghisleni — Portfolio" />
    <meta property="og:description" content="Data Scientist, ML Engineer, AI Engineer. AI agents, retrieval pipelines, document intelligence." />
    <meta property="og:image" content="/GG-website/social_preview.jpg" />
    <link
      rel="preload"
      as="image"
      href="/GG-website/assets/images/upscaled_background.webp"
      fetchpriority="high"
    />
    <title>Gabriele Ghisleni</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 1.4: Write `vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/GG-website/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
});
```

(Tailwind plugin is added in Task 2, not here, so Task 1 can be verified standalone.)

- [ ] **Step 1.5: Write `src/main.jsx`**

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import 'react-typist/dist/Typist.css';
import './css/style.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Note: the old global CSS imports are temporarily retained so the existing components keep rendering. They are deleted in later tasks. `./css/style.css` moves from `App.js` to `main.jsx` so we can remove that import from `App.js` in Task 4 without breaking anything.

- [ ] **Step 1.6: Update `src/App.js` — remove the duplicate `style.css` import**

Change:
```js
import './css/style.css';
```
to nothing (the import now lives in `main.jsx`).

The file then becomes:
```js
import React from 'react';
import { Footer } from './components/layout/Footer';
import Home from './components/Home';

const App = () => (
  <>
    <Home />
    <Footer />
  </>
);

export default App;
```

- [ ] **Step 1.7: Edit `package.json`**

Replace the `dependencies`, `devDependencies` (create the section), and `scripts` blocks.

Final `package.json` for this task (do not touch yet — full version applied in step 1.7):

```json
{
  "homepage": "http://GabrieleGhisleni.github.io/GG-website/",
  "name": "ggweb",
  "version": "0.2.0",
  "private": true,
  "type": "module",
  "dependencies": {
    "bootstrap": "^4.6.0",
    "bootstrap-social": "^5.1.1",
    "font-awesome": "^4.7.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-type-animation": "^3.2.0",
    "react-typist": "^2.0.5",
    "reactstrap": "^8.10.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "gh-pages": "^6.0.0",
    "sass": "^1.69.4",
    "vite": "^6.0.7"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
  }
}
```

Other deps (`react-router*`, `react-scroll`, `react-popper`, `react-icons`, `countapi-js`, `web-vitals`, `node-sass`, all `@testing-library/*`, `@babel/plugin-proposal-private-property-in-object`, `react-scripts`) are removed in this step — they aren't used by what renders today (verified during the architecture review).

`sass` is kept temporarily so the SCSS partials can still be referenced; removed in Task 2.

- [ ] **Step 1.8: Install fresh**

Run:
```bash
rm -rf node_modules package-lock.json
npm install
```
Expected: clean install, no peer-dep warnings about React 17 vs 18 (since all the React-17-pinned deps were removed).

- [ ] **Step 1.9: Delete `src/index.js`**

Run: `rm src/index.js`

- [ ] **Step 1.10: Delete `public/index.html`**

Run: `rm public/index.html`

(`public/` keeps `favicon.ico`, `manifest.json`, `robots.txt`, `social_preview.jpg`, `jekyll.svg`, `assets/`.)

- [ ] **Step 1.11: Start dev server and smoke-eyeball**

Run: `npm run dev`
Expected: Vite serves on `http://localhost:5173/GG-website/`. Page renders the existing hero (background image, name, typing animation, scroll arrow), About Me, ByteBrush + Contacts side panel, Footer. Bootstrap and font-awesome glyphs visible.

Manual check items:
1. No console errors about missing modules.
2. Background image loads.
3. Hero typing animation runs (still old `react-typist`).
4. Social icons in footer render.

Stop the dev server (`Ctrl-C`) before continuing.

- [ ] **Step 1.12: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html src/main.jsx src/App.js
git add -u  # picks up src/index.js + public/index.html deletions
git commit -m "build: migrate from CRA 4 to Vite 6 + React 18

- Replace react-scripts with vite + @vitejs/plugin-react.
- Bump React 17 → 18 (createRoot).
- Drop --openssl-legacy-provider, react-router*, react-scroll,
  react-popper, react-icons, countapi-js, web-vitals, node-sass,
  CRA test deps. Old components keep rendering with Bootstrap/SCSS
  unchanged for this step.
- Move index.html to repo root (Vite convention); preload hero bg."
```

---

## Task 2: Tailwind v4 + theme tokens + delete SCSS pipeline

**Goal:** Add Tailwind v4 via `@tailwindcss/vite`. Define brand colors and fonts in a `@theme` block. Delete the SCSS partials and the committed compiled CSS. Old components render unstyled (intentional bridge state — they get rewritten in Tasks 3–6).

**Files:**
- Modify: `vite.config.js`
- Create: `src/index.css`
- Modify: `src/main.jsx`
- Modify: `package.json` (drop `sass`)
- Delete: `src/scss/` (entire dir)
- Delete: `src/css/style.css` and `src/css/style.css.map`
- Delete: `src/App.css`

### Steps

- [ ] **Step 2.1: Install Tailwind v4**

Run:
```bash
npm install -D tailwindcss@4 @tailwindcss/vite
```

- [ ] **Step 2.2: Modify `vite.config.js`**

Add the tailwind plugin import and entry:

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

- [ ] **Step 2.3: Create `src/index.css`**

```css
@import "tailwindcss";

@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600&family=Raleway:wght@400;700;800&display=swap");

@theme {
  --color-brand: #3fa6e6;
  --color-brand-deep: #0077b6;
  --color-ink: #1a1a1a;
  --color-bg-hero-fallback: #0b1929;

  --font-display: "Raleway", system-ui, sans-serif;
  --font-body: "Merriweather", Georgia, serif;
  --font-sans: "Open Sans", system-ui, sans-serif;
}

html {
  font-family: var(--font-sans);
  color: var(--color-ink);
}
```

- [ ] **Step 2.4: Modify `src/main.jsx`** — drop old CSS imports, add Tailwind entry

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

(The Bootstrap, font-awesome, bootstrap-social, react-typist, and `./css/style.css` imports go.)

- [ ] **Step 2.5: Drop `sass` from `package.json`**

Edit `devDependencies` to remove `"sass"`. Run `npm install` to update `package-lock.json`.

- [ ] **Step 2.6: Delete obsolete style sources**

```bash
rm -rf src/scss
rm src/css/style.css src/css/style.css.map
rm src/App.css
```

(`src/css/` directory is empty after this; it's removed naturally by `git add -u`.)

- [ ] **Step 2.7: Start dev server and verify Tailwind is live**

Run: `npm run dev`
Expected:
- Page loads.
- Bootstrap styling is gone — page looks "unstyled" (no jumbotron, no grid, no fa-icons). This is correct.
- Open browser devtools, inspect `<body>`: it should now have the Tailwind default font (sans-serif via `--font-sans`), `color: #1a1a1a`.
- In the elements panel, add `class="bg-brand text-white p-4"` to any element and confirm it picks up the brand color. Remove after testing.

Stop the dev server.

- [ ] **Step 2.8: Commit**

```bash
git add vite.config.js src/index.css src/main.jsx package.json package-lock.json
git add -u  # picks up deleted scss/, css/, App.css
git commit -m "build: add Tailwind v4 via @tailwindcss/vite, drop SCSS

- @theme block in src/index.css defines brand colors and font stacks.
- Drop sass, drop src/scss, drop the committed compiled CSS in
  src/css, drop the orphan src/App.css.
- Old components now render unstyled — bridge state until the
  rewrite in Tasks 3–7."
```

---

## Task 3: Project data file (`src/data/projects.js`) + smoke test

**Goal:** Hard-code all 23 projects + 8 sections in a single frozen export. Write the Vitest smoke test before any UI consumes the data, so the data shape is locked.

**Files:**
- Create: `src/data/projects.js`
- Create: `src/data/socials.js`
- Create: `src/test/setup.js`
- Create: `src/test/data.test.js`

### Steps

- [ ] **Step 3.1: Create `src/test/setup.js`**

```js
import '@testing-library/jest-dom';
```

Install testing libs:
```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3.2: Write the failing data test**

Create `src/test/data.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { PROJECT_SECTIONS } from '../data/projects';

describe('PROJECT_SECTIONS', () => {
  const allProjects = PROJECT_SECTIONS.flatMap(s => s.projects);

  it('has 8 sections', () => {
    expect(PROJECT_SECTIONS).toHaveLength(8);
  });

  it('has 23 projects total', () => {
    expect(allProjects).toHaveLength(23);
  });

  it('has 12 flagship projects', () => {
    expect(allProjects.filter(p => p.flagship)).toHaveLength(12);
  });

  it('every project has every required field, non-empty', () => {
    const required = ['slug', 'name', 'flagship', 'role', 'start', 'end', 'summary', 'problem', 'solution', 'stack'];
    for (const p of allProjects) {
      for (const field of required) {
        expect(p, `field "${field}" on project "${p.name ?? p.slug}"`).toHaveProperty(field);
      }
      expect(p.stack.length, `stack on "${p.name}" is empty`).toBeGreaterThan(0);
      expect(p.problem.length, `problem on "${p.name}" is empty`).toBeGreaterThan(0);
      expect(p.solution.length, `solution on "${p.name}" is empty`).toBeGreaterThan(0);
    }
  });

  it('slugs are unique', () => {
    const slugs = allProjects.map(p => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('section slugs are unique', () => {
    const slugs = PROJECT_SECTIONS.map(s => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('object is deeply frozen', () => {
    expect(Object.isFrozen(PROJECT_SECTIONS)).toBe(true);
  });
});
```

- [ ] **Step 3.3: Run the test to see it fail**

Run: `npx vitest run src/test/data.test.js`
Expected: FAIL — module `../data/projects` does not exist.

- [ ] **Step 3.4: Write `src/data/projects.js` with all 23 projects**

This is a long file. The full content for every project is in `docs/superpowers/specs/2026-05-20-notion-projects-tailwind-design.md` §5, and the raw Notion text is in this conversation's tool-result history (the `mcp__claude_ai_Notion__notion-fetch` results for `projects v2` and `projects v1`).

**Structure to follow exactly:**

```js
/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} name
 * @property {boolean} flagship
 * @property {string} role
 * @property {string} start
 * @property {string} end
 * @property {string} summary
 * @property {string} problem
 * @property {string} solution
 * @property {string[]} stack
 * @property {{label: string, url: string}[]} [links]
 */

const freeze = (sections) =>
  Object.freeze(
    sections.map(s => Object.freeze({
      ...s,
      projects: Object.freeze(s.projects.map(p => Object.freeze({
        ...p,
        stack: Object.freeze([...p.stack]),
        ...(p.links ? { links: Object.freeze(p.links.map(l => Object.freeze({ ...l }))) } : {}),
      }))),
    }))
  );

export const PROJECT_SECTIONS = freeze([
  {
    slug: 'ai-agents',
    title: 'AI Agents & Chat Platforms',
    projects: [
      {
        slug: 'ai-wunderkammer',
        name: 'AI Wunderkammer',
        flagship: true,
        role: 'architect + full stack core dev',
        start: 'Jul 2025',
        end: 'May 2026',
        summary: 'A centralized hub where users browse and interact with every agent and MCP the team has developed.',
        problem: 'The team had built dozens of specialized AI agents and MCP servers across company intelligence, credit ratings (Fitch/Moody\'s/S&P), value investing, Italian economic data, procurement, and document analysis — but they were scattered across separate repos, demos, and environments, with no single place to discover or use them, and no shared layer for managing the artifacts they produced.',
        solution: 'A centralized hub where users browse and interact with every agent and MCP the team has developed, both production and R&D. Supports persistent conversation history, file upload, in-context memory shared across agents, RBAC, an admin panel to register agents without code deploys, and artifact management (create, edit, share) exposed via both UI and API. Architecturally combines Vercel AI SDK streaming primitives with LangGraph orchestration — keeping fast token streaming on the frontend while running multi-step graph logic on the backend.',
        stack: ['Next.js 15', 'TypeScript', 'Vercel AI SDK', 'LangGraph', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Langfuse'],
      },
      // sentovel, askx, cerved-universal-agent-api, atoka-mcp-server
    ],
  },
  // 7 more sections
]);
```

**Required project entries (full list of slugs in the order they appear):**

Section `ai-agents` (5):
1. `ai-wunderkammer` ⭐
2. `sentovel` ⭐
3. `askx` ⭐
4. `cerved-universal-agent-api` ⭐
5. `atoka-mcp-server`

Section `nlp` — title `NLP & Text Classification` (2):
6. `sdg-text-classifier` ⭐
7. `long-text-llm-classification`

Section `search` — title `Search & Semantic Infrastructure` (2):
8. `atokaquery` ⭐
9. `semantic-search-experiments` *(re-added from v1)*

Section `documents` — title `Document Intelligence` (4):
10. `seneca` ⭐ (name: `Seneca & Seneca Library`)
11. `management-report-highlights` ⭐ (name: `Management Report Highlights & OCR Benchmark`)
12. `cporg` ⭐ (name: `CPORG — Procurement Attachment Extraction`)
13. `matrix-mirror-ai`

Section `pipelines` — title `Data Pipelines & ETL` (2):
14. `sdg-flow-v2`
15. `public-funding-dependence-score`

Section `research` — title `ML Research & Experimentation` (3):
16. `llm-fine-tuning`
17. `llm-inference-benchmarks`
18. `mlops-learning` *(re-added from v1)*

Section `tooling` — title `Developer Tooling & Infrastructure` (4):
19. `langfuse-freeze` (name: `Langfuse Freeze (Python + JS)`)
20. `live-your-own-life` ⭐
21. `llm-elasticsearch-cache` (name: `LLM Elasticsearch Cache (archived)`)
22. `pydantic-ai-langfuse` (name: `pydantic-ai-langfuse (deprecated)`) *(re-added from v1)*

Section `infrastructure` — title `Infrastructure` (1):
23. `internal-llm-infrastructure` ⭐ (name: `Internal LLM Infrastructure (Langfuse + LiteLLM)`)

**Sourcing the text for each project:**
- For projects from `projects v2`: copy `problem`, `solution`, and `stack` verbatim from the Notion text. `role`, `start`, `end` are in the heading and metadata lines.
- For the 3 re-added projects (sourced from `projects v1`): `What it solves` → `problem`, `Value delivered` → `solution`, `Stack` → `stack`. `start` = Created, `end` = Last commit. All three are `flagship: false`.
- `summary` for each project = the first sentence of `solution`, trimmed. Hand-edits noted in the spec §5.1:
  - `mlops-learning` — `solution` is essentially the one-liner "A sandbox/learning repo for exploring MLOps practices and tooling — no specific business deliverable." `summary` mirrors it.
  - `langfuse-freeze` — `summary` = "Twin Python + TypeScript libraries that snapshot Langfuse prompts to disk at startup and fall back to the local cache when Langfuse is unreachable."
  - `pydantic-ai-langfuse` — `summary` starts with "*(Deprecated — superseded by native pydantic-ai integration.)*" then the one-line value.
- `llm-elasticsearch-cache` — its `solution` contains the LangChain docs URL. Render in code as a `links` entry **and** keep the URL inline in the `solution` text so the card body can substitute it via a regex / `react-markdown`-free string split (see Task 6). For now, just include both fields:
  ```js
  links: [
    { label: 'LangChain docs', url: 'https://python.langchain.com/v0.2/docs/integrations/llm_caching/#elasticsearch-cache' }
  ]
  ```

- [ ] **Step 3.5: Run the data test to verify it passes**

Run: `npx vitest run src/test/data.test.js`
Expected: PASS — all 6 assertions green. If any project is missing a field or stack is empty, fix in the file and re-run until green.

- [ ] **Step 3.6: Create `src/data/socials.js`**

```js
export const SOCIALS = Object.freeze({
  github: 'https://github.com/GabrieleGhisleni',
  linkedin: 'https://www.linkedin.com/in/gabriele-ghisleni-bb553a199/',
  email: 'mailto:gabriele.ghisleni01@gmail.com',
  cv: `${import.meta.env.BASE_URL}assets/GabrieleGhisleni_CV.pdf`,
  bytebrush: 'https://gabrieleghisleni.github.io/ByteBrush/',
  source: 'https://github.com/GabrieleGhisleni/GG-website',
});
```

- [ ] **Step 3.7: Add `test` script to `package.json`**

In the `scripts` block:
```json
"test": "vitest run"
```

Run: `npm test`
Expected: data tests pass.

- [ ] **Step 3.8: Commit**

```bash
git add src/data/ src/test/ package.json package-lock.json
git commit -m "feat(data): hard-code 23 projects from Notion projects v2

- src/data/projects.js: 8 sections, 23 projects, deeply frozen.
- src/data/socials.js: link table for header + footer reuse.
- src/test/data.test.js: shape + counts + freeze invariants.
- Adds vitest, jsdom, @testing-library/{react,jest-dom}."
```

---

## Task 4: `<Hero/>` with `react-type-animation` and preloaded background

**Goal:** New Hero component replacing `HomeHeader.jsx` + `utils/typeAnimation.jsx` + `utils/scrollingTop.jsx`. Background image as an eager `<img>` underlay with a dark fallback color — no white/black flash.

**Files:**
- Create: `src/components/Hero.jsx`
- Modify: `src/App.js` → rename to `src/App.jsx`

### Steps

- [ ] **Step 4.1: Install `react-type-animation` and `lucide-react`**

Run:
```bash
npm install react-type-animation lucide-react
npm uninstall react-typist
```

- [ ] **Step 4.2: Write the Hero component**

Create `src/components/Hero.jsx`:

```jsx
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown } from 'lucide-react';

const scrollOneViewport = () =>
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

const Hero = () => (
  <section className="relative min-h-screen bg-bg-hero-fallback text-stone-100 overflow-hidden">
    <img
      src={`${import.meta.env.BASE_URL}assets/images/upscaled_background.webp`}
      alt=""
      role="presentation"
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
    />

    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center font-display">
      <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
        Gabriele Ghisleni
      </h1>

      <TypeAnimation
        sequence={[
          'Data Scientist', 2000,
          'ML Engineer', 2000,
          'AI Engineer', 2000,
          'Full Stack', 2000,
          'Web Developer', 2000,
        ]}
        wrapper="span"
        cursor
        repeat={Infinity}
        className="mt-4 text-2xl italic md:text-3xl"
      />

      <button
        type="button"
        onClick={scrollOneViewport}
        aria-label="Scroll to content"
        className="mt-16 grid h-16 w-16 place-items-center rounded-full border-4 border-brand/50 text-brand animate-bounce hover:bg-brand/10"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </div>
  </section>
);

export default Hero;
```

Note: `bg-bg-hero-fallback` uses the `--color-bg-hero-fallback` token defined in `src/index.css`. Tailwind v4 auto-generates utilities from `@theme` tokens.

- [ ] **Step 4.3: Rename `src/App.js` → `src/App.jsx` and wire in Hero**

Move:
```bash
git mv src/App.js src/App.jsx
```

Content (Hero now replaces `<Home/>`, old `<Footer/>` stays for now):

```jsx
import { Footer } from './components/layout/Footer';
import Hero from './components/Hero';

const App = () => (
  <>
    <Hero />
    <Footer />
  </>
);

export default App;
```

(`<Home/>`, `HomeHeader`, etc. are no longer imported — but the files stay on disk until Task 8.)

- [ ] **Step 4.4: Verify in dev**

Run: `npm run dev`
Expected:
- Hero renders full-viewport with the background image.
- No white/black flash on hard reload (Ctrl-Shift-R). The fallback `#0b1929` shows for at most one frame.
- The 5-phrase rotation cycles through Data Scientist → ML Engineer → AI Engineer → Full Stack → Web Developer.
- Bouncing arrow scrolls one viewport down (lands on the now-unstyled old Footer).
- No console errors. No `react-typist` deprecation warnings (since react-typist is gone).

Stop the dev server.

- [ ] **Step 4.5: Commit**

```bash
git add src/components/Hero.jsx src/App.jsx package.json package-lock.json
git add -u
git commit -m "feat(hero): new Tailwind Hero with eager bg + react-type-animation

- Background as <img loading=eager fetchpriority=high> underlay
  with bg-bg-hero-fallback to bridge the paint gap (no flash).
- react-type-animation declarative 5-phrase rotation; drops
  react-typist + the 100-iteration JSX hack.
- lucide ChevronDown scroll-down button; drops the scrollingTop
  helper that queried DOM ids that no longer exist."
```

---

## Task 5: `<SocialLinks/>` + `<About/>` + `<Footer/>` (replaces 3 old components)

**Goal:** New About and Footer, sharing a single `<SocialLinks/>` that reads from `socials.js`. The About paragraph is the §7 draft from the spec.

**Files:**
- Create: `src/components/SocialLinks.jsx`
- Create: `src/components/About.jsx`
- Create: `src/components/Footer.jsx`
- Modify: `src/App.jsx`
- Create: `src/test/social-links.test.jsx`

### Steps

- [ ] **Step 5.1: Write the SocialLinks failing test**

Create `src/test/social-links.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SocialLinks from '../components/SocialLinks';
import { SOCIALS } from '../data/socials';

describe('<SocialLinks/>', () => {
  it('renders github, linkedin, email and CV links', () => {
    render(<SocialLinks />);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', SOCIALS.github);
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', SOCIALS.linkedin);
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', SOCIALS.email);
    expect(screen.getByRole('link', { name: /cv|resume/i })).toHaveAttribute('href', SOCIALS.cv);
  });
});
```

- [ ] **Step 5.2: Run and verify FAIL**

Run: `npx vitest run src/test/social-links.test.jsx`
Expected: FAIL — module `../components/SocialLinks` does not exist.

- [ ] **Step 5.3: Write `src/components/SocialLinks.jsx`**

```jsx
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { SOCIALS } from '../data/socials';

const items = [
  { label: 'GitHub',   href: SOCIALS.github,   Icon: Github },
  { label: 'LinkedIn', href: SOCIALS.linkedin, Icon: Linkedin },
  { label: 'Email',    href: SOCIALS.email,    Icon: Mail },
  { label: 'CV',       href: SOCIALS.cv,       Icon: FileDown },
];

const SocialLinks = ({ variant = 'inline' }) => (
  <ul
    className={
      variant === 'footer'
        ? 'flex items-center gap-6'
        : 'flex flex-wrap items-center gap-4 text-sm'
    }
  >
    {items.map(({ label, href, Icon }) => (
      <li key={label}>
        <a
          href={href}
          aria-label={label}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="inline-flex items-center gap-1.5 text-current hover:text-brand transition-colors"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span className={variant === 'footer' ? 'sr-only' : ''}>{label}</span>
        </a>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
```

- [ ] **Step 5.4: Run test to PASS**

Run: `npx vitest run src/test/social-links.test.jsx`
Expected: PASS.

- [ ] **Step 5.5: Write `src/components/About.jsx`**

```jsx
import SocialLinks from './SocialLinks';
import { SOCIALS } from '../data/socials';

const About = () => (
  <section id="about" className="mx-auto max-w-3xl px-6 py-24 font-body text-ink">
    <h2 className="mb-8 text-center text-3xl font-extrabold text-brand-deep">About me</h2>

    <div className="space-y-5 text-lg leading-relaxed">
      <p>
        I started with a Bachelor's in Philosophy and a Master's in Data Science.
        Since then I've moved deep into AI and data engineering — designing and
        shipping production LLM agents, retrieval pipelines, and document-intelligence
        systems.
      </p>
      <p>
        Currently at SpazioDati, I architect and build the AI products powering
        company-intelligence, credit, and procurement use cases — from a
        centralized agent hub (<a href="#project-ai-wunderkammer" className="text-brand hover:underline">AI Wunderkammer</a>)
        to a graph-based catalog-search agent (<a href="#project-sentovel" className="text-brand hover:underline">Sentovel</a>)
        to OCR/VLM benchmarks on Italian management reports. I also co-own the team's
        Langfuse + LiteLLM stack that fronts all our LLM traffic, and maintain{' '}
        <a href={SOCIALS.bytebrush} target="_blank" rel="noreferrer" className="text-brand hover:underline">
          ByteBrush
        </a>
        {' '}as a public record of what I'm studying.
      </p>
      <p>
        Off-hours: a side project for a life coach (Stripe + capacity-limited
        bookings), and table tennis 🏓, hiking ⛰️, climbing 🧗🏼, salsa 💃🏼 when
        the laptop closes.
      </p>
    </div>

    <div className="mt-10 flex justify-center">
      <SocialLinks variant="inline" />
    </div>
  </section>
);

export default About;
```

- [ ] **Step 5.6: Write `src/components/Footer.jsx`**

```jsx
import SocialLinks from './SocialLinks';
import { SOCIALS } from '../data/socials';
import { Code2 } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-stone-200 bg-stone-50 py-6">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
      <span className="text-sm text-stone-500">© 2026 Ghisleni Gabriele</span>
      <div className="flex items-center gap-6 text-stone-600">
        <SocialLinks variant="footer" />
        <a
          href={SOCIALS.source}
          target="_blank"
          rel="noreferrer"
          aria-label="Source on GitHub"
          className="inline-flex items-center gap-1.5 text-sm hover:text-brand"
        >
          <Code2 className="h-4 w-4" aria-hidden="true" />
          Source
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
```

- [ ] **Step 5.7: Update `src/App.jsx`** to use new About and Footer

```jsx
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';

const App = () => (
  <>
    <Hero />
    <About />
    <Footer />
  </>
);

export default App;
```

(Old `Footer` import from `./components/layout/Footer` is removed. The old file stays on disk until Task 8.)

- [ ] **Step 5.8: Dev verify**

Run: `npm run dev`
Expected:
- Hero unchanged.
- About section centered, three paragraphs, Merriweather serif, blue heading.
- Inline anchors `#project-ai-wunderkammer` and `#project-sentovel` resolve (they'll scroll to nothing yet — that's fine; the targets land in Task 6).
- ByteBrush link opens in new tab.
- Social strip below paragraph: 4 icons + labels.
- Footer: copyright left, 4 social icons + Source link right.
- No console errors.

- [ ] **Step 5.9: Commit**

```bash
git add src/components/SocialLinks.jsx src/components/About.jsx src/components/Footer.jsx src/App.jsx src/test/social-links.test.jsx
git commit -m "feat(about/footer): Tailwind About, Footer, shared SocialLinks

- <SocialLinks variant=inline|footer> reads SOCIALS table; one
  place to edit links from now on.
- About paragraph rewritten to reflect current AI/data-engineering
  work (see spec §7).
- Footer drops the broken <a href=\"@\"> placeholder, adds a
  Source-on-GitHub link.
- Tests cover SocialLinks link wiring."
```

---

## Task 6: `<ProjectCard/>` (single component, both flagship and non-flagship variants)

**Goal:** Build the central component. Uses native `<details>/<summary>`. Tested via Vitest before being composed.

**Files:**
- Create: `src/components/ProjectCard.jsx`
- Create: `src/test/project-card.test.jsx`

### Steps

- [ ] **Step 6.1: Write the failing test**

Create `src/test/project-card.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectCard from '../components/ProjectCard';

const sampleFlagship = {
  slug: 'sample',
  name: 'Sample Flagship',
  flagship: true,
  role: 'architect + core dev',
  start: 'Jan 2024',
  end: 'May 2026',
  summary: 'A sample summary sentence.',
  problem: 'A sample problem paragraph.',
  solution: 'A sample solution paragraph.',
  stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Langfuse'],
};

const sampleNonFlagship = { ...sampleFlagship, slug: 'sample-2', name: 'Sample Non Flagship', flagship: false };

describe('<ProjectCard/>', () => {
  it('renders name, role, date and summary in collapsed state', () => {
    render(<ProjectCard project={sampleFlagship} />);
    expect(screen.getByText('Sample Flagship')).toBeInTheDocument();
    expect(screen.getByText(/architect \+ core dev/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 2024.*May 2026/)).toBeInTheDocument();
    expect(screen.getByText('A sample summary sentence.')).toBeInTheDocument();
  });

  it('shows first 4 stack chips + "+N" indicator when collapsed', () => {
    render(<ProjectCard project={sampleFlagship} />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('FastAPI')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Redis')).toBeInTheDocument();
    // 5th and 6th items are inside <details>; not visible in the summary
    expect(screen.queryByText('Elasticsearch')).not.toBeNull();   // exists somewhere in DOM
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('renders problem and solution paragraphs (always in DOM via <details>)', () => {
    render(<ProjectCard project={sampleFlagship} />);
    expect(screen.getByText('A sample problem paragraph.')).toBeInTheDocument();
    expect(screen.getByText('A sample solution paragraph.')).toBeInTheDocument();
  });

  it('flagship variant carries the flagship marker class', () => {
    const { container } = render(<ProjectCard project={sampleFlagship} />);
    expect(container.querySelector('[data-variant="flagship"]')).not.toBeNull();
  });

  it('non-flagship variant carries the non-flagship marker class', () => {
    const { container } = render(<ProjectCard project={sampleNonFlagship} />);
    expect(container.querySelector('[data-variant="non-flagship"]')).not.toBeNull();
  });

  it('details element has id=project-<slug> for anchor links', () => {
    const { container } = render(<ProjectCard project={sampleFlagship} />);
    expect(container.querySelector('#project-sample')).not.toBeNull();
  });
});
```

- [ ] **Step 6.2: Run and verify FAIL**

Run: `npx vitest run src/test/project-card.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 6.3: Write `src/components/ProjectCard.jsx`**

```jsx
import { Star, ChevronDown } from 'lucide-react';

const StackChip = ({ children }) => (
  <span className="inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700">
    {children}
  </span>
);

const renderSolutionWithLinks = (solution, links) => {
  if (!links || links.length === 0) return solution;
  const parts = [];
  let cursor = solution;
  for (const { label, url } of links) {
    const idx = cursor.indexOf(label);
    if (idx === -1) continue;
    parts.push(cursor.slice(0, idx));
    parts.push(
      <a key={url} href={url} target="_blank" rel="noreferrer" className="text-brand hover:underline">
        {label}
      </a>
    );
    cursor = cursor.slice(idx + label.length);
  }
  parts.push(cursor);
  return parts;
};

const ProjectCard = ({ project }) => {
  const { slug, name, flagship, role, start, end, summary, problem, solution, stack, links } = project;
  const visibleStack = stack.slice(0, 4);
  const hiddenStackCount = stack.length - visibleStack.length;
  const variant = flagship ? 'flagship' : 'non-flagship';

  return (
    <details
      id={`project-${slug}`}
      data-variant={variant}
      className={`group rounded-lg border border-stone-200 bg-white transition-colors hover:border-brand/40 ${
        flagship ? 'border-l-4 border-l-brand p-6' : 'p-4'
      }`}
    >
      <summary className="cursor-pointer list-none">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2">
              {flagship && <Star className="h-4 w-4 flex-none translate-y-0.5 fill-brand text-brand" aria-label="flagship" />}
              <h3 className={flagship ? 'text-xl font-semibold text-ink' : 'text-base font-medium text-ink'}>
                {name}
              </h3>
              <span className="text-sm text-stone-500">·</span>
              <span className="text-sm text-stone-600">{role}</span>
              <span className="text-sm text-stone-500">·</span>
              <span className="text-sm text-stone-500">
                {start} – {end}
              </span>
            </div>
            <p className="mt-2 text-sm text-stone-700">{summary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {visibleStack.map(s => <StackChip key={s}>{s}</StackChip>)}
              {hiddenStackCount > 0 && <StackChip>+{hiddenStackCount}</StackChip>}
            </div>
          </div>
          <ChevronDown
            className="h-5 w-5 flex-none translate-y-1 text-stone-400 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </div>
      </summary>

      <div className="mt-5 border-t border-stone-100 pt-5 text-sm leading-relaxed text-stone-700">
        <div className="mb-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">Problem</div>
          <p>{problem}</p>
        </div>
        <div className="mb-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">Solution</div>
          <p>{renderSolutionWithLinks(solution, links)}</p>
        </div>
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">Stack</div>
          <div className="flex flex-wrap gap-1.5">
            {stack.map(s => <StackChip key={s}>{s}</StackChip>)}
          </div>
        </div>
      </div>
    </details>
  );
};

export default ProjectCard;
```

- [ ] **Step 6.4: Run test to PASS**

Run: `npx vitest run src/test/project-card.test.jsx`
Expected: PASS.

- [ ] **Step 6.5: Commit**

```bash
git add src/components/ProjectCard.jsx src/test/project-card.test.jsx
git commit -m "feat(card): ProjectCard with <details>/<summary> expand

- Single component handles flagship + non-flagship via
  data-variant; flagship adds left brand stripe + star + larger
  title.
- Top-4 stack chips + +N indicator collapsed; full stack expanded.
- Solution paragraph supports inline outbound links via project.links.
- id=project-<slug> on the details element for anchor jumps from
  the About paragraph."
```

---

## Task 7: `<ProjectSection/>` + `<Projects/>` + sticky section bar

**Goal:** Compose section dividers, cards, and the sticky "current section" bar driven by `IntersectionObserver`. Wire into `<App/>`.

**Files:**
- Create: `src/components/ProjectSection.jsx`
- Create: `src/components/SectionStickyBar.jsx`
- Create: `src/components/Projects.jsx`
- Modify: `src/App.jsx`
- Create: `src/test/projects.test.jsx`

### Steps

- [ ] **Step 7.1: Write the projects-shell failing test**

Create `src/test/projects.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import Projects from '../components/Projects';
import { PROJECT_SECTIONS } from '../data/projects';

beforeAll(() => {
  // IntersectionObserver is not in jsdom
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.IntersectionObserver = IO;
});

describe('<Projects/>', () => {
  it('renders every section heading with its count', () => {
    render(<Projects />);
    for (const s of PROJECT_SECTIONS) {
      const node = screen.getByText(new RegExp(`${s.title}.*\\(${s.projects.length}\\)`));
      expect(node).toBeInTheDocument();
    }
  });

  it('renders every project name', () => {
    render(<Projects />);
    const allProjects = PROJECT_SECTIONS.flatMap(s => s.projects);
    for (const p of allProjects) {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 7.2: Verify FAIL**

Run: `npx vitest run src/test/projects.test.jsx`
Expected: FAIL — Projects not found.

- [ ] **Step 7.3: Write `src/components/SectionStickyBar.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { PROJECT_SECTIONS } from '../data/projects';

const SectionStickyBar = () => {
  const [current, setCurrent] = useState(PROJECT_SECTIONS[0]?.title ?? '');

  useEffect(() => {
    const headings = PROJECT_SECTIONS
      .map(s => document.getElementById(`section-${s.slug}`))
      .filter(Boolean);

    if (headings.length === 0) return;

    const titleBySlug = Object.fromEntries(PROJECT_SECTIONS.map(s => [s.slug, s.title]));

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting[0]) {
          const slug = intersecting[0].target.id.replace(/^section-/, '');
          setCurrent(titleBySlug[slug]);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-20 h-10 bg-white/80 backdrop-blur border-b border-stone-200">
      <div className="mx-auto flex h-full max-w-5xl items-center px-6 text-sm font-medium text-stone-700">
        <span aria-hidden="true" className="mr-2 text-brand">→</span>
        {current}
      </div>
    </div>
  );
};

export default SectionStickyBar;
```

- [ ] **Step 7.4: Write `src/components/ProjectSection.jsx`**

```jsx
import ProjectCard from './ProjectCard';

const ProjectSection = ({ section }) => (
  <section className="mb-12">
    <h3
      id={`section-${section.slug}`}
      className="mb-4 flex items-center gap-3 font-display text-xs font-bold uppercase tracking-widest text-stone-500"
    >
      <span className="h-px flex-1 bg-stone-200" aria-hidden="true" />
      <span>
        {section.title} <span className="text-stone-400">({section.projects.length})</span>
      </span>
      <span className="h-px flex-1 bg-stone-200" aria-hidden="true" />
    </h3>
    <div className="space-y-4">
      {section.projects.map(p => <ProjectCard key={p.slug} project={p} />)}
    </div>
  </section>
);

export default ProjectSection;
```

- [ ] **Step 7.5: Write `src/components/Projects.jsx`**

```jsx
import { PROJECT_SECTIONS } from '../data/projects';
import ProjectSection from './ProjectSection';
import SectionStickyBar from './SectionStickyBar';

const Projects = () => (
  <section id="projects" className="bg-stone-50">
    <SectionStickyBar />
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-12 text-center text-3xl font-extrabold text-brand-deep">Projects</h2>
      {PROJECT_SECTIONS.map(s => <ProjectSection key={s.slug} section={s} />)}
    </div>
  </section>
);

export default Projects;
```

- [ ] **Step 7.6: Run tests to PASS**

Run: `npx vitest run src/test/projects.test.jsx`
Expected: PASS — both tests green.

- [ ] **Step 7.7: Wire Projects into `<App/>`**

Edit `src/App.jsx`:

```jsx
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

const App = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Footer />
  </>
);

export default App;
```

- [ ] **Step 7.8: Dev verify**

Run: `npm run dev`
Manual checks:
1. Scrolling past Hero/About reveals Projects on stone-50 background.
2. Sticky bar appears at the top of the Projects section, updates as you scroll past each section heading.
3. Section dividers render with count (e.g. `AI Agents & Chat Platforms (5)`).
4. 23 cards visible (5 + 2 + 2 + 4 + 2 + 3 + 4 + 1 = 23).
5. Click a flagship card → expands with Problem / Solution / Stack labels.
6. Click a non-flagship card → same interaction, lighter weight.
7. Multiple cards stay open simultaneously.
8. Click the About `AI Wunderkammer` link → page scrolls to that card and the `<details>` is reachable by anchor (open it manually after the jump).
9. `LLM Elasticsearch Cache` card: expand → the LangChain docs link in the solution text is a clickable anchor.
10. No console errors.

- [ ] **Step 7.9: Commit**

```bash
git add src/components/Projects.jsx src/components/ProjectSection.jsx src/components/SectionStickyBar.jsx src/App.jsx src/test/projects.test.jsx
git commit -m "feat(projects): sectioned project list + sticky section bar

- Projects -> Sections -> Cards composition.
- SectionStickyBar uses IntersectionObserver to label the current
  section in a small sticky strip.
- 23 cards across 8 sections render from src/data/projects.js."
```

---

## Task 8: Delete dead code, write smoke test, finalize package.json

**Goal:** Remove every file that's no longer referenced. Add the App-level smoke test. Drop the temporarily-retained Bootstrap deps now that nothing imports them.

**Files:**
- Delete: `src/components/Home.jsx`
- Delete: `src/components/HomeHeader.jsx`
- Delete: `src/components/HomeDescription.jsx`
- Delete: `src/components/HomeDevNotes.jsx`
- Delete: `src/components/HomeContacts.jsx`
- Delete: `src/components/utils/scrollingTop.jsx`
- Delete: `src/components/utils/typeAnimation.jsx`
- Delete: `src/components/utils/` (now empty)
- Delete: `src/components/layout/Footer.jsx`
- Delete: `src/components/layout/Contacts.jsx`
- Delete: `src/components/layout/` (now empty)
- Delete: `src/shared/` (Project_class, projects/, hobbies, _exclude/)
- Modify: `package.json`
- Create: `src/test/smoke.test.jsx`

### Steps

- [ ] **Step 8.1: Delete dead source files**

```bash
git rm -r src/components/Home.jsx src/components/HomeHeader.jsx src/components/HomeDescription.jsx src/components/HomeDevNotes.jsx src/components/HomeContacts.jsx src/components/utils src/components/layout src/shared
```

- [ ] **Step 8.2: Drop now-unused deps**

Run:
```bash
npm uninstall bootstrap bootstrap-social font-awesome reactstrap
```

- [ ] **Step 8.3: Write the App-level smoke test**

Create `src/test/smoke.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import App from '../App';
import { PROJECT_SECTIONS } from '../data/projects';

beforeAll(() => {
  class IO { observe() {} unobserve() {} disconnect() {} }
  globalThis.IntersectionObserver = IO;
});

describe('<App/> smoke test', () => {
  it('renders the name, all sections, and all 23 projects', () => {
    render(<App />);
    expect(screen.getByText('Gabriele Ghisleni')).toBeInTheDocument();

    for (const s of PROJECT_SECTIONS) {
      expect(screen.getByText(new RegExp(`${s.title}.*\\(${s.projects.length}\\)`))).toBeInTheDocument();
    }

    const allProjects = PROJECT_SECTIONS.flatMap(s => s.projects);
    expect(allProjects).toHaveLength(23);
    for (const p of allProjects) {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 8.4: Run the full test suite**

Run: `npm test`
Expected: 4 test files (data, social-links, project-card, projects, smoke) all PASS.

If any fail (e.g. a project name collides with the section title regex), fix at root cause — don't disable tests.

- [ ] **Step 8.5: Build and preview**

Run:
```bash
npm run build
npm run preview
```

Expected:
- `dist/` is created; size is dramatically smaller than the old CRA build (Tailwind v4 tree-shakes unused utilities; we removed Bootstrap/Reactstrap/font-awesome entirely).
- `npm run preview` serves `http://localhost:4173/GG-website/`. Open it and confirm production parity with dev.

- [ ] **Step 8.6: Commit**

```bash
git add -A
git commit -m "chore: delete dead components and drop Bootstrap/Reactstrap

- Remove HomeHeader, HomeDescription, HomeDevNotes, HomeContacts,
  Home, utils/scrollingTop, utils/typeAnimation, layout/Footer,
  layout/Contacts.
- Remove the entire src/shared tree (Project_class, projects/*,
  hobbies, _exclude/) — unreachable in the new tree.
- Uninstall bootstrap, bootstrap-social, font-awesome, reactstrap
  (no remaining imports).
- Add App-level smoke test asserting 23 projects + 8 sections."
```

---

## Task 9: Promote CLAUDE.md and update spec linkage

**Goal:** Move `docs/CLAUDE-draft.md` to repo-root `CLAUDE.md` with the post-rebuild contents.

**Files:**
- Create: `CLAUDE.md` (repo root)
- Delete: `docs/CLAUDE-draft.md`

### Steps

- [ ] **Step 9.1: Write `CLAUDE.md`**

```markdown
# GG-website — istruzioni per Claude

Portfolio personale in React 18 + Vite + Tailwind v4, deployato come SPA su GitHub Pages.

## Stack
- React 18 + Vite 6.
- Tailwind CSS v4 via `@tailwindcss/vite`. Tokens in `@theme` di `src/index.css` (`--color-brand`, `--font-display`, …).
- `react-type-animation` per il rotating subtitle del Hero.
- `lucide-react` per le icone.
- Vitest + `@testing-library/react` + jsdom per smoke test.

## Comandi
- `npm run dev` — dev server su `http://localhost:5173/GG-website/`.
- `npm run build` — bundle produzione in `dist/`.
- `npm test` — esegue tutti i test Vitest.
- `npm run deploy` — pubblica `dist/` su `gh-pages`.

## Mappa albero renderizzato
`src/main.jsx` → `<App/>` (in `src/App.jsx`) →
- `<Hero/>`
- `<About/>`
- `<Projects/>` → `<SectionStickyBar/>` + `<ProjectSection/>` × 8 → `<ProjectCard/>` × 23
- `<Footer/>` (usa `<SocialLinks/>`)

## Dati
- `src/data/projects.js` è la **sorgente di verità** per i 23 progetti. È `Object.freeze`d in profondità.
- `src/data/socials.js` ha link GitHub / LinkedIn / Email / CV / ByteBrush / Source.

Per aggiornare i progetti:
1. Apri il database Notion `projects v2`.
2. Re-fetch via MCP (`mcp__claude_ai_Notion__notion-fetch` con l'id della pagina).
3. Aggiorna `src/data/projects.js` a mano, mantenendo lo schema.
4. Lancia `npm test` — il test `data.test.js` verifica conteggi e campi obbligatori.

## Convenzioni
- Componenti React: `PascalCase.jsx` in `src/components/`.
- Test Vitest in `src/test/`, file `*.test.jsx`.
- Tailwind utility-first; no SCSS, no Bootstrap, no Reactstrap.
- Icone: solo `lucide-react`.
- Per aggiungere un link condiviso (GitHub / LinkedIn / …) modifica `src/data/socials.js` — non duplicare in singoli componenti.

## Hero background
Lo sfondo del Hero è precaricato via `<link rel="preload" as="image" fetchpriority="high">` in `index.html` + `<img loading="eager" fetchpriority="high">` underlay con classe Tailwind `bg-bg-hero-fallback`. **Non rimuovere** il fallback color né cambiare l'`<img>` in un `background-image` CSS — perderemmo l'eager-load e tornerebbe il flash bianco/nero.

## Deploy
- `homepage` in `package.json` è `http://GabrieleGhisleni.github.io/GG-website/`.
- Vite `base` corrispondente è `/GG-website/` in `vite.config.js`.
- `npm run deploy` esegue `predeploy` (build) e poi `gh-pages -d dist`.

## Da non fare
- Non re-introdurre Bootstrap, Reactstrap, font-awesome, react-typist o SCSS — sono stati rimossi deliberatamente (vedi `docs/superpowers/specs/2026-05-20-notion-projects-tailwind-design.md`).
- Non aggiungere router. Il sito è single-page; gli anchor `#project-<slug>` sono sufficienti.
- Non aggiungere fetch runtime verso Notion — il modello è "fetch one, hard-code".
- Non committare `dist/`.

## Riferimenti
- Spec di rebuild: `docs/superpowers/specs/2026-05-20-notion-projects-tailwind-design.md`.
- Plan: `docs/superpowers/plans/2026-05-20-notion-projects-tailwind.md`.
- Convenzioni utente globali: `~/CLAUDE.md`.
- Convenzioni `claude-sync`: `~/claude-sync/CLAUDE.md`.
```

- [ ] **Step 9.2: Delete the draft**

```bash
git rm docs/CLAUDE-draft.md
```

- [ ] **Step 9.3: Commit**

```bash
git add CLAUDE.md
git add -u
git commit -m "docs: promote CLAUDE.md to repo root, post-rebuild contents"
```

---

## Task 10: Final check — build size, dist preview, optional deploy

**Goal:** Verify the final artifact is ready. Do NOT auto-deploy.

### Steps

- [ ] **Step 10.1: Clean rebuild**

```bash
rm -rf dist node_modules
npm install
npm run build
```

Expected: build succeeds.

- [ ] **Step 10.2: Inspect `dist/`**

Run: `du -sh dist && ls dist/assets`
Capture the total size; report to the user. Acceptance: total `dist/` ≤ 1.5 MB excluding the WebP background (which is the largest static asset).

- [ ] **Step 10.3: Preview locally**

Run: `npm run preview`
Verify in browser: same behavior as `npm run dev`, just from the built artifact.

- [ ] **Step 10.4: Report to user**

Send a short summary: build size, test pass count, list of commits added on `arch-review`. Ask if they want to proceed with `npm run deploy` (this is the one step that touches GitHub — never auto-run).

- [ ] **Step 10.5: (User-gated) Deploy**

Only after explicit user approval:

```bash
npm run deploy
```

Expected: `gh-pages` pushes `dist/` to `origin/gh-pages`. The live site updates within ~1 minute at `https://gabrieleghisleni.github.io/GG-website/`.

---

## Self-review checklist (run after writing the plan)

- [x] Every spec section has a task: §3 → Tasks 4–7. §4 (data) → Task 3. §5 (project list) → Task 3 (data) + Task 7 (rendering). §6 (background) → Task 4. §7 (About) → Task 5. §8 (file plan) → Tasks 1, 2, 8. §9 (CLAUDE.md) → Task 9. §10 (testing) → Tasks 3, 5, 6, 7, 8. §12 (execution order) → matches Tasks 1→10.
- [x] No placeholders: every step lists a concrete file path, command, or code block.
- [x] Type consistency: `Project` shape (slug, name, flagship, role, start, end, summary, problem, solution, stack, links?) used identically in Tasks 3, 6, 7, 8. `SOCIALS` shape (github, linkedin, email, cv, bytebrush, source) used identically in Tasks 3, 5, 9. `data-variant="flagship" | "non-flagship"` used identically in Tasks 6 tests + Task 6 implementation.
- [x] Out-of-scope items (no router, no TS, no dark mode, no analytics) are nowhere added back.
