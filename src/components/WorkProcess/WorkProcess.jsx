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
              <div className={styles.stepHead}>{p.title}</div>
              <div className={styles.stepBody}>
                <img
                  src={p.icon}
                  alt={p.title}
                  className={styles.stepIcon}
                  width="150"
                  height="150"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className={styles.stepDesc}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
