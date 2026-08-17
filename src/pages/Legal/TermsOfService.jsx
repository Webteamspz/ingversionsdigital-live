import Layout from "../../Layouts/Layouts";
import Seo from "../../components/Seo/Seo";
import "./Legal.css";

const TermsOfService = () => (
  <>
    <Seo
      title="Terms of Service | Ingversions Digital"
      description="Terms and conditions for using ingversionsdigital.com and engaging Ingversions Digital's services."
      path="/terms-of-service"
    />
    <Layout header={1} footer={1}>
      <main className="container legalPage">
        <h1>Terms of Service</h1>
        <p className="legalUpdated">Last updated: August 14, 2026</p>

        <p>
          These terms govern your use of ingversionsdigital.com and any
          services described on it. By using this site or engaging us, you
          agree to these terms.
        </p>

        <h2>Services</h2>
        <p>
          Specific project scope, deliverables, timelines, and pricing are
          agreed separately in writing (proposal, SOW, or contract) before
          any paid engagement begins. Content on this site is informational
          and not a binding quote.
        </p>

        <h2>Use of This Site</h2>
        <p>
          You agree not to misuse this site, attempt to disrupt it, or use
          its content for unlawful purposes.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          Site content, branding, and case study materials belong to
          Ingversions Digital or the respective client, unless stated
          otherwise, and may not be reused without permission.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          This site is provided "as is." We are not liable for indirect or
          consequential losses arising from its use.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms from time to time; the latest version always applies.</p>

        <h2>Contact</h2>
        <p>
          Questions? Email{" "}
          <a href="mailto:ingversionsdigital@gmail.com">ingversionsdigital@gmail.com</a>.
        </p>
      </main>
    </Layout>
  </>
);

export default TermsOfService;
