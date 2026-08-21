import styles from './AboutCta.module.css';
import { ctaData } from '../../data/aboutusdata';

const AboutCta = () => {
  return (
    <section className={styles.aboutCta} id="aboutContact">
      <div className="container">
        <div className={styles.aboutCtaBox}>
          <h2 className={styles.aboutCtaHeading}>{ctaData.title}</h2>
          <p className={styles.aboutCtaText}>{ctaData.text}</p>

          <a href={ctaData.primaryHref} className={styles.aboutCtaButton}>
            {ctaData.primaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
