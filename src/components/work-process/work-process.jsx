import data from "../../data/siteData";
import styles from "./work-process.module.css";

export default function WorkProcess() {
  return (
    <section className={styles.processSection} id="work-process">
      <div className="container">
        <h3 className={`section-title ${styles["process-title"]}`}>
          Our Simple Work Process
        </h3>
        <p className={styles.processSub}>
          Delivering innovative solutions We provide our best service of our consumers choices.
          Lot of happy customers we have. Cross diverse industries with deep domain expertise.
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
