import { useEffect, useRef } from "react";
import data from "../../data/siteData";
import styles from "./TrackRecord.module.css";

const Counter = ({ value, duration = 3000 }) => {
  const ref = useRef(null);

  const numericPart = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let start = 0;
    let current = start;
    const range = numericPart - start;
    const increment = numericPart > start ? 1 : -1;
    const step = Math.abs(Math.floor(duration / range));

    const timer = setInterval(() => {
      current += increment;
      if (ref.current) {
        ref.current.textContent = current + suffix;
      }
      if (current === numericPart) {
        clearInterval(timer);
      }
    }, step);

    return () => clearInterval(timer);
  }, [numericPart, suffix, duration]);

  return (
    <div ref={ref} className={styles.value}>
      0{suffix}
    </div>
  );
};

const TrackRecord = () => {
  return (
    <section className={styles.kpiSection} id="track-record">
      <div className="container">
        <h3 className="section-title">{data.records.heading}</h3>
        <div className={styles.kpis}>
          {data.records.list.map((k, i) => (
            <div key={i} className={styles.kpi}>
              <div className={styles.label}>{k.label}</div>
              <Counter value={k.value} duration={3000} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackRecord;