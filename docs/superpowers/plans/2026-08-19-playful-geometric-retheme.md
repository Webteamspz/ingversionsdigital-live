# Playful Geometric Retheme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the existing site to the "Playful Geometric" design system (colors, type, shape language, icons, decoration) with zero layout/content/routing changes.

**Architecture:** All color/shape/radius/shadow values are read from CSS custom properties centralized in `src/styles/style.css`. Retheme = (1) rewrite those tokens once, (2) add a small set of shared primitive classes (`.btn`, `.card`, inputs) that most markup already targets, (3) sweep every component CSS file for hardcoded hex/shadow/radius values not covered by tokens and remap them per the deterministic rule table below, (4) swap illustrated `<img>` icons for `lucide-react` icons in colored circles, (5) delete the day/night toggle (light-only per approved design).

**Tech Stack:** React 19 + Vite, plain CSS Modules / global CSS (no Tailwind, no CSS-in-JS), `lucide-react` (new dependency, install in Task 5).

**Design doc:** `docs/superpowers/specs/2026-08-19-playful-geometric-retheme-design.md`

## Global Constraints

- No layout, DOM structure, section order, copy, or routing changes anywhere. Only color, font, radius, shadow, icon, and decorative-background changes.
- Light-only theme. No new dark mode.
- No new raster image assets. Decoration is CSS/inline-SVG only. Real content photos (project before/afters, team photos, client logos, hero photo) are untouched — only their frame (border/shadow/radius) changes.
- Only new dependency allowed: `lucide-react`.
- `npm run build` must succeed after every task.
- `src/components/StagingLogin/` is OUT OF SCOPE (internal staging tool, not part of the public site theme) — do not touch it in any task.
- Respect `prefers-reduced-motion: reduce` for all new hover/entrance motion.

## New Design Tokens (defined in Task 1, referenced by every later task)

```css
:root {
  /* Backgrounds */
  --palette-bg-950: #FFFDF5;   /* page bg */
  --palette-bg-900: #FDF9EC;   /* section bg, one shade down from page */
  --palette-bg-800: #FFFFFF;   /* card/panel bg */
  --palette-bg-700: #F1F5F9;   /* elevated surface */
  --palette-bg-600: #E2E8F0;   /* highest-elevation surface (table header rows) */

  /* Text */
  --palette-text-primary: #1E293B;
  --palette-text-secondary: #334155;
  --palette-text-muted: #64748B;
  --palette-text-subtle: #475569;

  /* Accent (primary brand = violet) */
  --palette-accent: #8B5CF6;
  --palette-accent-strong: #7C3AED;
  --palette-accent-soft: #A78BFA;

  /* Confetti palette */
  --secondary: #F472B6;   /* hot pink */
  --tertiary: #FBBF24;    /* amber */
  --quaternary: #34D399;  /* mint */

  /* Borders */
  --palette-border: #1E293B;
  --palette-border-soft: rgba(30, 41, 59, .12);
  --border-width: 2px;

  /* Hover / overlay */
  --palette-hover-surface: rgba(139, 92, 246, .08);
  --palette-hover-ghost: rgba(139, 92, 246, .06);
  --palette-overlay: rgba(30, 41, 59, .4);
  --palette-glow: rgba(30, 41, 59, .15);

  /* Radius scale */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;

  /* Hard "pop" shadow */
  --shadow-pop: 4px 4px 0 0 #1E293B;
  --shadow-pop-hover: 6px 6px 0 0 #1E293B;
  --shadow-pop-active: 2px 2px 0 0 #1E293B;
  --shadow-pop-soft: 8px 8px 0 0 var(--palette-border-soft);   /* non-featured card shadow */
  --shadow-pop-featured: 8px 8px 0 0 var(--secondary);          /* featured card shadow */

  /* Legacy aliases (older components still read these — keep pointed at the same new values) */
  --bg-900: var(--palette-bg-950);
  --bg-800: var(--palette-bg-700);
  --text-100: var(--palette-text-primary);
  --text-200: var(--palette-text-secondary);
  --text-300: var(--palette-text-muted);
  --card-800: var(--palette-bg-700);
  --accent-500: var(--palette-accent);
  --pill-500: var(--secondary);
  --muted-400: var(--palette-border-soft);

  --light-badge-bg: #F3E8FF;
  --light-badge-text: var(--palette-accent-strong);

  --light-logo-filter: none;
  --light-logo-filter-hover: none;
  --light-logo-opacity: 1;
}
```

## Global Substitution Rules (used by every per-component task below)

Apply these deterministic remaps to every hardcoded value found via the task's grep command. If a value truly matches none of these, pick the nearest token by role (a dark/near-black value → `var(--palette-text-primary)`, a white/near-white value used as a background → `var(--palette-bg-800)`) — do not invent a new hardcoded value.

