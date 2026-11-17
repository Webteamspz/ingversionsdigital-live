import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import data from "../../data/siteData";
import styles from "./CaseResults.module.css";

const copy = data.caseResults;

const RESULTS = copy.items
  .map(({ id, stat }) => {
    const study = data.caseStudies.list.find((c) => c.id === id);
    return study && { id, client: study.client, ...study.results.stats[stat] };
  })
  .filter(Boolean);

const CaseResults = ({ ctaLoc = "Case Results" }) => {
  if (!RESULTS.length) return null;
  return (
    <section className={styles.section} aria-labelledby="case-results-heading">
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h2 id="case-results-heading" className={styles.title}>
            {copy.heading}
          </h2>
          <p className={styles.sub}>{copy.sub}</p>
        </div>
        <ul className={styles.grid}>
          {RESULTS.map((r) => (
            <li key={r.id} className={styles.card}>
              <span className={styles.lift}>{r.lift}</span>
              <p className={styles.label}>{r.label}</p>
              <div className={styles.beforeAfter}>
                <span>
                  <small>{copy.before}</small>
                  {r.before}
                </span>
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
                <span className={styles.after}>
                  <small>{copy.after}</small>
                  {r.after}
                </span>
              </div>
              <Link to={`/case-studies/${r.id}`} className={styles.link}>
                {r.client}: {copy.link}
                <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.ctaRow}>
          <a
            className={styles.cta}
            href={copy.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={copy.cta.label}
            data-cta-loc={ctaLoc}
          >
            {copy.cta.label}
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseResults;
