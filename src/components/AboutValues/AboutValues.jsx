import React from 'react';
import './AboutValues.css';
import { valueCards } from '../../data/aboutusdata';

const AboutValues = () => {
  return (
    <section className="aboutValues" id="aboutValues">
      <div className="container">
        <h2 className="sectionTitle sectionTitleCenter">Our Value System</h2>
        <p className="sectionSubtitle">
          The principles that guide every experiment, call, and recommendation.
        </p>

        <div className="aboutValuesGrid">
          {valueCards.map((card) => (
            <div key={card.title} className="card aboutValuePill">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
