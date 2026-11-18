import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seoData";
import { leadSuccess } from "../../gtm";
import styles from "../NotFound/NotFound.module.css";

const CALENDLY_URL = "https://calendly.com/ingversionsdigital/30min";

const ThankYou = () => {
  const booked = new URLSearchParams(useLocation().search).has("booked");

  useEffect(() => {
    if (booked) leadSuccess({ form_name: "calendly", lead_source: "Calendly booking" });
  }, [booked]);

  return (
    <section className={styles.nfWrapper}>
      <SEO {...seo.thankYou} />
      <div className={styles.nfCard}>
        <h1 className={styles.nfTitle}>{booked ? "Your call is booked!" : "Thank you!"}</h1>
        {booked ? (
          <p className={styles.nfSubtitle}>
            Check your inbox for the calendar invite. We will review your store before the call.
          </p>
        ) : (
          <>
            <p className={styles.nfSubtitle}>
              We've received your details and will reply by email shortly. Want to move faster? Book
              a call now.
            </p>
            <a href={CALENDLY_URL} className={`${styles.nfBtn} ${styles.nfBtnBook}`}>
              Book a 30-min call
            </a>
          </>
        )}
        <p className={styles.nfSubtitle}>
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </section>
  );
};

export default ThankYou;
