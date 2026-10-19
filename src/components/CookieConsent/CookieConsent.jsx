import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getConsent, setConsent, startAnalytics } from "../../gtm";
import styles from "./CookieConsent.module.css";

const CookieConsent = () => {
  const [visible, setVisible] = useState(() => getConsent() === null);
  const acceptRef = useRef(null);
  const { pathname } = useLocation();
  // Let visitors read the policy the gate links to.
  const gated = visible && pathname !== "/privacy-policy";

  // Block page scroll until the visitor makes a choice.
  useEffect(() => {
    if (!gated) return;
    // Class, not inline style: other modals reset body.style.overflow on mount.
    document.documentElement.classList.add("consent-locked");
    acceptRef.current?.focus();
    return () => document.documentElement.classList.remove("consent-locked");
  }, [gated]);

  if (!gated) return null;

  const choose = (value) => {
    setConsent(value);
    setVisible(false);
    if (value === "granted") startAnalytics();
  };

  return (
    <div className={styles.overlay}>
      <div
        className={styles.banner}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
      >
        <h2 id="cookie-consent-title" className={styles.title}>
          Your privacy
        </h2>
        <p className={styles.text}>
          We use cookies to understand how visitors use our site and to improve
          your experience. They only load if you accept. See our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.btn} onClick={() => choose("denied")}>
            Decline
          </button>
          <button
            ref={acceptRef}
            type="button"
            className={`${styles.btn} ${styles.accept}`}
            onClick={() => choose("granted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
