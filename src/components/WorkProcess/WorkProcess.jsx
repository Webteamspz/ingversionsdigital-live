import data from "../../data/siteData";
import styles from "./WorkProcess.module.css";

export default function WorkProcess() {
  return (
    <section className={styles.processSection} id="work-process">
      <div className="container">
        <h3 className={`section-title ${styles["process-title"]}`}>
          Our Simple Work Process
        </h3>
        <p className={styles.processSub}>
          Delivering innovative solutions with deep domain expertise, we provide
          top-notch services tailored to consumer choices, earning the trust of
          countless happy customers across diverse industries.
        </p>
        <div className={styles.processGrid}>
          {data.process.map((p, i) => (
            <article key={i} className={styles.step}>
              <div className={styles.stepHead}>{p.title}</div>

              <div className={styles.stepBody}>
                <img
                  src={p.icon}
                  alt={p.title}
                  className={styles.stepIcon}
                  width="150"
                  height="150"
                />
              </div>
              <div className={styles.stepDesc}>{p.desc}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}