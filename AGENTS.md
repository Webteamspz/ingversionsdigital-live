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
- `src/pages/` has one folder per route: `Home`, `AboutUs`, `Pricing`, `Projects`, `AbTestCalculator` (`/ab-test-calculator`, a client-side calculator; its maths is `src/utils/abtest.js`), `TeamPage`, `Legal`, `ThankYou`, `NotFound`, `Blog` (`/blog` and `/blog/:slug`), plus `ServicePage`, which renders every service route (`/ab-testing`, `/shopify-development`, `/quality-assurance`, `/wordpress-development`, `/landing-page-personalization`) from `src/data/servicepagesdata.js`.
- `src/components/` holds presentational components. Each component folder has a `.jsx` and a matching `.module.css`.
- `src/data/*.js` holds all site copy as plain JavaScript objects. Blog content is in `src/data/blog/`: structured posts in `blogPosts.json` (template: `blogPostTemplate.json`), legacy markdown posts in `articlesData.js` (each also needs a card in `postCards.js` and a cover in `articleImages.js`), and the blog head tags in `blogSeo.js`.
- `src/styles/style.css` holds the global design tokens in `:root`.
- `src/gtm.js` is the analytics wrapper. No third-party analytics SDK.
- `scripts/convert-images.mjs` converts raw images to resized `.webp` using `sharp`.
- `scripts/blog-thumbs.mjs` runs before every `vite build` (part of the `build*` npm scripts) and writes an 800px card thumbnail of each blog cover into `public/assets/blog/covers/thumbs/`. Blog cards load covers through `coverThumb()` (`src/data/blog/articleImages.js`); post heroes use the full cover.
- `scripts/prerender.mjs` runs after every `vite build` (it is part of the `build*` npm scripts) and writes per-route HTML with static head tags into `dist/`.
- `Dockerfile`, `nginx.conf`, `docker-compose.stage.yml`, `docker-compose.production.yml`, and `.github/workflows/deploy.yml` support deployment.

## Core Stack

- React 19 + Vite 7, plain JSX. No TypeScript.
- CSS Modules for component styles, plus the global token layer in `src/styles/style.css`. No Tailwind, no CSS-in-JS.
- `react-helmet-async` for head tags, through the shared `src/components/SEO` component.
- `lucide-react` for icons. Swiper for carousels. `react-markdown` and `mermaid` for blog posts only (mermaid is dynamically imported the first time a branching diagram renders). `react-international-phone` for the phone field. Forms save to Firebase Cloud Firestore (`form_submissions` collection, tagged `site: "ingversionsdigital.com"` and `formName`) through `src/utils/submitLead.js`, a plain `fetch` to the REST `:commit` API with a server-set `createdAt`, no Firebase SDK. The live rules are in the Firebase console (they may cover other sites); `firestore.rules` is a copy, so keep the two in sync.

## Read First

- Inspect nearby code before editing. Match the existing component and CSS-module pattern.
- Prefer existing helpers, components, tokens, and naming over new ones.
- Check worktree state before broad changes.
- Preserve unrelated user changes. Do not revert files unless the user explicitly asks.
- Do not commit, stage, or push unless the user explicitly asks. See `CLAUDE.md`.

## Content Architecture

- All user-visible copy lives in `src/data/*.js`. Components import these objects and render them.
- To change text, prices, team members, or projects, edit the data module, not the JSX.
- `sitedata.js` (Home + global CTAs), `pricingdata.js`, `teamdata.js`, `projectsdata.js`, `aboutusdata.js`, `servicepagesdata.js` (one entry per service page; its keys are the URL slugs and also generate the routes and `seodata.js` entries), `seodata.js` (per-route title, description, breadcrumb, JSON-LD).
- Do not introduce a CMS or a new content format. The data-module pattern is deliberate.

## Styling Rules

- Component styles go in that component's `.module.css`. Shared values come from the `:root` custom properties in `src/styles/style.css`.
- Do not hardcode hex colours or ad-hoc spacing when a token exists. Do not add a CSS framework.
- Safari renders 1px CSS borders inconsistently. Use `box-shadow: 0 1px 0 0 <color>` instead of `border-bottom: 1px solid <color>` for hairline separators.
- The visual language is flat with hard offset shadows. Keep new surfaces consistent with it.
- Never use `clamp()` (or `vw`/`vh`-based fluid sizing) for font sizes or any other CSS value. Use fixed `px` values with explicit breakpoint overrides in the existing `@media (max-width:1023.98px)` / `@media (max-width:767.98px)` pattern instead.

