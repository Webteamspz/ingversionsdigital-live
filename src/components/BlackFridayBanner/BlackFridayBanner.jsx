import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, X } from "lucide-react";
import styles from "./BlackFridayBanner.module.css";

// Flip `live` to true to show the banner. It hides itself once `endsAt` passes.
const BLACK_FRIDAY = {
  live: true,
  endsAt: "2026-11-27T00:00:00+05:30",
  badge: "Black Friday in",
  eyebrow: "Limited-time offer",
  title: "Our Black Friday offer is almost here",
  text: "Something special is coming for Shopify brands. Look over our plans now so you're ready when it goes live.",
  cta: { label: "See Pricing", to: "/pricing" },
};

const DISMISS_KEY = "bf-banner-dismissed";
const UNITS = [
  ["DAYS", 86400000],
  ["HRS", 3600000],
  ["MIN", 60000],
  ["SEC", 1000],
];

const isDismissed = () => {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

const split = (ms) =>
  UNITS.map(([label, size], i) => {
    const value = i === 0 ? Math.floor(ms / size) : Math.floor((ms % UNITS[i - 1][1]) / size);
    return [label, String(value).padStart(2, "0")];
  });

const BlackFridayBanner = () => {
  const { live, endsAt, badge, eyebrow, title, text, cta } = BLACK_FRIDAY;
  // null until the effect runs, so render never reads Date or storage.
  const [left, setLeft] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!live || isDismissed()) return;
    const end = new Date(endsAt).getTime();
    const tick = () => {
      const ms = Math.max(0, end - Date.now());
      setLeft(ms);
      if (ms === 0) clearInterval(id);
    };
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, [live, endsAt]);

  if (!live || dismissed || !left) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // storage blocked: hide for this page view only
    }
    setDismissed(true);
  };

  return (
    <aside className={styles.wrap} aria-label="Black Friday offer">
      <div className="container">
        <div className={styles.frame}>
          <div className={styles.card}>
            <span className={`${styles.glow} ${styles.glowBrand}`} aria-hidden="true" />
            <span className={`${styles.glow} ${styles.glowAccent}`} aria-hidden="true" />

            <div className={styles.timerBlock}>
              <span className={styles.badge}>
                <span className={styles.dot} aria-hidden="true" />
                {badge}
              </span>
              <div className={styles.timer} role="timer" aria-live="off">
                {split(left).map(([label, value], i) => (
                  <div className={styles.unit} key={label}>
                    {i > 0 && (
                      <span className={styles.colon} aria-hidden="true">
                        :
                      </span>
                    )}
                    <span className={styles.tile}>
                      <span className={styles.num} key={value}>
                        {value}
                      </span>
                      <span className={styles.label}>{label}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.textBlock}>
              <span className={styles.eyebrow}>
                <Sparkles size={14} strokeWidth={2.5} aria-hidden="true" />
                {eyebrow}
              </span>
              <p className={styles.title}>{title}</p>
              <p className={styles.text}>{text}</p>
            </div>

            <Link
              to={cta.to}
              className={`btn ${styles.cta}`}
              data-cta={cta.label}
              data-cta-loc="Black Friday Banner"
            >
              {cta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <button type="button" className={styles.close} onClick={dismiss} aria-label="Dismiss Black Friday offer">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default BlackFridayBanner;
