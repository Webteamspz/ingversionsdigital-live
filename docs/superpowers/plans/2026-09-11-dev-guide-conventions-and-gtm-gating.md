# Dev Guide Conventions + Production-Only GTM/Clarity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Document naming/structure/style/GTM conventions in `docs/DEVELOPER_GUIDE.md` for AI-agent consistency, and make GTM/Clarity load only in production builds (today they load unconditionally everywhere, including staging, polluting the real production dashboards).

**Architecture:** Two independent pieces. Docs-only piece: insert one new section into `docs/DEVELOPER_GUIDE.md`. Gating piece: move the GTM/Clarity script injection out of static `index.html` into a JS function in `src/gtm.js`, gated on the existing (currently unused) `isProduction` from `src/config/deploy.js`; since `isProduction` resolves from `import.meta.env.MODE`, a build-time constant, the guarded code and the real IDs are dead-code-eliminated out of non-production bundles entirely.

**Tech Stack:** Vite 7 (env replacement in `index.html` via `%VITE_X%` syntax, `import.meta.env.MODE`), plain JS (no TypeScript), GitHub Actions.

## Global Constraints

- No unit-test suite in this repo. Verification per task: grep to confirm expected content is/isn't present, `npm run lint`, and (final task) `npm run build` + `npm run build:staging` + a manual browser check.
- Do not touch `docker-compose.stage.yml`, `docker-compose.production.yml`, or `Dockerfile` — out of scope per spec, they already pass through whatever env vars exist.
- Do not change `VITE_APP_ENV` or `StagingLogin` — unrelated mechanism (staging reviewer login gate, not analytics).
- Follow this repo's existing conventions while writing: 2-space indent, double quotes, semicolons, arrow-function components (this plan's own Task 1 is literally about writing these down, so its own diff must follow them).

---

### Task 1: Add the Conventions section to the developer guide

**Files:**
- Modify: `docs/DEVELOPER_GUIDE.md` (Table of Contents entry + new section body)

**Interfaces:** None (documentation only).

- [ ] **Step 1: Add the Table of Contents entry**

In `docs/DEVELOPER_GUIDE.md`, find this line in the Table of Contents:

```md
- [Analytics (GTM / Clarity)](#analytics-gtm--clarity)
- [SEO](#seo)
```

Replace it with:

```md
- [Analytics (GTM / Clarity)](#analytics-gtm--clarity)
- [Conventions](#conventions)
- [SEO](#seo)
```

- [ ] **Step 2: Insert the new section body**

Find this text (the end of the existing "Analytics (GTM / Clarity)" section):

```md
To track a new button or link, just add `data-cta="Something"` and (optionally)
`data-cta-loc="Header"` — no extra JS needed, the global click listener picks it up.

---

## SEO
```

Replace it with:

````md
To track a new button or link, just add `data-cta="Something"` and (optionally)
`data-cta-loc="Header"` — no extra JS needed, the global click listener picks it up.

