import data from "../../data/sitedata";
import styles from "./CompanyLogos.module.css";

const CompanyLogos = () => {
  return (
    <div className={styles.logosSection} id="client-logos">
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeGroup} aria-hidden="false">
            {data.logos.map((a, i) => (
              <div key={`logo1-${i}`} className={styles.cardSlide}>
                <img src={a.img} alt={a.name} loading="lazy" />
              </div>
            ))}
          </div>
          <div className={styles.marqueeGroup} aria-hidden="true">
            {data.logos.map((a, i) => (
              <div key={`logo2-${i}`} className={styles.cardSlide}>
                <img src={a.img} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogos;
