import data from "../../data/siteData";           
import icon from "../../assets/why-choose-us/checkmark.png";
import styles from "./WhyChooseUs.module.css";        

export default function WhyChooseUs() {
  return (
    <section className={styles.whySection}>
      <div className="container">
        <h3 className="section-title">Why Choose Us</h3>
        <div className={styles.whyCards}>
          {data.why.map((w, i) => (
            <div key={i} className={styles.whyCard}>
              <img src={icon} alt="" className={styles.whyIcon} />
              <h4 className={styles.whyTitle}>{w.title}</h4>
              <p className={styles.whyDesc}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}