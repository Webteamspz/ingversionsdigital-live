import data from "../../data/siteData";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section className={styles.servicesSection} id="services">
      <div className="container">
        <h3 className="section-title">{data.services.heading}</h3>
        <p className={styles.servicesSub}>{data.services.sub}</p>
        <div className={styles.services}>
          {data.services.list.map((s, i) => (
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