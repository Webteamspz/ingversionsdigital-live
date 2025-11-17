import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import TeamPage from "./pages/TeamPage/TeamPage.jsx";


function App() {
  // Scroll to top on route change
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teampage" element={<TeamPage />} />

      </Routes>
    </>
  );
}

export default App;
