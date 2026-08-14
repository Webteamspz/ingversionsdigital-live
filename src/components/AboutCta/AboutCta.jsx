import './AboutCta.css';
import { ctaData } from '../../data/aboutusdata';

const AboutCta = () => {
  return (
    <section className="aboutCta" id="aboutContact">
      <div className="container">
        <div className="aboutCta-box">
          <h2 className="aboutCta-heading">{ctaData.title}</h2>
          <p className="aboutCta-text">{ctaData.text}</p>
          
          <a href={ctaData.primaryHref} className="aboutCta-button">
            {ctaData.primaryLabel}
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default AboutCta;