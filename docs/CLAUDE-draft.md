# GG-website — istruzioni per Claude (DRAFT)

> Bozza in `docs/`. Promuoverla a `CLAUDE.md` nella root del progetto
> dopo aver applicato i candidati scelti dalla review (`docs/ARCHITECTURE-REVIEW.md`).

Portfolio personale in React 17, deployato come Single Page App su GitHub
Pages (branch `gh-pages`).

## Stack e versioni
- React 17 + `react-scripts` 4.0.3 (CRA) — richiede `--openssl-legacy-provider`
  per Node ≥17 (già incluso negli script `start`/`predeploy`/`deploy`).
- Bootstrap 4 + Reactstrap 8 per layout.
- SCSS compilato via `sass` (CRA built-in). **NON** usare `node-sass`
  (deprecato — pianificata la rimozione, vedi `ARCHITECTURE-REVIEW.md` §C E).
- `react-type-animation` per l'animazione del titolo eroe (rimpiazza
  `react-typist`, in via di rimozione).

## Comandi
- `npm start` — dev server su `localhost:3000`.
- `npm run build` — bundle di produzione in `build/`.
- `npm run deploy` — pubblica su `gh-pages` (richiede commit pulito).
- `npm test` — *(attualmente non rappresentativo: i test CRA di default
  asseriscono testo che non esiste; vedi review §F)*.

## Mappa dell'albero renderizzato
`index.js` → `<App/>` →
- `<Home/>` (`src/components/Home.jsx`)
  - `<HomeHeader/>` — hero con background image + animazione di testo.
  - `<HomeDescription/>` — about + grid che annida:
    - `<HomeDevNotes/>` — blurb su ByteBrush.
    - `<HomeContacts/>` — lista social/email/CV laterale.
- `<Footer/>` (`src/components/layout/Footer.jsx`).

Tutto ciò che è sotto `src/shared/` **non è raggiungibile** dall'albero
renderizzato attualmente (categorie progetti, `Project_class`, hobbies,
`_exclude/`). Trattare come codice morto — non basarci nuove feature
senza prima decidere se reintegrarlo (review §A).

## Stile e convenzioni
- File componenti React: `PascalCase.jsx`.
- Moduli di utilità non-JSX: `camelCase.js` (es. `scrollingTop`,
  `typeAnimation`).
- SCSS partial per componente, importati da `src/scss/main.scss`. Le
  variabili di tema vivono in `src/scss/variables.scss`.
- Asset statici sotto `public/assets/`. Referenziarli con
  `${process.env.PUBLIC_URL}/assets/...`.
- Sociali ed email principali centralizzati (post-Candidato C) in un
  unico componente `<SocialLinks/>`. Non duplicare la lista nei singoli
  componenti.

## Deploy
- `homepage` in `package.json` è `http://GabrieleGhisleni.github.io/GG-website/`.
- `npm run deploy` esegue `predeploy` (`build`) e poi `gh-pages -d build`.
- Routing: nessun router al momento; gli ancoraggi tipo `#/home`
  nelle URL pubbliche sono residui storici di HashRouter ma non sono
  attivi (App non monta nessun router).

## Cose da non fare
- Non committare CSS compilato in `src/css/` (dopo Candidato E, tale
  cartella non esiste più — il CRA compila SCSS direttamente).
- Non aggiungere `node-sass` come dipendenza.
- Non importare niente da `src/shared/_exclude/` — è codice esplicitamente
  escluso. Se serve riusarlo, spostarlo fuori da `_exclude/` con un'ADR
  che spieghi perché.
- Non aggiungere nuovi `<a href="@">` o link placeholder — il footer
  attuale ne ha uno rotto, da bonificare in Candidato C.

## Sicurezza / privacy
- L'email personale appare in chiaro nei `mailto:` — è una scelta
  consapevole del portfolio.
- Nessuna chiave API o token in repo. Nessuna chiamata a backend.

## Riferimenti
- Review architetturale: `docs/ARCHITECTURE-REVIEW.md`.
- Convenzioni globali utente: `~/CLAUDE.md` (Notion, Gmail, tono,
  proposte di update a CLAUDE.md).
- Convenzioni `claude-sync`: `~/claude-sync/CLAUDE.md`.
