import { useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, setConsent, startAnalytics } from "../../gtm";
import styles from "./CookieConsent.module.css";

const CookieConsent = () => {
  const [visible, setVisible] = useState(() => getConsent() === null);
  if (!visible) return null;

  const choose = (value) => {
    setConsent(value);
    setVisible(false);
    if (value === "granted") startAnalytics();
  };

  return (
    <div className={styles.banner} role="region" aria-label="Cookie consent">
      <p className={styles.text}>
        We use Google Analytics, Tag Manager and Microsoft Clarity to understand
        how the site is used. They only load if you accept. See our{" "}
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.btn} onClick={() => choose("denied")}>
          Decline
        </button>
        <button type="button" className={`${styles.btn} ${styles.accept}`} onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
