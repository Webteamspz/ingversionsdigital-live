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

// Loops step 1 -> last like a progress line: the active icon pulses while its
// connector fills in its colour, and the fill finishing hands over to the next
// step. Reached steps stay lit, upcoming ones are dimmed.
// Reduced motion: no loop, every step shown lit.
const Steps = ({ steps }) => {
  const [reduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [active, setActive] = useState(reduced ? steps.length : 0);
  const next = () => setActive((a) => (a + 1) % steps.length);
  const last = steps.length - 1;

  return (
    <ol className={styles.steps}>
      {steps.map((s, i) => {
        const Icon = ICONS[s.icon];
        const state = i === active ? styles.current : i > active ? styles.upcoming : "";
        return (
          <li
            key={s.title}
            className={`${styles.step} ${state}`}
            style={{ "--i": i, "--icon-bg": COLORS[i % COLORS.length] }}
          >
            <span className={styles.icon} aria-hidden="true">
              <Icon size={26} strokeWidth={2.5} />
            </span>
            {i < last && i <= active && (
              <span className={styles.track} aria-hidden="true">
                <span
                  className={`${styles.fill} ${i === active ? styles.filling : ""}`}
                  onAnimationEnd={i === active ? next : undefined}
                />
              </span>
            )}
            {i === last && i === active && (
              <span className={styles.pause} onAnimationEnd={next} aria-hidden="true" />
            )}
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
  );
};

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
          <Steps steps={tab.steps} key={tab.id} />

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