GTM and Microsoft Clarity only load in production builds (`npm run build:production`);
staging and local dev never load the real scripts. The `dataLayer` event wiring above
(`pageview`, `cta_click`, `form_submit`/`form_success`, `scroll_depth`) still runs in
every environment, so adding `data-cta`/`data-gtm-form` markup is always safe to test in
staging — there's just no real script listening there. See
[Environment Variables & the Staging Gate](#environment-variables--the-staging-gate) for
how the two build modes differ.

Attribute naming conventions: `data-cta="Verb + Noun"` (e.g. `"Book A Call"`, not
`"cta1"`); `data-cta-loc="<SectionName>"` matching the component name it's inside; `data-gtm-form="<name>"` matching the form's purpose (e.g. `"contact"`).

---

## Conventions

Written for AI-agent consistency (this repo's stated audience — see `AGENTS.md`), not
enforced by tooling: there's no Prettier config and no `.editorconfig` in this repo, and
the ESLint flat config in `eslint.config.js` only registers `no-unused-vars` plus the
React-hooks recommended rules — nothing stylistic. Match the conventions below by eye.

**Naming:** components as a `PascalCase` folder+file pair (`Services/Services.jsx` +
`Services.module.css`); data modules as `<domain>data.js`, lowercase (`sitedata.js`,
`pricingdata.js`); hooks as `useX.js`; utility modules as short lowercase nouns
(`utils/url.js`, `config/deploy.js`); CSS Module classes `camelCase`
(`styles.cardFooter`); exported data as `camelCase` (`expertiseCards`), with
`UPPER_SNAKE_CASE` reserved for true constants (`CALENDLY_URL`).

**Where a new file goes:** see [Project Structure](#project-structure) above for the
existing tree. For a *new* file:
- A new page → `pages/<Name>/<Name>.jsx`, routed in `App.jsx`, built from new or
  existing `components/`.
- A new reusable UI piece → `components/<Name>/<Name>.jsx` + `<Name>.module.css`, even
  if only one page uses it today.
- A new piece of site copy/content → add to the relevant existing `data/*.js` module;
  only add a new `data/<domain>data.js` file for a genuinely new content domain
  (mirroring `pricingdata.js`, `teamdata.js`); never inline copy into JSX.
- A new cross-component stateful behavior (another breakpoint or intersection check) →
  `hooks/useX.js`.
- A new stateless helper with no React dependency → `utils/<name>.js`.
- A new build/environment/deploy-mode check → `config/deploy.js` — it already exports
  `isProduction`/`isStaging`, use them instead of re-deriving `import.meta.env.MODE`
  locally.
- Never a new top-level `src/` folder for a single file — it goes in one of the above.

**Code structure inside a component file**, top to bottom:
1. External library imports (`react`, `react-router-dom`, `lucide-react`, etc.)
2. Local imports: the file's own `.module.css`, then `data/`, `hooks/`, `components/`,
   `utils/` imports.
3. Module-level constants and small helper sub-components (e.g. `Header.jsx`'s
   `HamburgerIcon`/`CloseIcon`) — never exported, private to the file.
4. The main component, as `const Name = (props) => { ... }` with destructured props in
   the signature — this repo uses arrow-function components throughout, not
   `function Name()`.
5. `export default Name;` as the last line. Helper sub-components from step 3 are not
   separately exported.

**Style guide:** double quotes are the dominant convention across this repo — match
them in new code (a handful of existing files use single quotes; that's a pre-existing
inconsistency, not a second valid style, and isn't worth mass-rewriting). Semicolons are
used. Props are destructured in the function signature (`{ label, href }`) rather than
accessed via a `props` object. CSS Modules: compose classes with template-literal string
concatenation (`` `${styles.card} ${styles.aboutExpertiseCard}` ``) rather than a
classnames library — this repo has no such dependency.

**Indentation:** 2 spaces, no tabs, throughout the whole repo. Documented, not enforced
(no formatter is configured) — match the surrounding file exactly.

---

## SEO
````

- [ ] **Step 3: Verify the section landed correctly**

Run: `grep -n "^## Conventions$\|^## SEO$\|^## Analytics" docs/DEVELOPER_GUIDE.md`
Expected: three lines, in this order — `## Analytics (GTM / Clarity)`, `## Conventions`, `## SEO`.

- [ ] **Step 4: Commit**

```bash
git add docs/DEVELOPER_GUIDE.md
git commit -m "Document naming, structure, style, and GTM conventions"
```

---

### Task 2: Gate GTM/Clarity behind a production-only check

**Files:**
- Modify: `index.html`
- Modify: `src/gtm.js`
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: `isProduction` (boolean) from `src/config/deploy.js` (already exists,
  exported today, currently unused anywhere).
- Produces: `loadAnalytics(): void`, a new named export from `src/gtm.js`, alongside the
  existing `GTM_ID` export and `initGTMTracking` export. Task 2 is the only task that
  defines or calls it.

- [ ] **Step 1: Restore the page title and remove the dead commented-out scripts in `index.html`**

Replace:

```html
    <!-- <title>Ingversions Digital | Shopify, CRO and A/B Testing Agency</title> -->
```

with:

```html
    <title>Ingversions Digital | Shopify, CRO and A/B Testing Agency</title>
```

Then delete this entire block (the commented-out Clarity and GTM `<script>` tags):

```html
    <!-- ✅ Microsoft Clarity (deferred to 'load' event so it doesn't block FCP/TBT) -->
    <!-- <script>
      window.addEventListener('load', function () {
        (function (c, l, a, r, i, t, y) {
          c[a] = c[a] || function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
          t = l.createElement(r);
          t.async = 1;
          t.src = "https://www.clarity.ms/tag/" + i;
          y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "wqx46kxwy8");
      });
    </script> -->

    <!-- ✅ Google Tag Manager (deferred to 'load' event to keep it non-blocking) -->
    <!-- <script>
      window.addEventListener('load', function () {
        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "GTM-P5BGX7H7");
      });
    </script> -->
```

Leave the surrounding tags (Organization schema `<script type="application/ld+json">`
above it, `</head>` below it) untouched.

- [ ] **Step 2: Replace the commented-out GTM noscript fallback with a live, env-templated one**

Replace:

```html
    <!-- ✅ GTM noscript fallback -->
    <!-- <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-P5BGX7H7"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>
    </noscript> -->
```

with:

```html
    <!-- GTM noscript fallback (id is blank outside production builds) -->
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=%VITE_GTM_ID%"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>
    </noscript>
```

(`%VITE_GTM_ID%` is Vite's native HTML env-replacement syntax — it substitutes the
built `VITE_GTM_ID` value at build time. Real ID in production, empty string in staging
once Task 3 removes it from the staging deploy config, making the iframe URL harmless.)

- [ ] **Step 3: Verify `index.html`**

Run: `grep -n "title>\|clarity.ms\|googletagmanager\|GTM-P5BGX7H7\|wqx46kxwy8" index.html`
Expected output: the live `<title>` line, and the live `<noscript>` block's
`googletagmanager.com/ns.html?id=%VITE_GTM_ID%` line. No `GTM-P5BGX7H7`, no
`wqx46kxwy8`, no `clarity.ms` script tag, no commented-out `<script>`/`<noscript>` text.

- [ ] **Step 4: Add `loadAnalytics()` to `src/gtm.js`**

At the top of `src/gtm.js`, replace:

```js
export const GTM_ID = import.meta.env.VITE_GTM_ID;
export const dl = () => (window.dataLayer = window.dataLayer || []);
```

with:

```js
import { isProduction } from "./config/deploy";

export const GTM_ID = import.meta.env.VITE_GTM_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;
export const dl = () => (window.dataLayer = window.dataLayer || []);
```

Note: `src/gtm.js` lives directly under `src/`, and `src/config/deploy.js` lives under
`src/config/` — the import path is `./config/deploy`, not `../config/deploy`.

Then, at the end of `src/gtm.js` (after the existing `initGTMTracking` function), add:

```js

function loadClarity() {
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
}

function loadGTM() {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", GTM_ID);
}

export function loadAnalytics() {
  if (typeof window === "undefined") return;
  if (!isProduction || !GTM_ID || !CLARITY_ID) return;
  window.addEventListener("load", () => {
    loadClarity();
    loadGTM();
  });
}
```

- [ ] **Step 5: Call `loadAnalytics()` from `src/main.jsx`**

Replace:

```js
import { initGTMTracking } from "./gtm";
```

with:

```js
import { initGTMTracking, loadAnalytics } from "./gtm";
```

Replace:

```js
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => initGTMTracking());
} else {
  setTimeout(() => initGTMTracking(), 200);
}
```

with:

```js
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    initGTMTracking();
    loadAnalytics();
  });
} else {
  setTimeout(() => {
    initGTMTracking();
    loadAnalytics();
  }, 200);
}
```

- [ ] **Step 6: Verify no dangling reference and lint**

Run: `grep -n "isProduction\|loadAnalytics\|CLARITY_ID" src/gtm.js src/main.jsx`
Expected: `isProduction` imported and used once in `gtm.js`; `CLARITY_ID` defined and
used twice (Clarity injector + the `loadAnalytics` guard); `loadAnalytics` exported from
`gtm.js` and imported + called twice (both branches) in `main.jsx`.

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 7: Commit**

```bash
git add index.html src/gtm.js src/main.jsx
git commit -m "Load GTM and Clarity only in production builds"
```

---

### Task 3: Stop passing real GTM/Clarity IDs to the staging deploy

**Files:**
- Modify: `.github/workflows/deploy.yml:85-86`

**Interfaces:** None (CI config only; no code interface).

- [ ] **Step 1: Remove the two lines from the staging job's env block**

In `.github/workflows/deploy.yml`, find (inside the "Deploy staging Docker project"
step's `DEPLOY_ENVIRONMENT` block):

```yaml
            VITE_APP_ENV=staging
            VITE_STAGING_USERS=${{ secrets.STAGING_USERS_JSON }}
            VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/manppeoz
            VITE_GTM_ID=GTM-P5BGX7H7
            VITE_CLARITY_ID=wqx46kxwy8
```

Replace with:

```yaml
            VITE_APP_ENV=staging
            VITE_STAGING_USERS=${{ secrets.STAGING_USERS_JSON }}
            VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/manppeoz
```

- [ ] **Step 2: Verify**

Run: `grep -n "VITE_GTM_ID\|VITE_CLARITY_ID" .github/workflows/deploy.yml`
Expected: no output (neither var appears anywhere in this file anymore — the production
job never set them here either).

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "Stop passing production GTM/Clarity IDs to the staging deploy"
```

---

### Task 4: Full verification

**Files:** none (verification only).

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: passes clean.

- [ ] **Step 2: Production build contains the real script-injection path**

Run:
```bash
npm run build
grep -rl "clarity.ms/tag\|googletagmanager.com/gtm.js" dist/assets/*.js
```
Expected: at least one matching file — the `loadClarity`/`loadGTM` code is present in
the production bundle.

Run: `grep -o 'id=[^"&]*' dist/index.html`
Expected: `id=` followed by the real GTM ID from your build environment (empty if you
built locally without `VITE_GTM_ID` set — that's expected for a local build, not a
regression; the deployed production build sets it via `docker-compose.production.yml`).

- [ ] **Step 3: Staging build excludes the real IDs and the injection path**

Run:
```bash
npm run build:staging
grep -rl "GTM-P5BGX7H7\|wqx46kxwy8\|clarity.ms/tag\|googletagmanager.com/gtm.js" dist/assets/*.js
```
Expected: no output — the whole `loadAnalytics` branch and both real IDs are absent
from the staging bundle (dead-code-eliminated, not merely unreachable at runtime).

Run: `grep -o 'id=[^"&]*' dist/index.html`
Expected: `id=` with nothing after it (empty `VITE_GTM_ID` in a local staging build).

- [ ] **Step 4: Rebuild for local dev and manually verify in the browser**

Run: `npm run build && npm run preview`, open the printed local URL:
- Confirm the browser tab shows the page title.
- Open DevTools Network tab, reload: confirm no request to `googletagmanager.com` or
  `clarity.ms` fires if `VITE_GTM_ID`/`VITE_CLARITY_ID` were empty for this local build
  (expected, since this plan's task 2 guard requires both to be non-empty — this is
  what staging/local behavior should look like without the real deploy-time secrets).
- Confirm no console errors.
- Click through a couple of pages, confirm `window.dataLayer` in the console still
  accumulates entries (type `window.dataLayer` in the console) — the event wiring from
  `initGTMTracking()` is unaffected by this change.

- [ ] **Step 5: Report**

If step 4's browser check shows anything unexpected (console errors, missing title,
broken navigation), stop and fix it before considering this plan done. Otherwise, no
commit is needed for this task — verification-only.
