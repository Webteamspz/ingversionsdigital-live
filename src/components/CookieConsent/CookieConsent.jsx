import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CONSENT_EVENT, getConsent, setConsent, startAnalytics } from "../../gtm";
import styles from "./CookieConsent.module.css";

// Only "Accept" is remembered. "Decline" hides the banner for this visit, so it
// asks again on the next page load.
const CookieConsent = () => {
  const [visible, setVisible] = useState(() => getConsent() !== "granted");
  const dialogRef = useRef(null);
  const { pathname } = useLocation();
  // Block the site until a choice is made, except on the policy the banner links to.
  const blocking = visible && pathname !== "/privacy-policy";

  useEffect(() => {
    if (!blocking) return;
    // Class, not inline style: other modals reset body.style.overflow on mount.
    document.documentElement.classList.add("consent-locked");
    dialogRef.current?.focus();
    return () => document.documentElement.classList.remove("consent-locked");
  }, [blocking]);

  if (!visible) return null;

  const choose = (value) => {
    if (value === "granted") {
      setConsent("granted");
      startAnalytics();
    }
    setVisible(false);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  // Keep Tab inside the banner while it blocks the page.
  const trapFocus = (e) => {
    if (!blocking || e.key !== "Tab") return;
    const items = [...dialogRef.current.querySelectorAll("a[href], button")];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      {blocking && <div className={styles.backdrop} aria-hidden="true" />}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={styles.banner}
        role={blocking ? "dialog" : "region"}
        aria-modal={blocking || undefined}
        aria-label="Cookie consent"
        onKeyDown={trapFocus}
      >
        <p className={styles.text}>
          We use cookies to understand how visitors use our site and to improve
          your experience. They only load if you accept. See our{" "}
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
    </>
  );
};

export default CookieConsent;
