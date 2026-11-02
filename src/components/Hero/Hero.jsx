import { Link } from "react-router-dom";
import data from "../../data/siteData";
import CompanyLogos from "../CompanyLogos/CompanyLogos";
import OptimizedImg from "../OptimizedImg/OptimizedImg";
import styles from "./Hero.module.css";

const Hero = () => {
  const { eyebrow, heading, pill, sub, cta, secondaryCta, avatars, proof } = data.hero;

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-heading">
      <div className={styles.grid} aria-hidden="true" />
      <div className="container">
        <div className={styles.content}>
          <p className={styles.eyebrow}>{eyebrow}</p>

          <h1 id="hero-heading" className={styles.title}>
            <span>{heading}</span> <span className={styles.emphasis}>{pill}</span>
          </h1>

          <p className={styles.subtitle}>{sub}</p>

          <div className={styles.actions}>
            <a
              className={styles.primaryAction}
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={cta.label}
              data-cta-loc="Hero"
            >
              {cta.label}
            </a>
            <Link
              className={styles.secondaryAction}
              to={secondaryCta.href}
              data-cta={secondaryCta.label}
              data-cta-loc="Hero"
            >
              {secondaryCta.label}
            </Link>
          </div>

          <div className={styles.proof}>
            <div className={styles.avatars} aria-hidden="true">
              {avatars.map((src, index) => (
                <OptimizedImg
                  key={src}
                  src={src}
                  alt=""
                  width="48"
                  height="48"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))}
            </div>
            <p dangerouslySetInnerHTML={{ __html: proof }} />
          </div>
        </div>
      </div>
      <div className={styles.logoArea}>
        <CompanyLogos />
      </div>
    </section>
  );
};

export default Hero;
