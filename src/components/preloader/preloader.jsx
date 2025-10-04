
import { useEffect, useState, useRef } from "react";
import styles from "./preloader.module.css";


export default function Preloader({ minDuration = 800, logoSrc }) {
  const [visible, setVisible] = useState(true);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const onLoad = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const wait = Math.max(minDuration - elapsed, 0);
      const t = setTimeout(() => setVisible(false), wait);
      return () => clearTimeout(t);
    };

    if (document.readyState === "complete") {
      return onLoad();
    }

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [minDuration]);

  if (!visible) return null;

  return (
    <div className={styles.overlay} role="status" aria-live="polite" aria-label="Loading">
      <div className={styles.wrapper}>
        {logoSrc ? (
          <img className={styles.logo} src={logoSrc} alt="Loading" />
        ) : null}
      </div>
    </div>
  );
}