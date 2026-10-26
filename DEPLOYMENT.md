# Hostinger Docker Manager Deployment

This project uses the same no-SSH Hostinger Docker Manager deployment style as `hrms-payroll`.

GitHub Actions calls Hostinger's Docker API. Hostinger builds the Docker Compose project from this GitHub repository.

## Branches

- Push to `stage` deploys `staging.ingversionsdigital.com`
- Push to `production` deploys `ingversionsdigital.com` and `www.ingversionsdigital.com`
- Before deploying, the `check` job runs `npm test`, `npm run lint`, the repo rules (no committed `graphify-out/`, no `clamp()` in CSS, no analytics in `index.html`, production `Dockerfile` keeps the GTM/Clarity ID defaults) and the build. A failure stops the deploy. It also runs on pull requests into `dev`, `stage` and `production`.
- Pull requests into `production` also run `guard-production`, which fails if the merge would change production-only files, or add or update `docs/DEVELOPER_GUIDE.md`, `docs/site-docs/` or the `graphify-out/` ignore rule. Add the `allow-protected-files` label to let an intended production-only file change through (e.g. a new route in `nginx.conf`); the docs rule has no override.

## GitHub Settings

Repository secrets:

```txt
HOSTINGER_API_KEY
HOSTINGER_PERSONAL_ACCESS_TOKEN
```

Repository variable:

```txt
HOSTINGER_VM_ID
```

The current workflow uses `HOSTINGER_API_KEY` and `HOSTINGER_VM_ID` directly. `HOSTINGER_PERSONAL_ACCESS_TOKEN` may still be needed by Hostinger for private repo access, matching the existing HRMS setup.

## Docker Projects

Production:

```txt
project: ingversionsdigital-live
compose: docker-compose.production.yml
direct test: http://72.62.226.183:8090
```

Staging:

```txt
project: ingversionsdigital-live-stage
compose: docker-compose.stage.yml
direct test: http://72.62.226.183:8091
```

## Build Modes

Production Docker builds use:

```bash
npm run build:production
```

Staging Docker builds use:

```bash
npm run build:staging
```

Use this helper when adding staging-only behavior:

```js
import { stagingFeaturesEnabled } from "../config/deploy";

if (stagingFeaturesEnabled) {
  // staging-only code
}
```

Adjust the relative import path based on the component file location.

The environment is the Vite build mode (`--mode production` / `--mode staging`), chosen by
`BUILD_MODE` in the compose file. `VITE_DEPLOY_ENV` and `VITE_ENABLE_STAGING_FEATURES` are
optional overrides read in `src/config/deploy.js`; no tracked `.env.*` file sets them (real
`.env` files are gitignored). Public values such as `VITE_GTM_ID`, `VITE_CLARITY_ID` and
`VITE_FORMSPREE_ENDPOINT` must reach the Docker build as compose build args, so check the
Hostinger project environment if analytics or the contact form stop working.

## nginx routing

`nginx.conf` serves the app shell with `200` only for known routes (the
`location ~ ^/(projects|pricing|...)` block) and returns a real `404` for everything else,
so soft-404s are not indexed. Add any new route from `src/App.jsx` to that regex.
Known routes are served from the `<route>.html` files that `scripts/prerender.mjs` writes
at build time (falling back to `index.html`), and 404s from `404.html`.
`www.ingversionsdigital.com` is redirected (301) to the apex domain in the same file.

## Cloudflare DNS

```txt
A      ingversionsdigital.com          72.62.226.183           Proxied
A      staging                         72.62.226.183           Proxied
CNAME  www                             ingversionsdigital.com  Proxied
```

Remove the old website records:

```txt
A      ingversionsdigital.com          86.38.243.134
AAAA   ingversionsdigital.com          2a02:4780:11:1434:0:2fdc:424c:2
```

Only add an `AAAA` record if the new VPS has an IPv6 address.

## VPS Logs

Staging:

```bash
cat /docker/ingversionsdigital-live-stage/.build.log
docker ps -a --filter name=ingversionsdigital-live-stage
```

Production:

```bash
cat /docker/ingversionsdigital-live/.build.log
docker ps -a --filter name=ingversionsdigital-live-production
```
