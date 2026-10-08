# Responsive, Security, and Code Review Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the verified low-risk fixes from the 2026-10-06 site audit on the `production` branch: security and performance config, accessibility and code cleanups, and responsive sizing fixes for viewports 360px and wider. Viewports below 360px are out of scope.

**Architecture:** Three independent tasks touching disjoint files. Config (nginx, index.html, link rel attributes), code and accessibility (components), and responsive CSS (module files). No new files, no new dependencies, no content or copy changes.

**Tech Stack:** React 19 + Vite 7 (plain JSX), CSS Modules, nginx, Docker.

## Global Constraints

- NEVER use `clamp()`, `vw`, `vh`, `vmax`, `dvh`, `svh`, or any fluid viewport sizing. Use fixed `px` values with explicit `@media` overrides. (CLAUDE.md rule.)
- Hairline separators use `box-shadow: 0 1px 0 0 <color>`, not `border-bottom`.
- Do not add a CSS framework. Do not hardcode values a `:root` token already covers.
- Do not touch `docker-compose.*.yml`, `Dockerfile`, `README.md`, `eslint.config.js`, or `.github/workflows/`.
- Do not add a Content-Security-Policy header in this plan. It needs a verified allowlist and is deferred.
- Verification per task: `npm run lint` clean, and `npm run build` succeeds. There is no test suite. Browser checks are a user task (no browser is available to the implementer).
- Commit after each task with the exact message given in that task.

---

### Task 1: Security headers, gzip, font stylesheet, and safe link relations

**Files:**
- Modify: `nginx.conf` (inside the `server { ... }` block, before the first `location`)
- Modify: `index.html` (inside `<head>`, after the existing font preconnect lines)
- Modify: `src/components/Footer/Footer.jsx:99` and `src/components/Footer/Footer.jsx:134`
- Modify: `src/components/TeamCard/TeamCard.jsx:67`

- [x] **Step 1: Add security headers and gzip to `nginx.conf`**

Insert these lines directly after the line `server {` (line 1) and before `location = /healthz {`:

```nginx
  gzip on;
  gzip_comp_level 5;
  gzip_min_length 1024;
  gzip_vary on;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;

  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
```

Note: `always` makes these apply to error responses too. Do not add a
`Content-Security-Policy` line.

- [x] **Step 2: Add the Google Fonts stylesheet to `index.html`**

Find this exact line in `index.html`:

```html
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

Insert directly after it:

```html
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

- [x] **Step 3: Use explicit `noopener` on external links**

In `src/components/Footer/Footer.jsx`, change both occurrences of
`rel="noreferrer"` (lines 99 and 134) to:

```jsx
rel="noopener noreferrer"
```

In `src/components/TeamCard/TeamCard.jsx`, change line 67 from
`rel="noreferrer"` to:

```jsx
rel="noopener noreferrer"
```

- [x] **Step 4: Verify**

Run: `git diff --stat`
Expected: changes only in `nginx.conf`, `index.html`, `Footer.jsx`, `TeamCard.jsx`.

Run: `grep -c 'rel="noreferrer"' src/components/Footer/Footer.jsx src/components/TeamCard/TeamCard.jsx`
Expected: `0` for both files.

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

- [x] **Step 5: Commit**

```bash
git add nginx.conf index.html src/components/Footer/Footer.jsx src/components/TeamCard/TeamCard.jsx
git commit -m "Add security headers, gzip, Google Fonts stylesheet, noopener on external links"
```

---

### Task 2: Accessibility and code cleanups

**Files:**
- Modify: `src/components/ProjectsGrid/ProjectsGrid.jsx:118-130` (the image wrapper with `role="button"`)
- Modify: `src/components/ContactModal/ContactModal.jsx:91` and `:110`
- Modify: `src/components/StagingLogin/StagingLogin.jsx:36` and `:164`
- Modify: `src/components/Header/Header.jsx:47-50` (delete local helper) and its import block
- Rename: `src/pages/NotFound/NotFound.css` → `src/pages/NotFound/NotFound.module.css`
- Modify: the file that imports `NotFound.css` (`src/pages/NotFound/NotFound.jsx`)

