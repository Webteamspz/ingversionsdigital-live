import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import data from "../../data/sitedata";
import styles from "./PromoBar.module.css";

const DISMISS_KEY = "promo-bar-dismissed";
const { promoBar } = data;

const isDismissed = () => {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

const PromoBar = () => {
  const { enabled, eyebrow, text, cta, whatsapp } = promoBar || {};
  const [visible, setVisible] = useState(() => enabled && Boolean(text) && !isDismissed());
  const barRef = useRef(null);

  // Expose the bar height so fixed bottom UI and page content can clear it.
  useEffect(() => {
    const root = document.documentElement;
    if (!visible || !barRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      root.style.setProperty("--promo-bar-h", `${entry.target.offsetHeight}px`);
    });
    ro.observe(barRef.current);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--promo-bar-h");
    };
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // storage blocked: dismiss for this page view only
    }
    setVisible(false);
  };

  const waHref = whatsapp
    ? `https://wa.me/${whatsapp.phone.replace(/\D/g, "")}?text=${encodeURIComponent(whatsapp.message || "")}`
    : null;

  return (
    <div ref={barRef} className={styles.bar} role="region" aria-label="Announcement">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          {eyebrow && (
            <span className={styles.eyebrow}>
              <span className={styles.dot} aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <p className={styles.text}>{text}</p>
        </div>

        <div className={styles.actions}>
          {cta && (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
              data-cta={cta.label}
              data-cta-loc="Promo Bar"
            >
              {cta.label} <ArrowRight size={16} aria-hidden="true" />
            </a>
          )}
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsapp}
              data-cta={whatsapp.label}
              data-cta-loc="Promo Bar"
            >
              <MessageCircle size={18} aria-hidden="true" /> {whatsapp.label}
            </a>
          )}
          <button type="button" className={styles.close} onClick={dismiss} aria-label="Dismiss announcement">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;
