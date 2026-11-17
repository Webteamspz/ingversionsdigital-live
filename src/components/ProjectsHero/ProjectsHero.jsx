import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./ProjectsHero.module.css";
import data from "../../data/projectsData";

const { hero } = data;
const COUNTS = Object.fromEntries(
  data.filters.map((f) => [f, data.projects.filter((p) => p.type === f).length]),
);

const ProjectsHero = ({ activeFilter, onFilterChange }) => (
  <div className={styles.hero}>
    <div className={`container ${styles.grid}`}>
      <div>
        <span className={styles.tag}>{hero.tag}</span>
        <h1 className={styles.title}>
          {hero.headingPart1} <span className={styles.mark}>{hero.headingHighlight}</span>
        </h1>
        <p className={styles.sub}>{hero.description}</p>
        <div className={styles.actions}>
          <a
            className={styles.btnPrimary}
            href={hero.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={hero.primaryCta.label}
            data-cta-loc="Projects Hero"
          >
            {hero.primaryCta.label}
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </a>
          <Link
            className={styles.btnGhost}
            to={hero.secondaryCta.href}
            data-cta={hero.secondaryCta.label}
            data-cta-loc="Projects Hero"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <dl className={styles.stats}>
        {data.filters.map((f, i) => (
          <div key={f} className={`${styles.stat} ${styles[`stat${i}`]}`}>
            <dd>{COUNTS[f]}</dd>
            <dt>{hero.statLabels[f]}</dt>
          </div>
        ))}
      </dl>
    </div>

    <div className="container">
      <div className={styles.filters} role="group" aria-label={hero.filterLabel}>
        {data.filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={activeFilter === f}
            className={`${styles.filter} ${activeFilter === f ? styles.filterOn : ""}`}
            onClick={() => onFilterChange(f)}
          >
            {f}
            <span className={styles.count}>{COUNTS[f]}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectsHero;
