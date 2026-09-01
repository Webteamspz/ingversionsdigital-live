import { useState, useEffect } from "react";

import HeroV2 from "../../components/Hero/HeroV2";
import Layout from "../../layouts/Layouts";
import Preloader from "../../components/Preloader/Preloader";
import SEO from "../../components/SEO/SEO";
import data from "../../data/sitedata";
import TrackRecord from "../../components/TrackRecord/TrackRecord";
import Services from "../../components/Services/Services";
import WorkProcess from "../../components/WorkProcess/WorkProcess";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Contact from "../../components/Contact/Contact";
import BlogSlider from "../../components/BlogSlider/BlogSlider";
import Reviews from "../../components/Reviews/Reviews";
import FAQ from "../../components/FAQ/FAQ";
import EngagementModels from "../../components/EngagementModels/EngagementModels";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: data.faq.list.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

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
        jsonLd={faqJsonLd}
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

        <TrackRecord />
        <Services />
        <WorkProcess />
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
