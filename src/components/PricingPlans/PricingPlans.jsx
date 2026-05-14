import React from "react";
import "./PricingPlans.css";
import { pricingPlans } from "../../data/pricingdata";

const PricingPlans = () => {
  return (
    <section className="pricingPlans" id="pricingPlans">
      <div className="container">
        <div className="pricingPlansGrid">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className="pricingPlanCard card"
            >
              <div className="pricingPlanTop">
                <span className="pricingPlanBadge">{plan.badge}</span>
                <h3 className="pricingPlanName">{plan.name}</h3>

                <div className="pricingPlanPriceRow">
                  <span className="pricingPlanPrice">{plan.price}</span>
                  <span className="pricingPlanPeriod">{plan.period}</span>
                </div>

                <p className="pricingPlanDesc">{plan.description}</p>

                <ul className="pricingPlanHighlights">
                  {plan.highlights.map((h) => (
                    <li key={h} className="pricingPlanHighlight">
                      <span className="checkDot" /> {h}
                    </li>
                  ))}
                </ul>

                <a className="btn pricingPlanBtn" href={plan.ctaHref}>
                  {plan.ctaLabel}
                </a>
              </div>

              <div className="pricingPlanDivider" />

              <ul className="pricingPlanFeatures">
                {plan.features.map((f) => (
                  <li key={f.label} className="pricingPlanFeature">
                    <span
                      className={`pricingFeatureIcon ${
                        f.value ? "isOn" : "isOff"
                      }`}
                    >
                      {f.value ? "✓" : "×"}
                    </span>
                    <span className="pricingFeatureText">{f.label}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
