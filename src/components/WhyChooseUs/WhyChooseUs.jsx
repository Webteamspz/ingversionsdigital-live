import data from "../../data/sitedata";
import icon from "/assets/why-choose-us/checkmark.webp";
import styles from "./WhyChooseUs.module.css";
import Reveal from "../Reveal/Reveal";

const WhyChooseUs = () => {
  return (
    <section className={styles.whyChooseUsSection} id="why-choose-us">
      <div className="container">
        <h3 className="section-title">{data.why.heading}</h3>
        <div className={styles.whyChooseUsCards}>
          {data.why.list.map((w, i) => (
            <Reveal key={i} delay={i * 80} className={styles.whyChooseUsCard}>
              <img src={icon} alt="Check" className={styles.whyChooseUsIcon} loading="lazy" />
              <h4 className={styles.whyChooseUsTitle}>{w.title}</h4>
              <p className={styles.whyChooseUsDesc}>{w.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;