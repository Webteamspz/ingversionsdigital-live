import { ArrowRight } from "lucide-react";
import Layout from "../../layouts/Layouts";
import SEO from "../../components/SEO/SEO";
import {
  IconShield,
  IconList,
  IconCookie,
  IconUsers,
  IconRefresh,
} from "./LegalIcons";
import styles from "./Legal.module.css";

const PrivacyPolicy = () => (
  <>
    <SEO
      title="Privacy Policy | Ingversions Digital"
      description="How Ingversions Digital collects, uses, shares, and protects your information across ingversionsdigital.com."
      path="/privacy-policy"
    />
    <Layout header={1} footer={1}>
      <div className={styles.legalPage}>
        <div className={styles.legalHeroWrap}>
          <div className={styles.legalHeroDecor} aria-hidden="true" />
          <div className="container">
            <div className={styles.legalHero}>
              <span className={styles.legalTag}>Legal</span>
              <h1>Privacy Policy</h1>
              <p className={styles.legalIntro}>
                Ingversions Digital ("we", "us", "our") is a Shopify CRO agency
                based in Surat, India. This policy explains what information we
                collect through ingversionsdigital.com, why we collect it, and
                the choices you have — written in plain language, not legalese.
              </p>
            </div>
          </div>
        </div>

        <div className="container">
        <div className={styles.legalSections}>
          <div className={styles.legalSection}>
            <span className={styles.legalCornerFold} aria-hidden="true" />
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconList />
              </div>
              <h2 id="information-we-collect">Information We Collect</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <ul>
                <li>
                  <strong>Information you give us:</strong> name, email,
                  phone number, company/organization, website URL, and
                  project details submitted through our contact forms or
                  strategy-call requests.
                </li>
                <li>
                  <strong>Information collected automatically:</strong> pages
                  viewed, referring site, approximate location (from IP),
                  device and browser type, and on-site interactions —
                  collected via analytics and tag-management tools.
                </li>
                <li>
                  <strong>Scheduling information:</strong> if you book a call
                  through our Calendly link, Calendly collects the details
                  needed to schedule it (name, email, selected time slot).
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.legalSection}>
            <span className={styles.legalCornerFold} aria-hidden="true" />
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconCookie />
              </div>
              <h2 id="cookies-tracking">Cookies &amp; Tracking Technologies</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                We use cookies and similar technologies to understand how
                visitors use this site and to keep it running smoothly. The
                tools we currently use include:
              </p>
              <ul>
                <li>
                  <strong>Google Analytics &amp; Google Tag Manager</strong> —
                  aggregate usage and traffic-source reporting.
                </li>
                <li>
                  <strong>Microsoft Clarity</strong> — session/heatmap
                  analytics to help us improve page layout and usability.
                </li>
              </ul>
              <p>
                You can block or delete cookies in your browser settings at
                any time; doing so may affect how parts of the site behave
                but won't prevent you from reading its content.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <span className={styles.legalCornerFold} aria-hidden="true" />
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconShield />
              </div>
              <h2 id="how-we-use-it">How We Use It</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <ul>
                <li>To respond to inquiries and schedule strategy calls.</li>
                <li>To scope, propose, and deliver services you request.</li>
                <li>To understand and improve this website's content and performance.</li>
                <li>To send updates or replies related to your inquiry — we don't send unsolicited marketing email.</li>
              </ul>
            </div>
          </div>

          <div className={styles.legalSection}>
            <span className={styles.legalCornerFold} aria-hidden="true" />
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconUsers />
              </div>
              <h2 id="sharing">Sharing</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                We do not sell your personal information. We share it only
                with trusted third-party tools that help us operate this
                site and respond to you, including:
              </p>
              <ul>
                <li><strong>Formspree</strong> — processes contact-form submissions.</li>
                <li><strong>Calendly</strong> — handles strategy-call scheduling.</li>
                <li><strong>Google Analytics, Google Tag Manager &amp; Microsoft Clarity</strong> — as described above.</li>
              </ul>
              <p>
                We may also disclose information if required by law, or to
                protect the rights, safety, or property of Ingversions
                Digital or others.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <span className={styles.legalCornerFold} aria-hidden="true" />
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconShield />
              </div>
              <h2 id="data-retention">Data Retention</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                We keep inquiry and project information for as long as
                needed to respond to you, deliver services, and meet
                accounting or legal obligations, after which it's deleted or
                anonymized. Analytics data is retained per each provider's
                default retention settings.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <span className={styles.legalCornerFold} aria-hidden="true" />
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconUsers />
              </div>
              <h2 id="your-rights">Your Rights</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                Wherever you're located, you can request access to,
                correction of, or deletion of your personal data at any
                time, or ask us to stop using it for a specific purpose, by
                emailing{" "}
                <a href="mailto:ingversionsdigital@gmail.com">
                  ingversionsdigital@gmail.com
                </a>
                . We'll respond within a reasonable timeframe.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <span className={styles.legalCornerFold} aria-hidden="true" />
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconShield />
              </div>
              <h2 id="childrens-privacy">Children's Privacy</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                This site and our services are intended for businesses and
                professionals. We don't knowingly collect personal
                information from children under 16. If you believe a child
                has provided us with personal information, contact us and
                we'll remove it.
              </p>
            </div>
          </div>

          <div className={styles.legalSection}>
            <span className={styles.legalCornerFold} aria-hidden="true" />
            <div className={styles.legalSectionHead}>
              <div className={styles.legalIconWrap}>
                <IconRefresh />
              </div>
              <h2 id="changes">Changes to This Policy</h2>
            </div>
            <div className={styles.legalSectionBody}>
              <p>
                We may update this policy as our tools or practices change.
                The "Last updated" date above always reflects the current
                version — we encourage checking back periodically.
              </p>
            </div>
          </div>
        </div>

        <hr className={styles.legalDivider} />

        <div className={styles.legalContactCard}>
          <h2 id="contact">Contact</h2>
          <p>
            Questions about this policy or your data? We're happy to help.
          </p>
          <a href="/#contact" className={styles.legalContactBtn}>
            Start the conversation
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
        </div>
      </div>
    </Layout>
  </>
);

export default PrivacyPolicy;
