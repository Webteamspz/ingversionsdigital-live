# Ingversions Digital Website

Marketing website for Ingversions Digital, a Shopify CRO and A/B-testing agency.
Single-page React application, built with Vite and served as a static site from a
Docker/Nginx image.

## Stack

- Framework: React 19 with Vite 7, plain JSX (no TypeScript)
- Routing: React Router v7 (`BrowserRouter`)
- Styling: CSS Modules plus a global design-token layer in `src/styles/style.css` (no Tailwind, no CSS-in-JS)
- Content: plain JavaScript data modules in `src/data/`
- SEO: `react-helmet-async` via a shared `<SEO>` component
- Icons: `lucide-react`
- Carousels: Swiper
- Contact form: Formspree
- Analytics: Google Tag Manager and Microsoft Clarity, wired through `src/gtm.js`
- Image pipeline: `sharp` (dev dependency) via `scripts/convert-images.mjs`
- Deployment: multi-stage Docker build (`node:22-alpine` to `nginx:1.27-alpine`), deployed to a Hostinger VPS by GitHub Actions

## What Is Included

- Home, About Us, Pricing, Projects, Team, Privacy Policy, Terms of Service, and a 404 page.
- Data-driven content: every headline, list, price, team member, and project lives in `src/data/*.js`, not in JSX.
- A shared `<SEO>` component for per-page title, description, canonical, and Open Graph tags.
- A global design-token system (colours, radii, shadows, borders) as CSS custom properties.
- A client-side staging gate (`StagingLogin`) that hides the site behind a simple login when the build mode is `staging`.
- Optimised images: raw art is converted to resized `.webp` and rendered through `OptimizedImg` with lazy loading.
- GTM/Clarity analytics wired globally from `data-cta` and `data-gtm-form` attributes, with no third-party SDK.
- Nginx security headers, including a Content-Security-Policy `connect-src` allowlist for Formspree, Clarity, and Google Analytics.

## Local Setup

Install dependencies:

```sh
npm install
```

Create the local environment file:

```sh
cp .env.example .env
```

Fill `.env` with real values. All three are public `VITE_` values used by the browser bundle; there are no server-side secrets in this project.

```sh
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
VITE_GTM_ID=GTM-XXXXXXX
VITE_CLARITY_ID=your-clarity-project-id
```

Staging builds also read:

```sh
VITE_APP_ENV=staging
VITE_STAGING_USERS=staging-password
```

Real `.env` files are ignored by git. Do not commit secrets or IDs.

## Running The App

```sh
npm run dev        # Vite dev server at http://localhost:5173
npm run lint       # ESLint, run before every commit
npm run build      # production build to dist/
npm run preview    # serve the built dist/ locally
```

Mode-specific builds mirror what CI runs:

```sh
npm run build:staging      # mode=staging, site gated behind StagingLogin
npm run build:production    # mode=production, the public build
```

## Project Structure

| Path | Purpose |
|------|---------|
| `src/App.jsx` | route table |
| `src/pages/` | one folder per route |
| `src/components/` | presentational components, each with its own `.module.css` |
| `src/data/*.js` | all site copy as plain objects |
| `src/styles/style.css` | global design tokens in `:root` |
| `src/components/SEO/` | shared head-tag component |
| `src/gtm.js` | GTM / dataLayer analytics wrapper |
| `scripts/convert-images.mjs` | resize and convert raw images to `.webp` |
| `docs/` | `DEVELOPER_GUIDE.md` and the `site-docs/` HTML documentation page |
| `Dockerfile`, `nginx.conf`, `docker-compose.*.yml` | container build and serve |

## Content Editing

To change what the site says, edit the matching module in `src/data/`:

| File | Controls |
|------|----------|
| `sitedata.js` | Home page sections, blog slider, global CTAs |
| `pricingdata.js` | Pricing plans and feature rows |
| `teamdata.js` | Team members (name, role, photo, socials) |
| `projectsdata.js` | Portfolio case studies |
| `aboutusdata.js` | About page copy |

Components read these objects and render them. Do not hardcode copy in JSX.

## Environment Variables

| Variable | Used by | Notes |
|----------|---------|-------|
| `VITE_FORMSPREE_ENDPOINT` | Contact form | Formspree form URL |
| `VITE_GTM_ID` | `src/gtm.js` | Google Tag Manager container ID |
| `VITE_CLARITY_ID` | analytics init | Microsoft Clarity project ID |
| `VITE_APP_ENV` | `StagingLogin` | set to `staging` to enable the gate |
| `VITE_STAGING_USERS` | `StagingLogin` | JSON map of `username: password` |

The staging gate is a review speed-bump, not a security boundary. Do not put anything sensitive behind it.

## Branches And Deployment

```txt
new-theme  ->  stage  ->  production
```

- `new-theme` is the working branch for features and fixes.
- Pushing `stage` deploys `staging.ingversionsdigital.com`.
- Pushing `production` deploys `ingversionsdigital.com` and `www.ingversionsdigital.com`.
- Both deploys are triggered by `.github/workflows/deploy.yml`, which calls the Hostinger Docker API. Hostinger builds the Compose project from the repo.

When merging `stage` into `production`, keep production's version of these files, and
do not carry the developer documentation across:

```txt
.dockerignore
Dockerfile
docker-compose.production.yml
docker-compose.stage.yml
eslint.config.js
index.html
nginx.conf
docs/DEVELOPER_GUIDE.md
docs/site-docs/
```

The `.gitignore` `graphify-out/` rule also stays off `production`. The developer
docs and that ignore rule live on `new-theme` and `stage` only.

The Blog-link click-intercept behavior (Header, Footer, `BlogSlider` — clicking shows
an alert instead of navigating to `blog.ingversionsdigital.com`) is also a
`new-theme`/`stage`-only experiment and must not reach `production`, even though those
component files aren't on the list above and should otherwise merge normally.

Full infrastructure detail is in `DEPLOYMENT.md`.

## Verification Commands

```sh
npm run lint
npm run build
```

There is no automated test suite. UI-facing changes should be checked in a real browser before shipping.

## Documentation

- Developer guide: `docs/DEVELOPER_GUIDE.md`
- HTML documentation page: `docs/site-docs/index.html`
- Deployment: `DEPLOYMENT.md`
- Agent and contributor rules: `AGENTS.md`
- Working agreements: `CLAUDE.md`

Whenever the stack, folder layout, a convention, the branch flow, or the deploy setup changes, update `README.md`, `AGENTS.md`, `CLAUDE.md`, and `docs/DEVELOPER_GUIDE.md` to match.
