# Dedupe repeated values and helpers

## Problem

Several values and small helpers are independently copy-pasted across
multiple files instead of coming from one source. This risks silent drift
(already found one: a stray trailing period on one copy of the office
address) and makes future edits error-prone (change a value in one place,
miss the other 14 copies).

Found via full-repo scan. Confirmed all instances below are byte-identical
except where noted, so consolidating them is a pure refactor — no visible
behavior change.

## Scope

Seven fixes, all mechanical dedup to a single source of truth. No new files,
no new dependencies, no change to route structure, data shape consumers see,
or rendered output.

### 1. Calendly booking URL

`"https://calendly.com/ingversionsdigital/30min"` is hardcoded 15 times:

- `src/data/sitedata.js:13,22,461,466,471,476`
- `src/data/pricingdata.js:7,24,37,52,65`
- `src/data/aboutusdata.js:11,95`
- `src/data/projectsdata.js:181`
- `src/components/Hero/Hero.jsx:11` (local `REDIRECT_URL` const)

**Fix:** export `CALENDLY_URL` from `src/data/sitedata.js` (already the
"global CTA" data module per AGENTS.md). Import it into `pricingdata.js`,
`aboutusdata.js`, `projectsdata.js`, and `Hero.jsx`. Replace all 15 literals.

### 2. `isExternalHref` reimplemented

`src/utils/url.js` already exports `isExternalHref` but nothing imports it:

- `src/components/Header/Header.jsx:47-50` — verbatim reimplementation
- `src/components/Footer/Footer.jsx:85-88` — same logic inlined again

**Fix:** delete both inline copies, import the util in each file.

### 3. `useIsMobile` reimplemented

`src/hooks/useIsMobile.js` (default breakpoint 768, `<` comparison) is
already used by several components, but:

- `src/components/AboutExpertise/AboutExpertise.jsx:25-32` reimplements the
  same `useState` + resize-listener pattern at breakpoint 768.
- `src/components/ProjectsGrid/ProjectsGrid.jsx:7,83` defines its own
  `MOBILE_BREAKPOINT = 767.98` with `<=`.

Verified: `width <= 767.98` and `width < 768` are equivalent for integer
CSS pixel widths, so switching ProjectsGrid to the shared hook's default
does not change behavior.

**Fix:** delete both inline reimplementations, call `useIsMobile()` in each.

### 4. `--shadow-pop` tokens unused

`src/styles/style.css:30-34` defines `--shadow-pop`, `--shadow-pop-hover`,
`--shadow-pop-active` (verified raw values match exactly: `4px 4px 0 0`,
`6px 6px 0 0`, `2px 2px 0 0`, all `var(--palette-border)`). 16 occurrences
across 10 `.module.css` files rewrite the raw value instead:

`Legal.module.css:36`, `TeamHero.module.css:32`, `Reviews.module.css:43,76,117,120`,
`ProjectsCTA.module.css:55,61,65`, `HeroV2.module.css:39`,
`AboutHero.module.css:35`, `ProjectsHero.module.css:34`,
`AboutCta.module.css:54,60,64`, `PricingHero.module.css:31`.

**Fix:** replace each raw value with the matching token var.

### 5. Hover-lift transition string duplicated

`transition: transform .3s cubic-bezier(.34, 1.56, .64, 1),box-shadow .3s cubic-bezier(.34, 1.56, .64, 1)`
(or a minor variant) is copy-pasted identically across ~12 files:
`AboutCta.module.css:51`, `BlogSlider.module.css:62,147`,
`AboutValues.module.css:54,67`, `AboutHero.module.css:138`,
`WhyChooseUs.module.css:108,121`, `AboutExpertise.module.css:45`,
`TrackRecord.module.css:34`, `PricingPlans.module.css:22`,
`PricingFAQ.module.css:21,64`, `TeamCard.module.css:12`,
`Services.module.css:94`, `Legal.module.css:226`.

**Fix:** add `--transition-pop-card` to `:root` in `style.css`, replace all
occurrences with `var(--transition-pop-card)`.

### 6. Contact email/phone/address retyped

Same three values defined independently twice in `src/data/sitedata.js`:

- `contact.infoCards[0].items` (lines 307, 311, 315 — address has a stray
  trailing period: `"...394230 India."`)
- `footer` object (lines 706-708 — address has no trailing period)

`src/pages/Legal/PrivacyPolicy.jsx:185-186` hardcodes the email a third time.

**Fix:** add `company: { email, phone, address }` to `sitedata.js` (no
trailing period on address — normalizes the drift). Point `contact.infoCards`,
`footer`, and `PrivacyPolicy.jsx`'s mailto at it.

### 7. Expertise icon-color map duplicates palette tokens

`src/components/AboutExpertise/AboutExpertise.jsx:13` hardcodes
`EXPERTISE_COLORS = { ai: "var(--palette-accent)", blockchain: "var(--secondary)", trading: "var(--tertiary)", analytics: "var(--quaternary)" }`,
a second mapping that must stay in sync with card order in
`src/data/aboutusdata.js`'s `expertiseCards`.

**Fix:** move the color per `iconKey` into each card entry in
`aboutusdata.js`. Delete the separate map in the component.

## Out of scope

- JSX-side CTA-label fallback defaults in `PricingPlans.jsx` duplicating data
  defaults ("Get Started", "Book a strategy call") — low value, skipped.
- Repeated Unsplash query-string suffix across 10 blog post image URLs — low
  value, skipped.

## Verification

- `npm run lint`
- `npm run build`
- Manual browser check at affected breakpoints: Header/Footer external
  links, mobile-breakpoint pages (AboutExpertise, ProjectsGrid), hover
  states on cards using the shared transition, contact section, footer,
  and every CTA button that now points at `CALENDLY_URL` (Home, Pricing,
  About, Projects).
