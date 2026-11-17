import data from "../../data/siteData";
import OptimizedImg from "../OptimizedImg/OptimizedImg";
import styles from "./HeroA.module.css";

const a = data.hero.compare.a;
const { trust } = data.hero;

const HeroA = () => (
  <div className={styles.layer} aria-hidden="true" data-nosnippet>
    <div className={styles.grid} />
    <div className="container">
      <div className={styles.content}>
        <p className={styles.eyebrow}>{a.eyebrow}</p>
        <p className={styles.title}>
          <span>{a.heading}</span> <span className={styles.emphasis}>{a.pill}</span>
        </p>
        <p className={styles.subtitle}>{a.sub}</p>
        <div className={styles.actions}>
          <span className={styles.primaryAction}>{a.cta}</span>
          <span className={styles.secondaryAction}>{a.secondaryCta}</span>
        </div>
        <div className={styles.proof}>
          <div className={styles.avatars}>
            {trust.avatars.map((src) => (
              <OptimizedImg key={src} src={src} alt="" width="48" height="48" loading="lazy" />
            ))}
          </div>
          <p dangerouslySetInnerHTML={{ __html: trust.text }} />
        </div>
      </div>
    </div>
  </div>
);

export default HeroA;
