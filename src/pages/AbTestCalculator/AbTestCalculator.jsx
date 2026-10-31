import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seoData";
import AbTestCalculatorTool from "../../components/AbTestCalculator/AbTestCalculator";

const AbTestCalculator = () => (
  <>
    <SEO {...seo.abTestCalculator} />
    <Layout header={1} footer={1}>
      <AbTestCalculatorTool />
    </Layout>
  </>
);

export default AbTestCalculator;
