# gg-portfolio-website — istruzioni per Claude

Portfolio personale in React 18 + Vite + Tailwind v4, deployato come SPA su GitHub Pages.

## Stack
- React 18 + Vite 6.
- Tailwind CSS v4 via `@tailwindcss/vite`. Tokens in `@theme` di `src/index.css` (`--color-brand`, `--font-display`, …).
- `react-type-animation` per il rotating subtitle del Hero.
- `lucide-react` per le icone.
- Vitest + `@testing-library/react` + jsdom per smoke test.

## Comandi
- `npm run dev` — dev server su `http://localhost:5173/gg-portfolio-website/`.
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
- Vite `base` è `/gg-portfolio-website/` in `vite.config.js` — sorgente unica della verità per il path su GitHub Pages. `index.html` usa `%BASE_URL%` per favicon / og:image / preload.
- Sito live: `https://gabrieleghisleni.github.io/gg-portfolio-website/`.
- `npm run deploy` esegue `predeploy` (build) e poi `gh-pages -d dist`. In alternativa, ogni push su `master` triggera `.github/workflows/deploy.yml` (build + test + push su `gh-pages` via `peaceiris/actions-gh-pages`).

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
