export const GTM_ID = "GTM-WXDBWNBH";
export const dl = () => (window.dataLayer = window.dataLayer || []);

export function pageview(
  path = location.pathname + location.search,
  title = document.title
) {
  dl().push({ event: "virtual_pageview", page_path: path, page_title: title });
}

export function ctaClick({ label, location, href }) {
  dl().push({
    event: "cta_click",
    cta_label: label,
    cta_location: location,
    cta_href: href || null,
  });
}

export function formSubmit({ form_id, form_name }) {
  dl().push({ event: "form_submit", form_id, form_name });
}

export function formSuccess({ form_id, form_name }) {
  dl().push({ event: "form_success", form_id, form_name });
}

export function observeSectionOnce(el, eventName, extra = {}, threshold = 0.5) {
  if (!el || !eventName) return;
  if (el.__gtmObserved) return;
  el.__gtmObserved = true;

  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting && entry.intersectionRatio >= threshold) {
        dl().push({ event: eventName, ...extra });
        io.disconnect();
      }
    },
    { threshold: [threshold] }
  );

  io.observe(el);
  return () => io.disconnect();
}

export function initGTMTracking() {
  if (typeof window === "undefined") return;

  const firePV = () => pageview();
  ["pushState", "replaceState"].forEach((m) => {
    const orig = history[m];
    history[m] = function (...args) {
      const ret = orig.apply(this, args);
      queueMicrotask(firePV);
      return ret;
    };
  });
  window.addEventListener("popstate", firePV);
  pageview();

  document.addEventListener("click", (e) => {
    const el = e.target.closest?.("[data-cta]");
    if (!el) return;
    ctaClick({
      label: el.getAttribute("data-cta") || el.textContent.trim(),
      location: el.getAttribute("data-cta-loc") || "unknown",
      href: el.getAttribute("href") || null,
    });
  });

  document.addEventListener("submit", (e) => {
    const form = e.target.closest?.("form[data-gtm-form]");
    if (!form) return;
    const form_name = form.getAttribute("data-gtm-form");
    const form_id = form.id || form_name;
    formSubmit({ form_id, form_name });
  });

  window.__gtmFormSuccess = (form) => {
    if (!form) return;
    const form_name = form.getAttribute("data-gtm-form") || form.name || "form";
    const form_id = form.id || form_name;
    formSuccess({ form_id, form_name });
  };

  const marks = new Set();
  const thresholds = [25, 50, 75, 100];
  const onScroll = () => {
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    if (total <= 0) return;
    const pct = Math.min(
      100,
      Math.round(((window.scrollY || doc.scrollTop) / total) * 100)
    );
    thresholds.forEach((t) => {
      if (!marks.has(t) && pct >= t) {
        marks.add(t);
        dl().push({ event: "scroll_depth", percent: t });
      }
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}