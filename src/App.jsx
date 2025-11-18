import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import TeamPage from "./pages/TeamPage/TeamPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const el = document.querySelector(hash);
        if (!el) return;

        const header = document.getElementById("header");
        const headerOffset = header ? header.offsetHeight : 0;

        const rect = el.getBoundingClientRect();

        // base offset so section is not hidden behind sticky header
        let extraOffset = 16;

        // 👇 tweak specifically for contact section on smaller screens
        if (hash === "#contact" && window.innerWidth < 1024) {
          // move a bit further down so Pricing isn't at the top
          extraOffset = -80; // negative = scroll more down
        }

        const targetY = rect.top + window.scrollY - headerOffset - extraOffset;

        window.scrollTo({
          top: targetY,
          left: 0,
          behavior: "smooth",
        });
      };

      const t1 = setTimeout(scrollToHash, 0);
      const t2 = setTimeout(scrollToHash, 600);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [pathname, hash]);

  return null;
};

const App = () => {
  return (
    <>
      <ScrollManager />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
