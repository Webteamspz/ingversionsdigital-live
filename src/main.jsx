import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "react-international-phone/style.css";
import "./styles/style.css";
import { getConsent, startAnalytics } from "./gtm";

// scripts/prerender.mjs bakes each route's head tags into its HTML for crawlers
// that do not run JS. <SEO> re-adds them on mount, so drop the static copies.
document.querySelectorAll("[data-prerender]").forEach((el) => el.remove());

// The prerendered page body (hidden by style.css) is for crawlers; clear it and
// render the app fresh, exactly as before.
const rootEl = document.getElementById("root");
rootEl.textContent = "";
rootEl.removeAttribute("data-prerendered");
const root = createRoot(rootEl);

root.render(
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
);

// Analytics runs unless the visitor has clicked Decline (opt-out).
if (getConsent() !== "denied") {
  if ("requestIdleCallback" in window) requestIdleCallback(startAnalytics);
  else setTimeout(startAnalytics, 200);
}