| Found in source | Replace with |
|---|---|
| `border-radius: 16px` / `20px` (panel/card) | `var(--radius-lg)` |
| `border-radius: 10px` / `12px` on a `<button>`/`.btn`/tag element | `var(--radius-full)` |
| `border-radius: 10px` / `12px` on a non-button box (image frame, chip) | `var(--radius-md)` |
| `border-radius: 5px` / `6px` / `8px` (inputs, small chips) | `var(--radius-sm)` |
| `border-radius: 50%` / `999px` / `35px` (avatar, pill, circle) | unchanged — already correct primitive |
| `box-shadow: 0 Npx Npx rgba(0,0,0,.NN)` on a card/panel | `var(--shadow-pop-soft)` (or `var(--shadow-pop-featured)` if the card is a "featured/popular" variant) |
| `box-shadow: ...` inside a `:hover` rule on a card | `var(--shadow-pop-hover)` + add `transform: translate(-2px,-2px) rotate(-1deg)` if not already present |
| `box-shadow: ...` inside a `:hover`/`:active` rule on a button | `var(--shadow-pop-hover)` / `var(--shadow-pop-active)` respectively |
| `#0a84ff` / `#0A84FF` / `#1ea7ff` (any case, old accent) | `var(--palette-accent)` |
| `#0a84ff` with a trailing alpha suffix, e.g. `#0a84ff22`, `#0a84ff55`, `#0a84ff1a` | same alpha digits appended to the new accent hex: `#8B5CF622`, `#8B5CF655`, `#8B5CF61A` |
| `#fbbf24` | `var(--tertiary)` |
| `#141414`, `#1a1a1a`, `#0f172a`, `#101014`, `#2b2b30`, `#242424`, `#030303`, `#0b0b0b`, `#090909` used as a **background** | `var(--palette-bg-700)` |
| same values used as **text/icon color** | `var(--palette-text-primary)` |
| `#fff` / `#ffffff` used as a **background** (card, panel, circle) | `var(--palette-bg-800)` |
| `#fff` / `#ffffff` used as **text/icon color sitting on a saturated accent/secondary/tertiary/quaternary background** | leave as `#fff` (still correct — white on a saturated color passes contrast) |
| `#ff6b6b`, `#ff4d4f` (form error/danger states) | leave unchanged — semantic error red, out of palette scope |
| `#38bdf8` | `var(--palette-accent)` |
| `#173b5e` | `var(--palette-accent-strong)` |
| `#8592`-style values in `Projectsgrid.jsx` (these are truncated `rgba(...)`/hex in JS template strings, not CSS — read the actual line, they hold overlay alpha colors) | replace the color component with the new accent/text tokens, keep the same alpha; if inline in JS as a string, hardcode the resolved hex (JS can't read CSS vars) |
| `--react-international-phone-*` custom properties (Contact.module.css) | background vars → `var(--palette-bg-800)`; text-color var → `var(--palette-text-secondary)`; border-radius var → `var(--radius-sm)`; selector background/hover vars → `var(--palette-bg-700)` |
| any `html[data-theme="day"]` or `html[data-theme="night"]` selector block | delete the block; if it held the only definition of a rule, fold its declarations into the base (unqualified) selector instead |
| `font-family: Barlow, ...` on headings (`h1`-`h6`, `.section-title`, `.sectionTitle`, elements with `font-weight: 700/800` used as titles) | `"Outfit", system-ui, sans-serif` |
| `font-family: Barlow, ...` elsewhere (body copy) | `"Plus Jakarta Sans", system-ui, sans-serif` |

## Icon Mapping (Task 5–9)

| Data key / usage | Old asset | New `lucide-react` icon | Circle color (rotate per item) |
|---|---|---|---|
| AboutExpertise: ai | `ai.webp` | `Sparkles` | accent |
| AboutExpertise: blockchain | `blockchain.webp` | `Blocks` | secondary |
| AboutExpertise: trading | `trading.webp` | `TrendingUp` | tertiary |
| AboutExpertise: analytics | `analytics.webp` | `BarChart3` | quaternary |
| Services: ab-testing | `ab-testing.webp` | `SplitSquareHorizontal` | accent |
| Services: shopify | `shopify.webp` | `ShoppingBag` | secondary |
| Services: qa | `qa.webp` | `CheckCircle2` | tertiary |
| Services: wordpress | `wordpress.webp` | `Globe` | quaternary |
| Services: landing-page | `landing-page.webp` | `LayoutTemplate` | accent |
| Services: lead | `lead.webp` | `Users` | secondary |
| WorkProcess: project-discussion | `project-discussion.webp` | `MessageSquare` | accent |
| WorkProcess: plan | `plan.webp` | `ClipboardList` | secondary |
| WorkProcess: dev | `dev.webp` | `Code2` | tertiary |
| WorkProcess: goal | `goal.webp` | `Target` | quaternary |
| Engagement: retainer | `retainer.webp` | `Repeat` | accent |
| Engagement: hoursblock | `hoursblock.webp` | `Clock` | secondary |
| Engagement: projectengagement | `projectengagement.webp` | `Briefcase` | tertiary |
| Contact infoCards: email | inline SVG (envelope) | `Mail` | accent |
| Contact infoCards: phone | inline SVG (phone) | `Phone` | secondary |
| Contact infoCards: location | inline SVG (pin) | `MapPin` | tertiary |
| Pricing / PricingComparison: `check` | `tickmark.svg` | `Check` | quaternary (mint circle) |
| Pricing / PricingComparison: `cross` | `cross.svg` | `X` | `#FCA5A5`-tinted circle (kept semantic red, not in confetti palette) |
| Pricing carousel nav | `left.svg` / `right.svg` | `ChevronLeft` / `ChevronRight` | accent (no circle, matches existing nav-button chrome) |
| Footer social: Facebook/X/LinkedIn/Instagram | inline SVG (`sitedata.js:774-789`) | `Facebook`, `Twitter`, `Linkedin`, `Instagram` | `var(--palette-text-primary)` icon, existing circular button chrome |

Icon circle markup pattern to use everywhere above (matches spec's "never floating alone" rule):

```jsx
<span className={styles.iconCircle} style={{ background: "var(--tertiary)" }}>
  <Sparkles size={22} strokeWidth={2.5} color="#1E293B" />
</span>
```

```css
.iconCircle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  border: var(--border-width) solid var(--palette-border);
}
```

---

### Task 1: Core tokens, fonts, index.html

**Files:**
- Modify: `src/styles/style.css:1-63` (the `:root` block and `html[data-theme="night"]` block)
- Modify: `src/styles/light-theme.css` (entire file)
- Modify: `src/styles/fonts.css` (entire file)
- Modify: `index.html:8-18` (font links, `theme-color` meta)

**Interfaces:**
- Produces: the full token list in "New Design Tokens" above, available as `var(--palette-*)`, `var(--secondary)`, `var(--tertiary)`, `var(--quaternary)`, `var(--radius-*)`, `var(--shadow-pop*)`, `var(--border-width)` to every later task.

- [ ] **Step 1: Replace the `:root` block in `style.css`**

Replace lines 1-30 of `src/styles/style.css` (from `:root {` through its closing `}`) with the full token block shown in "New Design Tokens" above.

- [ ] **Step 2: Delete the `html[data-theme="night"]` block**

Delete `src/styles/style.css` lines 35-54 (the entire `html[data-theme="night"] { ... }` rule) — light-only now, the base `:root` is the only theme.

- [ ] **Step 3: Empty out `light-theme.css`**

Replace the entire contents of `src/styles/light-theme.css` with just a header comment:

```css
/* Light-only theme: all tokens now live in src/styles/style.css :root.
   This file intentionally left empty; kept so the existing @import in
   main.jsx doesn't need touching. */
```

- [ ] **Step 4: Replace `fonts.css`**

Replace the entire contents of `src/styles/fonts.css` with:

```css
/* Outfit (headings) + Plus Jakarta Sans (body) load via Google Fonts <link>
   in index.html. This file intentionally left empty; kept so the existing
   @import in main.jsx doesn't need touching. */
```

- [ ] **Step 5: Add font links and update theme-color in `index.html`**

In `index.html`, after the existing `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />` line (line 15), add:

```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500&display=swap" rel="stylesheet" />
```

Change line 13 `<meta name="theme-color" content="#030303" />` to `<meta name="theme-color" content="#FFFDF5" />`.

- [ ] **Step 6: Update body font-family in `style.css`**

In `src/styles/style.css`, change the `body { font-family: Barlow,... }` rule (around line 77) to `font-family: "Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`. Change the `.section-title` and mobile `.section-title`/`.sectionTitle` `font-family: Barlow` rules to `"Outfit", system-ui, sans-serif` and their `font-weight` to `800`.

- [ ] **Step 7: Verify**

Run: `npm run build`
Expected: build succeeds, no errors.

Run: `grep -rn "data-theme=\"night\"\|Barlow" src/styles/`
Expected: no matches.

- [ ] **Step 8: Commit**

```bash
git add src/styles/style.css src/styles/light-theme.css src/styles/fonts.css index.html
git commit -m "style: replace token palette with Playful Geometric light-only theme, swap fonts to Outfit/Plus Jakarta Sans"
```

---

### Task 2: Shared primitives (buttons, cards, inputs, reduced motion)

**Files:**
- Modify: `src/styles/style.css` (`.btn`, `.card`, `.btn-hero`/`.c-btn`/`.social-btn`, `.react-international-phone-*` global overrides, add reduced-motion guard)

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: `.btn` (pill, hard shadow), `.card` (bordered, hard shadow, hover wiggle), `.btn-hero`/`.c-btn`/`.social-btn` (ghost, fills tertiary on hover) — every later task's markup already references these class names, so no JSX changes needed here.

- [ ] **Step 1: Rewrite `.btn`**

Replace the existing `.btn` and `.btn:hover` rules in `src/styles/style.css` with:

```css
.btn {
  display: inline-flex;
  width: 100%;
  max-width: 162px;
  align-items: center;
  justify-content: center;
  padding: 14px 22px;
  border-radius: var(--radius-full);
  background: var(--palette-accent);
  color: #fff;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  text-decoration: none;
  border: var(--border-width) solid var(--palette-border);
  box-shadow: var(--shadow-pop);
  cursor: pointer;
  transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s cubic-bezier(.34,1.56,.64,1), background-color .3s ease;
}
.btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-pop-hover);
  background: var(--palette-accent-strong);
  color: #fff;
}
.btn:active {
  transform: translate(2px, 2px);
  box-shadow: var(--shadow-pop-active);
}
```

- [ ] **Step 2: Rewrite `.card`**

Replace the existing `.card` rule with:

```css
.card {
  background: var(--palette-bg-800);
  border: var(--border-width) solid var(--palette-border);
  border-radius: var(--radius-lg);
  padding: 22px;
  box-shadow: var(--shadow-pop-soft);
  transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s cubic-bezier(.34,1.56,.64,1);
}
.card:hover {
  transform: rotate(-1deg) scale(1.02);
  box-shadow: var(--shadow-pop-hover);
}
```

- [ ] **Step 3: Rewrite `.btn-hero`, `.c-btn`, `.social-btn`**

Replace the existing combined rule and its `:hover` with:

```css
.btn-hero,
.c-btn,
.social-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: var(--border-width) solid var(--palette-border);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--palette-text-primary);
  font-weight: 600;
  text-decoration: none;
  transition: all .3s cubic-bezier(.34,1.56,.64,1);
}
.btn-hero:hover,
.c-btn:hover,
.social-btn:hover {
  background: var(--tertiary);
  color: var(--palette-text-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-pop);
}
```

- [ ] **Step 4: Retheme the phone input global overrides**

In the `.react-international-phone-*` rules (around line 235-292 of `style.css`), replace every `background: var(--palette-bg-700)!important` with the same (unchanged — already token-based), and replace the hardcoded `border-radius: 5px` occurrences with `var(--radius-sm)`.

- [ ] **Step 5: Add reduced-motion guard**

After the existing global cross-fade transition rule (the `html, body, *, *::before, *::after { transition: ... }` block near the top of `style.css`), add:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
  }
  .btn:hover, .card:hover, .btn-hero:hover, .c-btn:hover, .social-btn:hover {
    transform: none !important;
  }
}
```

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: build succeeds.

Manually open the built site locally (`npm run preview` after build, or `npm run dev`) and confirm any visible button/card shows the pill shape / hard shadow.

- [ ] **Step 7: Commit**

```bash
git add src/styles/style.css
git commit -m "style: add Playful Geometric shared button/card/input primitives"
```

---

### Task 3: Remove day/night toggle, retheme Header

**Files:**
- Modify: `src/components/Header/Header.jsx`
- Modify: `src/components/Header/Header.module.css`

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: Header always renders with `logoDay` (`/assets/logos/main-logo-day.png`); no `themeMode` state, no `data-theme` attribute writes, no `magic-theme-mode` localStorage key.

- [ ] **Step 1: Remove toggle state and effects from `Header.jsx`**

Delete the `getInitialThemeMode` function (line ~94), the `const [themeMode, setThemeMode] = useState(getInitialThemeMode)` line (~115), and the `useEffect` that writes `data-theme`/`localStorage` (~135-139).

- [ ] **Step 2: Remove the toggle renderer and its two call sites**

Delete the `renderThemeToggle` function (~259-300) entirely. Remove its two call sites: `{renderThemeToggle(styles.mobileThemeToggle)}` (~356) and `{renderThemeToggle(styles.headerThemeToggle)}` (~436).

- [ ] **Step 3: Hardcode the logo**

Find the `src={themeMode === "day" ? logoDay : logo}` line (~406) and replace with `src={logoDay}`. Remove the now-unused `logo` import (`main-logo.png`) if nothing else in the file references it — keep the `logoDay` and `mobileLogo` imports.

- [ ] **Step 4: Delete toggle-only CSS**

In `Header.module.css`, delete every rule whose selector starts with `.themeToggle` (`.themeToggle`, `.themeToggleNight`, `.themeToggleThumb`, `.themeToggleBtn`, `.themeToggleBtnActive`, `.themeToggleIcon`, `.themeToggleIconSun`, `.themeToggleIconMoon`, `.mobileThemeToggle`, `.headerThemeToggle`) — this removes the block found at lines 283-342 in the earlier audit.

- [ ] **Step 5: Retheme remaining Header colors**

Apply the Global Substitution Rules table to any remaining hardcoded hex/shadow/radius left in `Header.module.css` after Step 4 (re-run the grep in Step 6 first to see what's left).

- [ ] **Step 6: Verify**

Run: `grep -n "themeMode\|data-theme\|magic-theme-mode" src/components/Header/Header.jsx`
Expected: no matches.

Run: `grep -nE "#[0-9a-fA-F]{3,8}" src/components/Header/Header.module.css`
Expected: no matches outside the Global Substitution Rules' explicit "leave unchanged" cases.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/Header/Header.jsx src/components/Header/Header.module.css
git commit -m "feat: remove day/night toggle, ship light-only Playful Geometric header"
```

