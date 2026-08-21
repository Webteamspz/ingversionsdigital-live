import { useEffect, useState, useRef } from "react";
import styles from "./preloader.module.css";

const Preloader = ({ minDuration = 800, logoSrc, onComplete }) => {
  const [visible, setVisible] = useState(true);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const finish = () => {
      setVisible(false);
      if (onComplete) onComplete();
    };

    const onLoad = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const wait = Math.max(minDuration - elapsed, 0);
      const t = setTimeout(finish, wait);
      return () => clearTimeout(t);
    };

    if (document.readyState === "complete") {
      return onLoad();
    }

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [minDuration, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className={styles.wrapper}>
        {logoSrc ? (
          <img className={styles.logo} src={logoSrc} alt="Loading" />
        ) : null}
      </div>
    </div>
  );
};

export default Preloader;
