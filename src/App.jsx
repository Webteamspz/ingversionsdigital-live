import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import TeamPage from "./pages/TeamPage/TeamPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import Pricing from "./pages/Pricing/Pricing.jsx";
import Projects from "./pages/Projects/Projects.jsx";

const ScrollManager = () => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    const targetId = hash.slice(1);

    const scrollToEl = (el) => {
      const header = document.getElementById("header");
      const headerHeight = header ? header.offsetHeight : 0;

      const rect = el.getBoundingClientRect();
      const targetY = rect.top + window.scrollY - headerHeight + 100;

      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    };

    const existing =
      document.getElementById(targetId) || document.querySelector(hash);

    if (existing) {
      scrollToEl(existing);
      return;
    }

    // Element not mounted yet (likely a lazy-loaded section) —
    // watch the DOM and scroll as soon as it appears.
    const observer = new MutationObserver(() => {
      const el =
        document.getElementById(targetId) || document.querySelector(hash);
      if (el) {
        scrollToEl(el);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Safety net: stop watching after 5s so we don't observe forever
    // if the target never mounts (e.g. typo'd hash).
    const timeout = setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname, hash, search]);

  return null;
};

const App = () => (
  <>
    <ScrollManager />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teampage" element={<TeamPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;