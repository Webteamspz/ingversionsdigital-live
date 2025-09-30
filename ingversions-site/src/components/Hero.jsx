import data from "../data/sitedata";
import CompanyLogos from "./CompanyLogos";

export default function Hero(){
  const h = data.hero;
  return (
    <section className="banner-bg banner-area" id="hero">
      <div className="container hero-row">
        <div className="text-hero-area">
          <h1 className="hero-title">
            {h.titleLeading} <span className="hero-title-pill">{h.pill}</span>
          </h1>
          <p className="hero-subtitle">{h.subtitle}</p>
          <div className="hero-cta-wrap">
            <a className="btn-hero" href={h.cta.href}>{h.cta.label}</a>
            <div className="hero-social-proof">
              <div className="avatar-stack">
                {h.avatars.map((src,i)=><img key={i} src={src} alt={`client ${i+1}`} />)}
              </div>
              <span className="proof-text" dangerouslySetInnerHTML={{__html:h.proof}} />
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <img src={h.visual} alt="Security bot" className="hero-visual-img" />
          <div className="hero-shadow" />
        </div>
      </div>
      <div className="hero-grid-overlay" />
      <CompanyLogos />
    </section>
  );
}
