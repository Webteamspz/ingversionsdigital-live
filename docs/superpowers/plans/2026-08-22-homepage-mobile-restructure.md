# Homepage Mobile Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut the homepage's mobile (<768px) page height by converting three vertically-stacked sections (WhyChooseUs, EngagementModels, Reviews) to swipeable carousels and tightening mobile section padding across the homepage.

**Architecture:** Reuse the existing `isMobile` (resize-listener) + conditional Swiper render pattern already implemented in `src/components/Services/Services.jsx`. Each of the three components gets an `isMobile` state; below 768px it renders a Swiper carousel with `Pagination` dots instead of its desktop grid/timeline. Desktop markup and behavior are untouched.

**Tech Stack:** React, `swiper/react` (already a project dependency, already loaded on the homepage bundle via `Services`/`BlogSlider`), CSS Modules.

## Global Constraints

- This repo has no test runner (`package.json` scripts are `dev`, `build`, `build:production`, `lint`, `preview` only — no `test` script, no jest/vitest config). Verification in this plan uses `npm run build`, `npm run lint`, and manual/Playwright browser checks against the Vite dev server — not unit tests.
- Desktop/tablet layouts (≥768px) must not change in this plan. Every CSS change goes inside `@media (max-width:767.98px)`.
- CSS Modules scope every bare class selector to a hash, including third-party classes like `.swiper-slide`/`.swiper-pagination` — those must be wrapped in `:global(...)` or the rule silently never matches. (Task 1 fixes a pre-existing instance of this bug; Tasks 2-4 must use `:global()` from the start.)
- The mobile breakpoint used everywhere in this codebase is `window.innerWidth < 768` (JS) / `max-width:767.98px` (CSS) — match it exactly, don't introduce a different cutoff.

---

### Task 1: Fix dead `.swiper-slide`/pagination selectors in Services.module.css

`Services.jsx`'s mobile Swiper is the pattern Tasks 2-4 copy. Its CSS has a bug worth fixing before copying the pattern: `.servicesSwiper .swiper-slide`, `.servicesSwiper .swiper-pagination`, etc. are missing `:global()`, so CSS Modules hashes `.swiper-slide` into something like `.swiper-slide_wbkad_166` — which never matches the real `swiper-slide` class Swiper puts in the DOM. Confirmed by grepping the built CSS (`dist/assets/Services-*.css`): the selector compiles to a hashed class, not the literal `swiper-slide`.

**Files:**
- Modify: `src/components/Services/Services.module.css:159-201`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new (pure bugfix, no new exports).

- [ ] **Step 1: Read the current mobile block to confirm line numbers**

Run: `grep -n "servicesSwiper" src/components/Services/Services.module.css`

Expected output includes lines for `.servicesSwiper {`, `.servicesSwiper .swiper-slide {`, `.servicesSwiper .swiper-pagination {`, `.servicesSwiper .swiper-pagination-bullet {`, `.servicesSwiper .swiper-pagination-bullet-active {`.

- [ ] **Step 2: Wrap the third-party class references in `:global()`**

Change each of these four selectors (keep their existing declarations unchanged, only edit the selector line):

```css
.servicesSwiper :global(.swiper-slide) {
  display: flex;
  height: auto!important
}
```

```css
.servicesSwiper :global(.swiper-pagination) {
  bottom: 0
}
```

```css
.servicesSwiper :global(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  border: 1px solid var(--palette-text-primary);
  background: 0 0;
  opacity: 1
}
```

```css
.servicesSwiper :global(.swiper-pagination-bullet-active) {
  background: var(--palette-accent)
}
```

- [ ] **Step 3: Verify the fix compiles the way you expect**

Run: `npm run build && grep -o "servicesSwiper [a-zA-Z0-9_.:-]*swiper-slide" dist/assets/Services-*.css`
Expected: output shows `.servicesSwiper .swiper-slide` with the literal (non-hashed) `swiper-slide` string — not `swiper-slide_<hash>`.

- [ ] **Step 4: Commit**

```bash
git add src/components/Services/Services.module.css
git commit -m "fix: scope Services mobile Swiper selectors with :global() so they actually match"
```

---

### Task 2: WhyChooseUs mobile carousel

