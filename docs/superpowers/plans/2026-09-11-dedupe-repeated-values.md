# Dedupe Repeated Values Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate 7 values/helpers that are independently copy-pasted across multiple files into a single source of truth each, with no visible or behavioral change to the site.

**Architecture:** Pure refactor. Each task replaces N duplicate literals/implementations with one definition + N references to it. No new files, no new dependencies, no route or data-shape changes visible to consumers of `src/data/*.js`.

**Tech Stack:** React 19 + Vite 7 (plain JSX, no TypeScript), CSS Modules, `:root` design tokens in `src/styles/style.css`.

## Global Constraints

- No unit-test suite exists in this repo (per `AGENTS.md`). Verification per task is: grep to confirm the old pattern is gone, `npm run lint`, and (task 8) `npm run build` + manual browser check.
- Do not touch the eight production-excluded files (not relevant here — no plan task touches them).
- Do not change any rendered value, URL, color, or timing — only where it is defined.
- Follow existing import/path conventions exactly (relative paths as shown in each task).
- Commit after each task with a plain, factual message (no marketing language).

---

### Task 1: Single-source the Calendly booking URL

**Files:**
- Modify: `src/data/sitedata.js:1-14, 455-478` (add `export const CALENDLY_URL`, replace 6 literals)
- Modify: `src/data/pricingdata.js:1-66` (add import, replace 5 literals)
- Modify: `src/data/aboutusdata.js:1-96` (add import, replace 2 literals)
- Modify: `src/data/projectsdata.js:1-182` (add import, replace 1 literal)
- Modify: `src/components/Hero/Hero.jsx:1-111` (add import, remove local `REDIRECT_URL` const, replace 1 usage)

**Interfaces:**
- Produces: `export const CALENDLY_URL` from `src/data/sitedata.js`, value `"https://calendly.com/ingversionsdigital/30min"`. Every other task/file that needs the booking URL imports this.

- [ ] **Step 1: Add the constant and use it in `sitedata.js`**

In `src/data/sitedata.js`, add the export before the default export (currently line 1 is `export default {`):

```js
export const CALENDLY_URL = "https://calendly.com/ingversionsdigital/30min";

export default {
```

Then replace each of these 6 lines (all currently `href: "https://calendly.com/ingversionsdigital/30min",`) at lines 13, 22, 461, 466, 471, 476 with:

```js
      href: CALENDLY_URL,
```

