import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, CalendarCheck, X } from "lucide-react";
import data from "../../data/sitedata";
import { CONSENT_EVENT } from "../../gtm";
import styles from "./PromoBar.module.css";

const DISMISS_KEY = "promo-bar-dismissed";
// The bar shows this long after the cookie choice is known (made now, or on
// an earlier visit).
const SHOW_AFTER_MS = 10000;
// On a blog post or a case study page the bar also waits until the reader has
// spent this long on that page.
const BLOG_READ_MS = 60000;

// lucide has no brand icons; this is the official WhatsApp glyph.
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);
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
  const [ready, setReady] = useState(false);
  const barRef = useRef(null);
  const { pathname } = useLocation();
  const onPost = pathname.startsWith("/blog/") || pathname.startsWith("/case-studies");
  const [readPath, setReadPath] = useState(null); // the page the reader has spent BLOG_READ_MS on

  // Restarts on every page, so each post or case study gets its own minute.
  useEffect(() => {
    if (!onPost) return;
    const id = setTimeout(() => setReadPath(pathname), BLOG_READ_MS);
    return () => clearTimeout(id);
  }, [onPost, pathname]);
  const show = visible && ready && (!onPost || readPath === pathname);

  // PromoBar lives in App, so this runs once per visit, not on every navigation.
  useEffect(() => {
    let id;
    const start = () => {
      id = setTimeout(() => setReady(true), SHOW_AFTER_MS);
    };
    // The consent banner fires this on every page load once a choice exists,
    // and when a first-time visitor chooses, so the two never overlap.
    window.addEventListener(CONSENT_EVENT, start, { once: true });
    return () => {
      clearTimeout(id);
      window.removeEventListener(CONSENT_EVENT, start);
    };
  }, []);

  // Expose the bar height so fixed bottom UI and page content can clear it.
  useEffect(() => {
    const root = document.documentElement;
    if (!show || !barRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      root.style.setProperty("--promo-bar-h", `${entry.target.offsetHeight}px`);
    });
    ro.observe(barRef.current);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--promo-bar-h");
    };
  }, [show]);

  if (!show) return null;

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
              <span className={styles.eyebrowLabel}>{eyebrow}</span>
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
              aria-label={cta.label}
            >
              <span className={styles.ctaBadge} aria-hidden="true">
                <CalendarCheck size={16} strokeWidth={2.5} />
              </span>
              <span className={styles.ctaLabel}>{cta.label}</span>
              <ArrowRight size={16} className={styles.ctaArrow} aria-hidden="true" />
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
              aria-label={whatsapp.label}
            >
              <WhatsAppIcon />
              <span className={styles.waLabel}>{whatsapp.label}</span>
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
