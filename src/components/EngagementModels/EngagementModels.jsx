import { useState } from "react";
import { Repeat, Clock, Briefcase } from "lucide-react";
import "./Engagement.css";
import siteData from "../../data/sitedata";
import ContactModal from "../ContactModal/ContactModal";

const ENGAGEMENT_ICONS = { retainer: Repeat, hoursblock: Clock, projectengagement: Briefcase };
const ENGAGEMENT_COLORS = { retainer: "var(--palette-accent)", hoursblock: "var(--secondary)", projectengagement: "var(--tertiary)" };

const EngagementModels = () => {
  const { heading, sub, list } = siteData.engagement;
  
  // State to handle modal visibility and track which card was clicked
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState(""); 

  const handleCtaClick = (e, cta, title) => {
    if (cta.href === "#contact") {
      e.preventDefault();
      setModalSource(title); // Save the specific card title (e.g., "Block of Hours")
      setIsModalOpen(true);
    }
  };

  return (
    <section className="engagement-section" id="engagement">
      <div className="engagement-container">
        <h2 className="engagement-heading">{heading}</h2>
        <p className="engagement-subheading">{sub}</p>

        <div className="engagement-cards-grid">
          {list.map((model, index) => (
            <div className="engagement-card" key={index}>
              <span
                className="engagement-corner-fold"
                style={{ background: ENGAGEMENT_COLORS[model.icon] }}
                aria-hidden="true"
              />
              <div className="engagement-icon-wrapper" style={{ background: ENGAGEMENT_COLORS[model.icon] }}>
                {(() => {
                  const Icon = ENGAGEMENT_ICONS[model.icon];
                  return Icon ? <Icon size={26} strokeWidth={2.5} color="#1E293B" aria-hidden="true" /> : null;
                })()}
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

              <a
                href={model.cta.href}
                className="engagement-learn-more-btn"
                onClick={(e) => handleCtaClick(e, model.cta, model.title)}
              >
                {model.cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Pass the captured title to the ContactModal via the source prop */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        source={modalSource} 
      />
    </section>
  );
};

export default EngagementModels;
