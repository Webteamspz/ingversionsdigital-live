import { ArrowRight, Check, Crown } from "lucide-react";
import styles from "./ServiceVisual.module.css";

const AbVisual = ({ v }) => (
  <div className={styles.ab}>
    <div className={styles.variant}>
      <span className={styles.tag}>A · {v.a}</span>
      <i className={styles.lineLg} />
      <i className={styles.line} />
      <i className={styles.btnGhost} />
    </div>
    <div className={`${styles.variant} ${styles.variantWin}`}>
      <span className={styles.tag}>B · {v.b}</span>
      <span className={styles.winner}>
        <Crown size={13} strokeWidth={2.5} />
        {v.winner}
      </span>
      <i className={styles.lineLg} />
      <i className={styles.line} />
      <i className={styles.btnSolid} />
    </div>
  </div>
);

const StoreVisual = ({ v }) => (
  <div className={styles.store}>
    <i className={styles.storeImg} />
    <div className={styles.storeInfo}>
      <i className={styles.lineLg} />
      <i className={styles.line} />
      <span className={styles.storeBtn}>{v.button}</span>
    </div>
  </div>
);

const QaVisual = ({ v }) => (
  <ul className={styles.checks}>
    {v.checks.map((c) => (
      <li key={c}>
        <span className={styles.tick}>
          <Check size={12} strokeWidth={3.5} />
        </span>
        {c}
      </li>
    ))}
  </ul>
);

const SegmentVisual = ({ v }) => (
  <ul className={styles.segments}>
    {v.segments.map((s) => (
      <li key={s.who}>
        <span className={styles.who}>{s.who}</span>
        <ArrowRight size={14} strokeWidth={2.5} />
        <span className={styles.sees}>“{s.sees}”</span>
      </li>
    ))}
  </ul>
);

const VISUALS = {
  "ab-testing": AbVisual,
  shopify: StoreVisual,
  qa: QaVisual,
  "landing-page": SegmentVisual,
};

const ServiceVisual = ({ icon, visual, className = "" }) => {
  const Visual = VISUALS[icon];
  if (!Visual || !visual) return null;
  return (
    <div
      className={`${styles.frame} ${styles[icon.replace("-", "")]} ${className}`}
      aria-hidden="true"
    >
      <Visual v={visual} />
    </div>
  );
};

export default ServiceVisual;
