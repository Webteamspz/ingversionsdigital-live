
import { useEffect, useState, useRef } from "react";
import styles from "./preloader.module.css";

/**
 * Props:
 * - minDuration: minimum time (ms) the preloader stays visible to avoid flicker (default 800)
 * - logoSrc: optional logo path for the center image
 * - text: optional text under the logo ("Hello" by default)
 */
export default function Preloader({ minDuration = 800, logoSrc }) {
  const [visible, setVisible] = useState(true);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // When all page assets are loaded, hide the preloader (respecting minDuration).
    const onLoad = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const wait = Math.max(minDuration - elapsed, 0);
      const t = setTimeout(() => setVisible(false), wait);
      return () => clearTimeout(t);
    };

    if (document.readyState === "complete") {
      // Page already loaded.
      return onLoad();
    }

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [minDuration]);

  if (!visible) return null;

  return (
    <div className={styles.overlay} role="status" aria-live="polite" aria-label="Loading">
      <div className={styles.wrapper}>
        <div className={styles.ring} aria-hidden="true">
          <span className={styles.dot} />
        </div>

        {/* Optional logo */}
        {logoSrc ? (
          <img className={styles.logo} src={logoSrc} alt="Loading" />
        ) : null}
      </div>
    </div>
  );
}