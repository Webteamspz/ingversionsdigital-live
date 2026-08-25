# Playful Geometric Retheme — Design

## Goal
Reskin the existing site (colors, type, shape language, icons, decoration) to the "Playful Geometric" design system. No layout, section order, routing, or copy changes. Images/icons may change only where needed to fit the new visual language.

## Context
- React + Vite, plain CSS (CSS Modules + a few global `.css` files), no Tailwind.
- Tokens already centralized in `src/styles/style.css` (`:root`, dark/"night" default) and `src/styles/light-theme.css` (`html[data-theme="day"]` override). ~30 component CSS files consume these `--palette-*` vars but also hardcode some colors/shadows/radii locally.
- Day/night toggle lives in `src/components/Header/Header.jsx` (`themeMode` state, `data-theme` attribute, localStorage `magic-theme-mode`), styled in `Header.module.css`.
- Fonts: self-hosted Barlow via `@font-face` in `src/styles/fonts.css`.
- Icons for Services/WorkProcess/Engagement/AboutExpertise are `<img>` tags pointing at illustrated `.webp` files driven by `src/data/*.js`. Pricing comparison table uses `{ icon: "check" | "cross" }` string flags. No icon library installed.
- Real content images (project before/afters, team photos, client logos, hero photo) are actual portfolio assets — not part of the icon/decoration swap.

## Decisions (from brainstorming)
1. **Light-only.** Drop the day/night toggle entirely; ship a single cream/light Playful Geometric theme. Header always shows the existing `main-logo-day.png`. This removes the visible toggle control from the header — an intentional, approved exception to "no layout changes."
2. **Icons.** Install `lucide-react`. Replace illustrated `<img>` icons in Services, WorkProcess, Engagement, AboutExpertise, and Pricing comparison (check/cross) with Lucide icons inside colored circles, per spec's iconography rule.
3. **Fonts.** Google Fonts CDN `<link>` for `Outfit` (headings) + `Plus Jakarta Sans` (body) in `index.html` (preconnect already present). Remove Barlow `@font-face` block from `fonts.css`; leave the unused `.ttf` files on disk untouched.
4. **Scope.** Full site: Home, About, Team, Pricing, Projects, Blog listing/detail, Legal, Header, Footer, modals.
5. **Decoration level.** Full treatment: hard offset shadows, 2px chunky borders, pill buttons, dot-grid/confetti/blob decorations (CSS/inline SVG only, no new raster assets), wiggle/bounce hover motion, pricing "most popular" star badge + scale-up.

## Token changes
Merge to one light-only token block (drop `light-theme.css`'s conditional selector and `style.css`'s night block; keep a single `:root`):

| Token | Old (night default) | New |
|---|---|---|
| `--palette-bg-950` (page bg) | `#030303` | `#FFFDF5` |
| `--palette-bg-800` / `card` | `#141414` | `#FFFFFF` |
| `--palette-text-primary` | `#ffffff` | `#1E293B` |
| `--palette-text-secondary` | `#ffffffcc` | `#334155` (Slate 600-ish, body copy) |
| `--palette-text-muted` | `#ffffff99` | `#64748B` |
| `--palette-accent` | `#0a84ff` | `#8B5CF6` |
| `--palette-accent-strong` | `#1d4ed8` | `#7C3AED` (violet hover/active) |
| `--palette-border` | `#141414` | `#1E293B` @ 2px width |
| new `--secondary` | — | `#F472B6` |
| new `--tertiary` | — | `#FBBF24` |
| new `--quaternary` | — | `#34D399` |
| new `--radius-sm/md/lg/full` | — | `8px / 16px / 24px / 9999px` |
| new `--shadow-pop` / `-hover` / `-active` | — | `4px 4px 0 #1E293B` / `6px 6px 0 #1E293B` / `2px 2px 0 #1E293B` |
| new `--border-width` | — | `2px` |

Legacy duplicate vars (`--bg-900`, `--text-100`, etc.) point at the same new values so any straggling component reference doesn't break.

## Shared primitives (`style.css`)
- `.btn`: pill radius, `--border-width` solid dark border, `--shadow-pop`, hover = translate(-2px,-2px) + `--shadow-pop-hover`, active = translate(2px,2px) + `--shadow-pop-active`, `transition-timing-function: cubic-bezier(.34,1.56,.64,1)`.
- `.btn-hero` / `.c-btn` / `.social-btn` (secondary/ghost): transparent bg, dark border, no shadow, hover fills `--tertiary`.
- `.card`: white bg, dark 2px border, `--shadow-pop` (offset in `--border` gray by default, `--secondary` pink for featured), hover rotate(-1deg) scale(1.02).
- Inputs (global + `react-international-phone` overrides): 2px border, focus → accent border + hard accent shadow.
- `prefers-reduced-motion: reduce` guard added to the global transition rule to disable translate/rotate/scale hover effects.

## Per-component pass
For each of the ~30 component CSS files: replace hardcoded hex colors, `box-shadow`, and `border-radius` values with the new tokens/shared classes; no selector, DOM, or breakpoint changes. Notable spots:
- **Hero**: dot-grid pattern + big tertiary-yellow circle behind text (absolutely positioned, decorative, no layout shift); image gets blob border-radius.
- **Services / Features grid**: alternating accent/secondary/tertiary card header colors; dashed SVG connector behind the 3-card grid.
- **Pricing**: middle plan `scale(1.1)`, rotated (`-15deg`) yellow "MOST POPULAR" star badge; comparison table check/cross → Lucide `Check`/`X` in green/red circles.
- **Header/Footer**: remove toggle control and its styles/state; keep nav/link layout as-is, just recolor.

## Icon mapping (illustrative — final pick made during implementation, same visual role kept)
- AI → `Sparkles`, Blockchain → `Blocks`, Trading → `TrendingUp`, Analytics → `BarChart3` (AboutExpertise)
- A/B testing → `SplitSquareHorizontal`, Shopify → `ShoppingBag`, QA → `CheckCircle2`, WordPress → `Globe`, Landing page → `LayoutTemplate`, Lead → `Users` (Services)
- Discussion → `MessageSquare`, Plan → `ClipboardList`, Dev → `Code2`, Goal → `Target` (WorkProcess)
- Retainer/Hours/Project engagement → `Repeat`, `Clock`, `Briefcase` (Engagement)
- Pricing table `check`/`cross` → `Check` (green circle) / `X` (red circle)

Each swaps the current `<img>` for `<IconName className="..." />` wrapped in a colored circle `div`, colors rotating through accent/secondary/tertiary/quaternary. Circle sits half-in/half-out of card top border per spec where the current markup already has a floating icon slot; otherwise centered.

## Out of scope
No layout/grid/section reordering, no content/copy edits, no new routes, no Tailwind adoption, no new raster image assets, no changes to real content photos beyond their frame styling.

## Verification
- `npm run build` succeeds.
- Manual pass in browser: Home, About, Team, Pricing, Projects, Blog, Legal, header/footer, contact modal — check no layout shift, buttons/cards show hard-shadow + hover states, icons render, fonts load, no day/night toggle remnants, `prefers-reduced-motion` disables the bounce.
