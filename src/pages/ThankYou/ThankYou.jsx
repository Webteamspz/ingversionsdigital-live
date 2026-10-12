import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
// Reuses the 404 page's centered-card layout.
import styles from "../NotFound/NotFound.module.css";

const CALENDLY_URL = "https://calendly.com/ingversionsdigital/30min";

const ThankYou = () => (
  <section className={styles.nfWrapper}>
    <SEO
      title="Thank You | Ingversions Digital"
      description="Thanks for getting in touch with Ingversions Digital."
      noindex
    />
    <div className={styles.nfCard}>
      <h1 className={styles.nfTitle}>Thank you!</h1>
      <p className={styles.nfSubtitle}>
        We've received your details and will reply by email shortly. Want to
        move faster? Book a call now.
      </p>
      <a href={CALENDLY_URL} className={styles.nfBtn}>Book a 30-min call</a>
      <p className={styles.nfSubtitle}>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  </section>
);

export default ThankYou;
