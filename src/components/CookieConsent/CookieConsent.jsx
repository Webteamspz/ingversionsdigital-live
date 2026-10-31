import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONSENT_EVENT, setConsent, startAnalytics } from "../../gtm";

const POLICY = "/privacy-policy";
const NOTICE = "/privacy-policy#cookies-tracking";

const text = {
  consentModal: {
    title: "We use cookies",
    description: `We use analytics cookies to understand how visitors use this site. Click Decline to turn them off. See our <a href="${POLICY}">Privacy Policy</a> and <a href="${NOTICE}">Cookie Notice</a>.`,
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
        description:
          "Google Analytics (through Google Tag Manager) and Microsoft Clarity show us how visitors use the site so we can improve it. Turning this off deletes their cookies.",
        linkedCategory: "analytics",
      },
    ],
  },
};

const apply = (cc) => {
  const value = cc.acceptedCategory("analytics") ? "granted" : "denied";
  setConsent(value);
  window.gtag?.("consent", "update", { analytics_storage: value });
  if (value === "granted") startAnalytics();
  else if (window.__analyticsStarted) return location.reload();
  window.dispatchEvent(new Event(CONSENT_EVENT));
};

const CookieConsent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    import("vanilla-cookieconsent/dist/cookieconsent.css");
    import("vanilla-cookieconsent").then((cc) =>
      cc.run({
        disablePageInteraction: false,
        guiOptions: {
          consentModal: { layout: "box", position: "bottom right", equalWeightButtons: true },
          preferencesModal: { layout: "box", equalWeightButtons: true },
        },
        categories: {
          necessary: { enabled: true, readOnly: true },
          analytics: {
            enabled: true,
            autoClear: {
              cookies: [{ name: /^_ga/ }, { name: /^_gcl_/ }, { name: /^_cl(ck|sk)$/ }],
            },
          },
        },
        onConsent: () => apply(cc),
        onChange: () => apply(cc),
        language: { default: "en", translations: { en: text } },
      }),
    );

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
