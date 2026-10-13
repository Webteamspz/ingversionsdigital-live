import PricingHero from "../../components/PricingHero/PricingHero";
import PricingPlans from "../../components/PricingPlans/PricingPlans";
import PricingFAQ from "../../components/PricingFAQ/PricingFAQ";

import Layout from "../../layouts/Layouts";
import PricingCompare from "../../components/Pricing/Pricing";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seodata";

const Pricing = () => {
  return (
    <>
      <SEO {...seo.pricing} />
      <Layout header={1} footer={1}>
        <main className="pricingPage">
          <PricingHero />
          <PricingPlans />
          <PricingCompare />
          <PricingFAQ />
        </main>
      </Layout>
    </>
  );
};

export default Pricing;
