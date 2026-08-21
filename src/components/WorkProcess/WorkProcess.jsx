import data from "../../data/sitedata";
import styles from "./WorkProcess.module.css";

const WorkProcess = () => {
  return (
    <section className={styles.processSection} id="work-process">
      <div className="container">
        <h3 className={`section-title ${styles.processTitle}`}>
          {data.process.heading}
        </h3>
        <p className={styles.processSub}>{data.process.sub}</p>
        <div className={styles.processGrid}>
          {data.process.list.map((p, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNumber} aria-hidden="true">{i + 1}</div>
              <h4 className={styles.stepHead}>{p.title}</h4>
              <p className={styles.stepDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
