// /src/pages/components/AboutCta.jsx
import React from 'react';
import './AboutCta.css';
import { ctaData } from '../../data/aboutusdata';

const AboutCta = () => {
  return (
    <section className="aboutCta" id="aboutContact">
      <div className="container">
        <div className="aboutCtaInner card">
          <div className="aboutCtaText">
            <h2>{ctaData.title}</h2>
            <p>{ctaData.text}</p>
          </div>
          <div className="aboutCtaActions">
            <a href={ctaData.primaryHref} className="btn">
              {ctaData.primaryLabel}
            </a>
            <a href={ctaData.secondaryHref} className="cBtn aboutCtaSecondary">
              {ctaData.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
