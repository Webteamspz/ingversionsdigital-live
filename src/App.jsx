import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import TeamPage from "./pages/TeamPage/TeamPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

const ScrollManager = () => {
  const { pathname, hash, search } = useLocation(); // 👈 include search

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const targetId = hash.slice(1);
        const el =
          document.getElementById(targetId) || document.querySelector(hash);
        if (!el) return;

        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
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
  <>
    <ScrollManager />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teampage" element={<TeamPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
