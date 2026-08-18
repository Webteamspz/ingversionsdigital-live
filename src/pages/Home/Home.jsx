import { Suspense, lazy, useState, useEffect } from "react";

import Hero from "../../components/Hero/Hero";
import Layout from "../../Layouts/Layouts";
import Preloader from "../../components/preloader/preloader";
import Seo from "../../components/Seo/Seo";
import "./Home.css";

const TrackRecord = lazy(() => import("../../components/TrackRecord/TrackRecord"));
const Services = lazy(() => import("../../components/Services/Services"));
const WorkProcess = lazy(() => import("../../components/WorkProcess/WorkProcess"));
const WhyChooseUs = lazy(() => import("../../components/WhyChooseUs/WhyChooseUs"));
const Contact = lazy(() => import("../../components/Contact/Contact"));
const BlogSlider = lazy(() => import("../../components/BlogSlider/BlogSlider"));
const Reviews = lazy(() => import("../../components/Reviews/Reviews"));
const FAQ = lazy(() => import("../../components/FAQ/FAQ"));
const EngagementModels = lazy(() => import("../../components/Engagementmodels/Engagementmodels"));

const Home = () => {
  const [showPreloader, setShowPreloader] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = localStorage.getItem("hasSeenPreloader");
    if (!hasSeenPreloader) {
      setShowPreloader(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    localStorage.setItem("hasSeenPreloader", "true");
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Seo
        title="Ingversions Digital | Shopify, CRO and A/B Testing Agency"
        description="Shopify CRO agency building high-converting stores with A/B testing, conversion optimization, and custom Shopify development for fast-growing ecommerce brands."
        path="/"
      />

      {showPreloader && (
        <Preloader
          minDuration={800}
          logoSrc={"/assets/preloader/preloader.webp"}
          onComplete={handlePreloaderComplete}
        />
      )}

      <Layout header={1} footer={1}>
        <Hero />

        <Suspense fallback={null}>
          <TrackRecord />
          <Services />
          <WorkProcess />
          <WhyChooseUs />
          <Reviews />
          <Contact />
          <BlogSlider />
          <EngagementModels />
          <FAQ />
        </Suspense>
      </Layout>

      <button
        onClick={scrollToTop}
        className={`tsNav scrollTopBtn ${showScrollTop ? "scrollTopVisible" : "scrollTopHidden"}`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          className="scrollTopArrow"
        >
          <path
            d="M0.999921 8.5H15.5833M15.5833 8.5L8.58325 1.5M15.5833 8.5L8.58325 15.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </>
  );
};

export default Home;