Replace the vertical alternating timeline with a 1-slide-per-view Swiper carousel on mobile. Each slide is a simplified card (number + title + desc) — the connector line/node is a desktop-only visual metaphor for the alternating layout and is dropped on mobile.

**Files:**
- Modify: `src/components/WhyChooseUs/WhyChooseUs.jsx`
- Modify: `src/components/WhyChooseUs/WhyChooseUs.module.css`

**Interfaces:**
- Consumes: `data.why.heading` (string), `data.why.list` (array of `{ title: string, desc: string }`) from `src/data/sitedata`. `NODE_COLORS` array already defined in this file.
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Replace WhyChooseUs.jsx with the isMobile + Swiper version**

Full file content:

```jsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import data from "../../data/sitedata";
import styles from "./WhyChooseUs.module.css";
import Reveal from "../Reveal/Reveal";

const NODE_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];

const WhyChooseUs = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <section className={styles.whyChooseUsSection} id="why-choose-us">
      <div className={styles.decor} aria-hidden="true">
        <span className={styles.shapeCircleTl} />
        <span className={styles.shapeSquareTr} />
        <span className={styles.shapeCircleBr} />
        <span className={styles.shapeSquareBl} />
      </div>
      <div className="container">
        <h3 className="section-title">{data.why.heading}</h3>
        <p className={styles.whySub}>Here's what sets our approach apart.</p>

        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className={styles.timelineSwiper}
          >
            {data.why.list.map((w, i) => (
              <SwiperSlide key={i}>
                <div className={styles.timelineSlideCard}>
                  <span
                    className={styles.timelineNumber}
                    style={{ color: NODE_COLORS[i % NODE_COLORS.length] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className={styles.timelineTitle}>{w.title}</h4>
                  <p className={styles.timelineDesc}>{w.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.timeline}>
            <span className={styles.timelineLine} aria-hidden="true" />
            {data.why.list.map((w, i) => (
              <Reveal key={i} delay={i * 100} className={styles.timelineRow}>
                <div className={styles.timelineCard}>
                  <span
                    className={styles.timelineNumber}
                    style={{ color: NODE_COLORS[i % NODE_COLORS.length] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className={styles.timelineTitle}>{w.title}</h4>
                  <p className={styles.timelineDesc}>{w.desc}</p>
                </div>
                <span
                  className={styles.timelineNode}
                  style={{ borderColor: NODE_COLORS[i % NODE_COLORS.length] }}
                  aria-hidden="true"
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
```

- [ ] **Step 2: Add the mobile carousel CSS**

In `src/components/WhyChooseUs/WhyChooseUs.module.css`, inside the existing `@media (max-width:767.98px)` block (the one that currently starts with `.whyChooseUsSection { padding: 44px 0; ... }`), add these new rules (anywhere inside that same block):

```css
  .timelineSwiper {
    padding: 0 3px 45px!important;
    overflow: visible;
    --swiper-pagination-bullet-inactive-color: var(--palette-text-primary);
    --swiper-pagination-bullet-inactive-opacity: 1;
    --swiper-pagination-color: var(--palette-accent)
  }
  .timelineSwiper :global(.swiper-slide) {
    height: auto
  }
  .timelineSwiper :global(.swiper-pagination) {
    bottom: 0
  }
  .timelineSwiper :global(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    border: 1px solid var(--palette-text-primary);
    background: 0 0;
    opacity: 1
  }
  .timelineSwiper :global(.swiper-pagination-bullet-active) {
    background: var(--palette-accent)
  }
  .timelineSlideCard {
    background: var(--palette-bg-800);
    border: var(--border-width) solid var(--palette-border);
    border-radius: var(--radius-lg);
    padding: 24px 22px;
    text-align: left;
    box-shadow: var(--shadow-pop-soft);
    height: 100%
  }
```

- [ ] **Step 3: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both exit 0, no errors.

- [ ] **Step 4: Manual verification against the dev server**

Run: `npx vite --port 5183 &` then wait for it to serve (`curl -sf http://localhost:5183`), then open a Playwright/browser session at 375px width, navigate to `/`, scroll to `#why-choose-us`.
Expected: a single-card carousel with pagination dots is visible, swiping advances cards, and the desktop timeline (connector line + alternating layout) still renders correctly at ≥768px.

- [ ] **Step 5: Commit**

