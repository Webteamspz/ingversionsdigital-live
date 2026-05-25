// AboutValues.jsx ko firse aisa kar lo (Jaise shuru mein tha)

import React from 'react';
import './AboutValues.css';
import { valueCards } from '../../data/aboutusdata';

const AboutValues = () => {
  return (
    <section className="aboutValues" id="aboutValues">
      <div className="container"> {/* Global container */}
        <h2 className="sectionTitle sectionTitleCenter">Our Value System</h2> {/* Global section title */}
        <p className="sectionSubtitle"> {/* Global section subtitle */}
          The principles that guide every experiment, call, and recommendation.
        </p>

        <div className="aboutValuesGrid">
          {valueCards.map((card) => (
            <div key={card.title} className="card aboutValuePill"> {/* 'card' global class is back! */}
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