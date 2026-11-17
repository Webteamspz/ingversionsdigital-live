import { ArrowRight, Check } from "lucide-react";
import styles from "./PricingPlans.module.css";
import { brandPlans, devPlans, pricingGuarantee as guarantee } from "../../data/pricingData";

const seeComparison = (index) => {
  window.dispatchEvent(new CustomEvent("gotoComparisonPlan", { detail: { index } }));
  document.getElementById("pricingComparison")?.scrollIntoView({ behavior: "smooth" });
};

const Highlights = ({ items }) => (
  <ul className={styles.list}>
    {items?.map((h) => (
      <li key={h}>
        <span className={styles.tick} aria-hidden="true">
          <Check size={12} strokeWidth={3.5} />
        </span>
        {h}
      </li>
    ))}
  </ul>
);

const Price = ({ plan }) => (
  <div className={styles.priceRow}>
    {plan.originalPrice && (
      <s className={styles.original} aria-label={`Was ${plan.originalPrice}`}>
        {plan.originalPrice}
      </s>
    )}
    <span className={styles.price}>{plan.price}</span>
    {plan.period && <span className={styles.period}>{plan.period}</span>}
  </div>
);

const PricingPlans = ({ track }) => {
  const plans = track === "dev" ? devPlans : brandPlans;
  const standard = plans.slice(0, 3);
  const wide = plans[3];

  return (
    <section className={styles.section} id="pricingPlans">
      <div className="container">
        <div className={styles.grid}>
          {standard.map((plan, idx) => (
            <article
              key={plan.name}
              className={`${styles.card} ${plan.isPremium ? styles.featured : ""}`}
              aria-labelledby={`plan-${idx}`}
            >
              {plan.badge && <span className={styles.badge}>{plan.badge}</span>}
              <h2 id={`plan-${idx}`} className={styles.name}>
                {plan.name}
              </h2>
              <p className={styles.desc}>{plan.description}</p>
              <Price plan={plan} />
              <a
                className={styles.cta}
                href={plan.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={plan.ctaLabel}
                data-cta-loc={`Pricing Plan: ${plan.name}`}
              >
                {plan.ctaLabel}
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </a>
              <Highlights items={plan.highlights} />
              <button type="button" className={styles.compare} onClick={() => seeComparison(idx)}>
                Compare plans
              </button>
            </article>
          ))}
        </div>

        {wide && (
          <article className={styles.wide} aria-labelledby="plan-wide">
            <div className={styles.wideMain}>
              {wide.wideBadge && <span className={styles.wideBadge}>{wide.wideBadge}</span>}
              <h2 id="plan-wide" className={styles.name}>
                {wide.wideTitle || wide.name}
              </h2>
              <p className={styles.desc}>{wide.description}</p>
              {wide.period && <Price plan={wide} />}
            </div>
            <Highlights items={wide.highlights} />
            <div className={styles.wideActions}>
              <a
                className={styles.cta}
                href={wide.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={wide.ctaLabel}
                data-cta-loc={`Pricing Plan: ${wide.name}`}
              >
                {wide.ctaLabel}
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </a>
              <button type="button" className={styles.compare} onClick={() => seeComparison(3)}>
                Compare plans
              </button>
            </div>
          </article>
        )}

        <aside className={styles.guarantee} aria-labelledby="pricing-guarantee">
          <div>
            <span className={styles.gEyebrow}>{guarantee.eyebrow}</span>
            <h2 id="pricing-guarantee" className={styles.gTitle}>
              {guarantee.title}
            </h2>
            <p className={styles.gText}>{guarantee.text}</p>
            <ul className={styles.gPoints}>
              {guarantee.points.map((p) => (
                <li key={p}>
                  <span className={styles.tick} aria-hidden="true">
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <a
            className={styles.gCta}
            href={guarantee.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={guarantee.cta.label}
            data-cta-loc="Pricing Guarantee"
          >
            {guarantee.cta.label}
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </aside>
      </div>
    </section>
  );
};

export default PricingPlans;