- [x] **Step 1: Keyboard activation for the project image trigger**

In `src/components/ProjectsGrid/ProjectsGrid.jsx`, the `hasSlider` branch renders:

```jsx
                <div
                  className={styles.imageWrap}
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View larger image for ${project.title}`}
                >
```

Replace it with:

```jsx
                <div
                  className={styles.imageWrap}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View larger image for ${project.title}`}
                >
```

- [x] **Step 2: Explicit `type="button"` on non-submit buttons**

In `src/components/ContactModal/ContactModal.jsx`, change line 91 from
`<button className={styles.contactModalClose} onClick={handleClose} aria-label="Close">`
to:

```jsx
        <button type="button" className={styles.contactModalClose} onClick={handleClose} aria-label="Close">
```

Change line 110 from
`<button className={styles.contactModalSubmit} onClick={handleClose}>`
to:

```jsx
            <button type="button" className={styles.contactModalSubmit} onClick={handleClose}>
```

In `src/components/StagingLogin/StagingLogin.jsx`, add `type="button"` to the
`<button` element on line 36 and the `<button` element on line 164. Keep every
other attribute unchanged. If the element on line 164 is the form's submit
control, use `type="submit"` instead and report that in your status.

- [x] **Step 3: Use the shared `isExternalHref` helper in `Header.jsx`**

In `src/components/Header/Header.jsx`, delete this local helper (lines 47-50):

```jsx
const isExternalHref = (href = "") =>
  /^https?:\/\//i.test(href) ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");
```

Add this import with the other imports at the top of the file:

```jsx
import { isExternalHref } from "../../utils/url";
```

Verify `src/utils/url.js` exports the same logic as the deleted helper before
removing it. If it does not, stop and report instead of deleting.

- [x] **Step 4: Rename NotFound stylesheet to a CSS Module**

Run: `git mv src/pages/NotFound/NotFound.css src/pages/NotFound/NotFound.module.css`

In `src/pages/NotFound/NotFound.jsx`, change the stylesheet import from
`import "./NotFound.css";` to:

```jsx
import styles from "./NotFound.module.css";
```

Then update every class reference in `NotFound.jsx` to `styles.<className>`
where the CSS class names are used. If the component uses class names that are
global-only (for example generic `.container`), keep them as `styles.container`
and confirm each name exists in the module file. Report every class you changed.

- [x] **Step 5: Verify**

Run: `grep -c 'onKeyDown' src/components/ProjectsGrid/ProjectsGrid.jsx`
Expected: at least 1.

Run: `grep -n '<button' src/components/ContactModal/ContactModal.jsx src/components/StagingLogin/StagingLogin.jsx | grep -v 'type='`
Expected: no output.

Run: `grep -n "const isExternalHref" src/components/Header/Header.jsx`
Expected: no output.

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

- [x] **Step 6: Commit**

```bash
git add src/components/ProjectsGrid/ProjectsGrid.jsx src/components/ContactModal/ContactModal.jsx src/components/StagingLogin/StagingLogin.jsx src/components/Header/Header.jsx src/pages/NotFound/NotFound.module.css src/pages/NotFound/NotFound.jsx
git commit -m "Fix keyboard activation, button types, shared helper import, NotFound CSS Module"
```

---

### Task 3: Responsive fixes at 360px and wider

Scope: viewports from 360px upward. Do not design for widths below 360px.

**Files:**
- Modify: `src/components/Footer/Footer.module.css:107-109` (`.socialBtn`)
- Modify: `src/components/Hero/HeroV2.module.css:5` (`min-height`)
- Modify: `src/components/ContactModal/ContactModal.module.css:28` (`max-height`)
- Modify: `src/pages/NotFound/NotFound.module.css:5` (`min-height`, renamed in Task 2)

**Interfaces:** Consumes the `NotFound.module.css` file produced by Task 2.

