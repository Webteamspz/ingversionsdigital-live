import React from "react";
import "./engagement.css";
import siteData from "../../data/sitedata";

const EngagementModels = () => {
  const { heading, sub, list } = siteData.engagement;

  return (
    <section className="engagement-section" id="engagement">
      <div className="engagement-container">
        <h2 className="engagement-heading">{heading}</h2>
        <p className="engagement-subheading">{sub}</p>

        <div className="engagement-cards-grid">
          {list.map((model, index) => (
            <div className="engagement-card" key={index}>
              <div className="engagement-icon-wrapper">
                <img src={model.icon} alt={model.title} />
              </div>

              <h3 className="engagement-card-title">{model.title}</h3>
              <p className="engagement-card-description">{model.desc}</p>

              <ul className="engagement-feature-list">
                {model.features.map((feature, i) => (
                  <li className="engagement-feature-item" key={i}>
                    <span className="engagement-check-icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a href={model.cta.href} className="engagement-learn-more-btn">
                {model.cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagementModels;