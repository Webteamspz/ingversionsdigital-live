# Developer guide conventions + production-only GTM/Clarity

## Problem

Two related gaps, both surfaced while auditing this repo for duplication:

1. Naming/style/structure/GTM conventions exist only implicitly in the code.
   Nothing written down states them for future AI-agent consistency, and
   `docs/DEVELOPER_GUIDE.md`'s existing GTM section doesn't cover the
   attribute-naming conventions (`data-cta`, `data-cta-loc`, `data-gtm-form`).

2. GTM and Microsoft Clarity are not actually production-only today, despite
   the intent. `index.html` hardcodes the real container IDs
   (`GTM-P5BGX7H7`, `wqx46kxwy8`) directly in static `<script>` tags,
   bypassing the `VITE_GTM_ID`/`VITE_CLARITY_ID` env-var mechanism that
   already exists end-to-end in `Dockerfile` → `docker-compose.*.yml` →
   `src/gtm.js` (whose `GTM_ID` export is currently dead code — nothing
   reads it). Worse, `.github/workflows/deploy.yml:85-86` passes those same
   real IDs to the **staging** deploy job, so staging traffic reports into
   the real production GTM/Clarity dashboards today.

   A working-tree edit already in progress (uncommitted, found via `git
   diff --cached -- index.html`) shows the user had started manually
   commenting out the GTM/Clarity/noscript blocks in `index.html` — this
   spec replaces that manual, branch-local workaround with a proper
   build-mode gate. It also incidentally commented out `<title>`, which
   this spec restores.

## Scope

Two pieces, implemented together since the docs update describes the
gating behavior:

### A. `docs/DEVELOPER_GUIDE.md` — new "Conventions" section

