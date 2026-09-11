import { isProduction } from "./config/deploy";

export const GTM_ID = import.meta.env.VITE_GTM_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;
export const dl = () => (window.dataLayer = window.dataLayer || []);


const now = () => new Date().toISOString();

export function pageview(
  path = location.pathname + location.search + location.hash,
  title = document.title
) {
  dl().push({
    event: "virtual_pageview",
    page_path: path,
    page_title: title,
    page_location: location.href,
    page_referrer: document.referrer || null,
    ts: now(),
  });
}

export function ctaClick({ label, location: loc, href }) {
  dl().push({
    event: "cta_click",
    cta_label: (label || "").slice(0, 120),
    cta_location: loc || "unknown",
    cta_href: href || null,
    ts: now(),
  });
}

export function formSubmit({ form_id, form_name }) {
  dl().push({ event: "form_submit", form_id, form_name, ts: now() });
}

export function formSuccess({ form_id, form_name }) {
  dl().push({ event: "form_success", form_id, form_name, ts: now() });
}

export function observeSectionOnce(el, eventName, extra = {}, threshold = 0.5) {
  if (!el || !eventName || el.__gtmObserved) return;
  el.__gtmObserved = true;
  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting && entry.intersectionRatio >= threshold) {
        dl().push({ event: eventName, ...extra, ts: now() });
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
  if (window.__gtmInit) return; 
  window.__gtmInit = true;

  
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
  window.addEventListener("hashchange", firePV);
  pageview(); 

  
  document.addEventListener("click", (e) => {
    const el = e.target.closest?.("[data-cta]");
    if (!el) return;
    const a = el.closest("a");
    ctaClick({
      label: el.getAttribute("data-cta") || (el.textContent || "").trim(),
      location: el.getAttribute("data-cta-loc") || "unknown",
      href: (a && a.getAttribute("href")) || el.getAttribute("href") || null,
    });
  });

  
  document.addEventListener("submit", (e) => {
    const form = e.target.closest?.("form[data-gtm-form]");
    if (!form) return;
    const form_name = form.getAttribute("data-gtm-form");
    const form_id = form.id || form_name || "form";
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
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total > 0) {
        const pct = Math.min(
          100,
          Math.round(((window.scrollY || doc.scrollTop) / total) * 100)
        );
        thresholds.forEach((t) => {
          if (!marks.has(t) && pct >= t) {
            marks.add(t);
            dl().push({ event: "scroll_depth", percent: t, ts: now() });
          }
        });
      }
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });


  requestAnimationFrame(onScroll);
}

function loadClarity() {
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
}

function loadGTM() {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", GTM_ID);
}

export function loadAnalytics() {
  if (typeof window === "undefined") return;
  if (!isProduction || !GTM_ID || !CLARITY_ID) return;
  window.addEventListener("load", () => {
    loadClarity();
    loadGTM();
  });
}