## Images

- Store images as `.webp`, quality about 82. The script caps width at 800px for `team/` and 1600px elsewhere.
- Run `node scripts/convert-images.mjs` to process new raw art.
- Render images through `src/components/OptimizedImg` so lazy loading and decoding defaults are applied.

## Analytics And SEO

- Analytics is GTM plus Clarity, initialised in `src/gtm.js`, driven by `data-cta` and `data-gtm-form` attributes in markup. Do not add analytics libraries.
- GTM/Clarity only load after the visitor accepts the `CookieConsent` banner, which is `vanilla-cookieconsent` (pinned exact version, loaded by dynamic import inside `useEffect`, never during prerender). The banner is a corner box and must never block the page: keep `disablePageInteraction` off and do not add scroll locks, overlays or `inert`. The library keeps its own `cc_cookie`; its `onConsent`/`onChange` callbacks mirror the choice into `localStorage` `analytics-consent` (`{ value, at }` JSON; a bare legacy `"granted"` string still counts as accepted; nothing loads for decliners or before a choice), call `gtag('consent', 'update', ...)` when `gtag` exists, and fire `CONSENT_EVENT` on window on every page load once a choice exists; `PromoBar` waits for that event, then shows 10 seconds later. Decline deletes analytics cookies through the `analytics` category's `autoClear`. "Cookie Settings" in the Footer Legal group (`action: "cookie-settings"` in `sitedata.js`) calls `showPreferences()`. Banner theme is the `--cc-*` variables in `src/styles/style.css`. The Cookies section of `/privacy-policy` is the Cookie Notice: when the banner's categories or cookies change, update it and its "Last updated" date. Only call `startAnalytics()` from `gtm.js` after consent; never load analytics from `index.html` (no scripts, no `preconnect`, no GTM `<noscript>` iframe).
- GTM/Clarity only load in production builds: `startAnalytics()` returns immediately unless `isProduction`, and `loadAnalytics()` in `src/gtm.js` is gated on `isProduction` (`src/config/deploy.js`, resolved from `import.meta.env.MODE`) and on both `VITE_GTM_ID`/`VITE_CLARITY_ID` being set. Never hardcode the real container IDs in `index.html` again — that was a real incident (see `docs/DEVELOPER_GUIDE.md`). As defense in depth, the staging deploy step in `.github/workflows/deploy.yml` does not pass the production `VITE_GTM_ID`/`VITE_CLARITY_ID` values either.
- Every page sets its head tags through the `<SEO>` component. A new page must include one. Do not add static JSON-LD for FAQ/breadcrumbs either: pages pass `jsonLd`/`breadcrumb` to `<SEO>`. Do not add a static `<title>`, meta description, canonical, or OG/Twitter title+description+image back into `index.html` — `<SEO>` (react-helmet-async) sets those per-route on every page, and a static copy just duplicates them in the live DOM. `index.html` keeps only genuinely static tags: favicons, manifest, sitemap, `og:type`/`site_name`/`locale`, `twitter:card`/`site`/`creator`, and the Organization JSON-LD. The default share image `public/assets/seo/og-image.jpg` (1200x630) is a placeholder generated from the logo; replace it with real brand art.
- Each route's head tags live in `src/data/seodata.js`; pages spread their entry into `<SEO>` (`<SEO {...seo.pricing} />`). After `vite build`, `scripts/prerender.mjs` renders `<SEO>` for every entry and writes `dist/<route>.html` (plus `index.html` for Home, `404.html` for NotFound, and `blog.html` / `blog/<slug>.html` from `src/data/blog/blogSeo.js`) with those tags marked `data-prerender`, so crawlers that do not run JavaScript get a real title, description, canonical, and share image. `src/main.jsx` removes the `data-prerender` copies before mounting, so the live DOM still has one of each. Only the head is prerendered; the body is still the empty app shell. A new page needs a `seodata.js` entry, not inline `<SEO>` props. `seodata.js` is also imported by plain Node, so keep it free of JSX and write relative imports with the `.js` extension.
- `nginx.conf` lists the known SPA routes (the `location ~ ^/(projects|pricing|...)` regex) and returns a real 404 status for anything else. Each known route is served from its prerendered `<route>.html` (falling back to `index.html`), and 404s are served from `404.html`. A new route in `src/App.jsx` must also be added to that regex or it will 404 in production. `/blog` has its own two location blocks: `/blog` serves `blog.html`, and `/blog/<slug>` serves `blog/<slug>.html` or a real 404 when no prerendered file exists. `www.` redirects to the apex domain there too.
- `nginx.conf` has a CSP allowlist (`script-src` and `connect-src`), repeated in three `add_header` blocks that must stay identical. A new outbound domain (analytics, form host, embed) must be added there or the browser will block it. Clarity needs `scripts.clarity.ms` in `script-src` and `*.clarity.ms` in `connect-src`; GA4 needs `*.google-analytics.com` and `*.analytics.google.com` in `connect-src`.

