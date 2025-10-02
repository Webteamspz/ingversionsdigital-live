import data from "../../data/siteData";           
import icon from "../../assets/why-choose-us/checkmark.png";
import styles from "./why-choose-us.module.css";        

export default function WhyChooseUs() {
  return (
    <section className={styles["why-choose-us-section"]}>
      <div className="container">
        <h3 className="section-title">Why Choose Us</h3>
        <div className={styles["why-choose-us-cards"]}>
          {data.why.map((w, i) => (
            <div key={i} className={styles["why-choose-us-card"]}>
              <img src={icon} alt="" className={styles["why-choose-us-icon"]} />
              <h4 className={styles["why-choose-us-title"]}>{w.title}</h4>
              <p className={styles["why-choose-us-desc"]}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
