import Layout from "../../layouts/Layouts";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seodata";
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
