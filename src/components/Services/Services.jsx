import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ServiceVisual from "../ServiceVisual/ServiceVisual";

import data from "../../data/siteData";
import styles from "./Services.module.css";

const SERVICES = data.services.list.filter((s) => s.visual && s.href);

const Services = () => {
  const { eyebrow, heading, highlight, sub } = data.services;
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const s = SERVICES[active];

  const onKeyDown = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next = step === undefined ? null : (active + step + SERVICES.length) % SERVICES.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = SERVICES.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section className={styles.section} id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 id="services-heading" className={styles.title}>
            {heading} <span className={styles.highlight}>{highlight}</span>
          </h2>
          <p className={styles.sub}>{sub}</p>
        </div>

        <div className={styles.stage}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Our services"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {SERVICES.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.icon}
                  ref={(el) => (tabsRef.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`service-tab-${t.icon}`}
                  aria-selected={on}
                  aria-controls="service-panel"
                  tabIndex={on ? 0 : -1}
                  className={`${styles.trigger} ${on ? styles.triggerOn : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.triggerText}>
                    <span className={styles.triggerTitle}>{t.title}</span>
                    <span className={styles.triggerEyebrow}>{t.eyebrow}</span>
                  </span>
                  <span className={styles.triggerIcon} aria-hidden="true">
                    <ArrowRight size={20} strokeWidth={2.5} />
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="service-panel"
            className={styles.panel}
            role="tabpanel"
            aria-labelledby={`service-tab-${s.icon}`}
          >
            <div className={styles.bar} aria-hidden="true">
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.url}>ingversionsdigital.com{s.href}</span>
            </div>
            <ServiceVisual icon={s.icon} visual={s.visual} className={styles.visual} />
            <div className={styles.panelBody}>
              <h3 className={styles.panelTitle}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
              <Link to={s.href} className={styles.learn} data-cta={s.title} data-cta-loc="Services">
                {s.linkLabel} about {s.title}
                <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
