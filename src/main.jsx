import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "react-international-phone/style.css";
import "./styles/style.css";
import { initGTMTracking, loadAnalytics } from "./gtm";

const root = createRoot(document.getElementById("root"));

root.render(
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
);


if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    initGTMTracking();
    loadAnalytics();
  });
} else {
  setTimeout(() => {
    initGTMTracking();
    loadAnalytics();
  }, 200);
}