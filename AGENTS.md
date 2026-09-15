# AGENTS.md

Concise repository-wide instructions for coding agents and contributors. Deep
reference lives in `docs/DEVELOPER_GUIDE.md`; this file is the short list of
rules and invariants for day-to-day work.

## Instruction Precedence

1. The user's current explicit task.
2. This root `AGENTS.md`.
3. `CLAUDE.md` (working agreements) where it adds a stricter rule.
4. `docs/DEVELOPER_GUIDE.md` and `DEPLOYMENT.md` for detail.

A lower-priority document must not silently override an explicit higher-priority constraint.

## Repository Map

- `src/App.jsx` is the route table. React Router v7, `BrowserRouter`.
- `src/pages/` has one folder per route: `Home`, `AboutUs`, `Pricing`, `Projects`, `TeamPage`, `Legal`, `NotFound`.
- `src/components/` holds presentational components. Each component folder has a `.jsx` and a matching `.module.css`.
- `src/data/*.js` holds all site copy as plain JavaScript objects.
- `src/styles/style.css` holds the global design tokens in `:root`.
- `src/gtm.js` is the analytics wrapper. No third-party analytics SDK.
- `scripts/convert-images.mjs` converts raw images to resized `.webp` using `sharp`.
- `Dockerfile`, `nginx.conf`, `docker-compose.stage.yml`, `docker-compose.production.yml`, and `.github/workflows/deploy.yml` support deployment.

## Core Stack

- React 19 + Vite 7, plain JSX. No TypeScript.
- CSS Modules for component styles, plus the global token layer in `src/styles/style.css`. No Tailwind, no CSS-in-JS.
- `react-helmet-async` for head tags, through the shared `src/components/SEO` component.
- `lucide-react` for icons. Swiper for carousels. `react-international-phone` for the phone field. Formspree for the contact form.

## Read First

- Inspect nearby code before editing. Match the existing component and CSS-module pattern.
- Prefer existing helpers, components, tokens, and naming over new ones.
- Check worktree state before broad changes.
- Preserve unrelated user changes. Do not revert files unless the user explicitly asks.
- Do not commit, stage, or push unless the user explicitly asks. See `CLAUDE.md`.

## Content Architecture

- All user-visible copy lives in `src/data/*.js`. Components import these objects and render them.
- To change text, prices, team members, or projects, edit the data module, not the JSX.
- `sitedata.js` (Home + global CTAs), `pricingdata.js`, `teamdata.js`, `projectsdata.js`, `aboutusdata.js`.
- Do not introduce a CMS or a new content format. The data-module pattern is deliberate.

## Styling Rules

- Component styles go in that component's `.module.css`. Shared values come from the `:root` custom properties in `src/styles/style.css`.
- Do not hardcode hex colours or ad-hoc spacing when a token exists. Do not add a CSS framework.
- Safari renders 1px CSS borders inconsistently. Use `box-shadow: 0 1px 0 0 <color>` instead of `border-bottom: 1px solid <color>` for hairline separators.
- The visual language is flat with hard offset shadows. Keep new surfaces consistent with it.

## Images

- Store images as `.webp`, roughly 800px max width, quality about 82.
- Run `node scripts/convert-images.mjs` to process new raw art.
- Render images through `src/components/OptimizedImg` so lazy loading and decoding defaults are applied.

## Analytics And SEO

- Analytics is GTM plus Clarity, initialised in `src/gtm.js`, driven by `data-cta` and `data-gtm-form` attributes in markup. Do not add analytics libraries.
- GTM/Clarity only load in production builds: `loadAnalytics()` in `src/gtm.js` is gated on `isProduction` (`src/config/deploy.js`, resolved from `import.meta.env.MODE`) and on both `VITE_GTM_ID`/`VITE_CLARITY_ID` being set. Never hardcode the real container IDs in `index.html` again — that was a real incident (see `docs/DEVELOPER_GUIDE.md`). As defense in depth, the staging deploy step in `.github/workflows/deploy.yml` does not pass the production `VITE_GTM_ID`/`VITE_CLARITY_ID` values either.
- Every page sets its head tags through the `<SEO>` component. A new page must include one. Do not add a static `<title>`, meta description, canonical, or OG/Twitter title+description+image back into `index.html` — `<SEO>` (react-helmet-async) sets those per-route on every page, and a static copy just duplicates them in the live DOM. `index.html` keeps only genuinely static tags: favicons, manifest, sitemap, `og:type`/`site_name`/`locale`, `twitter:card`/`site`/`creator`, and the Organization JSON-LD.
- `nginx.conf` has a CSP `connect-src` allowlist. A new outbound domain (analytics, form host, embed) must be added there or the browser will block it.

## Environments And The Staging Gate

- Build modes: `development` (default), `staging`, `production`. Set via the `npm run build:staging` / `build:production` scripts.
- `StagingLogin` gates the whole app when `VITE_APP_ENV=staging`, checking `VITE_STAGING_USERS` (a JSON `username: password` map) against `sessionStorage`.
- This gate is a review speed-bump, not a security boundary. Never rely on it to protect anything.
- The three real config values are `VITE_FORMSPREE_ENDPOINT`, `VITE_GTM_ID`, `VITE_CLARITY_ID`. All are public browser values.

## Branch And Deployment Rules

- Flow: `new-theme` (work) then `stage` (deploys `staging.ingversionsdigital.com`) then `production` (deploys the live domain).
- Deploys are triggered by pushes to `stage` and `production` via `.github/workflows/deploy.yml`, which calls the Hostinger Docker API.
- When merging `stage` into `production`, keep production's version of these files: `.dockerignore`, `Dockerfile`, `docker-compose.production.yml`, `docker-compose.stage.yml`, `eslint.config.js`, `index.html`, `nginx.conf`. Also do not carry `docs/DEVELOPER_GUIDE.md`, `docs/site-docs/`, or the `.gitignore` `graphify-out/` rule to `production` — those stay on `new-theme` and `stage`.
- `graphify-out/` is local-only and gitignored. Never commit it.
- The Blog-link click-intercept behavior (Header nav, Footer, `BlogSlider` — clicking shows an `alert()` instead of navigating straight to `blog.ingversionsdigital.com`) is a `new-theme`/`stage`-only experiment and must never reach `production`. These files are not globally excluded from the merge like the ones above — only that specific behavior should be kept out; unrelated changes to `Header.jsx`, `Footer.jsx`, and `BlogSlider.jsx` should still flow through normally.
- Home page sections are eager-imported, not `React.lazy`. Lazy-loading them caused a header/footer-then-content flash. Do not convert them back.

## Validation

- Lint: `npm run lint`
- Build: `npm run build` (or `npm run build:production` for the production config)
- Mechanical diff check: `git diff --check`
- There is no unit-test suite. For any change a user can see, verify it in a real browser at the relevant breakpoint before calling it done.

## Do Not Refactor Broadly

- Keep changes scoped to the user request.
- Do not rename routes, data modules, components, or design tokens unless the task requires it.
- Do not restructure the `src/data` content model or the CSS-module layout as a side effect.
- Prefer small, incremental, reviewable changes.

## Documentation Upkeep

`README.md`, `AGENTS.md`, `CLAUDE.md`, and `docs/DEVELOPER_GUIDE.md` describe
stable architecture and workflow. Update them when you change: the stack, the
folder layout, a convention in this file, the branch/deploy flow, or the
environment variables. A routine bug fix or copy edit does not need a doc
change; say so rather than skipping the check silently.
