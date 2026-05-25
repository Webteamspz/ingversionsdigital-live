import React from "react";
import "./PricingCta.css";
import { pricingCtaData } from "../../data/pricingdata";

const PricingCta = () => {
  return (
    <section className="pricingCta" id="pricingCta">
      <div className="container">
        <div className="pricingCtaInner card">
          <div className="pricingCtaText">
            <h2>{pricingCtaData.title}</h2>
            <p>{pricingCtaData.text}</p>
          </div>

          <div className="pricingCtaActions">
            <a href={pricingCtaData.primaryHref} className="btn">
              {pricingCtaData.primaryLabel}
            </a>
            <a href={pricingCtaData.secondaryHref} className="cBtn">
              {pricingCtaData.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCta;
