import React from "react";
import "./PricingHero.css";
import { pricingHeroData } from "../../data/pricingdata";

const PricingHero = () => {
  return (
    <section className="pricingHero" id="pricingHero">
      <div className="container">
        <div className="pricingHeroInner card">
          <span className="pricingTag">
            {pricingHeroData.tag}
          </span>

          <h1 className="pricingHeroTitle">
            {pricingHeroData.title}
          </h1>

          <p className="pricingHeroSubtitle">
            {pricingHeroData.subtitle}
          </p>

          <div className="pricingHeroActions">
            <a
              className="pricingPrimaryBtn"
              href={pricingHeroData.primaryHref}
            >
              {pricingHeroData.primaryCta}
            </a>

            <a
              className="cBtn"
              href={pricingHeroData.secondaryHref}
            >
              {pricingHeroData.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;