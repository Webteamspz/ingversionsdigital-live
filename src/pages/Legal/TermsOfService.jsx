import Layout from "../../layouts/Layouts";
import SEO from "../../components/SEO/SEO";
import {
  IconDocument,
  IconList,
  IconCopyright,
  IconAlert,
  IconScale,
  IconRefresh,
} from "./LegalIcons";
import styles from "./Legal.module.css";

const TermsOfService = () => (
  <>
    <SEO
      title="Terms of Service | Ingversions Digital"
      description="Terms and conditions for using ingversionsdigital.com and engaging Ingversions Digital's CRO, Shopify, and web development services."
      path="/terms-of-service"
    />
    <Layout header={1} footer={1}>
      <div className={`container ${styles.legalPage}`}>
        <div className={styles.legalHero}>
          <span className={styles.legalTag}>Legal</span>
          <h1>Terms of Service</h1>
          <p className={styles.legalIntro}>
            These terms govern your use of ingversionsdigital.com and any
            services described on it. By browsing this site or engaging
            Ingversions Digital ("we", "us", "our"), you agree to the terms
            below.
          </p>
        </div>

        <div className={styles.legalSections}>
          <div className={styles.legalSection}>
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconDocument />
              </div>
              <h2 id="services">Services &amp; Engagement</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                Content on this site — including pricing plans, case
                studies, and service descriptions — is informational and
                does not constitute a binding quote. Specific project scope,
                deliverables, timelines, and pricing are agreed separately
                in writing (a proposal, statement of work, or contract)
                before any paid engagement begins.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconList />
              </div>
              <h2 id="use-of-site">Use of This Site</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <ul>
                <li>Don't misuse this site or attempt to disrupt, overload, or gain unauthorized access to it.</li>
                <li>Don't scrape, copy, or reuse site content for unlawful or unauthorized commercial purposes.</li>
                <li>Any information you submit through our forms must be accurate and provided with your consent.</li>
              </ul>
            </div>
          </div>

          <div className={styles.legalSection}>
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconScale />
              </div>
              <h2 id="payments">Payments &amp; Refunds</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                Payment terms, invoicing schedules, and any refund or
                cancellation conditions for paid engagements are set out in
                the specific proposal or contract signed for that
                engagement — this website's pricing plans are indicative
                starting points, not final invoices.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconCopyright />
              </div>
              <h2 id="intellectual-property">Intellectual Property</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                Site content, branding, and case-study materials belong to
                Ingversions Digital or the respective client, unless stated
                otherwise, and may not be copied or reused without written
                permission. Deliverables produced for a client under a
                signed contract are owned per the terms of that contract.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconList />
              </div>
              <h2 id="third-party-links">Third-Party Links &amp; Tools</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                This site links to or embeds third-party services (for
                example, Calendly for scheduling and our blog subdomain).
                We aren't responsible for the content, availability, or
                practices of those third-party sites.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconAlert />
              </div>
              <h2 id="liability">Limitation of Liability</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                This site is provided "as is," without warranties of any
                kind. To the fullest extent permitted by law, Ingversions
                Digital is not liable for indirect, incidental, or
                consequential losses arising from your use of this site.
                Liability relating to a specific paid engagement is governed
                by that engagement's contract.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconScale />
              </div>
              <h2 id="governing-law">Governing Law</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                These terms are governed by the laws of India. Any disputes
                arising from your use of this site will be subject to the
                exclusive jurisdiction of the courts in Surat, Gujarat,
                India.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconRefresh />
              </div>
              <h2 id="changes">Changes</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                We may update these terms from time to time; the version
                published here, dated above, always applies. Terms for an
                active paid engagement are governed by that engagement's
                signed contract, not by later changes to this page.
              </p>
            </div>
          </div>
        </div>

        <hr className={styles.legalDivider} />

        <div className={styles.legalContactCard}>
          <div className={styles.legalSection}>
            <div className={styles.legalSectionHead}>
              <h2 id="contact">Contact</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                Questions about these terms? Email{" "}
                <a href="mailto:ingversionsdigital@gmail.com">
                  ingversionsdigital@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </>
);

export default TermsOfService;