```bash
git add src/components/WhyChooseUs/WhyChooseUs.jsx src/components/WhyChooseUs/WhyChooseUs.module.css
git commit -m "feat: convert WhyChooseUs to a swipe carousel on mobile"
```

---

### Task 3: EngagementModels mobile carousel

Wrap the three existing engagement cards (unchanged markup) in a Swiper instead of a CSS grid on mobile.

**Files:**
- Modify: `src/components/EngagementModels/EngagementModels.jsx`
- Modify: `src/components/EngagementModels/EngagementModels.module.css`

**Interfaces:**
- Consumes: `siteData.engagement` (`{ heading, sub, list }`) from `src/data/sitedata`, `ContactModal` component (`isOpen`, `onClose`, `source` props — unchanged from current usage).
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Replace EngagementModels.jsx with the isMobile + Swiper version**

Full file content:

```jsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Repeat, Clock, Briefcase } from "lucide-react";
import styles from "./EngagementModels.module.css";
import siteData from "../../data/sitedata";
import ContactModal from "../ContactModal/ContactModal";
import Reveal from "../Reveal/Reveal";

const ENGAGEMENT_ICONS = { retainer: Repeat, hoursblock: Clock, projectengagement: Briefcase };
const ENGAGEMENT_COLORS = { retainer: "var(--palette-accent)", hoursblock: "var(--secondary)", projectengagement: "var(--tertiary)" };

const EngagementModels = () => {
  const { heading, sub, list } = siteData.engagement;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handleCtaClick = (e, cta, title) => {
    if (cta.href === "#contact") {
      e.preventDefault();
      setModalSource(title);
      setIsModalOpen(true);
    }
  };

  const renderCard = (model) => (
    <>
      <span
        className={styles.cornerFold}
        style={{ background: ENGAGEMENT_COLORS[model.icon] }}
        aria-hidden="true"
      />
      <div className={styles.iconCircle} style={{ background: ENGAGEMENT_COLORS[model.icon] }}>
        {(() => {
          const Icon = ENGAGEMENT_ICONS[model.icon];
          return Icon ? <Icon size={26} strokeWidth={2.5} color="#1E293B" aria-hidden="true" /> : null;
        })()}
      </div>

      <h3 className={styles.cardTitle}>{model.title}</h3>
      <p className={styles.cardDesc}>{model.desc}</p>

      <ul className={styles.featureList}>
        {model.features.map((feature, i) => (
          <li className={styles.featureItem} key={i}>
            <span className={styles.checkIcon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={model.cta.href}
        className={styles.learnMoreBtn}
        onClick={(e) => handleCtaClick(e, model.cta, model.title)}
      >
        {model.cta.label}
      </a>
    </>
  );

  return (
    <section className={styles.engagementSection} id="engagement">
      <div className={styles.decor} aria-hidden="true">
        <span className={styles.shapeCircleTl} />
        <span className={styles.shapeSquareTr} />
        <span className={styles.shapeCircleBr} />
        <span className={styles.shapeSquareBl} />
      </div>
      <div className="container">
        <h2 className="section-title">{heading}</h2>
        <p className={styles.engagementSub}>{sub}</p>

        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className={styles.engagementSwiper}
          >
            {list.map((model, index) => (
              <SwiperSlide key={index}>
                <div className={`${styles.card} ${styles.engagementCard}`}>
                  {renderCard(model)}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.engagementGrid}>
            {list.map((model, index) => (
              <Reveal key={index} delay={index * 80} className={`${styles.card} ${styles.engagementCard}`}>
                {renderCard(model)}
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
      />
    </section>
  );
};

export default EngagementModels;
```

- [ ] **Step 2: Add the mobile carousel CSS**

In `src/components/EngagementModels/EngagementModels.module.css`, inside the existing `@media (max-width:767.98px)` block, add:

```css
  .engagementSwiper {
    padding: 0 3px 45px!important;
    overflow: visible;
    --swiper-pagination-bullet-inactive-color: var(--palette-text-primary);
    --swiper-pagination-bullet-inactive-opacity: 1;
    --swiper-pagination-color: var(--palette-accent)
  }
  .engagementSwiper :global(.swiper-slide) {
    height: auto
  }
  .engagementSwiper :global(.swiper-pagination) {
    bottom: 0
  }
  .engagementSwiper :global(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    border: 1px solid var(--palette-text-primary);
    background: 0 0;
    opacity: 1
  }
  .engagementSwiper :global(.swiper-pagination-bullet-active) {
    background: var(--palette-accent)
  }
```