(Keep each line's original indentation — line 13 and 22 are indented 6 spaces, lines 461/466/471/476 are indented 12 spaces. Only the value changes.)

- [ ] **Step 2: Verify no raw literal remains in `sitedata.js`**

Run: `grep -n "calendly.com" src/data/sitedata.js`
Expected: only the one line defining `CALENDLY_URL` itself.

- [ ] **Step 3: Use the constant in `pricingdata.js`**

Add to the top of `src/data/pricingdata.js` (before `export const pricingHeroData`):

```js
import { CALENDLY_URL } from "./sitedata";

```

Replace line 7 `primaryHref: "https://calendly.com/ingversionsdigital/30min",` with:

```js
  primaryHref: CALENDLY_URL,
```

Replace lines 24, 37, 52, 65 (each `ctaHref: "https://calendly.com/ingversionsdigital/30min"`) with:

```js
    ctaHref: CALENDLY_URL
```

- [ ] **Step 4: Use the constant in `aboutusdata.js`**

Add to the top of `src/data/aboutusdata.js`:

```js
import { CALENDLY_URL } from "./sitedata";

```

Replace line 11 `primaryCtaHref: 'https://calendly.com/ingversionsdigital/30min',` with:

```js
  primaryCtaHref: CALENDLY_URL,
```

Replace line 95 `primaryHref: 'https://calendly.com/ingversionsdigital/30min'` with:

```js
  primaryHref: CALENDLY_URL
```

- [ ] **Step 5: Use the constant in `projectsdata.js`**

Add to the top of `src/data/projectsdata.js` (before `const projectsData = {`):

```js
import { CALENDLY_URL } from "./sitedata";

```

Replace line 181 `buttonLink: "https://calendly.com/ingversionsdigital/30min",` with:

```js
    buttonLink: CALENDLY_URL,
```

- [ ] **Step 6: Use the constant in `Hero.jsx`**

In `src/components/Hero/Hero.jsx`, add to the existing import block (line 3 currently `import data from "../../data/sitedata";`):

```js
import data, { CALENDLY_URL } from "../../data/sitedata";
```

Delete line 11 entirely: `const REDIRECT_URL = "https://calendly.com/ingversionsdigital/30min";`

Replace line 111 `if (res.ok) window.location.href = REDIRECT_URL;` with:

```js
      if (res.ok) window.location.href = CALENDLY_URL;
```

- [ ] **Step 7: Verify no raw literal remains anywhere**

Run: `grep -rn "calendly.com/ingversionsdigital" src/`
Expected: only the one definition line in `src/data/sitedata.js`.

- [ ] **Step 8: Lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 9: Commit**

```bash
git add src/data/sitedata.js src/data/pricingdata.js src/data/aboutusdata.js src/data/projectsdata.js src/components/Hero/Hero.jsx
git commit -m "Single-source the Calendly booking URL"
```

---

### Task 2: Reuse the existing `isExternalHref` util

**Files:**
- Modify: `src/components/Header/Header.jsx:47-50` (delete local copy, add import)
- Modify: `src/components/Footer/Footer.jsx:1-3, 85-92` (delete inline logic, add import)

**Interfaces:**
- Consumes: `isExternalHref(href: string): boolean` from `src/utils/url.js` (already exists, unchanged).

- [ ] **Step 1: Update `Header.jsx`**

Delete lines 47-50:

```js
const isExternalHref = (href = "") =>
  /^https?:\/\//i.test(href) ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");
```

Add to the import block at the top of the file (after line 8 `import { ctaClick, dl } from "../../gtm";`):

```js
import { isExternalHref } from "../../utils/url";
```

Leave every call site (`isExternalHref(href)` etc. at the former lines 176, 209, 327) unchanged — they already call it as a function, so no call-site edits are needed once the import resolves the name.

- [ ] **Step 2: Update `Footer.jsx`**

Add to the top of the file (after line 1 `import { Link } from "react-router-dom";`):

```js
import { isExternalHref } from "../../utils/url";
```

Replace lines 85-88:

```js
                  const isExternal =
                    l.href.startsWith("http") ||
                    l.href.startsWith("mailto:") ||
                    l.href.startsWith("tel:");
```

with:

```js
                  const isExternal = isExternalHref(l.href);
```

- [ ] **Step 3: Verify no reimplementation remains**

Run: `grep -n "startsWith(\"http\")\|startsWith(\"mailto\|startsWith(\"tel" src/components/Header/Header.jsx src/components/Footer/Footer.jsx`
Expected: no output.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header/Header.jsx src/components/Footer/Footer.jsx
git commit -m "Reuse the shared isExternalHref util in Header and Footer"
```

---

### Task 3: Reuse the existing `useIsMobile` hook

**Files:**
- Modify: `src/components/AboutExpertise/AboutExpertise.jsx:1, 24-32`
- Modify: `src/components/ProjectsGrid/ProjectsGrid.jsx:1, 6-7, 76-90`

**Interfaces:**
- Consumes: `useIsMobile(breakpoint = 768): boolean` (default export) from `src/hooks/useIsMobile.js` — unchanged, already used elsewhere (`WhyChooseUs`, `Services`, `Reviews`, `EngagementModels`, `AboutValues`).
- Note: `ProjectsGrid.jsx` currently uses `window.innerWidth <= 767.98`; the hook uses `window.innerWidth < 768`. These are equivalent for integer CSS pixel widths (there is no `767.5`), so switching introduces no behavior change.

- [ ] **Step 1: Update `AboutExpertise.jsx`**

Replace line 1:

```js
import { useState, useEffect } from "react";
```

Delete this line entirely — after this change nothing in the file calls `useState` or `useEffect` directly (only the custom hook is used).

Add near the top of the import block (after line 5 `import { Sparkles, Blocks, TrendingUp, BarChart3 } from "lucide-react";`):

```js
import useIsMobile from "../../hooks/useIsMobile";
```

Replace lines 25-32:

```js
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
```

with:

```js
  const isMobile = useIsMobile();
```

- [ ] **Step 2: Update `ProjectsGrid.jsx`**

Replace line 1 (unchanged, `useEffect`/`useState` are still used for `visibleCount`/`selectedProject`/the slider — keep as-is):

```js
import { useEffect, useState } from "react";
```

Add after it:

```js
import useIsMobile from "../../hooks/useIsMobile";
```

Delete line 7: `const MOBILE_BREAKPOINT = 767.98;` (keep line 6 `const INITIAL_MOBILE_COUNT = 6;`).

Replace lines 76-90:

```js
const ProjectsGrid = ({ projects }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(projects.length);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setVisibleCount(mobile ? INITIAL_MOBILE_COUNT : projects.length);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [projects.length]);

  useEffect(() => {
    setVisibleCount(isMobile ? INITIAL_MOBILE_COUNT : projects.length);
  }, [projects, isMobile]);
```

with:

```js
const ProjectsGrid = ({ projects }) => {
  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState(projects.length);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setVisibleCount(isMobile ? INITIAL_MOBILE_COUNT : projects.length);
  }, [projects, isMobile]);
