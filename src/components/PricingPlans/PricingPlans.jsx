import styles from "./PricingPlans.module.css";
import { pricingPlans } from "../../data/pricingdata";
import Reveal from "../Reveal/Reveal";

const PLAN_COLORS = ["var(--palette-accent)", "var(--quaternary)", "var(--secondary)"];

const PricingPlans = () => {
  const standardPlans = pricingPlans.slice(0, 3);
  const elitePlan = pricingPlans[3];

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
              className={`${styles.pricingPlanCard}${plan.badge ? ` ${styles.popularCard}` : ""}`}
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
                <span className={styles.pricingPlanPrice}>
                  {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
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
                <a className={`btn ${styles.pricingPlanBtn}`} href={plan.ctaHref || "#"}>
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

              <span className={styles.wideBadge}>ENTERPRISE</span>

              <h3 className={styles.wideTitle}>{elitePlan.name} Plan</h3>

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
                <a className={`btn ${styles.wideBtn}`} href={elitePlan.ctaHref || "#"}>
                  {elitePlan.ctaLabel || "Book a strategy call"}
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