---

### Task 4: Footer retheme + social icon swap

**Files:**
- Modify: `src/components/Footer/Footer.jsx`
- Modify: `src/components/Footer/Footer.module.css`
- Modify: `src/data/sitedata.js:774-789` (footer social icon entries)

**Interfaces:**
- Consumes: tokens from Task 1, `.iconCircle` pattern is NOT used here (footer socials use existing circular button chrome, per Icon Mapping table note) — install of `lucide-react` happens in Task 5; if Task 4 runs before Task 5 in execution order, run `npm install lucide-react` here instead (whichever task lands first performs the install; the other skips it).

- [ ] **Step 1: Install `lucide-react` if not already present**

Run: `npm ls lucide-react`
If not found, run: `npm install lucide-react`

- [ ] **Step 2: Replace inline SVG strings in `sitedata.js`**

In `src/data/sitedata.js` lines 774-789, the four social entries currently hold raw SVG path strings for Facebook, Twitter/X, LinkedIn, Instagram (identifiable by their icon shape). Replace the `icon: '<svg...>'` field on each with an icon key string instead: `icon: "facebook"`, `icon: "twitter"`, `icon: "linkedin"`, `icon: "instagram"` respectively (matching the order they appear).

- [ ] **Step 3: Render Lucide icons in `Footer.jsx`**