- [ ] **Step 3: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both exit 0, no errors.

- [ ] **Step 4: Manual verification against the dev server**

Same dev server as Task 2. Navigate to `/`, scroll to `#engagement` at 375px width.
Expected: one engagement card visible at a time with pagination dots, swiping advances between the 3 cards, "Get in touch"-style CTA still opens `ContactModal` correctly. At ≥768px the original 3-column grid still renders.

- [ ] **Step 5: Commit**

```bash
git add src/components/EngagementModels/EngagementModels.jsx src/components/EngagementModels/EngagementModels.module.css
git commit -m "feat: convert EngagementModels to a swipe carousel on mobile"
```

---

### Task 4: Reviews mobile carousel

Convert the 6-card testimonial grid to a Swiper on mobile with a slight next-card peek (`slidesPerView: 1.1`).

**Files:**
- Modify: `src/components/Reviews/Reviews.jsx`
- Modify: `src/components/Reviews/Reviews.module.css`

**Interfaces:**
- Consumes: `data.review.heading` (string), `data.review.testimonials` (array of `{ quote, reviewer, reviewerRole }`) from `src/data/sitedata`. `CARD_TILTS` and `REVIEWER_AVATARS` arrays already defined in this file.
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Replace Reviews.jsx with the isMobile + Swiper version**

Full file content:

```jsx
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import data from "../../data/sitedata";
import styles from "./Reviews.module.css";
import Reveal from "../Reveal/Reveal";

const CARD_TILTS = [-2, 2, -1.5, 1.5, -2.5, 2.5];
const REVIEWER_AVATARS = [
  "/assets/reviews/reviewer-1.jpg",
  "/assets/reviews/reviewer-2.jpg",
  "/assets/reviews/reviewer-3.jpg",
  "/assets/reviews/reviewer-4.jpg",
  "/assets/reviews/reviewer-5.jpg",
  "/assets/reviews/reviewer-6.jpg",
];

export default function Reviews() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const renderCard = (t, i) => (
    <div
      className={styles.reviewTilt}
      style={{ transform: `rotate(${CARD_TILTS[i % CARD_TILTS.length]}deg)` }}
    >
      <div className={styles.reviewCard}>
        <p className={styles.reviewQuote}>&ldquo;{t.quote}&rdquo;</p>
        <span className={styles.reviewTail} aria-hidden="true" />
      </div>
      <div className={styles.reviewerRow}>
        <img
          className={styles.reviewAvatar}
          src={REVIEWER_AVATARS[i % REVIEWER_AVATARS.length]}
          alt={`${t.reviewer}, ${t.reviewerRole}`}
          loading="lazy"
        />
        <div>
          <div className={styles.reviewerName}>{t.reviewer}</div>
          <div className={styles.reviewerRole}>{t.reviewerRole}</div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className={styles.startedSection} id="reviews">
      <div className={`container ${styles.startedContainer}`}>
        <h3 className={`section-title ${styles.startedTitle}`}>
          {data.review.heading}
        </h3>

        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1.1}
            className={styles.reviewsSwiper}
          >
            {data.review.testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                {renderCard(t, i)}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.reviewsGrid}>
            {data.review.testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 80} className={styles.reviewCardWrap}>
                {renderCard(t, i)}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add the mobile carousel CSS**

In `src/components/Reviews/Reviews.module.css`, inside the existing `@media (max-width:767.98px)` block, add:

```css
  .reviewsSwiper {
    padding: 0 3px 45px!important;
    overflow: visible;
    --swiper-pagination-bullet-inactive-color: var(--palette-text-primary);
    --swiper-pagination-bullet-inactive-opacity: 1;
    --swiper-pagination-color: var(--palette-accent)
  }
  .reviewsSwiper :global(.swiper-slide) {
    height: auto
  }
  .reviewsSwiper :global(.swiper-pagination) {
    bottom: 0
  }
  .reviewsSwiper :global(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    border: 1px solid var(--palette-text-primary);
    background: 0 0;
    opacity: 1
  }
  .reviewsSwiper :global(.swiper-pagination-bullet-active) {
    background: var(--palette-accent)
  }
