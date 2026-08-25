import styles from "./PricingHero.module.css";
import { pricingHeroData } from "../../data/pricingdata";

const PricingHero = () => {
  return (
    <section className={styles.pricingHero} id="pricingHero">
      <div className="container">
        <span className={styles.pricingTag}>
          {pricingHeroData.tag}
        </span>

        <h1 className={styles.pricingHeroTitle}>
          {pricingHeroData.title}
        </h1>

        <p className={styles.pricingHeroSubtitle}>
          {pricingHeroData.subtitle}
        </p>

        <div className={styles.pricingHeroActions}>
          <a
            className={`btn ${styles.pricingPrimaryBtn}`}
            href={pricingHeroData.primaryHref}
          >
            {pricingHeroData.primaryCta}
          </a>

          <a
            className={`c-btn ${styles.pricingSecondaryBtn}`}
            href={pricingHeroData.secondaryHref}
          >
            {pricingHeroData.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
