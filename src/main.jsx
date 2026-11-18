import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./styles/style.css";
import { getConsent, startAnalytics } from "./gtm";
import { isProduction } from "./config/deploy";
import { captureAttribution, getAttribution, withUtm } from "./utils/attribution";

if (isProduction && getConsent() !== "denied") captureAttribution();
document.addEventListener("click", (e) => {
  const a = e.target.closest?.('a[href*="calendly.com"]');
  if (a) a.href = withUtm(a.href, getAttribution());
});

document.querySelectorAll("[data-prerender]").forEach((el) => el.remove());

const rootEl = document.getElementById("root");
rootEl.textContent = "";
rootEl.removeAttribute("data-prerendered");
const root = createRoot(rootEl);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>,
);

if (getConsent() !== "denied") {
  if ("requestIdleCallback" in window) requestIdleCallback(startAnalytics);
  else setTimeout(startAnalytics, 200);
}
