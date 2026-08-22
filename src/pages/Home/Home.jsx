import { Suspense, lazy, useState, useEffect } from "react";

import HeroV2 from "../../components/Hero/HeroV2";
import Layout from "../../layouts/Layouts";
import Preloader from "../../components/Preloader/Preloader";
import SEO from "../../components/SEO/SEO";

const TrackRecord = lazy(() => import("../../components/TrackRecord/TrackRecord"));
const Services = lazy(() => import("../../components/Services/Services"));
const WorkProcess = lazy(() => import("../../components/WorkProcess/WorkProcess"));
const WhyChooseUs = lazy(() => import("../../components/WhyChooseUs/WhyChooseUs"));
const Contact = lazy(() => import("../../components/Contact/Contact"));
const BlogSlider = lazy(() => import("../../components/BlogSlider/BlogSlider"));
const Reviews = lazy(() => import("../../components/Reviews/Reviews"));
const FAQ = lazy(() => import("../../components/FAQ/FAQ"));
const EngagementModels = lazy(() => import("../../components/EngagementModels/EngagementModels"));

const Home = () => {
  const [showPreloader, setShowPreloader] = useState(false);

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

  return (
    <>
      <SEO
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
        
        <HeroV2 />

        <Suspense fallback={null}>
          <TrackRecord />
          <Services />
          <WorkProcess />
          <EngagementModels />
          <Reviews />
          <WhyChooseUs />
          <BlogSlider />
          <FAQ />
          <Contact />
        </Suspense>
      </Layout>
    </>
  );
};

export default Home;
