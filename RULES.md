# RULES.md

Plain-English index of the rules that govern this website's codebase. This
file summarizes; it does not duplicate. Each section says what the rule is in
one or two sentences and points to where the full, authoritative version
lives:

- **`CLAUDE.md`** — operational working agreements: how changes get made,
  git/push discipline, the stage→production merge exclusions, verification
  steps, doc upkeep.
- **`AGENTS.md`** — technical conventions and invariants: repo structure,
  stack, content model, styling, analytics/SEO, environments, branch rules.
- **`docs/DEVELOPER_GUIDE.md`** — full reference and reasoning behind the
  rules below, including the incidents that caused some of them.

If anything here conflicts with `CLAUDE.md` or `AGENTS.md`, those files win —
this is a summary, not a separate source of truth.

## Git / Branch / Deploy

Work happens on `new-theme` first, then flows to `stage`, then `production`.
Commits are made and left local — nothing gets pushed without an explicit
instruction naming the branch (usually with the exact commit message to use).
No `git push --force`, ever. When merging `stage` into `production`,
production keeps its own copy of a specific file list (Docker/nginx/lint
config, `index.html`, dev docs) — see **CLAUDE.md § Files excluded from stage
to production**. The Blog-link click-to-alert behavior (Header, Footer,
`BlogSlider`) is a separate, narrower case: those files aren't excluded
wholesale, but that one behavior must never reach `production` — see
**CLAUDE.md § Blog link alert stays on new-theme and stage only**. Full flow:
**AGENTS.md § Branch And Deployment Rules**.

## Content & Data Architecture

All site copy — text, prices, team members, projects — lives in
`src/data/*.js` as plain JS objects. A wording change is a data-module edit,
never a JSX edit. No CMS, no new content format. See **CLAUDE.md § Content
versus code** and **AGENTS.md § Content Architecture**.

## Styling

CSS Modules only, values from the `:root` design tokens in
`src/styles/style.css`. No Tailwind, no CSS-in-JS, no hardcoded values a token
already covers. Use `box-shadow: 0 1px 0 0 <color>` instead of
`border-bottom: 1px solid <color>` for hairline separators (Safari renders the
latter inconsistently). See **CLAUDE.md § Styling** and **AGENTS.md § Styling
Rules**.

## Performance / Loading

Home page sections stay eager-imported, never `React.lazy` — that caused a
visible header/footer-then-content flash before. Images go through
`scripts/convert-images.mjs` (`.webp`, ~800px, ~82 quality) and render via
`OptimizedImg`. See **CLAUDE.md § Home page loading** and **AGENTS.md §
Images**.

## Analytics & SEO

GTM and Microsoft Clarity load in production builds only, gated on
`isProduction` (`src/config/deploy.js`) through `gtm.js`'s `loadAnalytics()`.
Never hardcode the real container IDs in `index.html` — the staging deploy
workflow also withholds the production env vars as a second layer of defense.
SEO tags (`title`, description, canonical, OG/Twitter) are owned by the
`<SEO>` component on every route; don't add static copies of them back into
`index.html`, that just duplicates what Helmet injects. Full incident history
and reasoning: **AGENTS.md § Analytics And SEO** and **docs/DEVELOPER_GUIDE.md
§ Analytics (GTM / Clarity)** / **§ SEO**.

## Verification

Run `npm run lint` and `npm run build` before calling any change done. There
is no test suite — anything user-visible must be checked in a real browser at
the affected breakpoint(s). See **CLAUDE.md § Verification** and **AGENTS.md §
Validation**.

## Documentation Upkeep

When the stack, folder layout, a convention, the branch/deploy flow, or env
vars change, update `README.md`, `AGENTS.md`, `CLAUDE.md`, and
`docs/DEVELOPER_GUIDE.md` in the same change. Routine bug fixes and copy edits
don't need a doc update — say so explicitly rather than skipping it silently.
See **CLAUDE.md § Keeping docs current** and **AGENTS.md § Documentation
Upkeep**.