```

- [ ] **Step 3: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both exit 0, no errors.

- [ ] **Step 4: Manual verification against the dev server**

Same dev server. Navigate to `/`, scroll to `#reviews` at 375px width.
Expected: testimonial cards swipe one at a time with a slight peek of the next card, pagination dots present. At ≥768px the original 3-column (or 2-column at tablet) grid still renders.

- [ ] **Step 5: Commit**

```bash
git add src/components/Reviews/Reviews.jsx src/components/Reviews/Reviews.module.css
git commit -m "feat: convert Reviews to a swipe carousel on mobile"
```

---

### Task 5: Mobile padding tightening

Reduce top/bottom padding inside each section's existing `@media (max-width:767.98px)` block per the spec's table. `FAQ.module.css` currently has no mobile override at all — add one.

**Files:**
- Modify: `src/components/Hero/HeroV2.module.css`
- Modify: `src/components/TrackRecord/TrackRecord.module.css`
- Modify: `src/components/Services/Services.module.css`
- Modify: `src/components/WorkProcess/WorkProcess.module.css`
- Modify: `src/components/WhyChooseUs/WhyChooseUs.module.css`
- Modify: `src/components/Reviews/Reviews.module.css`
- Modify: `src/components/Contact/Contact.module.css`
- Modify: `src/components/BlogSlider/BlogSlider.module.css`
- Modify: `src/components/EngagementModels/EngagementModels.module.css`
- Modify: `src/components/FAQ/FAQ.module.css`

**Interfaces:**
- Consumes: nothing (pure CSS value edits on rules already present from Tasks 2-4 for WhyChooseUs/Reviews/EngagementModels).
- Produces: nothing.

- [ ] **Step 1: HeroV2 — reduce bottom padding only**

In `src/components/Hero/HeroV2.module.css`, inside `@media (max-width:767.98px)`, find:

```css
  .hero {
    min-height: auto;
    padding: 132px 0 72px
  }
```

Change to:

```css
  .hero {
    min-height: auto;
    padding: 132px 0 56px
  }
```

- [ ] **Step 2: TrackRecord**

In `src/components/TrackRecord/TrackRecord.module.css`, inside `@media (max-width:767.98px)`, find:

```css
  .kpiSection {
    padding: 54px 0
  }
```

Change to:

```css
  .kpiSection {
    padding: 40px 0
  }
```

- [ ] **Step 3: Services**

In `src/components/Services/Services.module.css`, inside `@media (max-width:767.98px)`, find:

```css
  .servicesSection {
    padding: 66px 0;
    background-size: 18px 18px
  }
```

Change to:

```css
  .servicesSection {
    padding: 48px 0;
    background-size: 18px 18px
  }
```

- [ ] **Step 4: WorkProcess**

In `src/components/WorkProcess/WorkProcess.module.css`, inside `@media (max-width:767.98px)`, find:

```css
  .processSection {
    padding: 62px 0 58px
  }
```

Change to:

```css
  .processSection {
    padding: 44px 0 40px
  }
```

- [ ] **Step 5: WhyChooseUs**

In `src/components/WhyChooseUs/WhyChooseUs.module.css`, inside `@media (max-width:767.98px)`, find:

```css
  .whyChooseUsSection {
    padding: 44px 0;
    background-size: 18px 18px
  }
```

Change to:

```css
  .whyChooseUsSection {
    padding: 32px 0;
    background-size: 18px 18px
  }
```

- [ ] **Step 6: Reviews**

In `src/components/Reviews/Reviews.module.css`, inside `@media (max-width:767.98px)`, find:

```css
  .startedSection {
    padding: 44px 0
  }
```

Change to:

```css
  .startedSection {
    padding: 32px 0
  }
```

- [ ] **Step 7: Contact**

In `src/components/Contact/Contact.module.css`, inside `@media (max-width:767.98px)`, find:

```css
  .contactSection {
    padding: 66px 0 72px
  }
```

Change to:

```css
  .contactSection {
    padding: 48px 0 56px
  }
```

- [ ] **Step 8: BlogSlider**

In `src/components/BlogSlider/BlogSlider.module.css`, inside `@media (max-width:767.98px)`, find:

```css
  .blogSection {
    padding: 58px 0 52px
  }
```

Change to:

```css
  .blogSection {
    padding: 44px 0 40px
  }
```

- [ ] **Step 9: EngagementModels**

