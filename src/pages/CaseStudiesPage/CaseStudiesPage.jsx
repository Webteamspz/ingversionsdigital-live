import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import PricingBottomCta from "../../components/PricingBottomCta/PricingBottomCta";
import OptimizedImg from "../../components/OptimizedImg/OptimizedImg";
import seo from "../../data/seoData";
import data from "../../data/siteData";
import styles from "./CaseStudiesPage.module.css";

const page = data.caseStudiesPage;
const num = (v) => parseFloat(String(v).replace(/[^\d.]/g, "")) || 0;
const hasPage = (id) => Object.values(seo).some((p) => p.path === `/case-studies/${id}`);

const Kpi = ({ label, before, after, lift }) => {
  const max = Math.max(num(before), num(after)) || 1;
  const down = lift.startsWith("-");
  return (
    <li className={`${styles.kpi} ${down ? styles.down : ""}`}>
      <div className={styles.kpiTop}>
        <span className={styles.kpiLabel}>{label}</span>
        <span className={styles.kpiLift}>{lift}</span>
      </div>
      <div className={styles.bars} aria-label={`${before} before, ${after} after`}>
        {[
          ["Before", before],
          ["After", after],
        ].map(([name, v]) => (
          <div key={name} className={styles.barRow}>
            <span className={styles.barName}>{name}</span>
            <span className={styles.barTrack}>
              <span
                className={`${styles.barFill} ${name === "After" ? styles.barAfter : ""}`}
                style={{ width: `${Math.max(6, (num(v) / max) * 100)}%` }}
              />
            </span>
            <strong className={styles.barValue}>{v}</strong>
          </div>
        ))}
      </div>
    </li>
  );
};

const FullWriteUp = ({ study }) => (
  <details className={styles.more}>
    <summary>
      {page.moreLabel}
      <ChevronDown size={18} strokeWidth={2.5} aria-hidden="true" />
    </summary>
    <div className={styles.moreBody}>
      {[...study.sections, ...study.notes].map((s) => (
        <div key={s.heading}>
          <h3>{s.heading}</h3>
          {s.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      ))}
      {study.results.totals && <p className={styles.totals}>{study.results.totals}</p>}
      {study.results.screenshots.length > 0 && (
        <div className={styles.shots}>
          {study.results.screenshots.map((shot) => (
            <figure key={shot.src} className={styles.shot}>
              <a
                href={shot.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open full size: ${shot.caption}`}
              >
                <span
                  className={`${styles.shotLabel} ${shot.label === "After" ? styles.shotAfter : ""}`}
                >
                  {shot.label}
                </span>
                <OptimizedImg
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                />
              </a>
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  </details>
);

const Study = ({ study, index }) => {
  const [top] = study.results.stats;
  const full = hasPage(study.id);
  const challenge = study.sections[0]?.paragraphs[0];
  const action = study.sections[1]?.paragraphs[0];
  return (
    <section id={study.id} className={styles.study} aria-labelledby={`${study.id}-title`}>
      <div className="container">
        <article className={`${styles.card} ${index % 2 ? styles.flip : ""}`}>
          <div className={styles.copy}>
            <div className={styles.meta}>
              <span className={styles.caseNum}>
                {page.caseLabel} {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.client}>{study.client}</span>
            </div>
            <h2 id={`${study.id}-title`} className={styles.title}>
              {study.title}
            </h2>
            <ul className={styles.tags} aria-label="Tags">
              {study.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {challenge && (
              <div className={styles.beat}>
                <h3>{page.challengeLabel}</h3>
                <p>{challenge}</p>
              </div>
            )}
            {action && (
              <div className={styles.beat}>
                <h3>{page.actionLabel}</h3>
                <p>{action}</p>
              </div>
            )}
            <div className={styles.actions}>
              {full && (
                <Link
                  to={`/case-studies/${study.id}`}
                  className={styles.btnDark}
                  data-cta={page.fullLabel}
                  data-cta-loc="Case Studies Page"
                >
                  {page.fullLabel}
                  <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              )}
              <a
                href={study.cta.buttonLink}
                className={styles.textLink}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={study.cta.buttonText}
                data-cta-loc="Case Studies Page"
              >
                {study.cta.buttonText}
                <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className={styles.panel}>
            <span className={styles.panelLabel}>{page.resultsLabel}</span>
            <p className={styles.headline}>
              <span className={styles.headlineValue}>{top.lift}</span>
              <span className={styles.headlineLabel}>{top.label}</span>
            </p>
            <ul className={styles.kpis}>
              {study.results.stats.slice(0, 3).map((s) => (
                <Kpi key={s.label} {...s} />
              ))}
            </ul>
          </div>

          {!full && <FullWriteUp study={study} />}
        </article>
      </div>
    </section>
  );
};

const MidCta = () => {
  const c = page.midCta;
  return (
    <aside className={styles.mid} aria-labelledby="case-mid-cta">
      <div className="container">
        <div className={styles.midBox}>
          <div>
            <span className={styles.midEyebrow}>{c.eyebrow}</span>
            <h2 id="case-mid-cta" className={styles.midTitle}>
              {c.title}
            </h2>
            <p className={styles.midText}>{c.text}</p>
            <ul className={styles.assure}>
              {c.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <a
            className={styles.btnPrimary}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={c.label}
            data-cta-loc="Case Studies Mid"
          >
            {c.label}
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </aside>
  );
};

const CaseStudiesPage = () => {
  const list = data.caseStudies.list;
  return (
    <>
      <SEO {...seo.caseStudies} />
      <Layout header={1} footer={1}>
        <main>
          <section className={styles.hero}>
            <div className="container">
              <span className={styles.tag}>{page.tag}</span>
              <h1 className={styles.heroTitle}>{page.title}</h1>
              <p className={styles.heroSub}>{page.sub}</p>
              <div className={styles.heroActions}>
                <a
                  className={styles.btnPrimary}
                  href={page.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={page.primaryCta.label}
                  data-cta-loc="Case Studies Hero"
                >
                  {page.primaryCta.label}
                  <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
                </a>
                <Link
                  className={styles.btnGhost}
                  to={page.secondaryCta.href}
                  data-cta={page.secondaryCta.label}
                  data-cta-loc="Case Studies Hero"
                >
                  {page.secondaryCta.label}
                </Link>
              </div>
              <ul className={styles.metrics}>
                {page.metrics.map((m) => (
                  <li key={m.label} className={styles.metric}>
                    <span className={styles.metricValue}>{m.value}</span>
                    <span className={styles.metricLabel}>{m.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {list.map((s, i) => (
            <Fragment key={s.id}>
              <Study study={s} index={i} />
              {i === 1 && list.length > 2 && <MidCta />}
            </Fragment>
          ))}

          <PricingBottomCta />
        </main>
      </Layout>
    </>
  );
};

export default CaseStudiesPage;
