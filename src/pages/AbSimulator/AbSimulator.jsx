import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seoData";
import AbSimulatorView from "../../components/AbSimulator/AbSimulator";

// Own route (lazy in App.jsx) so the 3D experience never loads with the rest of the site.
const AbSimulator = () => (
  <>
    <SEO {...seo.abSimulator} />
    <Layout header={1} footer={1}>
      <AbSimulatorView />
    </Layout>
  </>
);

export default AbSimulator;
