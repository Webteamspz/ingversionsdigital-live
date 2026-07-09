import { Suspense, lazy, useState, useEffect } from "react";

import Hero from "../../components/Hero/Hero";
import TrackRecord from "../../components/TrackRecord/TrackRecord";
import Services from "../../components/Services/Services";
import WorkProcess from "../../components/WorkProcess/WorkProcess";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Contact from "../../components/Contact/Contact";
import Layout from "../../Layouts/Layouts";
import Preloader from "../../components/preloader/preloader";
import BlogSlider from "../../components/BlogSlider/BlogSlider";
import "./Home.css";

const Reviews = lazy(() => import("../../components/Reviews/Reviews"));
const Team = lazy(() => import("../../components/Team/Team"));
const FAQ = lazy(() => import("../../components/FAQ/FAQ"));
const EngagementModels = lazy(() => import("../../components/Engagementmodels/Engagementmodels"));
const ProjectsSlider = lazy(() => import("../../components/ProjectSlider/ProjectsSlider"));

const Home = () => {
  const [showPreloader, setShowPreloader] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = localStorage.getItem("hasSeenPreloader");
    if (!hasSeenPreloader) {
      setShowPreloader(true);
      const timer = setTimeout(() => {
        setShowPreloader(false);
        localStorage.setItem("hasSeenPreloader", "true");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

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
      {showPreloader && (
        <Preloader
          minDuration={800}
          logoSrc={"/assets/preloader/preloader.png"}
        />
      )}

      <Layout header={1} footer={1}>
        <Hero />
        <TrackRecord />
        <Services />
        <WorkProcess />
        <WhyChooseUs />

        <Suspense fallback={null}>
          <Reviews />
        </Suspense>

        <Contact />
        <BlogSlider />

        <Suspense fallback={null}>
          <ProjectsSlider />
        </Suspense>

        <Suspense fallback={null}>
          <EngagementModels />
        </Suspense>

        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
      </Layout>

      {/* Scroll to Top Button */}
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