Find where `Footer.jsx` currently does `dangerouslySetInnerHTML` (or equivalent) to inject the social `icon` SVG string. Replace it with a lookup:

```jsx
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const SOCIAL_ICONS = { facebook: Facebook, twitter: Twitter, linkedin: Linkedin, instagram: Instagram };
```

Then render `const Icon = SOCIAL_ICONS[social.icon]; <Icon size={20} strokeWidth={2.5} />` in place of the old raw-SVG injection, keeping the existing wrapping `<a>`/button element and its className untouched.

- [ ] **Step 4: Remove Footer's `data-theme` logo logic**

`Footer.jsx` was found to reference `data-theme` (likely a logo swap like Header's). Apply the same fix as Task 3 Step 3: hardcode to the day/light logo variant, remove the conditional.

- [ ] **Step 5: Retheme `Footer.module.css`**

Apply the Global Substitution Rules table to the hardcoded values found (border-radius at lines 92, 229 in the earlier audit, plus any `data-theme` blocks).

- [ ] **Step 6: Verify**

Run: `grep -n "data-theme" src/components/Footer/Footer.jsx src/components/Footer/Footer.module.css`
Expected: no matches.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/Footer/Footer.jsx src/components/Footer/Footer.module.css src/data/sitedata.js
git commit -m "feat: retheme footer, swap social icons to lucide-react"
```

---

### Task 5: AboutExpertise icon swap + retheme

**Files:**
- Modify: `src/data/aboutusdata.js:60-85` (expertise icon entries)
- Modify: `src/components/AboutExpertise/AboutExpertise.jsx`
- Modify: `src/components/AboutExpertise/AboutExpertise.module.css`

**Interfaces:**
- Consumes: `.iconCircle` pattern (Icon Mapping section), tokens from Task 1.

- [ ] **Step 1: Install `lucide-react` if not already present**

Run: `npm ls lucide-react`
If not found, run: `npm install lucide-react`

- [ ] **Step 2: Replace icon paths in `aboutusdata.js`**

Per the Icon Mapping table, change each `icon: '/assets/about-expertise/X.webp'` to `icon: "ai" | "blockchain" | "trading" | "analytics"` (a key string matching the webp filename stem).

- [ ] **Step 3: Render Lucide icons in `AboutExpertise.jsx`**

Replace the `<img className={styles.icon} src={item.icon} .../>` usage with:

```jsx
import { Sparkles, Blocks, TrendingUp, BarChart3 } from "lucide-react";

const EXPERTISE_ICONS = { ai: Sparkles, blockchain: Blocks, trading: TrendingUp, analytics: BarChart3 };
const EXPERTISE_COLORS = { ai: "var(--palette-accent)", blockchain: "var(--secondary)", trading: "var(--tertiary)", analytics: "var(--quaternary)" };
```

```jsx
{(() => {
  const Icon = EXPERTISE_ICONS[item.icon];
  return (
    <span className={styles.iconCircle} style={{ background: EXPERTISE_COLORS[item.icon] }}>
      <Icon size={22} strokeWidth={2.5} color="#1E293B" />
    </span>
  );
})()}
```

Keep the surrounding wrapper element and its className exactly as before — only the `<img>` is replaced.

- [ ] **Step 4: Add `.iconCircle` to `AboutExpertise.module.css`**

Add the `.iconCircle` rule from the Icon Mapping section's shared pattern. Remove the old `.icon` rule if nothing else references it.

- [ ] **Step 5: Retheme remaining `AboutExpertise.module.css` values**

Apply the Global Substitution Rules table to lines 27-28, 35, 41, 97-98, 144 from the earlier audit.

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -n "\.webp" src/components/AboutExpertise/AboutExpertise.jsx`
Expected: no matches (no more webp icon imports/usages in this component; project photo webps elsewhere are unaffected).

- [ ] **Step 7: Commit**

```bash
git add src/data/aboutusdata.js src/components/AboutExpertise/AboutExpertise.jsx src/components/AboutExpertise/AboutExpertise.module.css
git commit -m "feat: swap about-expertise icons to lucide-react, retheme cards"
```

---

### Task 6: Services icon swap + retheme

**Files:**
- Modify: `src/data/sitedata.js:95-130` (services icon entries)
- Modify: `src/components/Services/Services.jsx`
- Modify: `src/components/Services/Services.module.css`

**Interfaces:**
- Consumes: `.iconCircle` pattern, tokens from Task 1.

- [ ] **Step 1: Replace icon paths in `sitedata.js`**

Per the Icon Mapping table, change each `icon: "/assets/services/X.webp"` (lines 100, 105, 110, 115, 120, 125) to a key string: `"ab-testing"`, `"shopify"`, `"qa"`, `"wordpress"`, `"landing-page"`, `"lead"`.

- [ ] **Step 2: Render Lucide icons in `Services.jsx`**

Both `<img className={styles.icon} src={s.icon} .../>` usages (lines 43 and 54, per earlier grep) get replaced the same way as Task 5 Step 3, using:

```jsx
import { SplitSquareHorizontal, ShoppingBag, CheckCircle2, Globe, LayoutTemplate, Users } from "lucide-react";

const SERVICE_ICONS = {
  "ab-testing": SplitSquareHorizontal, shopify: ShoppingBag, qa: CheckCircle2,
  wordpress: Globe, "landing-page": LayoutTemplate, lead: Users,
};
const SERVICE_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];
```

Pick the circle color by `SERVICE_COLORS[index % 4]` where `index` is the item's position in the list (rotating confetti effect per spec).

- [ ] **Step 3: Add `.iconCircle` to `Services.module.css`, retheme rest**

Add the shared `.iconCircle` rule; remove the old `.icon` rule at line 53/115 if unused after the swap. Apply Global Substitution Rules to any remaining hardcoded values in the file.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/data/sitedata.js src/components/Services/Services.jsx src/components/Services/Services.module.css
git commit -m "feat: swap services icons to lucide-react, retheme cards"
```

---

### Task 7: WorkProcess icon swap + retheme

**Files:**
- Modify: `src/data/sitedata.js:135-155` (work-process icon entries)
- Modify: `src/components/WorkProcess/WorkProcess.jsx`
- Modify: `src/components/WorkProcess/WorkProcess.module.css`

**Interfaces:**
- Consumes: `.iconCircle` pattern, tokens from Task 1.

- [ ] **Step 1: Replace icon paths in `sitedata.js`**

Change each `icon: "/assets/work-process/X.webp"` (lines 136, 141, 146, 151) to `"project-discussion"`, `"plan"`, `"dev"`, `"goal"`.

- [ ] **Step 2: Render Lucide icons in `WorkProcess.jsx`**

Same pattern as Task 6 Step 2, using:

```jsx
import { MessageSquare, ClipboardList, Code2, Target } from "lucide-react";

const PROCESS_ICONS = { "project-discussion": MessageSquare, plan: ClipboardList, dev: Code2, goal: Target };
const PROCESS_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];
```

- [ ] **Step 3: Add `.iconCircle` to `WorkProcess.module.css`, retheme rest**

Same as Task 6 Step 3.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/data/sitedata.js src/components/WorkProcess/WorkProcess.jsx src/components/WorkProcess/WorkProcess.module.css
git commit -m "feat: swap work-process icons to lucide-react, retheme cards"
```

