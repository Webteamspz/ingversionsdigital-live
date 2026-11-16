import { Check, X, ArrowRight } from "lucide-react";
import data from "../../data/siteData";
import styles from "./WhyChooseUs.module.css";

const WhyChooseUs = () => {
  const { eyebrow, heading, highlight, sub, them, us, cta } = data.why;

  return (
    <section className={styles.section} id="why-choose-us" aria-labelledby="why-heading">
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 id="why-heading" className={styles.title}>
            {heading} <span className={styles.highlight}>{highlight}</span>
          </h2>
          <p className={styles.sub}>{sub}</p>
        </div>

        <div className={styles.compare}>
          <div className={`${styles.col} ${styles.them}`}>
            <h3 className={styles.colLabel}>{them.label}</h3>
            <ul className={styles.list}>
              {them.items.map((t) => (
                <li key={t}>
                  <span className={`${styles.mark} ${styles.markNo}`}>
                    <X size={14} strokeWidth={3} aria-label="No" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <span className={styles.vs} aria-hidden="true">
            vs
          </span>

          <div className={`${styles.col} ${styles.us}`}>
            <h3 className={styles.colLabel}>{us.label}</h3>
            <ul className={styles.list}>
              {us.items.map((t) => (
                <li key={t}>
                  <span className={`${styles.mark} ${styles.markYes}`}>
                    <Check size={14} strokeWidth={3.5} aria-label="Yes" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <a
              className={styles.cta}
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={cta.label}
              data-cta-loc="Why Choose Us"
            >
              {cta.label}
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
