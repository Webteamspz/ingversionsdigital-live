import { useState, useEffect } from "react";

import Hero from "../../components/Hero/Hero";
import Layout from "../../layouts/Layout";
import Preloader from "../../components/Preloader/Preloader";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seoData";
import TrackRecord from "../../components/TrackRecord/TrackRecord";
import Services from "../../components/Services/Services";
import WorkProcess from "../../components/WorkProcess/WorkProcess";
import ProcessFlow from "../../components/ProcessFlow/ProcessFlow";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Contact from "../../components/Contact/Contact";
import BlogSlider from "../../components/BlogSlider/BlogSlider";
import Reviews from "../../components/Reviews/Reviews";
import FAQ from "../../components/FAQ/FAQ";
import EngagementModels from "../../components/EngagementModels/EngagementModels";
import CaseStudies from "../../components/CaseStudies/CaseStudies";

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
      <SEO {...seo.home} />

      {showPreloader && (
        <Preloader
          minDuration={800}
          logoSrc={"/assets/preloader/preloader.webp"}
          onComplete={handlePreloaderComplete}
        />
      )}

      <Layout header={1} footer={1}>
        <Hero />

        <TrackRecord />
        <Services />
        <WorkProcess />
        <ProcessFlow tabIds={["ab-testing", "shopify", "qa"]} />
        <CaseStudies />
        <EngagementModels />
        <Reviews />
        <WhyChooseUs />
        <BlogSlider />
        <FAQ />
        <Contact />
      </Layout>
    </>
  );
};

export default Home;
