import data from "../../data/siteData";
import styles from "./services.module.css";

export default function Services() {
  return (
    <section className={styles.servicesSection} id="cro-services">
      <div className="container">
        <h3 className="section-title">Our CRO Services</h3>
        <p className={styles.servicesSub}>
          Delivering innovative solutions across diverse industries with deep
          domain expertise.
        </p>
        <div className={styles.services}>
          {data.services.map((s, i) => (
            <article key={i} className={`${styles.card} ${styles.service}`}>
              <img className={styles.icon} src={s.icon} alt="" />
              <h4 className={styles.serviceTitle}>{s.title}</h4>
              <p className={styles.serviceDesc}>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}