---

### Task 8: Engagement icon swap + retheme

**Files:**
- Modify: `src/data/sitedata.js:160-195` (engagement icon entries)
- Modify: `src/components/Engagementmodels/Engagement.jsx`
- Modify: `src/components/Engagementmodels/Engagement.css`

**Interfaces:**
- Consumes: `.iconCircle` pattern, tokens from Task 1.

- [ ] **Step 1: Replace icon paths in `sitedata.js`**

Change each `icon: "/assets/engagement/X.webp"` (lines 162, 177, 192) to `"retainer"`, `"hoursblock"`, `"projectengagement"`.

- [ ] **Step 2: Render Lucide icons in `Engagement.jsx`**

```jsx
import { Repeat, Clock, Briefcase } from "lucide-react";

const ENGAGEMENT_ICONS = { retainer: Repeat, hoursblock: Clock, projectengagement: Briefcase };
const ENGAGEMENT_COLORS = { retainer: "var(--palette-accent)", hoursblock: "var(--secondary)", projectengagement: "var(--tertiary)" };
```

- [ ] **Step 3: Add `.iconCircle` to `Engagement.css`, retheme rest**

Apply the Global Substitution Rules table to lines 36, 46, 101, 103 from the earlier audit.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/data/sitedata.js src/components/Engagementmodels/Engagement.jsx src/components/Engagementmodels/Engagement.css
git commit -m "feat: swap engagement icons to lucide-react, retheme cards"
```

---

### Task 9: Contact retheme + icon swap

**Files:**
- Modify: `src/data/sitedata.js:308-317` (contact infoCards icon entries)
- Modify: `src/components/Contact/Contact.jsx`
- Modify: `src/components/Contact/Contact.module.css`
- Modify: `src/components/ContactModal/ContactModal.jsx`
- Modify: `src/components/ContactModal/ContactModal.css`

**Interfaces:**
- Consumes: `.iconCircle` pattern, tokens from Task 1.

- [ ] **Step 1: Replace icon SVG strings in `sitedata.js`**

Change the three `icon: '<svg...>'` values at lines 308, 312, 316 to `icon: "email"`, `icon: "phone"`, `icon: "location"` (matching their current order: envelope, phone, pin).

- [ ] **Step 2: Render Lucide icons in `Contact.jsx`**

Find where `Contact.jsx` injects `item.icon` (likely `dangerouslySetInnerHTML`). Replace with:

```jsx
import { Mail, Phone, MapPin } from "lucide-react";

const CONTACT_ICONS = { email: Mail, phone: Phone, location: MapPin };
const CONTACT_COLORS = { email: "var(--palette-accent)", phone: "var(--secondary)", location: "var(--tertiary)" };
```

rendered inside the existing `.iconCircle`-style wrapper (reuse whatever wrapper class already exists at that spot, adding `.iconCircle` styling to it in Step 4).

- [ ] **Step 3: Retheme `Contact.module.css`**

Apply the Global Substitution Rules table to the `--react-international-phone-*` custom properties (lines 5-14), the error border (line 29 — leave `#ff6b6b` per rules), and lines 42, 44, 67, 125, 157 from the earlier audit.

