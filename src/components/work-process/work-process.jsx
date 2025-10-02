import data from "../../data/siteData";       
import styles from "./work-process.module.css"; 

export default function WorkProcess() {
  return (
    <section className={styles["process-section"]} id="work-process">
      <div className="container">
        <h3 className={`section-title ${styles["process-title"]}`}>
          Our Simple Work Process
        </h3>
        <p className={styles["process-sub"]}>
          Delivering innovative solutions We provide our best service of our consumers choices.
          Lot of happy customers we have.cross diverse industries with deep domain expertise.
        </p>
        <div className={styles["process-grid"]}>
          {data.process.map((p, i) => (
            <article key={i} className={styles.step}>
              <div className={styles["step-head"]}>{p.title}</div>

              <div className={styles["step-body"]}>
                <img
                  src={p.icon}
                  alt={p.title}
                  className={styles["step-icon"]}
                  width="150"
                  height="150"
                />
              </div>
              <div className={styles["step-desc"]}>{p.desc}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}