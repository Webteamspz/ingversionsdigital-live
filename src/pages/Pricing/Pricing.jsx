import PricingHero from "../../components/PricingHero/PricingHero";
import PricingPlans from "../../components/PricingPlans/PricingPlans";
import PricingComparison from "../../components/PricingComparison/PricingComparison";
import PricingFaq from "../../components/PricingFaq/PricingFaq";

import Layout from "../../Layouts/Layouts";
import PricingCompare from "../../components/pricing/pricing";
// import PricingCompare from "../../components/PricingComparison/PricingComparison";

const Pricing = () => {
  return (
    <Layout header={1} footer={1}>
      <main className="pricingPage">
        <PricingHero />
        <PricingPlans />
            <PricingCompare />
        <PricingFaq />
        {/* <PricingCta /> */}
      </main>
    </Layout>
  );
};

export default Pricing;
