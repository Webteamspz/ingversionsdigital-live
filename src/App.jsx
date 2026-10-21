import { lazy, Suspense, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import StagingLogin from "../src/components/StagingLogin/StagingLogin.jsx";
import CookieConsent from "./components/CookieConsent/CookieConsent.jsx";
import PromoBar from "./components/PromoBar/PromoBar.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton.jsx";
import Home from "./pages/Home/Home.jsx";
import servicePages from "./data/servicepagesdata.js";

const TeamPage = lazy(() => import("./pages/TeamPage/TeamPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs.jsx"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing.jsx"));
const Projects = lazy(() => import("./pages/Projects/Projects.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/Legal/PrivacyPolicy.jsx"));
const ThankYou = lazy(() => import("./pages/ThankYou/ThankYou.jsx"));
const TermsOfService = lazy(() => import("./pages/Legal/TermsOfService.jsx"));
const ServicePage = lazy(() => import("./pages/ServicePage/ServicePage.jsx"));
const BlogHome = lazy(() => import("./pages/Blog/BlogHome.jsx"));
const BlogPost = lazy(() => import("./pages/Blog/BlogPost.jsx"));

const ScrollManager = () => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    const targetId = hash.slice(1);

    const scrollToEl = (el) => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const existing =
      document.getElementById(targetId) || document.querySelector(hash);

    if (existing) {
      scrollToEl(existing);
      return;
    }

    
    
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

    
    
    const timeout = setTimeout(() => observer.disconnect(), 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [pathname, hash, search]);

  return null;
};

const App = () => (
  <StagingLogin>
    <ScrollManager />
    <ScrollToTopButton />
    <CookieConsent />
    <PromoBar />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        {Object.keys(servicePages).map((slug) => (
          <Route key={slug} path={`/${slug}`} element={<ServicePage key={slug} slug={slug} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </StagingLogin>
);

export default App;