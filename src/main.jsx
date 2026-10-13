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

const root = createRoot(document.getElementById("root"));

root.render(
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
);


if (getConsent() === "granted") {
  if ("requestIdleCallback" in window) requestIdleCallback(startAnalytics);
  else setTimeout(startAnalytics, 200);
}
