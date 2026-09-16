# Ingversions Digital — Developer Guide

This is the marketing website for **Ingversions Digital**, a Shopify CRO / A-B-testing
agency. It's a single-page-app-style Vite + React site: Home, About, Pricing, Projects
(portfolio), Team, Privacy/Terms, and a 404.

This guide gets a new developer from "never seen this repo" to "shipping changes
confidently" — how it's built, how content and design are edited, how it deploys, and
why a few things are done the way they are.

> Read this top to bottom once. After that, use the Table of Contents to jump to a task.

## Table of Contents

- [Quick Start](#quick-start)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How Routing Works](#how-routing-works)
- [How Content Is Edited (the `data/` files)](#how-content-is-edited-the-data-files)
- [The Design System (CSS Modules + tokens)](#the-design-system-css-modules--tokens)
- [Environment Variables & the Staging Gate](#environment-variables--the-staging-gate)
- [Analytics (GTM / Clarity)](#analytics-gtm--clarity)
- [SEO](#seo)
- [Images: format and optimization](#images-format-and-optimization)
- [Branches & Deployment](#branches--deployment)
- [How-To: Common Tasks](#how-to-common-tasks)
- [Design Decisions & Gotchas](#design-decisions--gotchas)

---

## Quick Start

```bash
npm install
npm run dev
```

Open the printed `http://localhost:5173` (Vite bumps the port if it's taken — check the
terminal output for the actual one). You should see the homepage with hot-reload: edit
any file under `src/` and the browser updates instantly.

To see the site with production-like data (staging login gate, staging analytics IDs):

```bash
npm run dev -- --mode staging
```

That's it — no database, no backend, no build step needed to start developing.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Build tool | [Vite 7](https://vitejs.dev) | `vite.config.js` — plugin-react only, no extra config |
| UI | React 19 | function components + hooks only, no class components |
| Routing | `react-router-dom` v7 | `BrowserRouter`, routes declared in `src/App.jsx` |
| Styling | CSS Modules (`*.module.css`) | one file per component, no Tailwind/styled-components |
| Icons | `lucide-react` | consistent icon set across the whole site |
| Carousels | `swiper` | used for mobile card carousels and sliders |
| SEO | `react-helmet-async` | per-page `<SEO>` component sets title/meta/JSON-LD |
| Forms | native `<form>` + Formspree | no form library; `VITE_FORMSPREE_ENDPOINT` posts the contact form |
| Analytics | Google Tag Manager + Microsoft Clarity | custom lightweight wrapper in `src/gtm.js`, no analytics SDK |
| Lint | ESLint 9 (flat config) | `npm run lint` |
| Image pipeline | `sharp` (dev-only script) | `scripts/convert-images.mjs`, see [Images](#images-format-and-optimization) |
| Hosting | Docker + nginx, no SSH | see [Branches & Deployment](#branches--deployment) and `DEPLOYMENT.md` |

Nothing here needs a database, a server-side runtime, or an API backend — this is a
static site (Vite builds it to plain HTML/CSS/JS, served by nginx in a container).

---

## Project Structure

```
src/
  App.jsx              Route table + global scroll-restore logic
  main.jsx             React root, providers (Helmet, Router), boots GTM
  components/          One folder per UI component: Foo/Foo.jsx + Foo/Foo.module.css
  pages/               One folder per route: thin — assembles components, adds <SEO>
  data/                Site copy & content, plain JS objects (see next section)
  config/deploy.js     Reads VITE_DEPLOY_ENV / VITE_ENABLE_STAGING_FEATURES
  hooks/useIsMobile.js Shared breakpoint hook (matches CSS's mobile breakpoint)
  layouts/Layouts.jsx  <Header> + <main> + <Footer> wrapper used by every page
  styles/style.css     Global reset + design tokens (CSS custom properties)
  gtm.js               Analytics event helpers (pageview, cta_click, scroll_depth...)
  utils/url.js         Small URL helpers

public/assets/         Static images/fonts, served as-is (webp/jpg, optimized — see below)
scripts/convert-images.mjs   One-off script: resize+convert new images to webp
docs/                  You are here
DEPLOYMENT.md          Infra: Docker, Hostinger, DNS, GitHub Actions secrets
```

**Component convention:** every component is a folder with a matching `.jsx` and
`.module.css`, e.g. `components/Services/Services.jsx` + `Services.module.css`. Class
names inside the CSS file are scoped automatically by Vite (`styles.foo`), so you never
have to worry about naming collisions between components.

**Page convention:** files under `pages/` are thin. They import the components that make
up that page, wrap them in `<Layout>`, and add a page-specific `<SEO>` block. Almost all
actual markup and styling lives in `components/`, not `pages/`.

---

## How Routing Works

All routes are declared in one place, `src/App.jsx`:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/teampage" element={<TeamPage />} />
  <Route path="/about-us" element={<AboutUs />} />
  <Route path="/pricing" element={<Pricing />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/terms-of-service" element={<TermsOfService />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

Every page except `Home` is `React.lazy()`-loaded — each becomes its own JS chunk that
only downloads when a visitor navigates there. `Home` is imported eagerly on purpose: it
also renders every homepage section (Hero, Services, Pricing teaser, FAQ, Contact, etc.)
eagerly rather than lazily, because they all render on the very first paint anyway —
lazy-loading content that's needed immediately just adds a network waterfall and a
"header/footer show, then content pops in" flash with no actual benefit. If you add a
new **page**, lazy-load it like the others. If you add a new **homepage section**, import
it eagerly like the existing ones in `Home.jsx`.

`ScrollManager` (also in `App.jsx`) handles two behaviors on every navigation: scroll to
top on a plain route change, or smooth-scroll to a `#hash` target (including waiting for
lazy content to mount before scrolling, via a `MutationObserver`).

---

## How Content Is Edited (the `data/` files)

This is the single most important section for day-to-day work. **Almost all site copy —
headings, paragraphs, prices, team bios, project case studies, FAQ answers — lives in
plain JS objects under `src/data/`, not hardcoded in components.**

| File | Powers |
|---|---|
| `src/data/sitedata.js` | Homepage: hero, services, process, engagement models, "why choose us", reviews, contact, FAQ, footer, and the homepage's pricing/projects teasers |
| `src/data/pricingdata.js` | `/pricing` page: plan cards, comparison table, pricing FAQ |
| `src/data/projectsdata.js` | `/projects` page: portfolio case studies (before/after images, results) |
| `src/data/teamdata.js` | `/teampage`: team member cards (name, title, avatar, culture blurb) |
| `src/data/aboutusdata.js` | `/about-us`: hero, story, values, expertise sections |

To change what a section **says**, edit the relevant object in one of these files — you
don't need to touch the component. Components read from `data.<section>.<field>` and
render whatever's there; they don't contain copy themselves. This means:

- A non-technical person could safely edit copy in these files without touching JSX.
- Adding a new team member, FAQ item, or portfolio project is usually just adding one
  more object to an existing array — see [How-To](#how-to-common-tasks) below.
- If you need to change **layout or styling**, that's in the component's `.jsx`/`.module.css`
  instead — data files hold content, not structure.

---

## The Design System (CSS Modules + tokens)

There's no CSS framework (no Tailwind, no Bootstrap). Every component owns its own
scoped `.module.css` file. Shared values — colors, spacing radii, shadows — are defined
once as CSS custom properties in `src/styles/style.css` under `:root`, for example:

```css
:root {
  --palette-bg-950: #fffdf5;      /* page background (cream) */
  --palette-accent: #8b5cf6;      /* primary purple */
  --secondary: #f472b6;           /* pink */
  --tertiary: #fbbf24;            /* yellow */
  --quaternary: #34d399;          /* green */
  --palette-border: #1e293b;      /* near-black, used for borders/text/shadows */
  --radius-lg: 24px;
  --shadow-pop: 4px 4px 0 0 var(--palette-border);   /* signature "hard shadow" look */
}
```

The visual style across the whole site — thick dark borders, offset flat drop-shadows
(`--shadow-pop`), rounded card corners with one squared-off corner, bold rotated pill
badges — comes from reusing these tokens consistently. **When styling something new,
reach for an existing `var(--...)` token first** rather than hardcoding a hex color or
shadow value; that's what keeps every new component looking like it belongs.

Responsive breakpoints are handled with plain `@media` queries inside each
`.module.css` file (common ones: `767.98px` mobile, `1023.98px` tablet, `1199.98px`
small-desktop) — there's also a `useIsMobile()` hook (`src/hooks/useIsMobile.js`) for
components that need to render **different JSX** (not just different CSS) on mobile,
e.g. swapping a grid for a Swiper carousel.

**No `clamp()`, no `vw`/`vh`-based fluid sizing, anywhere in CSS.** A handful of
components (`Hero/HeroV2`, `AboutHero`, `Contact`, `TrackRecord`) used to size large
headings with `clamp(min, Nvw, max)`. All of them were converted to fixed `px` values
with explicit breakpoint overrides instead — the `clamp()` min/max bounds became the
mobile/desktop pixel values, with a tablet-range override added at `1023.98px` where
one didn't already exist. Follow the same pattern for any new large/responsive type:
pick a `px` value per breakpoint rather than a fluid formula.

---

## Environment Variables & the Staging Gate

Env files (not committed — see `.gitignore`): `.env`, `.env.staging`, `.env.production`.
`.env.example` documents the shape:

```txt
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
VITE_GTM_ID=GTM-XXXXXXX
VITE_CLARITY_ID=your-clarity-project-id
```

Additional vars used by the staging build only:

```txt
VITE_APP_ENV=staging
VITE_STAGING_USERS={"developer":"dev123"}
VITE_DEPLOY_ENV / VITE_ENABLE_STAGING_FEATURES   (read via src/config/deploy.js)
```

**The staging gate:** when `VITE_APP_ENV=staging`, `src/components/StagingLogin/StagingLogin.jsx`
wraps the entire app in a login screen before rendering anything — credentials are the
`{"username":"password"}` pairs in `VITE_STAGING_USERS`, checked client-side and
remembered in `sessionStorage` for that tab. This exists purely to keep the staging site
private from search engines and random visitors while still being reachable at a public
URL for review. Production builds don't set `VITE_APP_ENV=staging`, so the gate is a
no-op there.

**`src/config/deploy.js`** exposes `isProduction` / `isStaging` / `stagingFeaturesEnabled`
if you ever need environment-specific behavior in a component:

```js
import { stagingFeaturesEnabled } from "../config/deploy";
if (stagingFeaturesEnabled) { /* staging-only code */ }
```

⚠️ **Never commit `.env`, `.env.staging`, or `.env.production`.** They're gitignored;
keep it that way. Secrets for CI/deploy live in GitHub repo secrets instead (see
`DEPLOYMENT.md`).

---

## Analytics (GTM / Clarity)

`src/gtm.js` is a small hand-rolled wrapper around `window.dataLayer` — there's no
`react-ga` or similar SDK. `initGTMTracking()` (called once from `main.jsx` on idle) wires
up:

- automatic `virtual_pageview` events on route change (patches `history.pushState`)
- `cta_click` events on any element with a `data-cta="Label"` attribute
- `form_submit` / `form_success` events on forms tagged `data-gtm-form="name"`
- `scroll_depth` milestones (25/50/75/100%)

To track a new button or link, just add `data-cta="Something"` and (optionally)
`data-cta-loc="Header"` — no extra JS needed, the global click listener picks it up.

**The GTM/Clarity `<script>` loaders themselves are separate from the dataLayer
wiring above and only run in production.** `gtm.js` also exports `loadAnalytics()`
(called from `main.jsx` alongside `initGTMTracking()`), which injects the real
Clarity and GTM `<script>` tags — but only when `isProduction` (from
`src/config/deploy.js`, resolved from `import.meta.env.MODE`) is true and both
`VITE_GTM_ID`/`VITE_CLARITY_ID` are set. `index.html` no longer hardcodes the
container IDs; the noscript GTM iframe uses the `%VITE_GTM_ID%` build-time
placeholder instead. This exists because the container IDs were hardcoded and
unconditional in `index.html` for about three months (2026-05-14 to 2026-08-12),
during which local `npm run dev` sessions fired real pageviews into the
production GTM/Clarity property (visible in GA as `localhost:5173`/`localhost:3000`
referral sessions). As defense in depth on top of the code-level gate, the
staging deploy step in `.github/workflows/deploy.yml` does not pass the
production `VITE_GTM_ID`/`VITE_CLARITY_ID` values either — staging builds with
both unset. Never reintroduce a hardcoded container ID or an ungated script tag
in `index.html`.

---

## SEO

Every page renders a `<SEO>` component (`src/components/SEO/SEO.jsx`, wraps
`react-helmet-async`) near the top of its JSX:

```jsx
<SEO
  title="Ingversions Digital | Shopify, CRO and A/B Testing Agency"
  description="..."
  path="/"
  jsonLd={faqJsonLd}       // optional structured data
  breadcrumb={[...]}       // optional, renders BreadcrumbList JSON-LD
  noindex                  // optional, for pages like legal/404 you don't want indexed
/>
```

It sets `<title>`, meta description, canonical URL, robots, and Open Graph/Twitter tags
consistently. When adding a new page, always add one of these with a real title and
description — don't leave it to the page's default.

**Do not also add a static `<title>`, meta description, canonical, or OG/Twitter
title+description+image to `index.html`.** Every route in `App.jsx` already
renders `<SEO>`, so a static copy in `index.html` doesn't act as a fallback —
it just sits in the DOM alongside the one Helmet injects, since Helmet only
manages tags it created itself and has no awareness of pre-existing static
ones. This was a real bug: title, description, canonical, and OG/Twitter tags
were each duplicated in the live DOM on every page until it was fixed.
`index.html` should only carry tags that are genuinely static and not
route-specific: favicons, manifest, sitemap link, `og:type`/`site_name`/`locale`,
`twitter:card`/`site`/`creator`, and the Organization JSON-LD.

---

## Images: format and optimization

**All images ship as `.webp`** (except a few small `.png` logos/favicons kept for
compatibility, and testimonial photos as `.jpg`). Raw, unoptimized images (especially
exported PNGs from design tools) are often 1-1.5MB each — at that size a page with a
dozen of them is unusably slow.

`scripts/convert-images.mjs` is a one-off Node script (uses `sharp`, a devDependency)
that walks `public/assets/`, resizes anything wider than a max width (800px for
`team/`, 1600px elsewhere), converts to `.webp` at quality 82, and deletes the
original. Run it after dropping new raw images into `public/assets/`:

```bash
node scripts/convert-images.mjs
```

Then update whatever `data/*.js` file references the image path to point at the new
`.webp` filename (the script deletes the original extension, so references must change
too — it does not rewrite your source files for you).

Components render images through `src/components/OptimizedImg/OptimizedImg.jsx`, which
just wraps `<img>` with sane defaults (`loading="lazy"` unless `priority`,
`decoding="async"`, explicit width/height to prevent layout shift). Use it instead of a
bare `<img>` for any content image.

---

## Branches & Deployment

Three long-lived branches, each mapped to a real deployed environment:

| Branch | Deploys to | Purpose |
|---|---|---|
| `new-theme` | *(not auto-deployed)* | Active development branch — all day-to-day work happens here |
| `stage` | `staging.ingversionsdigital.com` | Review environment, gated by the staging login |
| `production` | `ingversionsdigital.com` | The live site |

**The flow:**

1. Do the work on `new-theme`, commit, push.
2. Cherry-pick (or merge) the same commit onto `stage`, push — this auto-deploys to
   staging via GitHub Actions (push-triggered, see `.github/workflows/deploy.yml`).
3. Review on staging. When ready to go live, open a PR from `stage` into `production`
   and merge it — this auto-deploys production.

**Files that intentionally differ between `stage` and `production` and must not be
silently overwritten by a merge:** `.dockerignore`, `Dockerfile`,
`docker-compose.production.yml`, `docker-compose.stage.yml`, `eslint.config.js`,
`index.html`, `nginx.conf`, plus `docs/DEVELOPER_GUIDE.md`, `docs/site-docs/`, and the
`.gitignore` `graphify-out/` rule (those three live on `new-theme`/`stage` only and
never go to `production`). When merging `stage` → `production`, keep production's
existing versions of these and take everything else from `stage`. (`README.md` used to
be on this list — it isn't anymore; it syncs to `production` normally.)

**One behavior, not a file, that must also never reach `production`:** the Blog-link
click-intercept-and-`alert()` in `Header.jsx`, `Footer.jsx`, and `BlogSlider.jsx` (shows
an alert instead of navigating to `blog.ingversionsdigital.com`) is a
`new-theme`/`stage`-only experiment. Those three files aren't excluded wholesale —
other changes to them should still flow to `production` normally — just keep
production's direct-navigation Blog links when merging.

For the actual infrastructure — Docker images, Hostinger's no-SSH deploy API, GitHub
Actions secrets, Cloudflare DNS records, and where to find build logs on the VPS — see
**[`DEPLOYMENT.md`](../DEPLOYMENT.md)**. This guide covers the *code*; that one covers
the *infrastructure*.

---

## How-To: Common Tasks

### Add a new team member

1. Add their photo to `public/assets/team/`, run `node scripts/convert-images.mjs` if it's not already a `.webp`.
2. Add an object to the `teamMembers` array in `src/data/teamdata.js`:
   ```js
   { id: "jane-doe", name: "Jane Doe", title: "CRO Dev", avatar: "/assets/team/jane.webp", location: "", badges: [], skills: [], socials: {} }
   ```
3. Done — `TeamGrid`/`TeamCard` render from that array automatically.

### Add a new portfolio project

Add an entry to `src/data/projectsdata.js` following the shape of an existing project
(before/after image paths, title, results copy). Drop the before/after images into
`public/assets/project/` first and run the image-conversion script.

### Add a new FAQ item (homepage or pricing)

Homepage FAQ: add `{ q: "...", a: "..." }` to `data.faq.list` in `src/data/sitedata.js`
(this also feeds the FAQ JSON-LD schema automatically — no extra step). Pricing FAQ:
same shape in `src/data/pricingdata.js`.

### Add a brand-new page

1. Create `src/pages/YourPage/YourPage.jsx` — wrap in `<Layout header={1} footer={1}>`, add `<SEO>`.
2. Add the route in `src/App.jsx`, lazy-loaded like the other non-home pages.
3. Build the page from new or existing components under `src/components/`.

### Add a new homepage section

Build the component under `src/components/YourSection/`, add its content to
`src/data/sitedata.js`, then import and render it **eagerly** in `src/pages/Home/Home.jsx`
(no `React.lazy`/`Suspense` — see [How Routing Works](#how-routing-works) for why).

### Run checks before pushing

```bash
npm run lint
npm run build          # or build:staging / build:production to match a real deploy
```

Both should be clean before pushing to `stage` or `production`.

### Ship a change to staging, then production

```bash
git checkout new-theme
# ...make your change, commit...
git push origin new-theme

git checkout stage
git cherry-pick <commit-sha>
git push origin stage
# → auto-deploys to staging.ingversionsdigital.com, review it

# when ready, open a PR: stage -> production, merge it
# → auto-deploys to ingversionsdigital.com
```

---

## Design Decisions & Gotchas

**Why CSS Modules instead of Tailwind/styled-components?** Every component ships its own
scoped stylesheet with zero build-time class-name collision risk, while still being
plain, readable CSS — no utility-class soup, no runtime-in-JS styling cost. Shared design
tokens (`style.css`) give the consistency Tailwind would otherwise buy you.

**Why is content in `data/*.js` instead of a CMS?** The site has no backend and doesn't
need one — content changes are infrequent enough that editing a JS object and
redeploying is simpler than standing up and paying for a headless CMS. If content
updates ever become frequent enough to need non-developer self-service, that's the
signal to introduce one — not before.

**Why does `Home.jsx` eagerly import everything while other pages lazy-load?** See
[How Routing Works](#how-routing-works) — it was previously lazy-loaded and caused a
visible header/footer-then-content-pops-in flash on every homepage load, because every
section renders immediately anyway. Route-level lazy-loading (for pages a visitor may
never open) is still worth it and is used everywhere else.

**Why is there a login gate only on staging?** `staging.ingversionsdigital.com` is a
public URL (needed so anyone reviewing the build doesn't need VPN/SSH access), but it's
not meant to be found by Google or random visitors before a feature ships. The
client-side gate (`StagingLogin`) is intentionally simple — it's a review speed-bump, not
a security boundary. Don't put anything sensitive behind it expecting real protection.

**Why do specific files never get overwritten by a `stage` → `production` merge?**
Those files hold environment-specific infrastructure config (which Docker Compose file
targets which VPS project, which nginx config, etc.) that's deliberately *different* per
branch, not a lagging copy waiting to be synced. Merging them normally would silently
break the other environment's deploy.

**Safari/WebKit hairline borders:** thin `border-bottom: 1px` dividers can render broken
or anti-aliased oddly on Safari/macOS at certain zoom levels. The established fix used
across this codebase is swapping `border-bottom: 1px solid X` for the visually
equivalent `box-shadow: 0 1px 0 0 X` — it's immune to the same rendering bug. Reach for
that fix first if a Mac-only "the divider line looks broken" report comes in again.
