import { useRef, useState } from "react";
import {
  Bug,
  CircleCheck,
  ClipboardList,
  CodeXml,
  FileText,
  FlaskConical,
  Layers,
  LifeBuoy,
  ListChecks,
  MessageSquareText,
  MonitorSmartphone,
  PenTool,
  RefreshCw,
  ShieldCheck,
  Store,
  Video,
} from "lucide-react";
import data from "../../data/sitedata";
import styles from "./ProcessFlow.module.css";

const ICONS = {
  brief: FileText,
  loom: Video,
  figma: PenTool,
  variants: Layers,
  code: CodeXml,
  qa: CircleCheck,
  launch: FlaskConical,
  store: Store,
  review: MessageSquareText,
  support: LifeBuoy,
  scope: ClipboardList,
  devices: MonitorSmartphone,
  checklist: ListChecks,
  bug: Bug,
  retest: RefreshCw,
  signoff: ShieldCheck,
};
const COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];

// tabIds picks which flows to show; with one flow the tab bar is hidden.
const ProcessFlow = ({ tabIds }) => {
  const { eyebrow, heading, highlight, sub } = data.processFlow;
  const tabs = tabIds ? data.processFlow.tabs.filter((t) => tabIds.includes(t.id)) : data.processFlow.tabs;
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const tab = tabs[active];

  const onKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    const next = (active + step + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className={styles.section} id="process-flow" aria-labelledby="process-flow-heading">
      <div className="container">
        <span className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          {eyebrow}
        </span>
        <h2 id="process-flow-heading" className={`section-title ${styles.heading}`}>
          {heading} <span className={styles.highlight}>{highlight}</span>
        </h2>
        <p className={styles.sub}>{sub}</p>

        {tabs.length > 1 && (
        <div className={styles.tabs} role="tablist" aria-label="Choose a service" onKeyDown={onKeyDown}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={`flow-tab-${t.id}`}
              aria-selected={i === active}
              aria-controls="flow-panel"
              tabIndex={i === active ? 0 : -1}
              className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        )}

        <div
          id="flow-panel"
          role={tabs.length > 1 ? "tabpanel" : undefined}
          aria-labelledby={tabs.length > 1 ? `flow-tab-${tab.id}` : undefined}
        >
          <ol className={styles.steps} key={tab.id}>
            {tab.steps.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <li key={s.title} className={styles.step} style={{ "--i": i }}>
                  <span className={styles.icon} style={{ "--icon-bg": COLORS[i % COLORS.length] }} aria-hidden="true">
                    <Icon size={26} strokeWidth={2.5} />
                  </span>
                  <span className={styles.text}>
                    <span className={styles.title}>
                      {s.title} <em className={styles.tag}>{s.tag}</em>
                    </span>
                    <span className={styles.desc}>{s.desc}</span>
                  </span>
                </li>
              );
            })}
          </ol>

          <p className={styles.note}>
            <CircleCheck size={22} strokeWidth={2.5} className={styles.noteIcon} aria-hidden="true" />
            {tab.note}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