```

(The old first `useEffect` is fully removed — the shared hook already does the initial check + resize listener. The second `useEffect`, which reacts to `isMobile` changing, is kept unchanged.)

- [ ] **Step 3: Verify no reimplementation remains**

Run: `grep -n "MOBILE_BREAKPOINT\|window.innerWidth" src/components/AboutExpertise/AboutExpertise.jsx src/components/ProjectsGrid/ProjectsGrid.jsx`
Expected: no output.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no new errors (confirms no unused-import/unused-var issues from the deleted `useState`/`useEffect` import in `AboutExpertise.jsx`).

- [ ] **Step 5: Commit**

```bash
git add src/components/AboutExpertise/AboutExpertise.jsx src/components/ProjectsGrid/ProjectsGrid.jsx
git commit -m "Reuse the shared useIsMobile hook in AboutExpertise and ProjectsGrid"
```

---

### Task 4: Use the existing `--shadow-pop*` tokens instead of raw values

**Files:**
- Modify: `src/components/AboutHero/AboutHero.module.css:35`
- Modify: `src/components/AboutCta/AboutCta.module.css:54,60,64`
- Modify: `src/pages/Legal/Legal.module.css:36`
- Modify: `src/components/Hero/HeroV2.module.css:39`
- Modify: `src/components/ProjectsHero/ProjectsHero.module.css:34`
- Modify: `src/components/Reviews/Reviews.module.css:43,76,117,120`
- Modify: `src/components/PricingHero/PricingHero.module.css:31`
- Modify: `src/components/ProjectsCTA/ProjectsCTA.module.css:55,61,65`
- Modify: `src/components/TeamHero/TeamHero.module.css:32`

**Interfaces:**
- Consumes: `--shadow-pop` (`4px 4px 0 0 var(--palette-border)`), `--shadow-pop-hover` (`6px 6px 0 0 var(--palette-border)`), `--shadow-pop-active` (`2px 2px 0 0 var(--palette-border)`) — already defined in `src/styles/style.css:30-32`, values verified identical to every raw occurrence below.

- [ ] **Step 1: Replace each raw value with its token**

In every file/line listed, replace the raw box-shadow value with the matching `var(--shadow-pop...)` call, keeping the exact original trailing punctuation (`;` or none) and surrounding property untouched. Mapping: `4px 4px 0 0 var(--palette-border)` → `var(--shadow-pop)`; `6px 6px 0 0 var(--palette-border)` → `var(--shadow-pop-hover)`; `2px 2px 0 0 var(--palette-border)` → `var(--shadow-pop-active)`.

| File | Line | Before | After |
|---|---|---|---|
| `AboutHero.module.css` | 35 | `  box-shadow: 4px 4px 0 0 var(--palette-border);` | `  box-shadow: var(--shadow-pop);` |
| `AboutCta.module.css` | 54 | `  box-shadow: 4px 4px 0 0 var(--palette-border);` | `  box-shadow: var(--shadow-pop);` |
| `AboutCta.module.css` | 60 | `  box-shadow: 6px 6px 0 0 var(--palette-border)` | `  box-shadow: var(--shadow-pop-hover)` |
| `AboutCta.module.css` | 64 | `  box-shadow: 2px 2px 0 0 var(--palette-border)` | `  box-shadow: var(--shadow-pop-active)` |
| `Legal.module.css` | 36 | `  box-shadow: 4px 4px 0 0 var(--palette-border);` | `  box-shadow: var(--shadow-pop);` |
| `HeroV2.module.css` | 39 | `  box-shadow: 4px 4px 0 0 var(--palette-border);` | `  box-shadow: var(--shadow-pop);` |
| `ProjectsHero.module.css` | 34 | `  box-shadow: 4px 4px 0 0 var(--palette-border);` | `  box-shadow: var(--shadow-pop);` |
| `Reviews.module.css` | 43 | `  box-shadow: 6px 6px 0 0 var(--palette-border)` | `  box-shadow: var(--shadow-pop-hover)` |
| `Reviews.module.css` | 76 | `  box-shadow: 2px 2px 0 0 var(--palette-border);` | `  box-shadow: var(--shadow-pop-active);` |
| `Reviews.module.css` | 117 | `    box-shadow: 4px 4px 0 0 var(--palette-border)` | `    box-shadow: var(--shadow-pop)` |
| `Reviews.module.css` | 120 | `    box-shadow: 2px 2px 0 0 var(--palette-border)` | `    box-shadow: var(--shadow-pop-active)` |
| `PricingHero.module.css` | 31 | `  box-shadow: 4px 4px 0 0 var(--palette-border);` | `  box-shadow: var(--shadow-pop);` |
| `ProjectsCTA.module.css` | 55 | `  box-shadow: 4px 4px 0 0 var(--palette-border);` | `  box-shadow: var(--shadow-pop);` |
| `ProjectsCTA.module.css` | 61 | `  box-shadow: 6px 6px 0 0 var(--palette-border)` | `  box-shadow: var(--shadow-pop-hover)` |
| `ProjectsCTA.module.css` | 65 | `  box-shadow: 2px 2px 0 0 var(--palette-border)` | `  box-shadow: var(--shadow-pop-active)` |
| `TeamHero.module.css` | 32 | `  box-shadow: 4px 4px 0 0 var(--palette-border);` | `  box-shadow: var(--shadow-pop);` |

- [ ] **Step 2: Verify no raw value remains**

Run: `grep -rn "box-shadow: [0-9]px [0-9]px 0 0 var(--palette-border" src/`
Expected: no output.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutHero/AboutHero.module.css src/components/AboutCta/AboutCta.module.css src/pages/Legal/Legal.module.css src/components/Hero/HeroV2.module.css src/components/ProjectsHero/ProjectsHero.module.css src/components/Reviews/Reviews.module.css src/components/PricingHero/PricingHero.module.css src/components/ProjectsCTA/ProjectsCTA.module.css src/components/TeamHero/TeamHero.module.css
git commit -m "Use the shared shadow-pop tokens instead of raw box-shadow values"
```

