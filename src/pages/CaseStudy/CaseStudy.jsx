import Layout from "../../layouts/Layouts";
import SEO from "../../components/SEO/SEO";
import CaseStudies from "../../components/CaseStudies/CaseStudies";
import seo from "../../data/seodata";

// A homepage case study (sitedata.caseStudies) on its own URL, /case-studies/<id>.
// Its head tags are the seodata.js entry with the same path.
const CaseStudy = ({ slug }) => (
  <>
    <SEO {...Object.values(seo).find((p) => p.path === `/case-studies/${slug}`)} />
    <Layout header={1} footer={1}>
      <CaseStudies only={slug} />
    </Layout>
  </>
);

export default CaseStudy;
