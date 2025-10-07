import data from "../../data/siteData";
import styles from "./WorkProcess.module.css";

export default function WorkProcess() {
  return (
    <section className={styles.processSection} id="work-process">
      <div className="container">
        <h3 className={`section-title ${styles["process-title"]}`}>
          {data.process.heading}
        </h3>
        <p className={styles.processSub}>{data.process.sub}</p>
        <div className={styles.processGrid}>
          {data.process.list.map((p, i) => (
            <div key={i} className={styles.step}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}