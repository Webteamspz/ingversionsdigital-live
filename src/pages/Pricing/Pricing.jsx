import { useState } from "react";
import PricingHero from "../../components/PricingHero/PricingHero";
import PricingPlans from "../../components/PricingPlans/PricingPlans";
import PricingFAQ from "../../components/PricingFAQ/PricingFAQ";

import Layout from "../../layouts/Layouts";
import PricingCompare from "../../components/Pricing/Pricing";
import PricingAI from "../../components/PricingAI/PricingAI";
import PricingBottomCta from "../../components/PricingBottomCta/PricingBottomCta";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seodata";

const Pricing = () => {
  const [track, setTrack] = useState("brands");

  return (
    <>
      <SEO {...seo.pricing} />
      <Layout header={1} footer={1}>
        <main className="pricingPage">
          <PricingHero track={track} setTrack={setTrack} />
          <PricingPlans track={track} />
          <PricingAI />
          <PricingCompare track={track} />
          <PricingFAQ />
          <PricingBottomCta />
        </main>
      </Layout>
    </>
  );
};

export default Pricing;
