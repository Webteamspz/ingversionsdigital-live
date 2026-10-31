import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Sparkles, X } from "lucide-react";
import styles from "./BlackFridayBanner.module.css";

const BLACK_FRIDAY = {
  live: true,
  endsAt: "2026-11-27T00:00:00+05:30",
  badge: "Black Friday in",
  eyebrow: "Early access",
  title: "Get your store ready before the BFCM rush",
  text: "Our biggest offer of the year opens soon for Shopify brands. Pick your plan now so you can claim it the moment it goes live.",
  cta: { label: "See Pricing", to: "/pricing", scrollTo: "pricingHero" },
  hideOn: ["/pricing"],
};

const DISMISS_KEY = "bf-banner-dismissed";

const isDismissed = () => {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
};

const split = (ms) => {
  const s = Math.floor(ms / 1000);
  return [["DAYS", s / 86400], ["HRS", (s / 3600) % 24], ["MIN", (s / 60) % 60], ["SEC", s % 60]]
    .map(([label, v]) => [label, String(Math.floor(v)).padStart(2, "0")]);
};

const BlackFridayBanner = () => {
  const { live, endsAt, badge, eyebrow, title, text, cta, hideOn } = BLACK_FRIDAY;
  const { pathname } = useLocation();
  const [left, setLeft] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!live || isDismissed()) return;
    const end = new Date(endsAt).getTime();
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, [live, endsAt]);

  if (!live || dismissed || !left || hideOn.includes(pathname.replace(/\/$/, ""))) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      return;
    }
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
              state={{ scrollTo: cta.scrollTo }}
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