Inserted after the existing "Analytics (GTM / Clarity)" section, before
"SEO". Written for AI-agent consistency (this repo's explicit audience per
`AGENTS.md`'s own framing), not enforced by tooling — no Prettier/
EditorConfig exists; ESLint here only checks `no-unused-vars` and the
React-hooks rules.

- **Naming conventions:** components as a `PascalCase` folder+file pair
  (`Services/Services.jsx` + `Services.module.css`); data modules as
  `<domain>data.js`, lowercase (`sitedata.js`, `pricingdata.js`); hooks as
  `useX.js`; utility modules as short lowercase nouns (`utils/url.js`,
  `config/deploy.js`); CSS Module classes `camelCase` (`styles.cardFooter`);
  exported data as `camelCase` (`expertiseCards`), with `UPPER_SNAKE_CASE`
  reserved for true constants (`CALENDLY_URL`).

- **Project structure — where new files go:** restates and cross-links the
  existing `## Project Structure` tree earlier in this doc (not duplicated
  here) plus the one thing it doesn't say: which existing folder a *new*
  file belongs in, so nothing spawns a new top-level `src/` folder for a
  one-off.
  - A new page → `pages/<Name>/<Name>.jsx`, routed in `App.jsx`, its markup
    built from new or existing `components/`.
  - A new reusable UI piece → `components/<Name>/<Name>.jsx` +
    `<Name>.module.css`, even if only one page uses it today.
  - A new piece of site copy/content → add to the relevant existing
    `data/*.js` module; only add a new `data/<domain>data.js` file for a
    genuinely new content domain (mirroring `pricingdata.js`,
    `teamdata.js`, etc.), never inline copy into JSX.
  - A new cross-component stateful behavior (e.g. another breakpoint or
    intersection check) → `hooks/useX.js`.
  - A new stateless helper with no React dependency → `utils/<name>.js`.
  - A new build/environment/deploy-mode check → `config/deploy.js` (see
    `isProduction`/`isStaging` — already present, use it; don't re-derive
    `import.meta.env.MODE` locally, that's exactly the kind of duplicate
    environment-check this repo just had two of, see Part B below).
  - Never a new top-level `src/` folder for a single file — it goes in one
    of the above.

- **Code structure — order within a component file:** every component
  file observed in this repo follows the same shape top to bottom, and new
  files should match it:
  1. External library imports (`react`, `react-router-dom`, `lucide-react`,
     etc.)
  2. Local imports: the file's own `.module.css`, then `data/`, `hooks/`,
     `components/`, `utils/` imports.
  3. Module-level constants and small helper sub-components (e.g.
     `Header.jsx`'s `HamburgerIcon`/`CloseIcon`, `AboutExpertise.jsx`'s
     `ExpertiseIcon`) — never exported, private to the file.
  4. The main component, as `const Name = (props) => { ... }` with
     destructured props in the signature — this repo uses arrow-function
     components throughout, not `function Name()`.
  5. `export default Name;` as the last line. Helper sub-components from
     step 3 are not separately exported.

- **Style guide:** double quotes are the dominant convention (196 of 216
  sampled import statements) — the minority of files using single quotes
  (`aboutusdata.js`, `pricingdata.js`, `projectsdata.js`) are a
  pre-existing inconsistency, not a second valid style; don't mass-rewrite
  them, but match double quotes in new code. Semicolons are used. Props
  are destructured in the function signature (`{ label, href }`) rather
  than accessed via a `props` object. CSS Modules: one class per visual
  concern, composed with template-literal string concatenation
  (`` `${styles.card} ${styles.aboutExpertiseCard}` ``) rather than a
  classnames library — this repo has no such dependency and shouldn't gain
  one for this.

- **Indentation:** 2 spaces, no tabs — verified with a repo-wide scan,
  zero tab-indented or 4-space-indented lines found in `src/`. Not
  enforced by any tool (confirmed: no Prettier config, no `.editorconfig`,
  and the ESLint flat config in `eslint.config.js` only registers
  `no-unused-vars` plus the React-hooks recommended rules — nothing
  stylistic). This is a documented-but-unenforced convention: match the
  surrounding file exactly rather than relying on a formatter to fix it.

- **GTM conventions (expanded):** `data-cta="Verb + Noun"` label style
  (e.g. `"Book A Call"`, not `"cta1"`); `data-cta-loc="<SectionName>"`
  matching the component name; `data-gtm-form="<name>"` matching the
  form's purpose. Documents the production-only gating from part B below:
  GTM/Clarity scripts load only when a production build runs; the
  `dataLayer` event wiring (`pageview`/`cta_click`/`form_submit`/
  `scroll_depth`) still runs in every environment, so adding
  `data-cta`/`data-gtm-form` markup is always safe to test in staging —
  there's just no real script listening there.

**Discovered while writing the project-structure rules above:**
`src/config/deploy.js` already exports `isProduction`/`isStaging` (from
`import.meta.env.VITE_DEPLOY_ENV || import.meta.env.MODE`), and is already
listed in this doc's `## Project Structure` tree — but nothing imports it.
`VITE_DEPLOY_ENV` is never set anywhere in `Dockerfile`/
`docker-compose.*.yml`/`deploy.yml`, so it always falls through to
`import.meta.env.MODE`, meaning `isProduction` is exactly equivalent to
`MODE === "production"`. Part B below uses this existing helper instead of
a fresh inline `MODE` check, so this refactor doesn't create a *second*
duplicate environment check in the same session it's trying to prevent
duplication.

### B. Production-only GTM/Clarity loading

**`index.html`:**
- Uncomment `<title>` (line 8) — restores the page title, unrelated
  regression from the in-progress manual edit.
- Delete the commented-out Clarity `<script>` block, GTM `<script>` block,
  and GTM `<noscript>` iframe block entirely (currently lines 96-138) —
  no dead commented-out code left in the file.
- Add back only the GTM `<noscript>` fallback (for the no-JS case), with
  its `id` now sourced via Vite's native HTML env replacement:
  `src="https://www.googletagmanager.com/ns.html?id=%VITE_GTM_ID%"`. When
  `VITE_GTM_ID` is blank (staging, per the deploy.yml change below), this
  resolves to an inert/empty id — no real tracking call.

**`src/gtm.js`:**
- Add `const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;` alongside the
  existing `GTM_ID` export.
- Import `isProduction` from `../config/deploy` (existing, currently
  unused module — see callout above).
- Add a `loadAnalytics()` function: on `window`'s `load` event, if
  `isProduction && GTM_ID && CLARITY_ID`, inject
  the GTM script tag and the Clarity script tag (same snippets currently
  in `index.html`, moved here verbatim).
- `isProduction` resolves from `import.meta.env.MODE`, which Vite inlines
  as a literal string at build time; the production build's minifier
  (esbuild/Terser) constant-folds the resulting `if (false && ...)` in
  non-production builds and dead-code-eliminates the branch — including
  the real ID reference — out of the staging/dev bundle. Not merely
  hidden at runtime; absent from the shipped file. (Verified in the
  Verification section below by grepping the built output.)
- `initGTMTracking()` (the existing `dataLayer` wiring: pageview,
  `cta_click`, `form_submit`/`form_success`, `scroll_depth`) is unchanged
  and keeps running in every environment.

**`src/main.jsx`:**
- Call `loadAnalytics()` once, alongside the existing `initGTMTracking()`
  call in the `requestIdleCallback`/`setTimeout` fallback block.

**`.github/workflows/deploy.yml`:**
- Remove lines 85-86 (`VITE_GTM_ID=GTM-P5BGX7H7`, `VITE_CLARITY_ID=wqx46kxwy8`)
  from the staging deploy job's `DEPLOY_ENVIRONMENT` block. Staging then
  builds with both env vars unset — defense in depth on top of the `MODE`
  gate, and it removes the confusing appearance (to anyone reading this
  file) that staging intentionally uses the real production IDs.
- The production deploy job already does not set these two vars in this
  file; their values come from wherever `docker-compose.production.yml`'s
  `${VITE_GTM_ID}`/`${VITE_CLARITY_ID}` are resolved at deploy time (a
  Hostinger-side environment/secret, outside this repository). Out of
  scope for this change — flagged as a follow-up for the user to verify
  independently, since it isn't visible from the repo.

## Out of scope

- Any change to `docker-compose.stage.yml`, `docker-compose.production.yml`,
  or `Dockerfile` — they already pass through whatever env vars exist;
  blanking the values at the deploy.yml source is sufficient.
- Verifying production's actual Hostinger-side `VITE_GTM_ID`/
  `VITE_CLARITY_ID` values are correctly set — noted above as the user's
  own follow-up, not verifiable from this repo.
- Any change to `VITE_APP_ENV` or the `StagingLogin` gate — unrelated
  mechanism (login gate for staging reviewers), not the analytics gate.

## Verification

- `npm run lint`, `npm run build` (production mode) and `npm run
  build:staging` — confirm the staging build's output bundle contains
  neither the real GTM/Clarity IDs nor the injection code (grep
  `dist/assets/*.js` for `GTM-P5BGX7H7` after each build mode).
- Manual browser check per this repo's convention (no test suite): load
  the app via `npm run build:production && npm run preview`, confirm GTM
  and Clarity scripts appear in the network tab and `window.dataLayer`
  receives events; then via a staging-mode preview, confirm neither script
  loads and no console errors appear.
- Confirm `<title>` renders correctly in the browser tab again.