## Environments And The Staging Gate

- Build modes: `development` (default), `staging`, `production`. Set via the `npm run build:staging` / `build:production` scripts.
- `StagingLogin` gates the whole app when `VITE_APP_ENV=staging`, checking `VITE_STAGING_USERS` (a JSON `username: password` map) against `sessionStorage`.
- The staging Docker build must pass `BUILD_MODE=staging` and the `VITE_*` build args (see `Dockerfile` and `docker-compose.stage.yml`); without them the gate silently disappears and the contact form has no endpoint. Staging pages are also forced `noindex` by `<SEO>` via `isStaging`.
- This gate is a review speed-bump, not a security boundary. Never rely on it to protect anything.
- The real config values are `VITE_GTM_ID`, `VITE_CLARITY_ID` and the optional `VITE_FIREBASE_PROJECT_ID` (defaults to `website-forms-efeba` in code, so forms work without a build arg). All are public browser values.

## Branch And Deployment Rules

- Flow: `dev` (work) then `stage` (deploys `staging.ingversionsdigital.com`) then `production` (deploys the live domain).
- Deploys are triggered by pushes to `stage` and `production` via `.github/workflows/deploy.yml`, which calls the Hostinger Docker API.
- Before deploying, the `check` job runs `npm test`, `npm run lint`, the repo rules (no committed `graphify-out/`, no `clamp()` in CSS, no analytics in `index.html`, production `Dockerfile` keeps the GTM/Clarity ID defaults) and the build. A failure stops the deploy. It also runs on pull requests into `dev`, `stage` and `production`.
- Pull requests into `production` also run `guard-production`, which fails if the merge would change production-only files, or add or update `docs/DEVELOPER_GUIDE.md`, `docs/site-docs/` or the `graphify-out/` ignore rule. Add the `allow-protected-files` label to let an intended production-only file change through (e.g. a new route in `nginx.conf`); the docs rule has no override.
- When merging `stage` into `production`, keep production's version of these files: `.dockerignore`, `Dockerfile`, `docker-compose.production.yml`, `docker-compose.stage.yml`, `eslint.config.js`, `index.html`, `nginx.conf`. Also do not carry `docs/DEVELOPER_GUIDE.md`, `docs/site-docs/`, or the `.gitignore` `graphify-out/` rule to `production` — those stay on `dev` and `stage`.
- `graphify-out/` is local-only and gitignored. Never commit it.
- The blog lives at `/blog` (Header, Footer and `BlogSlider` link there directly). Because production keeps its own `nginx.conf`, the two `/blog` location blocks must be added to production's copy when the blog is first merged, or `/blog` 404s there.
- Blog styles are scoped under `.ing-blog` (`src/pages/Blog/blog.css`) and the blog routes are lazy-loaded. Keep it that way: blog CSS must not reach other pages and blog dependencies must not enter the main bundle.
- Home page sections are eager-imported, not `React.lazy`. Lazy-loading them caused a header/footer-then-content flash. Do not convert them back.

## Validation

- Lint: `npm run lint`
- Build: `npm run build` (or `npm run build:production` for the production config)
- Mechanical diff check: `git diff --check`
- Unit tests: `npm test` (Node's built-in `node:test`, files `src/utils/*.test.js`). Keep tested logic in pure functions under `src/utils/`; do not add a test framework.
- There are no UI tests. For any change a user can see, verify it in a real browser at the relevant breakpoint before calling it done.

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
