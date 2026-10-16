import { useRef, useState } from "react";
import { TrendingDown, Search, Calculator, Hourglass, ArrowUpRight, X } from "lucide-react";
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
  const dialogRef = useRef(null);
  const [zoomed, setZoomed] = useState(null);

  const openShot = (shot) => {
    setZoomed(shot);
    dialogRef.current.showModal();
  };

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
                      <button
                        type="button"
                        className={styles.shotFrame}
                        onClick={() => openShot(shot)}
                        aria-label={`Enlarge: ${shot.caption}`}
                      >
                        <OptimizedImg
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                        />
                      </button>
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

      {/* Native dialog: Esc closes it; clicking the backdrop closes it too. */}
      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label={zoomed?.caption}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        onClose={() => setZoomed(null)}
      >
        {zoomed && (
          <>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => dialogRef.current.close()}
              aria-label="Close"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <img src={zoomed.src} alt={zoomed.alt} width={zoomed.width} height={zoomed.height} />
          </>
        )}
      </dialog>
    </section>
  );
};

export default CaseStudies;