- [x] **Step 1: Footer social buttons meet the 44px touch target on mobile**

In `src/components/Footer/Footer.module.css`, the `.socialBtn` rule currently
sets `width: 40px; height: 40px;` (lines 107-109). Keep those values for
desktop. Append this block after the `.socialBtn` rule:

```css
@media (max-width: 767.98px) {
  .socialBtn {
    width: 44px;
    height: 44px;
  }
}
```

- [x] **Step 2: Hero minimum height uses fixed px with a mobile override**

In `src/components/Hero/HeroV2.module.css`, replace line 5:

```css
  min-height: min(740px,100vh);
```

with:

```css
  min-height: 740px;
```

Then append at the end of the file:

```css
@media (max-width: 767.98px) {
  .heroV2 {
    min-height: auto;
  }
}
```

Before writing this block, read the file to confirm the selector name on the
rule that contains line 5. Replace `.heroV2` with the real selector if it
differs. Report the selector you used.

- [x] **Step 3: Contact modal max height in px**

In `src/components/ContactModal/ContactModal.module.css`, replace line 28:

```css
  max-height: 90vh;
```

with:

```css
  max-height: 720px;
```

Add this block at the end of the file:

```css
@media (max-width: 767.98px) {
  .contactModal {
    max-height: calc(100% - 32px);
  }
}
```

Note: `calc()` with `%` and `px` is not a fluid viewport unit and is allowed.
Confirm the selector on line 28 is `.contactModal`; if it differs, use the real
selector in the `@media` block and report it.

**Superseded by the final-review fix wave (commit 845b751):** a fixed
`720px` base value regressed on short landscape viewports at 768px and
wider (the modal could be taller than the screen, with no scroll). The
shipped value is `max-height: calc(100% - 32px);` on the base
`.contactModal` rule itself (the overlay is `position: fixed; inset: 0`,
so it has a definite height and `%` resolves), with no separate mobile
override needed — the `@media` block above was removed. This note
exists so the step above still shows the original reasoning; the base
rule's committed value is `calc(100% - 32px)`, not `720px`.

- [x] **Step 4: NotFound minimum height in px**

In `src/pages/NotFound/NotFound.module.css`, replace line 5:

```css
  min-height: 100vh;
```

with:

```css
  min-height: 720px;
```

Add at the end of the file:

```css
@media (max-width: 767.98px) {
  .notFound {
    min-height: 560px;
  }
}
```

Confirm the selector on line 5. Replace `.notFound` with the real selector if
it differs, and report it.

- [x] **Step 5: Verify**

Run: `grep -n "vh\|vw\|vmax\|dvh\|svh\|clamp(" src/components/Footer/Footer.module.css src/components/Hero/HeroV2.module.css src/components/ContactModal/ContactModal.module.css src/pages/NotFound/NotFound.module.css`
Expected: no output (none of the four files contains a viewport unit or `clamp()`).

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

- [x] **Step 6: Commit**

```bash
git add src/components/Footer/Footer.module.css src/components/Hero/HeroV2.module.css src/components/ContactModal/ContactModal.module.css src/pages/NotFound/NotFound.module.css
git commit -m "Replace viewport-unit sizing with px and breakpoint overrides; 44px footer social targets"
```

---

## Deferred (not in this plan)

- Content-Security-Policy header: needs an allowlist verified against GTM, Clarity, and Formspree in a real browser.
- `og-image.jpg` and `twitter-image.jpg` at `public/assets/seo/`: need image assets, not code.
- `ProjectsGrid.module.css` lines 128-129, 172, 210, 344; `Header.module.css` lines 135, 204; `AboutHero.module.css` lines 93-94 (`100vmax`): need browser checks before choosing px values.
- TeamCard social links hover-only on touch devices: needs a design decision and browser check.
- Page titles and descriptions (SEO copy): content changes, need sign-off.
- Image width/height attributes and WebP conversion: separate asset task.
- react-international-phone CSS lazy-loading: separate performance task.
- `stage` branch GTM leak fix: lives on a different branch.
