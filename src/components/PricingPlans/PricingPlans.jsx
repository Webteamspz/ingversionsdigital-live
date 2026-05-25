import React from "react";
import "./PricingPlans.css";
import { pricingPlans } from "../../data/pricingdata";

const PricingPlans = () => {
  const standardPlans = pricingPlans.slice(0, 3);
  const elitePlan = pricingPlans[3];

  return (
    <section className="pricingPlans" id="pricingPlans">
      <div className="container">
        
        {/* === TOP 3 CARDS === */}
        <div className="pricingPlansGrid">
          {standardPlans.map((plan) => (
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
                  {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                </span>
                {plan.period && <span className="pricingPlanPeriod">{plan.period}</span>}
              </div>

              <p className="pricingPlanDesc">{plan.description}</p>

              <ul className="pricingPlanHighlights">
                {plan.highlights?.map((h, idx) => (
                  <li key={idx} className="pricingPlanHighlight">
                    <span className="checkDot" /> {h}
                  </li>
                ))}
              </ul>

              {/* === DONO BUTTONS YAHAN ADD KIYE HAIN === */}
              <div className="cardButtons">
                <a className="btn pricingPlanBtn" href={plan.ctaHref || "#"}>
                  {plan.ctaLabel || "Get Started"}
                </a>
                <a className="btnOutline" href="#pricingComparison">
                  See comparison
                </a>
              </div>

            </article>
          ))}
        </div>

        {/* === 4TH CARD (WIDE BANNER) === */}
        {elitePlan && (
          <article className="pricingPlanCard wideCard">
            
            <div className="wideCardLeft">
              <span className="wideBadge">ENTERPRISE</span>
              
              <h3 className="wideTitle">{elitePlan.name} Plan</h3>
              <p className="wideDesc">{elitePlan.description}</p>
              
              <div className="wideButtons">
                <a className="btn pricingPlanBtn" href={elitePlan.ctaHref || "#"}>
                  {elitePlan.ctaLabel || "Book a strategy call"}
                </a>
                <a className="btnOutline" href="#pricingComparison">
                  See comparison
                </a>
              </div>
            </div>

            <div className="wideCardRight">
               <ul className="pricingPlanHighlights">
                {elitePlan.highlights?.map((h, idx) => (
                  <li key={idx} className="pricingPlanHighlight">
                    <span className="checkDot" /> {h}
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