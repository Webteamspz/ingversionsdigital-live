import data from "../../data/siteData";
import styles from "./CompanyLogos.module.css";

export default function CompanyLogos() {
  return (
    <section className={styles.logosSection} id="client-logos">
      <div className={styles.marquee}>
        <div className={styles.marqueeGroup}>
          {data.logos.map((src, i) => (
            <img key={`logo1-${i}`} src={src} alt={`logo-${i}`} />
          ))}
          {data.logos.map((src, i) => (
            <img key={`logo2-${i}`} src={src} alt={`logo-dup-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}