# Ingversions Digital — Developer Guide

This is the marketing website for **Ingversions Digital**, a Shopify CRO / A-B-testing
agency. It's a single-page-app-style Vite + React site: Home, About, Pricing, Projects
(portfolio), Team, Privacy/Terms, a thank-you page, and a 404.

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
- [The Blog (`/blog`)](#the-blog-blog)
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
npm run dev:staging
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
| Forms | native `<form>` + Formspree | no form library; `VITE_FORMSPREE_ENDPOINT` posts the contact form (`ContactModal`, the only live form). It has a hidden `_gotcha` honeypot and redirects to `/thank-you` on success |
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
  main.jsx             React root, providers (Helmet, Router), starts analytics if consent was already given
  components/          One folder per UI component: Foo/Foo.jsx + Foo/Foo.module.css
  pages/               One folder per route: thin — assembles components, adds <SEO>
  data/                Site copy & content, plain JS objects (see next section)
  config/deploy.js     Reads VITE_DEPLOY_ENV / VITE_ENABLE_STAGING_FEATURES
  hooks/useIsMobile.js Shared breakpoint hook (matches CSS's mobile breakpoint)
  layouts/Layouts.jsx  <Header> + <main> + <Footer> wrapper used by every page
  styles/style.css     Global reset + design tokens (CSS custom properties)
  gtm.js               Analytics event helpers + consent storage (pageview, cta_click, startAnalytics...)
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
  <Route path="/thank-you" element={<ThankYou />} />
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

**Adding a route also means editing `nginx.conf`.** nginx serves the app shell with `200`
only for the routes in its `location ~ ^/(projects|pricing|...)` regex and returns a real
`404` status for every other URL (the SPA still renders `NotFound`). Forget to add the new
path there and the page will 404 in production. The blog is the exception: `/blog` and
`/blog/<slug>` have their own two location blocks that serve the prerendered
`blog.html` / `blog/<slug>.html`, and an unknown slug (no file) returns a real `404`.

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
| `src/data/servicepagesdata.js` | Service pages (`/ab-testing`, `/shopify-development`, `/quality-assurance`, `/wordpress-development`, `/landing-page-personalization`): hero, included items, which process flow and pricing block to show, FAQ. Each key is a URL slug |

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
VITE_STAGING_USERS={"username":"password"}
VITE_DEPLOY_ENV / VITE_ENABLE_STAGING_FEATURES   (read via src/config/deploy.js)
```

**The staging gate:** when `VITE_APP_ENV=staging`, `src/components/StagingLogin/StagingLogin.jsx`
wraps the entire app in a login screen before rendering anything — credentials are the
`{"username":"password"}` pairs in `VITE_STAGING_USERS`, checked client-side and
remembered in `sessionStorage` for that tab. This exists purely to keep the staging site
private from search engines and random visitors while still being reachable at a public
URL for review. Production builds don't set `VITE_APP_ENV=staging`, so the gate is a
no-op there. The staging image only gets `VITE_APP_ENV`, `VITE_STAGING_USERS` and the other
`VITE_*` values if `Dockerfile` and `docker-compose.stage.yml` pass them as build args with
`BUILD_MODE=staging`; if those are stripped, the gate silently vanishes and the contact form
loses its endpoint. `<SEO>` also forces `noindex` on every page when `isStaging` is true.

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
`react-ga` or similar SDK. `startAnalytics()` (which runs `initGTMTracking()` and
`loadAnalytics()`) is only called after the visitor accepts analytics in the `CookieConsent`
banner, either on click or from `main.jsx` on idle when a previous `granted` choice is stored
in `localStorage` (`analytics-consent`). Decliners and first-time visitors load nothing. Only an
accept is saved: a decline hides the banner for the visit, and it asks again on the next page
load. Until the visitor chooses, the banner blocks clicks and scrolling on every page except
`/privacy-policy`. Choosing fires `CONSENT_EVENT` (from `gtm.js`) on window; the bottom
`PromoBar` waits for it and appears 10 seconds later (or 10 seconds after load for visitors who
accepted earlier).
`initGTMTracking()` wires up:

- automatic `virtual_pageview` events on route change (patches `history.pushState`)
- `cta_click` events on any element with a `data-cta="Label"` attribute
- `form_submit` / `form_success` events on forms tagged `data-gtm-form="name"`
- `scroll_depth` milestones (25/50/75/100%)

To track a new button or link, just add `data-cta="Something"` and (optionally)
`data-cta-loc="Header"` — no extra JS needed, the global click listener picks it up.

**The GTM/Clarity `<script>` loaders themselves are separate from the dataLayer
wiring above and only run in production.** `gtm.js` also exports `loadAnalytics()`
(called by `startAnalytics()`), which injects the real
Clarity and GTM `<script>` tags — but only when `isProduction` (from
`src/config/deploy.js`, resolved from `import.meta.env.MODE`) is true and both
`VITE_GTM_ID`/`VITE_CLARITY_ID` are set. `index.html` no longer hardcodes the
container IDs, preconnects to the analytics hosts, or carries the GTM noscript iframe
(without JavaScript there is no way to ask for consent). This exists because the container IDs were hardcoded and
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
<SEO {...seo.pricing} />
```

The props come from `src/data/seodata.js`, one entry per route:

```js
pricing: {
  title: "Shopify CRO Pricing | Ingversions Digital",
  description: "...",
  path: "/pricing",
  breadcrumb: [...],       // optional, renders BreadcrumbList JSON-LD
  jsonLd: {...},           // optional structured data (Home uses it for the FAQ)
  noindex: true,           // optional, for pages like thank-you/404
},
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
`twitter:card`/`site`/`creator`, and the Organization JSON-LD. Do not add static FAQ or
breadcrumb JSON-LD either: the Home page passes its FAQ via `jsonLd`, and other pages pass
`breadcrumb`, so static copies would be duplicate structured data.

### Static head tags for crawlers (prerender)

Each route's head tags live in `src/data/seodata.js`; pages spread their entry into `<SEO>` (`<SEO {...seo.pricing} />`). After `vite build`, `scripts/prerender.mjs` renders `<SEO>` for every entry and writes `dist/<route>.html` (plus `index.html` for Home and `404.html` for NotFound) with those tags marked `data-prerender`, so crawlers that do not run JavaScript get a real title, description, canonical, and share image. `src/main.jsx` removes the `data-prerender` copies before mounting, so the live DOM still has one of each. Only the head is prerendered; the body is still the empty app shell.

`seodata.js` is imported by plain Node in that script, so keep it free of JSX and write
its relative imports with the `.js` extension. `nginx.conf` serves each known route from
its `<route>.html` and real 404s from `404.html`.

The default share image is `public/assets/seo/og-image.jpg` (1200x630). The committed file
is a placeholder built from the logo; replace it with real brand art. Every new indexable
page must also be added to `public/sitemap.xml` (same-domain URLs only; the thank-you and
404 pages stay out and are `noindex`). Blog URLs are the exception: `prerender.mjs`
appends `/blog` and every post to `dist/sitemap.xml` at build time, so never add them by hand.

---

## The Blog (`/blog`)

The blog used to be a separate Next.js app at `blog.ingversionsdigital.com`. It now
lives here, inside the normal `Layout` (main header and footer).

| Piece | Where |
|---|---|
| Routes | `src/pages/Blog/BlogHome.jsx` (`/blog`), `BlogPost.jsx` (`/blog/:slug`, including the blog 404). Both lazy-loaded in `App.jsx` |
| Scoped base styles + tokens | `src/pages/Blog/blog.css`, every rule under `.ing-blog` |
| Components | `BlogClient` (home grid, tabs, category cards), `ArticleBlocks` (structured posts), `BlogArticle` (legacy markdown posts, `CodeBlock`, `Mermaid`), `PopularArticles` (slider), `BlogFaq` |
| Content | `src/data/blog/` |
| Head tags | `src/data/blog/blogSeo.js`, used by both the pages and `prerender.mjs` |

**Two kinds of post.** Slugs are unique across both. `BlogPost` checks structured posts
first, then legacy ones, then shows the blog 404 (`noindex`).

- **Structured posts** (preferred): one object per post in `src/data/blog/blogPosts.json`.
  Copy the `post` object from `blogPostTemplate.json`, which has an example of every block
  type (`paragraph, list, callout, protip, featureGrid, flowDiagram, stepList, image,
  quote, code, table, divider`). Text fields support `**bold**`, `==highlight==`,
  `[label](url)` and `` `code` ``. `icon` values are lucide names in kebab-case. The home card,
  slider, sitemap entry, canonical and JSON-LD are all generated. Set `seo.canonical` to
  `https://ingversionsdigital.com/blog/<slug>` (the page computes it from the slug anyway).
- **Legacy markdown posts:** an entry in `articlesData.js` keyed by slug, plus a card in
  `postCards.js` and a cover in `articleImages.js`. ` ```mermaid ` fences are supported.
  Linear `graph`/`flowchart` charts render as a numbered step list. Branching charts render
  as mermaid SVG, and `mermaid` (~170 KB gzip) is only downloaded on those pages.

**Covers** go in `public/assets/blog/covers/` as `.webp` (quality 82, max 1600px wide, the
same settings as `convert-images.mjs`). Use a unique image per post. Blog cards show covers
only ~400px wide, so they load an 800px copy from `covers/thumbs/` (via `coverThumb()` in
`articleImages.js`); post heroes keep the full cover. `scripts/blog-thumbs.mjs` creates any
missing thumbnail and runs at the start of every `build*` script; run it by hand after adding a
cover if you want the card image in `npm run dev`. Commit the thumbnails with the cover.

**Why it's built this way.** The blog's own design tokens (`--accent`, `--border`, ...)
differ from the main site's, so they're defined on `.ing-blog` rather than `:root`. The
blog pulls in `react-markdown`, Swiper and the whole `lucide-react` icon set (icons are
looked up by name from the JSON). The routes are lazy-loaded so none of that enters the
main bundle. The article chunk is about 217 KB gzip, mostly lucide. If that becomes a
problem, swap the `import * as Lucide` in `ArticleBlocks.jsx` for an explicit name-to-icon map.

**Share previews.** `prerender.mjs` writes `blog.html` and `blog/<slug>.html` with each
post's title, description, canonical and cover image, so WhatsApp/LinkedIn previews show
the real post.

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
| `dev` | *(not auto-deployed)* | Active development branch — all day-to-day work happens here |
| `stage` | `staging.ingversionsdigital.com` | Review environment, gated by the staging login |
| `production` | `ingversionsdigital.com` | The live site |

**The flow:**

1. Do the work on `dev`, commit, push.
2. Cherry-pick (or merge) the same commit onto `stage`, push — this auto-deploys to
   staging via GitHub Actions (push-triggered, see `.github/workflows/deploy.yml`).
3. Review on staging. When ready to go live, open a PR from `stage` into `production`
   and merge it — this auto-deploys production.

**Files that intentionally differ between `stage` and `production` and must not be
silently overwritten by a merge:** `.dockerignore`, `Dockerfile`,
`docker-compose.production.yml`, `docker-compose.stage.yml`, `eslint.config.js`,
`index.html`, `nginx.conf`, plus `docs/DEVELOPER_GUIDE.md`, `docs/site-docs/`, and the
`.gitignore` `graphify-out/` rule (those three live on `dev`/`stage` only and
never go to `production`). When merging `stage` → `production`, keep production's
existing versions of these and take everything else from `stage`. (`README.md` used to
be on this list — it isn't anymore; it syncs to `production` normally.)

**The `/blog` nginx rule must be added to production by hand.** Production keeps its
own `nginx.conf`, so the first time the blog is merged to `production`, copy the two
`/blog` location blocks from `dev`'s `nginx.conf` into production's. Without them every
`/blog` URL returns 404 there. After `/blog` is live, the old blog project 301-redirects
`blog.ingversionsdigital.com/<slug>` to `/blog/<slug>`. That redirect is set up in the old
blog repo, not here.

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

### Add a new service page

1. Add an entry to `src/data/servicepagesdata.js`, keyed by the URL slug. `flow` names a tab id in `data.processFlow.tabs` (`src/data/sitedata.js`); `pricing` is `"plans"` (the CRO plan cards and comparison) or `"engagement"` (the engagement models).
2. That one entry generates the route in `src/App.jsx` and the head tags in `src/data/seodata.js`. Add the slug to the route regex in `nginx.conf` (on `production` too, which keeps its own copy) and to `public/sitemap.xml`.
3. To link it from the homepage Services cards, give that service `href: "/<slug>"` and a `linkLabel` in `data.services.list`.

### Add a blog post

1. Add the post object to `src/data/blog/blogPosts.json` (copy from `blogPostTemplate.json`).
2. Add its cover to `public/assets/blog/covers/` as `.webp`, then run `node scripts/blog-thumbs.mjs` for its card thumbnail.
3. `npm run dev`, open `/blog/<slug>`, check it at phone width, then `npm run build`.

No route, sitemap, nginx or `seodata.js` change is needed.

### Add a brand-new page

1. Create `src/pages/YourPage/YourPage.jsx` — wrap in `<Layout header={1} footer={1}>`, add an entry to `src/data/seodata.js` and render `<SEO {...seo.yourPage} />`.
2. Add the route in `src/App.jsx`, lazy-loaded like the other non-home pages. Also add the path to the route regex in `nginx.conf`, and to `public/sitemap.xml` if it should be indexed.
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
git checkout dev
# ...make your change, commit...
git push origin dev

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
