import data from "../../data/siteData";
import icon from "/assets/why-choose-us/checkmark.png";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  return (
    <section className={styles.whyChooseUsSection} id="#why-choose-us">
      <div className="container">
        <h3 className="section-title">Why Choose Us</h3>
        <div className={styles.whyChooseUsCards}>
          {data.why.map((w, i) => (
            <div key={i} className={styles.whyChooseUsCard}>
              <img src={icon} alt="" className={styles.whyChooseUsIcon} />
              <h4 className={styles.whyChooseUsTitle}>{w.title}</h4>
              <p className={styles.whyChooseUsDesc}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}