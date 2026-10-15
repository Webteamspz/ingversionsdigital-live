import { TrendingDown, Search, Calculator, Hourglass, ArrowUpRight } from "lucide-react";
import siteData from "../../data/sitedata";
import OptimizedImg from "../OptimizedImg/OptimizedImg";
import Reveal from "../Reveal/Reveal";
import styles from "./CaseStudies.module.css";

const ICONS = { challenge: TrendingDown, action: Search, method: Calculator, timing: Hourglass };
const ICON_COLORS = {
  challenge: "var(--secondary)",
  action: "var(--quaternary)",
  method: "var(--tertiary)",
  timing: "var(--palette-accent-soft)",
};

const StoryCard = ({ heading, icon, paragraphs }) => {
  const Icon = ICONS[icon];
  return (
    <Reveal className={styles.story}>
      <span className={styles.cornerFold} style={{ background: ICON_COLORS[icon] }} aria-hidden="true" />
      <span className={styles.iconCircle} style={{ background: ICON_COLORS[icon] }} aria-hidden="true">
        <Icon />
      </span>
      <h4 className={styles.storyHeading}>{heading}</h4>
      {paragraphs.map((p) => (
        <p key={p} className={styles.text}>{p}</p>
      ))}
    </Reveal>
  );
};

const CaseStudies = () => {
  const { heading, sub, list } = siteData.caseStudies;

  return (
    <section className={styles.caseStudies} id="case-studies">
      <div className={styles.decor} aria-hidden="true">
        <span className={styles.shapeCircle} />
        <span className={styles.shapeSquare} />
      </div>
      <div className="container">
        <h2 className="section-title">{heading}</h2>
        <p className={styles.sub}>{sub}</p>

        {list.map((study) => (
          <article key={study.id} id={study.id} className={styles.card}>
            <header className={styles.head}>
              <div className={styles.tags}>
                {study.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <h3 className={styles.title}>{study.title}</h3>
            </header>

            <div className={styles.body}>
              <div className={styles.storyGrid}>
                {study.sections.map((s) => (
                  <StoryCard key={s.heading} {...s} />
                ))}
              </div>

              <div className={styles.results}>
                <h4 className={styles.resultsHeading}>{study.results.heading}</h4>
                <ul className={styles.kpis}>
                  {study.results.stats.map((s) => (
                    <li key={s.label} className={styles.kpi}>
                      <span className={styles.kpiValue}>{s.lift}</span>
                      <span className={styles.kpiLabel}>{s.label}</span>
                      <span className={styles.kpiRange}>
                        {s.before} → <strong>{s.after}</strong>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className={styles.totals}>{study.results.totals}</p>

                <div className={styles.shots}>
                  {study.results.screenshots.map((shot) => (
                    <figure key={shot.src} className={styles.shot}>
                      <span className={`${styles.shotLabel} ${styles[`shot${shot.label}`]}`}>
                        {shot.label}
                      </span>
                      <a
                        href={shot.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.shotFrame}
                      >
                        <OptimizedImg
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                        />
                      </a>
                      <figcaption>{shot.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <div className={styles.storyGrid}>
                {study.notes.map((n) => (
                  <StoryCard key={n.heading} {...n} />
                ))}
              </div>
            </div>

            <div className={styles.cta}>
              <div>
                <h4 className={styles.ctaHeading}>{study.cta.heading}</h4>
                <p className={styles.ctaText}>{study.cta.text}</p>
              </div>
              <a
                href={study.cta.buttonLink}
                className={styles.ctaButton}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={study.cta.buttonText}
                data-cta-loc="Case Study"
              >
                {study.cta.buttonText}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
