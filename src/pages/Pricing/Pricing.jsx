import PricingHero from "../../components/PricingHero/PricingHero";
import PricingPlans from "../../components/PricingPlans/PricingPlans";
import PricingFAQ from "../../components/PricingFAQ/PricingFAQ";

import Layout from "../../layouts/Layouts";
import PricingCompare from "../../components/Pricing/Pricing";
import SEO from "../../components/SEO/SEO";

const Pricing = () => {
  return (
    <>
      <SEO
        title="Shopify CRO Pricing | Ingversions Digital"
        description="Transparent pricing for Shopify CRO, A/B testing, UX research, and conversion optimization services for ecommerce brands."
        path="/pricing"
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
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