---

### Task 5: Add a `--transition-pop-card` token and use it everywhere

**Files:**
- Modify: `src/styles/style.css:29-34, 135, 153` (add token, use it in `.btn`/`.card`)
- Modify 20 component/page CSS files listed in Step 3 below.

**Interfaces:**
- Produces: `--transition-pop-card` on `:root` in `src/styles/style.css`, value `transform .3s cubic-bezier(.34, 1.56, .64, 1), box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)`.

Only lines whose `transition` value contains **both** a `transform` and a `box-shadow` component at `.3s cubic-bezier(.34, 1.56, .64, 1)` are in scope — this is the exact duplicated pattern. Lines with only `transform` (no `box-shadow`), a different duration (e.g. `.35s`), or a different property (`all`, `opacity`) are a different pattern and are left untouched (no behavior change risk).

- [ ] **Step 1: Add the token**

In `src/styles/style.css`, after line 34 (`  --shadow-pop-featured: 8px 8px 0 0 var(--secondary);`), add:

```css
  --transition-pop-card: transform .3s cubic-bezier(.34, 1.56, .64, 1), box-shadow .3s cubic-bezier(.34, 1.56, .64, 1);
```

- [ ] **Step 2: Use it in the two base classes in the same file**

Replace line 135:

```css
  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1),background-color .3s ease
```

