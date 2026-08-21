import data from "../../data/sitedata";
import styles from "./WhyChooseUs.module.css";
import Reveal from "../Reveal/Reveal";

const NODE_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];

const WhyChooseUs = () => {
  return (
    <section className={styles.whyChooseUsSection} id="why-choose-us">
      <div className="container">
        <h3 className="section-title">{data.why.heading}</h3>
        <p className={styles.whySub}>Here's what sets our approach apart.</p>

        <div className={styles.timeline}>
          <span className={styles.timelineLine} aria-hidden="true" />
          {data.why.list.map((w, i) => (
            <Reveal key={i} delay={i * 100} className={styles.timelineRow}>
              <div className={styles.timelineCard}>
                <span
                  className={styles.timelineNumber}
                  style={{ color: NODE_COLORS[i % NODE_COLORS.length] }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className={styles.timelineTitle}>{w.title}</h4>
                <p className={styles.timelineDesc}>{w.desc}</p>
              </div>
              <span
                className={styles.timelineNode}
                style={{ borderColor: NODE_COLORS[i % NODE_COLORS.length] }}
                aria-hidden="true"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
