# Working agreements for this repo

Operational rules for how changes are made here. Technical conventions and
invariants are in `AGENTS.md`; full reference is in `docs/DEVELOPER_GUIDE.md`.
Read `AGENTS.md` first.

## Never push without an explicit instruction

Make commits and leave them local. Do not `git push` to any branch until the
user explicitly says to, and says which branch. The user usually also dictates
the exact commit message to use; when they do, use it verbatim.

This applies to every branch, including `dev`. Branch pushes, staging
deploys, and production deploys are all user-initiated, one at a time.

## Files excluded from stage to production

When merging `stage` into `production`, production keeps its own version of:

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

Also do not carry the `.gitignore` `graphify-out/` rule to `production`. The
developer documentation and that ignore rule live on `dev` and `stage`
only; `production` never gets them.

Do not carry these across from `stage`. If a merge would touch them, restore
production's copies before completing it.

`.github/workflows/deploy.yml` enforces this on pull requests into `production`
(`guard-production` job), and every deploy waits for the `check` job (tests, lint,
these rules, build). Use the `allow-protected-files` label only for an intended
production-only change, such as a new route in production's `nginx.conf`.

## The blog lives at /blog

The blog moved in from the old `blog.ingversionsdigital.com` Next.js app. Header,
Footer and BlogSlider link to `/blog` directly (the old `alert()` experiment is
gone). Because `nginx.conf` is excluded from the `stage` → `production` merge,
the two `/blog` location blocks must be added to production's own `nginx.conf`
the first time the blog is merged, or every `/blog` URL 404s there. Once `/blog`
is live in production, the old blog project 301-redirects
`blog.ingversionsdigital.com/<slug>` to `/blog/<slug>`; that is done in the old
blog repo, not here.

Blog styles are scoped under `.ing-blog` (`src/pages/Blog/blog.css`) and the
blog routes are lazy-loaded. Keep both: nothing from the blog may restyle or
grow the bundle of the rest of the site.

## graphify output stays local

`graphify-out/` is gitignored and must never be committed, staged, or pushed.
It is a local knowledge-graph artifact only.

## Content versus code

Site copy lives in `src/data/*.js`. A request to change wording, prices, team
members, or projects is a data-module edit, not a component edit. Do not move
content into JSX or introduce a CMS.

## Styling

Component styles are CSS Modules; shared values are the `:root` tokens in
`src/styles/style.css`. Do not add a CSS framework or hardcode values that a
token already covers. For hairline separators use
`box-shadow: 0 1px 0 0 <color>`, not `border-bottom: 1px solid <color>`
(Safari renders the latter inconsistently). Never use `clamp()` (or other
fluid `vw`/`vh`-based sizing) anywhere in CSS, including font sizes - use
fixed `px` values with explicit breakpoint overrides instead.

## Home page loading

Home page sections are eager-imported on purpose. Lazy-loading them produced a
visible header/footer-then-content flash. Do not convert them to `React.lazy`.

## Verification

Run `npm test`, `npm run lint` and `npm run build` before treating a change as
done. `npm test` covers only pure logic in `src/utils/*.test.js` (Node's
built-in `node:test`, no framework). There are no UI tests, so anything a user
can see must also be checked in a real
browser at the affected breakpoint. Do not claim a fix works from static
checks alone.

## Keeping docs current

When a change alters the stack, the folder layout, a convention in `AGENTS.md`,
the branch/deploy flow, or the environment variables, update `README.md`,
`AGENTS.md`, `CLAUDE.md`, and `docs/DEVELOPER_GUIDE.md` in the same change.
Routine bug fixes and copy edits do not need a doc update; note that explicitly
rather than skipping the check without a word.