with:

```css
  transition: var(--transition-pop-card), background-color .3s ease
```

Replace line 153:

```css
  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)
```

with:

```css
  transition: var(--transition-pop-card)
```

- [ ] **Step 3: Replace every other exact match**

CSS custom properties substitute their full value at `var()`, and the order of comma-separated `transition` entries does not affect rendering — so a file whose original line lists `box-shadow` before `transform` gets the same visual result from `var(--transition-pop-card)` (which lists `transform` first).

| File | Line | Before | After |
|---|---|---|---|
| `pages/Legal/Legal.module.css` | 226 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1),background-color .2s ease` | `  transition: var(--transition-pop-card), background-color .2s ease` |
| `pages/NotFound/NotFound.css` | 112 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1),background-color .3s ease` | `  transition: var(--transition-pop-card), background-color .3s ease` |
| `components/AboutCta/AboutCta.module.css` | 51 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1);` | `  transition: var(--transition-pop-card);` |
| `components/AboutExpertise/AboutExpertise.module.css` | 45 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1);` | `  transition: var(--transition-pop-card);` |
| `components/AboutHero/AboutHero.module.css` | 138 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)` | `  transition: var(--transition-pop-card)` |
| `components/AboutValues/AboutValues.module.css` | 67 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)` | `  transition: var(--transition-pop-card)` |
| `components/BlogSlider/BlogSlider.module.css` | 62 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1),background-color .2s ease;` | `  transition: var(--transition-pop-card), background-color .2s ease;` |
| `components/BlogSlider/BlogSlider.module.css` | 147 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)` | `  transition: var(--transition-pop-card)` |
| `components/Contact/Contact.module.css` | 91 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1),background-color .2s ease` | `  transition: var(--transition-pop-card), background-color .2s ease` |
| `components/EngagementModels/EngagementModels.module.css` | 91 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)` | `  transition: var(--transition-pop-card)` |
| `components/FAQ/FAQ.module.css` | 21 | `  transition: box-shadow .3s cubic-bezier(.34, 1.56, .64, 1),transform .3s cubic-bezier(.34, 1.56, .64, 1)` | `  transition: var(--transition-pop-card)` |
| `components/PricingFAQ/PricingFAQ.module.css` | 21 | `  transition: box-shadow .3s cubic-bezier(.34, 1.56, .64, 1),transform .3s cubic-bezier(.34, 1.56, .64, 1)` | `  transition: var(--transition-pop-card)` |
| `components/PricingPlans/PricingPlans.module.css` | 22 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1);` | `  transition: var(--transition-pop-card);` |
| `components/ProjectsCTA/ProjectsCTA.module.css` | 52 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1);` | `  transition: var(--transition-pop-card);` |
| `components/ProjectsGrid/ProjectsGrid.module.css` | 17 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1);` | `  transition: var(--transition-pop-card);` |
| `components/ProjectsHero/ProjectsHero.module.css` | 82 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1),background-color .2s ease;` | `  transition: var(--transition-pop-card), background-color .2s ease;` |
| `components/Services/Services.module.css` | 94 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)` | `  transition: var(--transition-pop-card)` |
| `components/TeamCard/TeamCard.module.css` | 12 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)` | `  transition: var(--transition-pop-card)` |
| `components/TrackRecord/TrackRecord.module.css` | 34 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)` | `  transition: var(--transition-pop-card)` |
| `components/WhyChooseUs/WhyChooseUs.module.css` | 121 | `  transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)` | `  transition: var(--transition-pop-card)` |

- [ ] **Step 4: Verify only the intended exceptions remain**

Run: `grep -rln "cubic-bezier(.34, 1.56, .64, 1)" src/ | xargs grep -n "transition:"`
Expected remaining raw matches: only `style.css:162` (`.reveal`, different duration `.6s` and properties `opacity`/`transform`), `style.css:214` (`all .3s`, different property), `AboutValues.module.css:54` (`transform` only), `WhyChooseUs.module.css:108` (`transform` only), `Reviews.module.css:32` (`transform` only), `BlogSlider.module.css:137` (`.35s`, different duration), `FAQ.module.css:63` (`transform` + `background-color`, no `box-shadow`), `PricingFAQ.module.css:64` (`transform` + `background-color`, no `box-shadow`) — all deliberately out of scope per the Interfaces note above.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 6: Commit**

```bash
git add src/styles/style.css src/pages/Legal/Legal.module.css src/pages/NotFound/NotFound.css src/components/AboutCta/AboutCta.module.css src/components/AboutExpertise/AboutExpertise.module.css src/components/AboutHero/AboutHero.module.css src/components/AboutValues/AboutValues.module.css src/components/BlogSlider/BlogSlider.module.css src/components/Contact/Contact.module.css src/components/EngagementModels/EngagementModels.module.css src/components/FAQ/FAQ.module.css src/components/PricingFAQ/PricingFAQ.module.css src/components/PricingPlans/PricingPlans.module.css src/components/ProjectsCTA/ProjectsCTA.module.css src/components/ProjectsGrid/ProjectsGrid.module.css src/components/ProjectsHero/ProjectsHero.module.css src/components/Services/Services.module.css src/components/TeamCard/TeamCard.module.css src/components/TrackRecord/TrackRecord.module.css src/components/WhyChooseUs/WhyChooseUs.module.css
git commit -m "Add --transition-pop-card token and use it for the hover-lift transition"
```

---

### Task 6: Single-source contact email/phone/address

**Files:**
- Modify: `src/data/sitedata.js:1-2, 301-320, 706-708`
- Modify: `src/pages/Legal/PrivacyPolicy.jsx:1-11, 184-187`

**Interfaces:**
- Produces: `export const company = { email, phone, address }` from `src/data/sitedata.js`.

- [ ] **Step 1: Add the `company` constant in `sitedata.js`**

Add immediately after the `CALENDLY_URL` export added in Task 1 (so the top of the file reads):

```js
export const CALENDLY_URL = "https://calendly.com/ingversionsdigital/30min";

