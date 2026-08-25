# Homepage Mobile Restructure

## Problem

The homepage mobile layout (<768px) is too long: measured at 11,279px tall at 375px viewport width. Ten sections stack top-to-bottom: Hero → CompanyLogos → TrackRecord → Services → WorkProcess → WhyChooseUs → Reviews → Contact → BlogSlider → EngagementModels → FAQ → Footer.

`Services` and `BlogSlider` already switch to a Swiper carousel below 768px, avoiding a full vertical stack. Three sections don't, and are the biggest contributors to page length:

- **WhyChooseUs** — a vertical alternating timeline, one item per row, no mobile carousel.
- **EngagementModels** — 3 full cards (icon, title, desc, feature list, CTA) stacked full-height.
- **Reviews** — a grid of 6 testimonial cards, all stacked (measured ~1,893px alone on mobile).

Every section also carries fairly generous vertical padding (44–92px per side) that adds up across ten sections.

## Approach

Reuse the codebase's existing `isMobile` (window resize listener) + conditional Swiper render pattern, already implemented in `Services.jsx` and `AboutExpertise.jsx`. This keeps one carousel pattern in the codebase rather than introducing a second (e.g. a CSS-only scroll-snap carousel), and Swiper is already loaded on the homepage bundle via Services/BlogSlider, so these additions cost no extra bundle weight.

Desktop/tablet layouts (≥768px) are untouched — this is a mobile-only restructure.

## Changes

### 1. Carousel conversions (mobile only, <768px)

**WhyChooseUs** (`src/components/WhyChooseUs/WhyChooseUs.jsx`)
- Add `isMobile` state via `window.innerWidth < 768` + resize listener (same as `Services.jsx`).
- Mobile: render a Swiper (`Pagination` module, 1 slide/view, `spaceBetween: 20`) where each slide is a simplified card: number + title + desc only. The connector line (`.timelineLine`) and node dots (`.timelineNode`) are a visual metaphor for the vertical alternating layout and are dropped on mobile — the carousel itself replaces that affordance.
- Desktop: unchanged timeline, no Swiper import cost on desktop render path (conditional).

**EngagementModels** (`src/components/EngagementModels/EngagementModels.jsx`)
- Same `isMobile` pattern.
- Mobile: Swiper, 1 slide/view, `spaceBetween: 20`, `Pagination`. Each slide reuses the existing card JSX unchanged (cornerFold, iconCircle, title, desc, featureList, learnMoreBtn) — only the wrapping container changes from a CSS grid to `SwiperSlide`.
- Desktop: unchanged grid.
- The existing decorative corner shapes (`.decor`) already hide on mobile — no change needed there.

**Reviews** (`src/components/Reviews/Reviews.jsx`)
- Same `isMobile` pattern.
- Mobile: Swiper, `slidesPerView: 1.1` (slight peek of the next card as a swipe affordance), `spaceBetween: 16`, `Pagination`. Existing testimonial card markup (quote, tail, avatar, name, role) unchanged.
- Desktop: unchanged 3-column grid.

All three mobile carousels get pagination dots styled consistently with `Services`' existing mobile Swiper CSS (dot size, active-state color, spacing) — no new dot styling pattern introduced.

### 2. Mobile padding tightening

`@media (max-width:767.98px)`, top/bottom padding only, roughly a 30% reduction, applied per-component in each component's own `.module.css`:

| Section | File | Current | New |
|---|---|---|---|
| Hero (bottom only) | `Hero/HeroV2.module.css` | `132px 0 72px` | `132px 0 56px` |
| TrackRecord | `TrackRecord/TrackRecord.module.css` | `54px 0` | `40px 0` |
| Services | `Services/Services.module.css` | `66px 0` | `48px 0` |
| WorkProcess | `WorkProcess/WorkProcess.module.css` | `62px 0 58px` | `44px 0 40px` |
| WhyChooseUs | `WhyChooseUs/WhyChooseUs.module.css` | `44px 0` | `32px 0` |
| Reviews | `Reviews/Reviews.module.css` | `44px 0` | `32px 0` |
| Contact | `Contact/Contact.module.css` | `66px 0 72px` | `48px 0 56px` |
| BlogSlider | `BlogSlider/BlogSlider.module.css` | `58px 0 52px` | `44px 0 40px` |
| EngagementModels | `EngagementModels/EngagementModels.module.css` | `66px 0` | `48px 0` |
| FAQ | `FAQ/FAQ.module.css` | `60px 0` (no mobile override exists) | add `40px 0` override |

Hero's top padding (132px) is left untouched — it clears the fixed header and isn't part of the "too long" complaint.

## Out of scope

- TrackRecord's KPI grid stays a stacked 1-column grid (not converted to a carousel) — only 4 short stat tiles, not a major contributor, and the user's approved scope was WhyChooseUs/EngagementModels/Reviews specifically.
- Section reordering or removal — not requested.
- Desktop/tablet (≥768px) layouts — unchanged.

## Testing

- Re-run the existing Playwright overflow-audit script (280–1023px width, all 7 routes) — must still report zero horizontal overflow.
- Measure homepage full-page height at 375px width after the change and compare against the 11,279px baseline.
- Manually verify each new mobile carousel swipes correctly and pagination dots render.
