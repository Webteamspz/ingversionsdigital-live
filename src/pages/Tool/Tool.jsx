import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seoData";
import ToolCalculator from "../../components/ToolCalculator/ToolCalculator";

const Tool = ({ slug }) => (
  <>
    <SEO {...seo[slug]} />
    <Layout header={1} footer={1}>
      <ToolCalculator slug={slug} />
    </Layout>
  </>
);

export default Tool;
