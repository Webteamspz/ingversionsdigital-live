import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  TrendingDown,
  Search,
  Calculator,
  Hourglass,
} from "lucide-react";
import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import Reveal from "../../components/Reveal/Reveal";
import PricingBottomCta from "../../components/PricingBottomCta/PricingBottomCta";
import OptimizedImg from "../../components/OptimizedImg/OptimizedImg";
import seo from "../../data/seoData";
import data from "../../data/siteData";
import styles from "./CaseStudiesPage.module.css";

const ICONS = { challenge: TrendingDown, action: Search, method: Calculator, timing: Hourglass };
const COLORS = [
  "var(--palette-accent-soft)",
  "var(--tertiary)",
  "var(--quaternary)",
  "var(--secondary)",
];

const num = (v) => parseFloat(String(v).replace(/[^\d.]/g, "")) || 0;
const hasPage = (id) => Object.values(seo).some((p) => p.path === `/case-studies/${id}`);

const StoryCard = ({ heading, icon, paragraphs, step, color }) => {
  const Icon = ICONS[icon];
  return (
    <Reveal className={styles.story} style={{ "--accent": color }}>
      <div className={styles.storyTop}>
        <span className={styles.storyIcon} aria-hidden="true">
          <Icon size={22} />
        </span>
        {step && <span className={styles.step}>Step {step}</span>}
      </div>
      <h3 className={styles.storyHeading}>{heading}</h3>
      {paragraphs.map((p) => (
        <p key={p} className={styles.storyText}>
          {p}
        </p>
      ))}
    </Reveal>
  );
};

const Kpi = ({ label, before, after, lift, color }) => {
  const max = Math.max(num(before), num(after)) || 1;
  const down = lift.startsWith("-");
  return (
    <li className={`${styles.kpi} ${down ? styles.down : ""}`} style={{ "--accent": color }}>
      <span className={styles.kpiValue}>{lift}</span>
      <span className={styles.kpiLabel}>{label}</span>
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

const Study = ({ study, index }) => {
  const color = COLORS[index % COLORS.length];
  const [top] = study.results.stats;
  return (
    <section id={study.id} className={styles.study} aria-labelledby={`${study.id}-title`}>
      <div className="container">
        <article className={styles.card}>
          <header className={styles.head}>
            <div>
              <span className={styles.caseNum}>Case {String(index + 1).padStart(2, "0")}</span>
              <ul className={styles.tags} aria-label="Tags">
                {study.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <h2 id={`${study.id}-title`} className={styles.title}>
                {study.title}
              </h2>
            </div>
            <div className={styles.headline} style={{ "--accent": color }}>
              <span className={styles.headlineValue}>{top.lift}</span>
              <span className={styles.headlineLabel}>{top.label}</span>
            </div>
          </header>

          <div className={styles.body}>
            <div className={styles.storyFlow}>
              {study.sections.map((s, i) => (
                <StoryCard
                  key={s.heading}
                  {...s}
                  step={i + 1}
                  color={COLORS[(index + i + 1) % COLORS.length]}
                />
              ))}
            </div>

            <div className={styles.results}>
              <h3 className={styles.resultsHeading}>{study.results.heading}</h3>
              <ul className={styles.kpis}>
                {study.results.stats.map((s, i) => (
                  <Kpi key={s.label} {...s} color={COLORS[i % COLORS.length]} />
                ))}
              </ul>
              <p className={styles.totals}>{study.results.totals}</p>
              {hasPage(study.id) && (
                <div className={styles.fullLink}>
                  <Link
                    to={`/case-studies/${study.id}`}
                    className={`${styles.ctaLink} ${styles.ctaLinkAlt}`}
                    data-cta="Read the full case study"
                    data-cta-loc="Case Studies Results"
                  >
                    Read the full case study <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              )}

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

            <div className={styles.notes}>
              {study.notes.map((n, i) => (
                <StoryCard key={n.heading} {...n} color={COLORS[(index + i + 2) % COLORS.length]} />
              ))}
            </div>
          </div>

          <footer className={styles.cta}>
            <div>
              <h3 className={styles.ctaHeading}>{study.cta.heading}</h3>
              <p className={styles.ctaText}>{study.cta.text}</p>
            </div>
            <div className={styles.ctaActions}>
              {hasPage(study.id) && (
                <Link
                  to={`/case-studies/${study.id}`}
                  className={styles.ctaLink}
                  data-cta="Read the full case study"
                  data-cta-loc="Case Studies Page"
                >
                  Read the full case study <ArrowRight size={18} aria-hidden="true" />
                </Link>
              )}
              <a
                href={study.cta.buttonLink}
                className={styles.ctaButton}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={study.cta.buttonText}
                data-cta-loc="Case Studies Page"
              >
                {study.cta.buttonText} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
};

const CaseStudiesPage = () => {
  const page = data.caseStudiesPage;
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
              <div className={styles.actions}>
                <a
                  className="btn btn-book"
                  href={page.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={page.primaryCta.label}
                  data-cta-loc="Case Studies Hero"
                >
                  {page.primaryCta.label}
                </a>
                <Link
                  className={styles.secondary}
                  to={page.secondaryCta.href}
                  data-cta={page.secondaryCta.label}
                  data-cta-loc="Case Studies Hero"
                >
                  {page.secondaryCta.label}
                </Link>
              </div>

              <ul className={styles.metrics}>
                {page.metrics.map((m, i) => (
                  <li
                    key={m.label}
                    className={styles.metric}
                    style={{ "--accent": COLORS[i % COLORS.length] }}
                  >
                    <span className={styles.metricValue}>{m.value}</span>
                    <span className={styles.metricLabel}>{m.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.index} aria-label="All case studies">
            <div className="container">
              <ul className={styles.indexGrid}>
                {list.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={styles.indexCard}
                      style={{ "--accent": COLORS[i % COLORS.length] }}
                    >
                      <span className={styles.indexNum}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.indexBody}>
                        <span className={styles.indexTags}>{s.tags.join(" · ")}</span>
                        <span className={styles.indexTitle}>{s.title}</span>
                      </span>
                      <span className={styles.indexLift}>
                        {s.results.stats[0].lift}
                        <ArrowDown size={18} aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {list.map((s, i) => (
            <Study key={s.id} study={s} index={i} />
          ))}

          <PricingBottomCta />
        </main>
      </Layout>
    </>
  );
};

export default CaseStudiesPage;
