import styles from "./PricingPlans.module.css";
import { brandPlans, devPlans } from "../../data/pricingData";
import Reveal from "../Reveal/Reveal";

const PLAN_COLORS = ["var(--palette-accent)", "var(--quaternary)", "var(--secondary)", "var(--tertiary)"];

const PricingPlans = ({ track }) => {
  const plans = track === "dev" ? devPlans : brandPlans;
  const standardPlans = plans.slice(0, 3);
  const elitePlan = plans[3];

  function handleSeeComparison(planIndex) {
    window.dispatchEvent(
      new CustomEvent("gotoComparisonPlan", { detail: { index: planIndex } })
    );
    const section = document.getElementById("pricingComparison");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className={styles.pricingPlans} id="pricingPlans">
      <div className="container">

        <div className={styles.pricingPlansGrid}>
          {standardPlans.map((plan, idx) => (
            <Reveal
              key={plan.name}
              delay={idx * 80}
              className={`${styles.pricingPlanCard}${plan.isPremium ? ` ${styles.popularCard}` : ""}`}
            >
              <span
                className={styles.cornerFold}
                style={{ background: PLAN_COLORS[idx % PLAN_COLORS.length] }}
                aria-hidden="true"
              />

              <div className={styles.pricingPlanBadgeWrap}>
                {plan.badge ? (
                  <span className={styles.pricingPlanBadge}>{plan.badge}</span>
                ) : (
                  <span className={`${styles.pricingPlanBadge} ${styles.emptyBadge}`}></span>
                )}
              </div>

              <h3 className={styles.pricingPlanName}>{plan.name}</h3>

              <div className={styles.pricingPlanPriceRow}>
                {plan.originalPrice && (
                  <s className={styles.pricingPlanOriginal} aria-label={`Was ${plan.originalPrice}`}>
                    {plan.originalPrice}
                  </s>
                )}
                <span className={styles.pricingPlanPrice}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={styles.pricingPlanPeriod}>{plan.period}</span>
                )}
              </div>

              <p className={styles.pricingPlanDesc}>{plan.description}</p>

              <ul className={styles.pricingPlanHighlights}>
                {plan.highlights?.map((h, i) => (
                  <li key={i} className={styles.pricingPlanHighlight}>
                    <span className={styles.checkDot} />
                    {h}
                  </li>
                ))}
              </ul>

              <div className={styles.cardButtons}>
                <a
                  className={`btn btn-book ${styles.pricingPlanBtn}`}
                  href={plan.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={plan.ctaLabel}
                  data-cta-loc={`Pricing Plan: ${plan.name}`}
                >
                  {plan.ctaLabel || "Get Started"}
                </a>
                <button
                  className={`c-btn ${styles.compareBtn}`}
                  onClick={function() { handleSeeComparison(idx); }}
                >
                  Compare Plans
                </button>
              </div>

            </Reveal>
          ))}
        </div>

        {elitePlan && (
          <Reveal className={`${styles.pricingPlanCard} ${styles.wideCard}`}>
            <span
              className={styles.cornerFold}
              style={{ background: "var(--tertiary)" }}
              aria-hidden="true"
            />

            <div className={styles.wideCardLeft}>

              <span className={styles.wideBadge}>{elitePlan.wideBadge}</span>

              <h3 className={styles.wideTitle}>{elitePlan.wideTitle || elitePlan.name}</h3>

              {elitePlan.period && (
                <div className={styles.pricingPlanPriceRow}>
                  <span className={styles.pricingPlanPrice}>{elitePlan.price}</span>
                  <span className={styles.pricingPlanPeriod}>{elitePlan.period}</span>
                </div>
              )}

              <p className={styles.wideDesc}>{elitePlan.description}</p>

              <div className={`${styles.wideCardRight} ${styles.mobileOnlyHighlights}`}>
                <ul className={styles.pricingPlanHighlights}>
                  {elitePlan.highlights?.map((h, i) => (
                    <li key={i} className={styles.pricingPlanHighlight}>
                      <span className={styles.checkDot} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.wideButtons}>
                <a
                  className={`btn btn-book ${styles.wideBtn}`}
                  href={elitePlan.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={elitePlan.ctaLabel}
                  data-cta-loc={`Pricing Plan: ${elitePlan.name}`}
                >
                  {elitePlan.ctaLabel || "Talk to us"}
                </a>
                <button
                  className={`c-btn ${styles.wideOutlineBtn}`}
                  onClick={function() { handleSeeComparison(3); }}
                >
                  Compare Plans
                </button>
              </div>

            </div>

            <div className={`${styles.wideCardRight} ${styles.desktopOnlyHighlights}`}>
              <ul className={styles.pricingPlanHighlights}>
                {elitePlan.highlights?.map((h, i) => (
                  <li key={i} className={styles.pricingPlanHighlight}>
                    <span className={styles.checkDot} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

          </Reveal>
        )}

      </div>
    </section>
  );
};

export default PricingPlans;
