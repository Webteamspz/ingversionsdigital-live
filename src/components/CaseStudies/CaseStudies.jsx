import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingDown,
  Search,
  Calculator,
  Hourglass,
  ArrowUpRight,
  ArrowRight,
  X,
} from "lucide-react";
import siteData from "../../data/siteData";
import seo from "../../data/seoData";
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
      <span
        className={styles.cornerFold}
        style={{ background: ICON_COLORS[icon] }}
        aria-hidden="true"
      />
      <span
        className={styles.iconCircle}
        style={{ background: ICON_COLORS[icon] }}
        aria-hidden="true"
      >
        <Icon />
      </span>
      <h4 className={styles.storyHeading}>{heading}</h4>
      {paragraphs.map((p) => (
        <p key={p} className={styles.text}>
          {p}
        </p>
      ))}
    </Reveal>
  );
};

const studyHref = (id) =>
  Object.values(seo).some((p) => p.path === `/case-studies/${id}`)
    ? `/case-studies/${id}`
    : `/case-studies#${id}`;

const ROW_COLORS = [
  "var(--tertiary)",
  "var(--quaternary)",
  "var(--secondary)",
  "var(--palette-accent-soft)",
];

const StudyRow = ({ study, color }) => {
  const [top] = study.results.stats;
  return (
    <Link
      to={studyHref(study.id)}
      className={styles.row}
      style={{ "--accent": color }}
      data-cta="Read the case study"
      data-cta-loc="Home Case Studies"
    >
      <span className={styles.rowLift}>
        <strong>{top.lift}</strong>
        <span>
          {top.before} → {top.after}
        </span>
      </span>
      <span className={styles.rowBody}>
        <span className={styles.rowClient}>{study.client}</span>
        <h3 className={styles.rowTitle}>{study.title}</h3>
        <span className={styles.rowMeta}>{study.tags.join(" · ")}</span>
      </span>
      <span className={styles.rowArrow} aria-hidden="true">
        <ArrowUpRight size={22} />
      </span>
    </Link>
  );
};

const CaseStudies = ({ only }) => {
  const { heading, sub, highlights } = siteData.caseStudies;
  const list = siteData.caseStudies.list.filter((s) => !only || s.id === only);
  const dialogRef = useRef(null);
  const [zoomed, setZoomed] = useState(null);

  const openShot = (shot) => {
    setZoomed(shot);
    dialogRef.current.showModal();
  };

  const renderShots = (shots) => (
    <div className={styles.shots}>
      {shots.map((shot) => (
        <figure key={shot.src} className={`${styles.shot} ${shot.wide ? styles.wide : ""}`}>
          <span className={`${styles.shotLabel} ${styles[`shot${shot.label}`] ?? ""}`}>
            {shot.label}
          </span>
          <button
            type="button"
            className={styles.shotFrame}
            onClick={() => openShot(shot)}
            aria-label={`Enlarge: ${shot.caption}`}
          >
            <OptimizedImg src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
          </button>
          <figcaption>{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  );

  const renderStudy = (study) => (
    <article key={study.id} id={study.id} className={styles.card}>
      <header className={styles.head}>
        <div className={styles.tags}>
          {study.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
        <h1 className={styles.title}>{study.title}</h1>
      </header>

      <div className={styles.body}>
        {only && (
          <div className={styles.storyGrid}>
            {study.sections.map((s) => (
              <StoryCard key={s.heading} {...s} />
            ))}
          </div>
        )}

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

          {study.results.screenshots.length > 0 && renderShots(study.results.screenshots)}
        </div>

        {only &&
          study.tests?.map((t) => (
            <section key={t.heading} className={styles.test}>
              <h2 className={styles.testHeading}>{t.heading}</h2>
              {t.points.map(([lead, text]) => (
                <p key={lead} className={styles.text}>
                  <strong>{lead}.</strong> {text}
                </p>
              ))}
              {t.screenshots.length > 0 && renderShots(t.screenshots)}
            </section>
          ))}

        {only && (
          <div className={styles.storyGrid}>
            {study.notes.map((n) => (
              <StoryCard key={n.heading} {...n} />
            ))}
          </div>
        )}
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
  );

  return (
    <section className={`${styles.caseStudies} ${only ? styles.page : ""}`} id="case-studies">
      <div className={styles.decor} aria-hidden="true">
        <span className={styles.shapeCircle} />
        <span className={styles.shapeSquare} />
      </div>
      <div className="container">
        {only ? (
          list.map(renderStudy)
        ) : (
          <>
            <div className={styles.board}>
              <div className={styles.intro}>
                <span className={styles.eyebrow}>Proof, not promises</span>
                <h2 className={styles.introTitle}>{heading}</h2>
                <p className={styles.sub}>{sub}</p>
                <ul className={styles.highlights}>
                  {highlights.map((h) => (
                    <li key={h.label}>
                      <strong>{h.value}</strong>
                      {h.label}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/case-studies"
                  className="btn"
                  data-cta="See all case studies"
                  data-cta-loc="Case Studies"
                >
                  See all case studies <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <ul className={styles.rows}>
                {list.map((study, i) => (
                  <li key={study.id}>
                    <StudyRow study={study} color={ROW_COLORS[i % ROW_COLORS.length]} />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

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