export const company = {
  email: "ingversionsdigital@gmail.com",
  phone: "+91-8866167750",
  address: "2599, Shiv Krupa Association, Kansad, Sachin, Surat 394230 India",
};

export default {
```

Note the address here has no trailing period — this normalizes the one drift found between the two existing copies (the `contact.infoCards` copy had a trailing period, the `footer` copy did not).

- [ ] **Step 2: Point `contact.infoCards` at it**

Replace lines 305-316:

```js
          {
            icon: "email",
            text: "ingversionsdigital@gmail.com",
          },
          {
            icon: "phone",
            text: "+91-8866167750",
          },
          {
            icon: "location",
            text: "2599, Shiv Krupa Association, Kansad, Sachin, Surat 394230 India.",
          },
```

with:

```js
          {
            icon: "email",
            text: company.email,
          },
          {
            icon: "phone",
            text: company.phone,
          },
          {
            icon: "location",
            text: company.address,
          },
```

- [ ] **Step 3: Point `footer` at it**

Replace lines 706-708:

```js
    address: "2599, Shiv Krupa Association, Kansad, Sachin, Surat 394230 India",
    email: "ingversionsdigital@gmail.com",
    phone: "+91-8866167750",
```

with:

```js
    address: company.address,
    email: company.email,
    phone: company.phone,
```

- [ ] **Step 4: Point `PrivacyPolicy.jsx` at it**

Add to the top of `src/pages/Legal/PrivacyPolicy.jsx` (after line 2 `import Layout from "../../layouts/Layouts";`):

```js
import { company } from "../../data/sitedata";
```

Replace lines 185-187:

```js
                <a href="mailto:ingversionsdigital@gmail.com">
                  ingversionsdigital@gmail.com
                </a>
```

with:

```js
                <a href={`mailto:${company.email}`}>
                  {company.email}
                </a>
```

- [ ] **Step 5: Verify no raw literal remains**

Run: `grep -rn "ingversionsdigital@gmail.com\|8866167750\|Shiv Krupa" src/ --include=*.js --include=*.jsx`
Expected: only the three lines inside the `company` constant in `src/data/sitedata.js`.

- [ ] **Step 6: Lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 7: Commit**

```bash
git add src/data/sitedata.js src/pages/Legal/PrivacyPolicy.jsx
git commit -m "Single-source contact email, phone, and address"
```

---

### Task 7: Single-source the expertise icon color map

**Files:**
- Modify: `src/data/aboutusdata.js:45-66`
- Modify: `src/components/AboutExpertise/AboutExpertise.jsx:9-22, 57-63, 74-81` (this task runs after Task 3's edits to the same file)

**Interfaces:**
- Consumes: `expertiseCards` from `src/data/aboutusdata.js`, now each entry carries `color` alongside `icon`/`title`/`text`.

- [ ] **Step 1: Add `color` to each card in `aboutusdata.js`**

Replace the `expertiseCards` array (lines 45-66):

```js
export const expertiseCards = [
  {
    icon: 'ai',
    title: 'Research & Insights',
    text: 'Quant + qual research, analytics deep dives, heatmaps, and user interviews to find real conversion leaks.'
  },
  {
    icon: 'blockchain',
    title: 'Experiment Design',
    text: 'Hypothesis crafting, prioritization frameworks, and statistically sound test setups across tools like ABlyft.'
  },
  {
    icon: 'trading',
    title: 'Full-funnel Execution',
    text: 'Pixel-perfect implementation across Shopify, landing pages, and funnels, with robust QA.'
  },
  {
    icon: 'analytics',
    title: 'Analysis & Learnings',
    text: 'Clear, stakeholder-ready reports with what worked, what didn’t, and how to feed learnings back into the roadmap.'
  }
];
```

with:

```js
export const expertiseCards = [
  {
    icon: 'ai',
    color: 'var(--palette-accent)',
    title: 'Research & Insights',
    text: 'Quant + qual research, analytics deep dives, heatmaps, and user interviews to find real conversion leaks.'
  },
  {
    icon: 'blockchain',
    color: 'var(--secondary)',
    title: 'Experiment Design',
    text: 'Hypothesis crafting, prioritization frameworks, and statistically sound test setups across tools like ABlyft.'
  },
  {
    icon: 'trading',
    color: 'var(--tertiary)',
    title: 'Full-funnel Execution',
    text: 'Pixel-perfect implementation across Shopify, landing pages, and funnels, with robust QA.'
  },
  {
    icon: 'analytics',
    color: 'var(--quaternary)',
    title: 'Analysis & Learnings',
    text: 'Clear, stakeholder-ready reports with what worked, what didn’t, and how to feed learnings back into the roadmap.'
  }
];
```

- [ ] **Step 2: Remove the duplicate map and use `card.color` in `AboutExpertise.jsx`**

Replace lines 12-22:

```js
const EXPERTISE_ICONS = { ai: Sparkles, blockchain: Blocks, trading: TrendingUp, analytics: BarChart3 };
const EXPERTISE_COLORS = { ai: "var(--palette-accent)", blockchain: "var(--secondary)", trading: "var(--tertiary)", analytics: "var(--quaternary)" };

const ExpertiseIcon = ({ iconKey, title }) => {
  const Icon = EXPERTISE_ICONS[iconKey];
  return (
    <span className={styles.iconCircle} style={{ background: EXPERTISE_COLORS[iconKey] }}>
      <Icon size={22} strokeWidth={2.5} color="var(--palette-border)" aria-label={title} />
    </span>
  );
};
```

with:

```js
const EXPERTISE_ICONS = { ai: Sparkles, blockchain: Blocks, trading: TrendingUp, analytics: BarChart3 };

const ExpertiseIcon = ({ iconKey, title, color }) => {
  const Icon = EXPERTISE_ICONS[iconKey];
  return (
    <span className={styles.iconCircle} style={{ background: color }}>
      <Icon size={22} strokeWidth={2.5} color="var(--palette-border)" aria-label={title} />
    </span>
  );
};
```

Replace the swiper-branch cornerFold and icon (originally lines 57-63):

```js
                  <span
                    className={styles.cornerFold}
                    style={{ background: EXPERTISE_COLORS[card.icon] }}
                    aria-hidden="true"
                  />
                  <div className={styles.aboutIconWrap}>
                    <ExpertiseIcon iconKey={card.icon} title={card.title} />
                  </div>
```

with:

```js
                  <span
                    className={styles.cornerFold}
                    style={{ background: card.color }}
                    aria-hidden="true"
                  />
                  <div className={styles.aboutIconWrap}>
                    <ExpertiseIcon iconKey={card.icon} title={card.title} color={card.color} />
                  </div>
```

Replace the grid-branch cornerFold and icon (originally lines 75-81):

```js
                <span
                  className={styles.cornerFold}
                  style={{ background: EXPERTISE_COLORS[card.icon] }}
                  aria-hidden="true"
                />
                <div className={styles.aboutIconWrap}>
                  <ExpertiseIcon iconKey={card.icon} title={card.title} />
                </div>
```

with:

```js
                <span
                  className={styles.cornerFold}
                  style={{ background: card.color }}
                  aria-hidden="true"
                />
                <div className={styles.aboutIconWrap}>
                  <ExpertiseIcon iconKey={card.icon} title={card.title} color={card.color} />
                </div>
```

- [ ] **Step 3: Verify no duplicate map remains**

Run: `grep -n "EXPERTISE_COLORS" src/components/AboutExpertise/AboutExpertise.jsx`
Expected: no output.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/aboutusdata.js src/components/AboutExpertise/AboutExpertise.jsx
git commit -m "Move expertise card colors into aboutusdata.js, drop the duplicate color map"
```

---

### Task 8: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Full lint**

Run: `npm run lint`
Expected: passes clean.

- [ ] **Step 2: Full build**

Run: `npm run build`
Expected: succeeds with no errors.

- [ ] **Step 3: Manual browser check**

Run: `npm run dev`, open the site, and check at both desktop and mobile breakpoints:
- Every "Book A Call" / "Get Started" / "Schedule a call" CTA button (Home, Pricing, About Us, Projects) opens the correct Calendly link.
- Header and Footer external links (mailto, tel, http) still open correctly; internal links still route with `<Link>`.
- AboutExpertise section: verify mobile swiper vs. desktop grid still switches at the same breakpoint as before, and each card's icon-circle and corner-fold color still matches its category (Research=accent purple, Experiment Design=pink, Full-funnel=amber, Analysis=green).
- ProjectsGrid: verify "View More Projects" mobile pagination still appears/disappears at the same breakpoint as before.
- Hover state on cards using the pop-shadow/hover-lift look (pricing cards, about cards, project cards, hero cards, FAQ accordion items, reviews, team cards, track record, services) — shadow depth and lift animation still look identical to before the change.
- Contact section on Home: email/phone/address display correctly.
- Privacy Policy page: the "Your Rights" section's email link still works.
- Footer: renders without error (its `email`/`phone`/`address` fields are data-only today, not rendered — confirm this is still true, i.e. no new console errors).

- [ ] **Step 4: Report**

If anything in Step 3 looks different from the pre-change site, stop and fix it (do not commit further tasks) before declaring the work done. If everything matches, no commit is needed for this task — it's verification-only.
