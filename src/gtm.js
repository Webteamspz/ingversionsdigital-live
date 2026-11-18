import { isProduction } from "./config/deploy";
import { CONSENT_DEFAULTS, consentState } from "./utils/consent";

export const GTM_ID = import.meta.env.VITE_GTM_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;
export const dl = () => (window.dataLayer = window.dataLayer || []);

const now = () => new Date().toISOString();

function gtag() {
  dl().push(arguments);
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

export function leadSuccess({ form_name, lead_source }) {
  dl().push({ event: "generate_lead", form_name, lead_source, ts: now() });
  if (typeof window.clarity === "function") {
    window.clarity("set", "lead", form_name);
    window.clarity("event", "generate_lead");
    window.clarity("upgrade", "lead");
  }
}

function consentDefaultsOnce() {
  if (window.__consentDefaults) return;
  window.__consentDefaults = true;
  for (const defaults of CONSENT_DEFAULTS) gtag("consent", "default", defaults);
}

export function updateConsent(value) {
  consentDefaultsOnce();
  gtag("consent", "update", consentState(value));
  if (typeof window.clarity === "function") {
    window.clarity("consentv2", {
      ad_Storage: value,
      analytics_Storage: value,
    });
  }
}

function initGTMTracking() {
  if (window.__gtmInit) return;
  window.__gtmInit = true;

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
    dl().push({ event: "form_submit", form_id: form.id || form_name, form_name, ts: now() });
  });
}

function loadClarity() {
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
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
  consentDefaultsOnce();
  const run = () => {
    loadClarity();
    loadGTM();
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run);
}

const CONSENT_KEY = "analytics-consent";
const ASK_AGAIN_MS = 182 * 24 * 60 * 60 * 1000;

export const CONSENT_EVENT = "consent-choice";

export const getConsent = () => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw === "granted") return raw;
    const { value, at } = JSON.parse(raw) || {};
    if (value === "denied" && Date.now() - at > ASK_AGAIN_MS) return null;
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
};

export const setConsent = (value) => {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, at: Date.now() }));
  } catch {
    return;
  }
};

export function startAnalytics() {
  if (!isProduction || window.__analyticsStarted) return;
  window.__analyticsStarted = true;
  initGTMTracking();
  loadAnalytics();
}
