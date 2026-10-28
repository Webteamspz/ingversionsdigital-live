import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONSENT_EVENT, setConsent, startAnalytics } from "../../gtm";

// vanilla-cookieconsent (pinned in package.json). Loaded with a dynamic import
// so the library and its CSS ship as their own chunk and never run during
// prerender. The banner is a corner box that never blocks the page.
const POLICY = "/privacy-policy";
const NOTICE = "/privacy-policy#cookies-tracking";

const text = {
  consentModal: {
    title: "We use cookies",
    description: `We use analytics cookies to understand how visitors use this site. They only load if you accept. See our <a href="${POLICY}">Privacy Policy</a> and <a href="${NOTICE}">Cookie Notice</a>.`,
    acceptAllBtn: "Accept",
    acceptNecessaryBtn: "Decline",
    showPreferencesBtn: "Manage preferences",
  },
  preferencesModal: {
    title: "Cookie preferences",
    acceptAllBtn: "Accept",
    acceptNecessaryBtn: "Decline",
    savePreferencesBtn: "Save preferences",
    closeIconLabel: "Close",
    sections: [
      {
        description: `Choose which cookies this site may use. You can change this at any time with Cookie Settings in the footer. Details are in our <a href="${NOTICE}">Cookie Notice</a>.`,
      },
      {
        title: "Strictly necessary",
        description: "Remembers your cookie choice. Always on.",
        linkedCategory: "necessary",
      },
      {
        title: "Analytics",
        description: "Google Analytics (through Google Tag Manager) and Microsoft Clarity show us how visitors use the site so we can improve it. Turning this off deletes their cookies.",
        linkedCategory: "analytics",
      },
    ],
  },
};

// Mirror the choice into the analytics-consent key that main.jsx and gtm.js read.
const apply = (cc) => {
  const value = cc.acceptedCategory("analytics") ? "granted" : "denied";
  setConsent(value);
  window.gtag?.("consent", "update", { analytics_storage: value });
  if (value === "granted") startAnalytics();
  // Scripts already running can't be unloaded; a reload starts the page without them.
  else if (window.__analyticsStarted) return location.reload();
  window.dispatchEvent(new Event(CONSENT_EVENT));
};

const CookieConsent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    import("vanilla-cookieconsent/dist/cookieconsent.css");
    import("vanilla-cookieconsent").then((cc) =>
      // run() only starts once, so StrictMode's second effect is harmless.
      cc.run({
        disablePageInteraction: false,
        guiOptions: {
          consentModal: { layout: "box", position: "bottom right", equalWeightButtons: true },
          preferencesModal: { layout: "box", equalWeightButtons: true },
        },
        categories: {
          necessary: { enabled: true, readOnly: true },
          // _ga/_ga_<id>: GA4, _gcl_au: Google conversion linker (set by the GTM container), _clck/_clsk: Clarity.
          analytics: { autoClear: { cookies: [{ name: /^_ga/ }, { name: /^_gcl_/ }, { name: /^_cl(ck|sk)$/ }] } },
        },
        onConsent: () => apply(cc),
        onChange: () => apply(cc),
        language: { default: "en", translations: { en: text } },
      })
    );

    // Internal links in the banner go through the router, not a full reload.
    const onClick = (e) => {
      const a = e.target.closest?.("#cc-main a[href^='/']");
      if (!a || e.button || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      import("vanilla-cookieconsent").then((cc) => cc.hidePreferences());
      navigate(a.getAttribute("href"));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  return null;
};

export default CookieConsent;
