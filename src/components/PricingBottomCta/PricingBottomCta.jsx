import { ArrowRight } from "lucide-react";
import { bottomCta } from "../../data/pricingData";
import styles from "./PricingBottomCta.module.css";

const PricingBottomCta = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.card}>
        <h2 className={styles.title}>{bottomCta.title}</h2>
        <p className={styles.text}>{bottomCta.text}</p>
        <div className={styles.actions}>
          <a
            className="btn btn-book"
            href={bottomCta.primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={bottomCta.primaryCta}
            data-cta-loc="Pricing Bottom CTA"
          >
            {bottomCta.primaryCta}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            className={`c-btn ${styles.secondaryBtn}`}
            href={bottomCta.secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={bottomCta.secondaryCta}
            data-cta-loc="Pricing Bottom CTA"
          >
            {bottomCta.secondaryCta}
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default PricingBottomCta;
