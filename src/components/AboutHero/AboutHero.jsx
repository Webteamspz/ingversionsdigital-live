import styles from "./AboutHero.module.css";
import { heroData, heroStats } from "../../data/aboutusdata";

const AboutHero = () => {
  return (
    <section className={styles.aboutHero} id="aboutHero">
      <div className="container">
        <div className={styles.aboutHeroGrid}>
          <div className={styles.aboutHeroContent}>
            <span className={styles.aboutTag}>{heroData.tag}</span>
            <h1 className={styles.aboutHeroTitle}>
              We’re Engineers of{" "}
              <span className={styles.accentText}>{heroData.highlight}</span>
            </h1>
            <p className={styles.aboutHeroSubtitle}>{heroData.subtitle}</p>

            <div className={styles.aboutHeroMeta}>
              {heroData.meta.map((item) => (
                <div key={item.label} className={styles.aboutMetaItem}>
                  <span className={styles.aboutMetaLabel}>{item.label}</span>
                  <span className={styles.aboutMetaValue}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className={styles.aboutHeroActions}>
              <a
                href={heroData.primaryCtaHref}
                className="btn"
              >
                {heroData.primaryCta}
              </a>
            </div>
          </div>

          <div className={styles.aboutHeroVisual}>
            <img
              src={heroData.imageSrc}
              alt={heroData.imageAlt}
              className={styles.aboutHeroImg}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>

        <div className={styles.aboutHeroStatsWrap}>
          <h2 className={styles.aboutHeroStatsTitle}>Our Track Record</h2>
          <div className={styles.aboutHeroStats}>
            {heroStats.map((stat) => (
              <div key={stat.label} className={styles.aboutStat}>
                <span className={styles.aboutStatValue}>{stat.value}</span>
                <span className={styles.aboutStatLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
