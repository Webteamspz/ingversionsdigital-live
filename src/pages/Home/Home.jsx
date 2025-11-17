import { Suspense, lazy, useState, useEffect } from "react";

import Hero from "../../components/Hero/Hero";
import TrackRecord from "../../components/TrackRecord/TrackRecord";
import Services from "../../components/Services/Services";
import WorkProcess from "../../components/WorkProcess/WorkProcess";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import Contact from "../../components/Contact/Contact";
import Layout from "../../Layouts/Layouts";
import Preloader from "../../components/Preloader/Preloader";

// Lazy sections
const PricingCompare = lazy(() =>
  import("../../components/Pricing/Pricing")
);
const Reviews = lazy(() => import("../../components/Reviews/Reviews"));
const Team = lazy(() => import("../../components/Team/Team"));
const FAQ = lazy(() => import("../../components/FAQ/FAQ"));

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPreloader && (
        <Preloader
          minDuration={1200}
          logoSrc={"/assets/preloader/preloader.png"}
        />
      )}

      {/* Layout handles header + footer */}
      <Layout header={1} footer={1}>
        <Hero />

        <TrackRecord />
        <Services />
        <WorkProcess />
        <WhyChooseUs />

        <Suspense fallback={null}>
          <PricingCompare />
        </Suspense>

        <Suspense fallback={null}>
          <Reviews />
        </Suspense>

        
        {/* <Suspense fallback={null}>
          <Team />
        </Suspense> */}

        <Contact />

        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
      </Layout>
    </>
  );
}
