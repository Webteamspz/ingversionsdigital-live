import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Sparkles, X } from "lucide-react";
import useFloaterClearance from "../../hooks/useFloaterClearance";
import { currentOccasion } from "../../utils/occasions";
import { occasionBanner, occasions } from "../../data/occasionsData";
import styles from "./OccasionBanner.module.css";

const AUTO_KEY = "occasion-auto-opened";
const autoOpened = (id) => {
  try {
    return sessionStorage.getItem(AUTO_KEY) === id;
  } catch {
    return false;
  }
};
const markAutoOpened = (id) => {
  try {
    sessionStorage.setItem(AUTO_KEY, id);
    return true;
  } catch {
    return false;
  }
};

const split = (ms) => {
  const s = Math.floor(ms / 1000);
  return [
    ["DAYS", s / 86400],
    ["HRS", (s / 3600) % 24],
    ["MIN", (s / 60) % 60],
    ["SEC", s % 60],
  ].map(([label, v]) => [label, String(Math.floor(v)).padStart(2, "0")]);
};

// Sale banner: shows the running occasion (Black Friday, Cyber Monday, Christmas, New Year) and
// switches straight from one to the next. Hidden on normal days. Dates: src/utils/occasions.js.
const OccasionBanner = () => {
  const { cta, hideOn, autoOpenMs } = occasionBanner;
  const { pathname } = useLocation();
  const [state, setState] = useState(null);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const launcherRef = useRef(null);
  const closeRef = useRef(null);
  const auto = useRef(false);
  const done = useRef(false);

  useEffect(() => {
    const tick = () => setState(currentOccasion());
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    done.current = true;
    markAutoOpened(state?.id);
    if (!auto.current) closeRef.current?.focus();
    auto.current = false;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus();
    };
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => setOpen(false), [pathname]);

  const hidden = hideOn.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const today = Boolean(state?.today);
  const shown = Boolean(state) && !hidden;
  useFloaterClearance(rootRef, "left", shown);

  useEffect(() => {
    if (!shown || open || done.current || autoOpened(state.id)) return;
    const id = setTimeout(() => {
      auto.current = true;
      setOpen(true);
    }, autoOpenMs);
    return () => clearTimeout(id);
  }, [shown, open, autoOpenMs, state?.id]);
  if (!shown) return null;

  const copy = occasions[state.id];
  const { name, ring, title, badge, eyebrow, text } = today ? { ...copy, ...copy.today } : copy;
  const parts = split(state.left);
  const [unit, value] = today
    ? ["today", "LIVE"]
    : parts[0][1] !== "00"
      ? ["days", parts[0][1]]
      : ["hrs", parts[1][1]];

  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  return (
    <aside className={styles.wrap} ref={rootRef} aria-label={`${name} offer`}>
      {open && (
        <div className={styles.panel} id="bf-offer" role="dialog" aria-labelledby="bf-title">
          <div className={styles.timerBlock}>
            <span className={styles.badge}>
              <span className={styles.dot} aria-hidden="true" />
              {badge}
            </span>
            {!today && (
              <div className={styles.timer} role="timer" aria-live="off">
                {parts.map(([label, v]) => (
                  <span className={styles.tile} key={label}>
                    <span className={styles.num}>{v}</span>
                    <span className={styles.label}>{label}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <span className={styles.eyebrow}>
            <Sparkles size={14} strokeWidth={2.5} aria-hidden="true" />
            {eyebrow}
          </span>
          <p className={styles.title} id="bf-title">
            {title}
          </p>
          <p className={styles.text}>{text}</p>

          <Link
            to={cta.to}
            state={{ scrollTo: cta.scrollTo }}
            className={styles.cta}
            data-cta={cta.label}
            data-cta-loc={`${name} Banner`}
          >
            {cta.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <button
            type="button"
            ref={closeRef}
            className={styles.close}
            onClick={close}
            aria-label={`Close ${name} offer`}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <button
        type="button"
        ref={launcherRef}
        className={`${styles.launcher} ${open ? styles.active : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="bf-offer"
        aria-label={
          today ? `${name} offer, live today` : `${name} offer, ${Number(value)} ${unit} left`
        }
        data-cta={`${name} Seal`}
        data-cta-loc={`${name} Banner`}
      >
        <span className={styles.face} aria-hidden="true">
          <svg className={styles.ring} viewBox="0 0 100 100">
            <defs>
              <path id="bf-ring" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
            </defs>
            <text>
              <textPath href="#bf-ring" textLength="244" lengthAdjust="spacing">
                {ring}
              </textPath>
            </text>
          </svg>
          <span className={styles.core}>
            <span className={styles.value}>{value}</span>
            <span className={styles.unit}>{unit}</span>
          </span>
        </span>
      </button>
    </aside>
  );
};

export default OccasionBanner;
