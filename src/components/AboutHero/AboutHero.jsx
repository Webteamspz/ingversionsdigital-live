import "./AboutHero.css";
import { heroData, heroStats } from "../../data/aboutusdata";

const AboutHero = () => {
  return (
    <section className="aboutHero" id="aboutHero">
      <div className="container">
        <div className="aboutHeroGrid">
          <div className="aboutHeroContent">
            <span className="aboutTag">{heroData.tag}</span>
            <h1 className="aboutHeroTitle">
              We’re Engineers of{" "}
              <span className="accentText">{heroData.highlight}</span>
            </h1>
            <p className="aboutHeroSubtitle">{heroData.subtitle}</p>

            <div className="aboutHeroMeta">
              {heroData.meta.map((item) => (
                <div key={item.label} className="aboutMetaItem">
                  <span className="aboutMetaLabel">{item.label}</span>
                  <span className="aboutMetaValue">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="aboutHeroActions">
              <a
                href={heroData.primaryCtaHref}
                className="btnHero aboutHeroBtn"
              >
                {heroData.primaryCta}
              </a>
            </div>
          </div>

          <div className="aboutHeroVisual">
            <img
              src={heroData.imageSrc}
              alt={heroData.imageAlt}
              className="aboutHeroImg heroVisualImg"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>

        <div className="aboutHeroStats">
          {heroStats.map((stat) => (
            <div key={stat.label} className="aboutStat card">
              <span className="aboutStatLabel">{stat.label}</span>
              <span className="aboutStatValue">{stat.value}</span>
              <span className="aboutStatCaption">{stat.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
