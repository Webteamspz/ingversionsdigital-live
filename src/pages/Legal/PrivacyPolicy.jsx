import Layout from "../../Layouts/Layouts";
import Seo from "../../components/Seo/Seo";
import "./Legal.css";

const PrivacyPolicy = () => (
  <>
    <Seo
      title="Privacy Policy | Ingversions Digital"
      description="How Ingversions Digital collects, uses, and protects your information."
      path="/privacy-policy"
    />
    <Layout header={1} footer={1}>
      <main className="container legalPage">
        <h1>Privacy Policy</h1>
        <p className="legalUpdated">Last updated: August 14, 2026</p>

        <p>
          Ingversions Digital ("we", "us", "our") respects your privacy. This
          policy explains what information we collect through
          ingversionsdigital.com and how we use it.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>Contact details you submit through our forms (name, email, phone, company, website, message).</li>
          <li>Usage data collected automatically via analytics and tag-management tools (pages viewed, referrer, device/browser type).</li>
        </ul>

        <h2>How We Use It</h2>
        <ul>
          <li>To respond to inquiries and schedule calls.</li>
          <li>To improve our website and services.</li>
          <li>To send updates you've opted into, if any.</li>
        </ul>

        <h2>Sharing</h2>
        <p>
          We do not sell your personal information. We use trusted
          third-party tools (e.g. form processing, scheduling, analytics)
          solely to operate this site and respond to you.
        </p>

        <h2>Your Rights</h2>
        <p>
          You can request access to, correction of, or deletion of your data
          at any time by emailing{" "}
          <a href="mailto:ingversionsdigital@gmail.com">ingversionsdigital@gmail.com</a>.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Reach us at{" "}
          <a href="mailto:ingversionsdigital@gmail.com">ingversionsdigital@gmail.com</a>.
        </p>
      </main>
    </Layout>
  </>
);

export default PrivacyPolicy;
