import data from "../../data/sitedata";
import CompanyLogos from "../CompanyLogos/CompanyLogos";
import OptimizedImg from "../OptimizedImg/OptimizedImg";
import styles from "./HeroV2.module.css";

const HeroV2 = () => {
  const { heading, pill, sub, cta, avatars, proof } = data.hero;

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-heading">
      <div className={styles.grid} aria-hidden="true" />
      <span className={`${styles.shape} ${styles.yellowShape}`} aria-hidden="true" />
      <span className={`${styles.shape} ${styles.pinkShape}`} aria-hidden="true" />
      <span className={`${styles.shape} ${styles.mintShape}`} aria-hidden="true" />
      <div className="container">
        <div className={styles.content}>
          <p className={styles.eyebrow}>Conversion-focused digital experiences</p>

          <h1 id="hero-heading" className={styles.title}>
            <span>{heading}</span>{" "}
            <span className={styles.emphasis}>{pill}</span>
          </h1>

          <p className={styles.subtitle}>{sub}</p>

          <div className={styles.actions}>
            <a className={styles.primaryAction} href={cta.href}>
              {cta.label}
              <span aria-hidden="true">&#8594;</span>
            </a>
            <a className={styles.secondaryAction} href="/projects">
              View projects
            </a>
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

export default HeroV2;
