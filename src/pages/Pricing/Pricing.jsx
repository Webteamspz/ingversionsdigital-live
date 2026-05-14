import PricingHero from "../../components/PricingHero/PricingHero";
import PricingPlans from "../../components/PricingPlans/PricingPlans";
import PricingComparison from "../../components/PricingComparison/PricingComparison";
import PricingFaq from "../../components/PricingFaq/PricingFaq";
import PricingCta from "../../components/PricingCta/PricingCta";

import Layout from "../../Layouts/Layouts";

const Pricing = () => {
  return (
    <Layout header={1} footer={1}>
      <main className="pricingPage">
        <PricingHero />
        <PricingPlans />
        <PricingComparison />
        <PricingFaq />
        <PricingCta />
      </main>
    </Layout>
  );
};

export default Pricing;
