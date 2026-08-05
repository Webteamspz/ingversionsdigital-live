import PricingHero from "../../components/PricingHero/PricingHero";
import PricingPlans from "../../components/PricingPlans/PricingPlans";
import PricingComparison from "../../components/PricingComparison/PricingComparison";
import PricingFaq from "../../components/PricingFaq/PricingFaq";

import Layout from "../../Layouts/Layouts";
import PricingCompare from "../../components/pricing/pricing";
import Seo from "../../components/Seo/Seo";
// import PricingCompare from "../../components/PricingComparison/PricingComparison";

const Pricing = () => {
  return (
    <>
      <Seo
        title="Shopify CRO Pricing | Ingversions Digital"
        description="Transparent pricing for Shopify CRO, A/B testing, UX research, and conversion optimization services for ecommerce brands."
        path="/pricing"
      />
      <Layout header={1} footer={1}>
        <main className="pricingPage">
          <PricingHero />
          <PricingPlans />
          <PricingCompare />
          <PricingFaq />
          {/* <PricingCta /> */}
        </main>
      </Layout>
    </>
  );
};

export default Pricing;