- [ ] **Step 4: Retheme `ContactModal.css`**

Apply the Global Substitution Rules table to lines 25, 31, 77 (leave `#ff4d4f`), 98, 124, 143-144, 148, 183, 188, 197, 201, 208, 210, 233-235, 256 from the earlier audit. The `#0a84ff22`/`#0a84ff55`/`#0a84ff1a` alpha-tinted values (lines 143-144, 201, 234-235) become `#8B5CF622`/`#8B5CF655`/`#8B5CF61A`.

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds.

Run: `grep -n "0a84ff" src/components/Contact/Contact.module.css src/components/ContactModal/ContactModal.css`
Expected: no matches.

- [ ] **Step 6: Commit**

```bash
git add src/data/sitedata.js src/components/Contact/Contact.jsx src/components/Contact/Contact.module.css src/components/ContactModal/ContactModal.jsx src/components/ContactModal/ContactModal.css
git commit -m "feat: retheme contact form and modal, swap info-card icons to lucide-react"
```

---

### Task 10: Pricing retheme + icon/badge swap

**Files:**
- Modify: `src/components/pricing/pricing.jsx`
- Modify: `src/components/pricing/pricing.module.css`
- Modify: `src/components/PricingComparison/PricingComparison.jsx`
- Modify: `src/components/PricingComparison/PricingComparison.css`
- Modify: `src/components/PricingHero/PricingHero.css`
- Modify: `src/components/PricingPlans/PricingPlans.css`
- Modify: `src/components/PricingFaq/PricingFaq.css`

**Interfaces:**
- Consumes: `.iconCircle` pattern, tokens from Task 1.

- [ ] **Step 1: Swap check/cross icons in `pricing.jsx`**

Remove the `checkIcon`/`crossIcon` imports from `/assets/pricing/tickmark.svg` and `/assets/pricing/cross.svg`. Replace the `<img className={styles.valueIcon} src={checkIcon} alt="Included" />` (and the analogous cross render) with:

```jsx
import { Check, X } from "lucide-react";
```

```jsx
t === "check"
  ? <span className={styles.valueIconCircle} style={{ background: "var(--quaternary)" }}><Check size={16} strokeWidth={3} color="#1E293B" /></span>
  : <span className={styles.valueIconCircle} style={{ background: "#FCA5A5" }}><X size={16} strokeWidth={3} color="#1E293B" /></span>
```

- [ ] **Step 2: Swap nav arrows in `pricing.jsx`**

Remove the `prevSvg`/`nextSvg` imports from `/assets/pricing/left.svg` and `/assets/pricing/right.svg`. Replace their `<img>` usages with `<ChevronLeft size={20} strokeWidth={2.5} />` / `<ChevronRight size={20} strokeWidth={2.5} />` (add to the same `lucide-react` import), keeping the existing button wrapper/className.

- [ ] **Step 3: Repeat Steps 1-2 for `PricingComparison.jsx`**

Same check/cross/nav-arrow swap, same import cleanup.

- [ ] **Step 4: Add `.valueIconCircle` to `pricing.module.css` and `PricingComparison.css`**

```css
.valueIconCircle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  border: var(--border-width) solid var(--palette-border);
}
```

- [ ] **Step 5: Most-popular badge treatment**

Find the plan marked as popular/featured (the `.pricingPlanBadge`/`.badge` usage identified earlier, driven from `src/data/pricingdata.js`). Add a `star` decoration: in the component JSX rendering the featured plan's badge, wrap the existing badge text with an added sibling span carrying a star glyph, e.g.:

```jsx
<span className={styles.popularStar} aria-hidden="true">★</span>
```

```css
.popularStar {
  position: absolute;
  top: -14px;
  right: -10px;
  color: var(--tertiary);
  font-size: 28px;
  transform: rotate(15deg);
}
```

Add `transform: scale(1.1); z-index: 1;` to the featured plan's card rule (find via the same `data.popular`/`featured` flag the badge already keys off) and `box-shadow: var(--shadow-pop-featured)`.

- [ ] **Step 6: Retheme remaining CSS in all 7 files**

Apply the Global Substitution Rules table to every remaining hardcoded value in `pricing.module.css`, `PricingComparison.css`, `PricingHero.css`, `PricingPlans.css`, `PricingFaq.css`. Delete every `html[data-theme="day"]` block found in `PricingHero.css` and `PricingPlans.css` (fold their declarations into the base selector where they were the only definition, per the rules table).

- [ ] **Step 7: Verify**

Run: `grep -n "tickmark.svg\|cross.svg\|left.svg\|right.svg\|data-theme" src/components/pricing/pricing.jsx src/components/PricingComparison/PricingComparison.jsx src/components/PricingHero/PricingHero.css src/components/PricingPlans/PricingPlans.css`
Expected: no matches.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 8: Commit**

```bash
git add src/components/pricing src/components/PricingComparison src/components/PricingHero src/components/PricingPlans src/components/PricingFaq
git commit -m "feat: retheme pricing pages, swap check/cross/nav icons to lucide-react, add popular-plan badge"
```

---

### Task 11: Hero retheme + decoration

**Files:**
- Modify: `src/components/Hero/Hero.module.css`

**Interfaces:**
- Consumes: tokens from Task 1.

- [ ] **Step 1: Retheme existing values**

Apply the Global Substitution Rules table to lines 55, 66, 90, 92, 118, 137, 139, 158, 184, 185, 192, 195 from the earlier audit (leave `#ff6b6b` at 192/195 — form error state).

- [ ] **Step 2: Add dot-grid + circle decoration**

Find the Hero's outer section rule (the class applied to the root `<section>`/wrapper). Add (without changing its `position`/layout properties if already set, only adding what's missing):

```css
.hero {
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--palette-border-soft) 1.5px, transparent 1.5px);
  background-size: 22px 22px;
  opacity: .5;
  z-index: 0;
  pointer-events: none;
}
.hero::after {
  content: "";
  position: absolute;
  top: -80px;
  left: -80px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: var(--tertiary);
  opacity: .35;
  z-index: 0;
  pointer-events: none;
}
```

