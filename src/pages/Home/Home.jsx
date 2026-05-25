import { Suspense, lazy, useState, useEffect } from "react";

import Hero from "../../components/Hero/Hero";
import TrackRecord from "../../components/TrackRecord/TrackRecord";
import Services from "../../components/Services/Services";
import WorkProcess from "../../components/WorkProcess/WorkProcess";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Contact from "../../components/Contact/Contact";
import Layout from "../../Layouts/Layouts";
import Preloader from "../../components/Preloader/Preloader";
import BlogSlider from "../../components/BlogSlider/BlogSlider";

// Lazy sections
// const PricingCompare = lazy(() => import("../../components/Pricing/Pricing"));
const Reviews = lazy(() => import("../../components/Reviews/Reviews"));
const Team = lazy(() => import("../../components/Team/Team"));
const FAQ = lazy(() => import("../../components/FAQ/FAQ"));

const Home = () => {
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = localStorage.getItem("hasSeenPreloader");

    if (!hasSeenPreloader) {
      // first visit → show preloader
      setShowPreloader(true);

      const timer = setTimeout(() => {
        setShowPreloader(false);
        localStorage.setItem("hasSeenPreloader", "true"); // remember it
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {showPreloader && (
        <Preloader
          minDuration={1200}
          logoSrc={"/assets/preloader/preloader.png"}
        />
      )}

      <Layout header={1} footer={1}>
        <Hero />
        <TrackRecord />
        <Services />
        <WorkProcess />
        <WhyChooseUs />

        {/* <Suspense fallback={null}>
          <PricingCompare />
        </Suspense> */}

        <Suspense fallback={null}>
          <Reviews />
        </Suspense>

        <Contact />
        <BlogSlider />
        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
      </Layout>
    </>
  );
};

export default Home;
