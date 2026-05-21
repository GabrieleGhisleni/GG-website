# GG Web Portfolio

Personal portfolio — React 18 + Vite + Tailwind v4, deployed as a SPA on GitHub Pages.

Live: [gabrieleghisleni.github.io/gg-portfolio-website](https://gabrieleghisleni.github.io/gg-portfolio-website/)

---

## Development

```bash
npm install
npm run dev        # http://localhost:5173/gg-portfolio-website/
```

```bash
npm test           # Vitest smoke tests
```

---

## Publish pipeline

There are no GitHub Actions. Deployment is a manual local push via the [`gh-pages`](https://github.com/tschaub/gh-pages) package.

### How it works

```
npm run deploy
    │
    ├─ predeploy → npm run build
    │               Vite bundles src/ into dist/
    │               Base path: /gg-portfolio-website/ (set in vite.config.js)
    │
    └─ gh-pages -d dist
                    Pushes the contents of dist/ to the
                    gh-pages branch on origin, creating a
                    commit there without touching main/master.
```

GitHub Pages is configured (repo Settings → Pages) to serve from the `gh-pages` branch, root. Once the push lands, the live site updates within seconds.


## Stack

| Layer | Choice |
|---|---|
| UI | React 18 |
| Bundler | Vite 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Icons | lucide-react |
| Animation | react-type-animation |
| Tests | Vitest + @testing-library/react |
| Deploy | gh-pages → GitHub Pages |

---

## Project structure

```
src/
  components/     React components (PascalCase.jsx)
  data/           projects.js + socials.js  (source of truth, frozen)
  test/           Vitest tests (*.test.jsx)
  index.css       Tailwind @theme tokens
public/
  assets/images/  Static images (served at /gg-portfolio-website/assets/…)
```
