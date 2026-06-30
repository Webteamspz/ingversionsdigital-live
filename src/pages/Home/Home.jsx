import { lazy, useState, useEffect } from "react";

import Hero from "../../components/Hero/Hero";
import Layout from "../../Layouts/Layouts";
import DeferredComponent from "../../components/DeferredComponent/DeferredComponent";
import "./Home.css";

const TrackRecord = lazy(() => import("../../components/TrackRecord/TrackRecord"));
const Services = lazy(() => import("../../components/Services/Services"));
const WorkProcess = lazy(() => import("../../components/WorkProcess/WorkProcess"));
const WhyChooseUs = lazy(() => import("../../components/WhyChooseUs/WhyChooseUs"));
const Reviews = lazy(() => import("../../components/Reviews/Reviews"));
const Contact = lazy(() => import("../../components/Contact/Contact"));
const BlogSlider = lazy(() => import("../../components/BlogSlider/BlogSlider"));
const FAQ = lazy(() => import("../../components/FAQ/FAQ"));

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

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
      <Layout header={1} footer={1}>
        <Hero />
        <DeferredComponent component={TrackRecord} minHeight={300} />
        <DeferredComponent component={Services} minHeight={560} />
        <DeferredComponent component={WorkProcess} minHeight={540} />
        <DeferredComponent component={WhyChooseUs} minHeight={560} />
        <DeferredComponent component={Reviews} minHeight={520} />
        <DeferredComponent component={Contact} id="contact" minHeight={760} />
        <DeferredComponent component={BlogSlider} minHeight={600} />
        <DeferredComponent component={FAQ} minHeight={520} />
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