Ensure the existing content wrapper element inside `.hero` has `position: relative; z-index: 1;` added so text/image stay above the new decoration (add this only if the element doesn't already establish a stacking context).

- [ ] **Step 3: Blob-mask the hero image**

Find the hero visual image's class (referenced from `.hero-visual-img` in `style.css`, or the module's own image class). Add:

```css
border-radius: 24px 24px 24px 4px;
border: var(--border-width) solid var(--palette-border);
box-shadow: var(--shadow-pop-soft);
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds.

Visually confirm in browser: decorative circle/dots sit behind text, don't overlap or shift the CTA button/copy position.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero/Hero.module.css
git commit -m "feat: retheme hero, add dot-grid and circle decoration"
```

---

### Task 12: Home page remaining components retheme

**Files:**
- Modify: `src/components/WhyChooseUs/WhyChooseUs.module.css`
- Modify: `src/components/TrackRecord/TrackRecord.module.css`
- Modify: `src/components/Reviews/Reviews.module.css`
- Modify: `src/components/BlogSlider/BlogSlider.css`
- Modify: `src/components/FAQ/FAQ.module.css`
- Modify: `src/components/CompanyLogos/CompanyLogos.module.css`

**Interfaces:**
- Consumes: tokens from Task 1, `.card`/`.btn` primitives from Task 2.

- [ ] **Step 1: Retheme each file**

For each file, run `grep -nE "#[0-9a-fA-F]{3,8}|box-shadow|border-radius|data-theme" <file>` and apply the Global Substitution Rules table to every match. Known spots from the earlier audit: `Reviews.module.css:95,120` (the `#0A84FF` at 120 → `var(--palette-accent)`); `BlogSlider.css:39,41,68,71,117,138,140,162,164`; `FAQ.module.css:20,55` (the `outline: 2px solid #0a84ff` at 55 → `outline: 2px solid var(--palette-accent)`); `CompanyLogos.module.css` — delete its `data-theme` block per the rules table (the logo dim/brighten-on-hover behavior collapses to a single light-mode rule).

- [ ] **Step 2: Verify**

Run: `grep -rn "data-theme\|0a84ff" src/components/WhyChooseUs src/components/TrackRecord src/components/Reviews src/components/BlogSlider src/components/FAQ src/components/CompanyLogos`
Expected: no matches.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/WhyChooseUs src/components/TrackRecord src/components/Reviews src/components/BlogSlider src/components/FAQ src/components/CompanyLogos
git commit -m "style: retheme remaining home-page sections to Playful Geometric"
```

---

### Task 13: About pages retheme

**Files:**
- Modify: `src/components/AboutCta/AboutCta.css`
- Modify: `src/components/AboutHero/AboutHero.css`
- Modify: `src/components/AboutValues/AboutValues.css`

**Interfaces:**
- Consumes: tokens from Task 1.

Note: `src/components/AboutStory/AboutStory.css`, `src/components/AboutTrack/AboutTrack.css`, `src/pages/AboutUs/AboutUs.css` were confirmed to contain zero hardcoded hex/shadow/radius values (grep-verified during planning) — they inherit the new look automatically from the token change in Task 1. Do not edit them in this task.

- [ ] **Step 1: Retheme each file**

Apply the Global Substitution Rules table: `AboutCta.css:8-9,40,42`; `AboutHero.css:19,53-55,79,81,112-114` (the `-webkit-box-shadow`/`box-shadow` pair at 53-55 and 112-114 both need the same `var(--shadow-pop-soft)` treatment, keep both prefixed and unprefixed declarations); `AboutValues.css:25`.

- [ ] **Step 2: Verify**

Run: `grep -nE "#[0-9a-fA-F]{3,8}" src/components/AboutCta/AboutCta.css src/components/AboutHero/AboutHero.css src/components/AboutValues/AboutValues.css`
Expected: no matches (`color: #fff` on accent-background elements is allowed per the rules table — confirm any remaining hit is one of those, not a stray).

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutCta/AboutCta.css src/components/AboutHero/AboutHero.css src/components/AboutValues/AboutValues.css
git commit -m "style: retheme about pages to Playful Geometric"
```

---

### Task 14: Team pages retheme

**Files:**
- Modify: `src/components/Team/Team.module.css`
- Modify: `src/components/TeamCard/TeamCard.module.css`
- Modify: `src/components/TeamGrid/TeamGrid.module.css`
- Modify: `src/components/TeamHero/TeamHero.module.css`

**Interfaces:**
- Consumes: tokens from Task 1, `.card` primitive from Task 2.

Note: `src/pages/TeamPage/TeamPage.module.css` was confirmed to contain zero hardcoded hex/shadow/radius values (grep-verified during planning) — skip it, it inherits from tokens.

- [ ] **Step 1: Retheme each file**

Apply the Global Substitution Rules table: `Team.module.css:39`; `TeamCard.module.css:56-57,61,93,95` (the `#eef2ff` at 56 is a light tint background → `var(--palette-bg-700)`; `#a6a9c6`/`#6b7280` text tints → `var(--palette-text-muted)`); `TeamGrid.module.css:7` (`border-radius: 18px` → `var(--radius-lg)`); `TeamHero.module.css:25`.

- [ ] **Step 2: Verify**

Run: `grep -rn "0a84ff\|data-theme" src/components/Team src/components/TeamCard src/components/TeamGrid src/components/TeamHero`
Expected: no matches.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Team src/components/TeamCard src/components/TeamGrid src/components/TeamHero
git commit -m "style: retheme team pages to Playful Geometric"
```

---

### Task 15: Projects pages retheme

**Files:**
- Modify: `src/components/ProjectsHero/ProjectsHero.module.css`
- Modify: `src/components/Projectsgrid/Projectsgrid.module.css`
- Modify: `src/components/Projectsgrid/Projectsgrid.jsx`
- Modify: `src/components/ProjectSlider/ProjectsSlider.module.css`
- Modify: `src/components/Projectscta/Projectscta.module.css`

**Interfaces:**
- Consumes: tokens from Task 1, `.card` primitive from Task 2.

Note: `src/components/ProjectsPage/ProjectsPage.module.css` was confirmed to contain zero hardcoded hex/shadow/radius values (grep-verified during planning) — skip it.

- [ ] **Step 1: Retheme `Projectsgrid.module.css`**

This file has the most hits (from the earlier audit: lines 56, 132, 143, 157, 165, 170, 178, 183, 192, 241, 251-252, 259, 268, 365, 370). Apply the Global Substitution Rules table to each — most are `#141414`/`#090909` (dark surfaces → `var(--palette-bg-700)`), `#fff` (→ `var(--palette-bg-800)` if background, unchanged if text-on-accent), and `#0a84ff` (→ `var(--palette-accent)`).