In `src/components/EngagementModels/EngagementModels.module.css`, inside `@media (max-width:767.98px)`, find:

```css
  .engagementSection {
    padding: 66px 0;
    background-size: 18px 18px
  }
```

Change to:

```css
  .engagementSection {
    padding: 48px 0;
    background-size: 18px 18px
  }
```

- [ ] **Step 10: FAQ — add a mobile override (none exists today)**

In `src/components/FAQ/FAQ.module.css`, the base rule is:

```css
.faqWrapper {
  padding: 60px 0;
  ...
}
```

Add a new block at the end of the file (after all existing rules):

```css
@media (max-width:767.98px) {
  .faqWrapper {
    padding: 40px 0
  }
}
```

- [ ] **Step 11: Verify build and lint**

Run: `npm run build && npm run lint`
Expected: both exit 0, no errors.

- [ ] **Step 12: Commit**

```bash
git add src/components/Hero/HeroV2.module.css src/components/TrackRecord/TrackRecord.module.css src/components/Services/Services.module.css src/components/WorkProcess/WorkProcess.module.css src/components/WhyChooseUs/WhyChooseUs.module.css src/components/Reviews/Reviews.module.css src/components/Contact/Contact.module.css src/components/BlogSlider/BlogSlider.module.css src/components/EngagementModels/EngagementModels.module.css src/components/FAQ/FAQ.module.css
git commit -m "style: tighten mobile section padding across the homepage"
```

---

### Task 6: Full verification pass

Confirm the combined result: no horizontal overflow anywhere, mobile page height dropped meaningfully from the 11,279px baseline, and every converted section still works at desktop widths.

**Files:**
- None (verification only, no code changes).

**Interfaces:**
- Consumes: the running Vite dev server (`npm run dev`, default port unless otherwise configured) and a local Playwright/Chromium install.
- Produces: nothing.

- [ ] **Step 1: Start the dev server**

Run: `npx vite --port 5183 &` then `timeout 30 bash -c 'until curl -sf http://localhost:5183 >/dev/null; do sleep 1; done'`
Expected: server responds within 30s.

- [ ] **Step 2: Measure new mobile page height**

Using Playwright (or the browser devtools), load `http://localhost:5183/` at a 375×900 viewport and read `document.body.scrollHeight`.
Expected: meaningfully lower than the 11,279px baseline (the three carousel conversions alone should remove several thousand px of stacked card height).

- [ ] **Step 3: Re-run the overflow audit across all routes and widths**

For each route in `['/', '/pricing', '/about-us', '/teampage', '/projects', '/privacy-policy', '/terms-of-service']` and each width in `[280, 320, 360, 375, 480, 600, 768, 820, 900, 1023]`, load the page and compare `document.documentElement.scrollWidth` to the viewport width.
Expected: `scrollWidth <= viewportWidth` for every route/width combination (zero horizontal overflow), matching the pre-change baseline.

- [ ] **Step 4: Manually confirm each carousel at 375px width**

Navigate to `/`, scroll through `#why-choose-us`, `#engagement`, `#reviews` in turn.
Expected: each renders as a single-slide-visible (1.1 for Reviews) swipeable carousel with visible pagination dots; swiping/dragging advances slides; no layout jump or overlap.

- [ ] **Step 5: Manually confirm desktop layouts are unchanged**

Resize the same browser session to 1280px width (or open a new page at that viewport), reload `/`.
Expected: WhyChooseUs shows the alternating timeline with connector line, EngagementModels shows the 3-column grid, Reviews shows the 3-column grid — none show a Swiper/carousel.

- [ ] **Step 6: Stop the dev server**

Run: `netstat -ano | grep ':5183' | awk '{print $NF}' | sort -u | xargs -r -I{} taskkill //PID {} //F` (Windows) or the equivalent port-kill for your shell.

- [ ] **Step 7: Update the spec's baseline note (optional but recommended)**

If the measured height in Step 2 differs meaningfully from what's implied by the spec, add a one-line note to `docs/superpowers/specs/2026-08-22-homepage-mobile-restructure-design.md` under a new `## Result` heading recording the before/after mobile page height. Commit:

```bash
git add docs/superpowers/specs/2026-08-22-homepage-mobile-restructure-design.md
git commit -m "docs: record before/after mobile page height for homepage restructure"
```
