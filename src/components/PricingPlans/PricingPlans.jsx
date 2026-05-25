import React from "react";
import "./PricingPlans.css";
import { pricingPlans } from "../../data/pricingdata";

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
    <section className="pricingPlans" id="pricingPlans">
      <div className="container">

        <div className="pricingPlansGrid">
          {standardPlans.map((plan, idx) => (
            <article key={plan.name} className="pricingPlanCard card">

              <div className="pricingPlanBadgeWrap">
                {plan.badge ? (
                  <span className="pricingPlanBadge">{plan.badge}</span>
                ) : (
                  <span className="pricingPlanBadge emptyBadge"></span>
                )}
              </div>

              <h3 className="pricingPlanName">{plan.name}</h3>

              <div className="pricingPlanPriceRow">
                <span className="pricingPlanPrice">
                  {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                </span>
                {plan.period && (
                  <span className="pricingPlanPeriod">{plan.period}</span>
                )}
              </div>

              <p className="pricingPlanDesc">{plan.description}</p>

              <ul className="pricingPlanHighlights">
                {plan.highlights?.map((h, i) => (
                  <li key={i} className="pricingPlanHighlight">
                    <span className="checkDot" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="cardButtons">
                <a className="btn pricingPlanBtn" href={plan.ctaHref || "#"}>
                  {plan.ctaLabel || "Get Started"}
                </a>
                <button
                  className="btnOutline"
                  onClick={function() { handleSeeComparison(idx); }}
                >
                  See comparison
                </button>
              </div>

            </article>
          ))}
        </div>

        {elitePlan && (
          <article className="pricingPlanCard wideCard">

            <div className="wideCardLeft">

              <span className="wideBadge">ENTERPRISE</span>

              <h3 className="wideTitle">{elitePlan.name} Plan</h3>

              <p className="wideDesc">{elitePlan.description}</p>

              <div className="wideCardRight mobileOnlyHighlights">
                <ul className="pricingPlanHighlights">
                  {elitePlan.highlights?.map((h, i) => (
                    <li key={i} className="pricingPlanHighlight">
                      <span className="checkDot" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="wideButtons">
                <a className="btn pricingPlanBtn" href={elitePlan.ctaHref || "#"}>
                  {elitePlan.ctaLabel || "Book a strategy call"}
                </a>
                <button
                  className="btnOutline"
                  onClick={function() { handleSeeComparison(3); }}
                >
                  See comparison
                </button>
              </div>

            </div>

            <div className="wideCardRight desktopOnlyHighlights">
              <ul className="pricingPlanHighlights">
                {elitePlan.highlights?.map((h, i) => (
                  <li key={i} className="pricingPlanHighlight">
                    <span className="checkDot" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

          </article>
        )}

      </div>
    </section>
  );
};

export default PricingPlans;