- [ ] **Step 2: Retheme `Projectsgrid.jsx` inline color strings**

Read the four lines flagged in planning (67, 68, 152, 176 — inline JS strings holding rgba/hex overlay colors, not CSS custom properties since JS can't read `var()`). Replace the color component of each with the resolved hex for the token it represents (e.g. an old `rgba(10,132,255,X)` overlay becomes `rgba(139,92,246,X)` — same alpha, new accent RGB), keeping the alpha value unchanged.

- [ ] **Step 3: Retheme remaining files**

Apply the Global Substitution Rules table to `ProjectsHero.module.css:58,70`; `ProjectsSlider.module.css:33,35,84,87,124,134,169,179` (the `color: #fff`/`background: #fff` occurrences sit on accent-colored nav buttons/dots — per the rules table, leave `#fff` text-on-accent as-is, but `background: #fff` at line 134 is a card/panel surface → `var(--palette-bg-800)`); `Projectscta.module.css:42`.

- [ ] **Step 4: Verify**

Run: `grep -rn "0a84ff\|#141414\|#090909" src/components/ProjectsHero src/components/Projectsgrid src/components/ProjectSlider src/components/Projectscta`
Expected: no matches.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectsHero src/components/Projectsgrid src/components/ProjectSlider src/components/Projectscta
git commit -m "style: retheme projects pages to Playful Geometric"
```

---

### Task 16: Legal + NotFound retheme

**Files:**
- Modify: `src/pages/Legal/Legal.css`
- Modify: `src/pages/NotFound/NotFound.css`

**Interfaces:**
- Consumes: tokens from Task 1.

- [ ] **Step 1: Retheme `Legal.css`**

Apply the Global Substitution Rules table to line 20 (`#173b5e` → `var(--palette-accent-strong)`). Delete any `html[data-theme="day"]` block per the rules table (Legal.css was found to reference `data-theme` in the earlier audit — locate and remove/fold it).

- [ ] **Step 2: Retheme `NotFound.css`**

Apply the Global Substitution Rules table to lines 20 (`#38bdf8` → `var(--palette-accent)`, `#0a84ff` → `var(--palette-accent)`) and 36 (`#fff`).

- [ ] **Step 3: Verify**

Run: `grep -n "0a84ff\|38bdf8\|173b5e\|data-theme" src/pages/Legal/Legal.css src/pages/NotFound/NotFound.css`
Expected: no matches.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Legal/Legal.css src/pages/NotFound/NotFound.css
git commit -m "style: retheme legal and 404 pages to Playful Geometric"
```

---

### Task 17: Full-site verification pass

**Files:** none (verification only)

**Interfaces:** none.

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: succeeds with no errors or warnings about missing imports (confirms every removed `.webp`/`.svg` icon import was actually cleaned up across Tasks 5-10).

- [ ] **Step 2: Repo-wide leftover scan**

Run: `grep -rn "0a84ff\|1ea7ff\|data-theme=\"night\"\|data-theme=\"day\"" src --include=*.css --include=*.jsx -i`
Expected: no matches anywhere in `src` (excluding `src/components/StagingLogin`, which is out of scope).

Run: `grep -rln "Barlow" src/styles src/components src/pages`
Expected: no matches.

- [ ] **Step 3: Manual browser pass**

Run: `npm run dev`, open the site, and check each route: `/`, `/pricing`, `/about-us`, `/teampage`, `/projects`, `/blog` (or its listing route), a Legal page, and a 404 URL. For each: confirm no layout shift vs. the pre-theme version, buttons show pill shape + hard shadow + hover lift, cards show border + hard shadow + hover wiggle, all icons render (no broken image icons from removed `.webp`/`.svg` imports), fonts are Outfit (headings) / Plus Jakarta Sans (body), the header/footer show no leftover day/night toggle control, and the pricing page's featured plan shows the scaled card + star badge.

Toggle OS-level "reduce motion" and confirm hover bounce/rotate effects stop.

- [ ] **Step 4: Final commit (only if Step 3 surfaced fixes)**

If manual QA required touch-ups, stage exactly those files and commit:

```bash
git add -A
git commit -m "fix: address visual QA issues from Playful Geometric retheme pass"
```

If no fixes were needed, skip this step — nothing to commit.

---

## Amendments (added after Task 17's verification pass surfaced real gaps)

Task 17's repo-wide leftover scan (build + grep, no browser available in this environment) found two genuine regressions that no prior task's file scope covered:

1. `Footer.jsx` hardcodes its own non-data-driven contact-icon SVGs (`fill="#0A84FF"`) separate from the social icons Task 4 fixed and separate from Contact.jsx's identical icons Task 9 fixed — neither task's grep ever saw this literal JSX block.
2. Task 1 only migrated fonts on the global `body`/`.section-title` rules; ~50 per-component `font-family: Barlow` declarations across 20 files were never touched, since no task's Files list or verification step ever grepped component CSS specifically for `Barlow`.

Two follow-up tasks close these gaps:

### Task 18: Fix remaining old-accent leftovers found by Task 17
Full brief: `.superpowers/sdd/2026-08-19-playful-geometric-retheme/task-18-brief.md`. Swaps Footer.jsx's hardcoded contact-icon SVGs to `lucide-react` (`Mail`/`Phone`/`MapPin`), retones `.skip-link`'s hardcoded accent hex in `style.css`.

### Task 19: Sweep remaining hardcoded `Barlow` font-family declarations sitewide
Full brief: `.superpowers/sdd/2026-08-19-playful-geometric-retheme/task-19-brief.md`. Applies the same heading→Outfit / body→Plus Jakarta Sans rule Task 1 used globally, to all ~50 per-component declarations across 20 files.

### Task 20: Re-run Task 17's verification
Same build + repo-wide grep scans as Task 17, to confirm both gaps are closed and no new ones were introduced.
