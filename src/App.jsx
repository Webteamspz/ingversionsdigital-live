import { lazy, Suspense, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import StagingLogin from "../src/components/StagingLogin/StagingLogin.jsx";
import Home from "./pages/Home/Home.jsx";

const TeamPage = lazy(() => import("./pages/TeamPage/TeamPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs.jsx"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing.jsx"));
const Projects = lazy(() => import("./pages/Projects/Projects.jsx"));

const ScrollManager = () => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const targetId = hash.slice(1);
        const el =
          document.getElementById(targetId) || document.querySelector(hash);
        if (!el) return;

        const header = document.getElementById("header");
        const headerHeight = header ? header.offsetHeight : 0;

        const rect = el.getBoundingClientRect();
        const targetY =
          rect.top + window.scrollY - headerHeight + 100;

        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      };

      const t1 = setTimeout(scrollToHash, 0);
      const t2 = setTimeout(scrollToHash, 400);
      const t3 = setTimeout(scrollToHash, 900);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [pathname, hash, search]);

  return null;
};

const App = () => (
  // Poore app ko StagingLogin se wrap kar diya
  <StagingLogin>
    <ScrollManager />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </StagingLogin>
);

export default App;