import { MessageSquare, ClipboardList, Code2, Target } from "lucide-react";

import data from "../../data/sitedata";
import styles from "./WorkProcess.module.css";

const PROCESS_ICONS = { "project-discussion": MessageSquare, plan: ClipboardList, dev: Code2, goal: Target };
const PROCESS_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];

function ProcessIcon({ iconKey, index, title }) {
  const Icon = PROCESS_ICONS[iconKey];
  const background = PROCESS_COLORS[index % 4];
  return (
    <span className={styles.iconCircle} style={{ background }} aria-hidden="true">
      {Icon && <Icon size={22} strokeWidth={2.5} color="#1E293B" />}
    </span>
  );
}

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
                <ProcessIcon iconKey={p.icon} index={i} title={p.title} />
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
