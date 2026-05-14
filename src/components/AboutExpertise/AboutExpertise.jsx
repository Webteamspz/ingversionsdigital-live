// /src/pages/components/AboutExpertise.jsx
import React from 'react';
import './AboutExpertise.css';
import { expertiseCards } from '../../data/aboutusdata';

const AboutExpertise = () => {
  return (
    <section className="aboutExpertise" id="coreExpertise">
      <div className="container">
        <h2 className="sectionTitle sectionTitleCenter">Core Expertise</h2>
        <p className="sectionSubtitle">
          A focused stack of capabilities designed to own experimentation from
          idea to implementation.
        </p>

        <div className="grid aboutExpertiseGrid">
          {expertiseCards.map((card) => (
            <article key={card.title} className="card aboutExpertiseCard">
              <div className="aboutIconWrap">
                <img src={card.icon} alt="" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutExpertise;
