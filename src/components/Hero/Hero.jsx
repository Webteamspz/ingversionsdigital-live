import data from "../../data/siteData";
import CompanyLogos from "../CompanyLogos/CompanyLogos";
import styles from "./Hero.module.css";

export default function Hero() {
  const h = data.hero;

  return (
    <section className={`${styles.bannerBg} ${styles.bannerArea}`} id="hero">
      <div className={`container ${styles.heroRow}`}>
        <div className={styles.textHeroArea}>
          <h1 className={styles.heroTitle}>
            {h.heading} <span className={styles.heroTitlePill}>{h.pill}</span>
          </h1>
          <p className={styles.heroSubtitle}>{h.sub}</p>
          <div className={styles.heroCtaWrap}>
            <a className={styles.btnHero} href={h.cta.href}>
              {h.cta.label}
            </a>
            <div className={styles.heroSocialProof}>
              <div className={styles.avatarStack}>
                {h.avatars.map((src, i) => (
                  <img key={i} src={src} alt={`client ${i + 1}`} />
                ))}
              </div>
              <span
                className={styles.proofText}
                dangerouslySetInnerHTML={{ __html: h.proof }}
              />
            </div>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <img
            src={h.visual}
            alt="Security bot"
            className={styles.heroVisualImg}
          />
          <div className={styles.heroShadow} />
        </div>
      </div>
      <CompanyLogos />
    </section>
  );
}