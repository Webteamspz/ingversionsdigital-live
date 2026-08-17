import './AboutTrack.css';
import { trackRecordCards, impactCards } from '../../data/aboutusdata';

const AboutTrack = () => {
  return (
    <section className="aboutTrack" id="aboutTrack">
      <div className="container">
        <h2 className="sectionTitle sectionTitleCenter">Our Track Record</h2>
        <p className="sectionSubtitle">
          Proof that a disciplined experimentation culture moves the needle.
        </p>

        <div className="aboutTrackGrid">
          {trackRecordCards.map((card) => (
            <div key={card.label} className="card aboutTrackCard">
              <span className="aboutTrackLabel">{card.label}</span>
              <span className="aboutTrackValue">{card.value}</span>
              <span className="aboutTrackCaption">{card.caption}</span>
            </div>
          ))}
        </div>

        <div className="aboutImpactGrid">
          {impactCards.map((card) => (
            <div key={card.label} className="card aboutImpactCard">
              <span className="aboutImpactValue">{card.value}</span>
              <span className="aboutImpactLabel">{card.label}</span>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTrack;
