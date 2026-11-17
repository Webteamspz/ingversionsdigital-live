import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BarChart3, Code2, PenTool, Search } from "lucide-react";
import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import CaseResults from "../../components/CaseResults/CaseResults";
import seo from "../../data/seoData";
import data from "../../data/siteData";
import {
  heroData as hero,
  storyData as story,
  missionCards,
  expertiseIntro,
  expertiseCards,
  valuesIntro,
  valueCards,
  ctaData as cta,
} from "../../data/aboutUsData";
import styles from "./AboutUs.module.css";

const STEP_ICONS = [Search, PenTool, Code2, BarChart3];

const PROOF = [
  ...data.caseStudies.highlights,
  {
    value: data.caseStudiesPage.metrics[0].value,
    label: data.caseStudiesPage.metrics[0].label,
  },
];

const BookLink = ({ label, href, loc, className }) => (
  <a
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    data-cta={label}
    data-cta-loc={loc}
  >
    {label}
    <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
  </a>
);

const AboutUs = () => (
  <>
    <SEO {...seo.aboutUs} />
    <Layout header={1} footer={1}>
      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div>
              <span className={styles.tag}>{hero.tag}</span>
              <h1 className={styles.title}>
                {hero.title} <span className={styles.mark}>{hero.highlight}</span>
              </h1>
              <p className={styles.sub}>{hero.subtitle}</p>
              <div className={styles.actions}>
                <BookLink
                  label={hero.primaryCta.label}
                  href={hero.primaryCta.href}
                  loc="About Hero"
                  className={styles.btnPrimary}
                />
                <Link
                  to={hero.secondaryCta.href}
                  className={styles.btnGhost}
                  data-cta={hero.secondaryCta.label}
                  data-cta-loc="About Hero"
                >
                  {hero.secondaryCta.label}
                </Link>
              </div>
              <dl className={styles.meta}>
                {hero.meta.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className={styles.proof} aria-label={hero.proofLabel}>
              <span className={styles.proofLabel}>{hero.proofLabel}</span>
              <dl className={styles.proofStats}>
                {PROOF.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section className={styles.story} aria-labelledby="about-story">
          <div className={`container ${styles.storyGrid}`}>
            <div>
              <span className={styles.eyebrow}>{story.eyebrow}</span>
              <h2 id="about-story" className={styles.h2Left}>
                {story.title}
              </h2>
              {story.paragraphs.map((p) => (
                <p key={p} className={styles.para}>
                  {p}
                </p>
              ))}
            </div>
            <div className={styles.storySide}>
              <figure className={styles.quote}>
                <blockquote>“{story.quote}”</blockquote>
                <figcaption>{story.quoteNote}</figcaption>
              </figure>
              <img
                src={story.imageSrc}
                alt={story.imageAlt}
                className={styles.storyImg}
                width="320"
                height="320"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className={`container ${styles.missionGrid}`}>
            {missionCards.map((m, i) => (
              <div key={m.title} className={`${styles.mission} ${i ? styles.missionAlt : ""}`}>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.process} aria-labelledby="about-process">
          <div className="container">
            <div className={styles.head}>
              <span className={styles.eyebrow}>{expertiseIntro.eyebrow}</span>
              <h2 id="about-process" className={styles.h2}>
                {expertiseIntro.title}
              </h2>
              <p className={styles.headSub}>{expertiseIntro.sub}</p>
            </div>
            <ol className={styles.steps}>
              {expertiseCards.map((c, i) => {
                const Icon = STEP_ICONS[i % STEP_ICONS.length];
                return (
                  <li key={c.title} className={styles.step}>
                    <div className={styles.stepTop}>
                      <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.stepIcon} aria-hidden="true">
                        <Icon size={22} strokeWidth={2.5} />
                      </span>
                    </div>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className={styles.values} aria-labelledby="about-values">
          <div className="container">
            <div className={styles.head}>
              <span className={styles.eyebrow}>{valuesIntro.eyebrow}</span>
              <h2 id="about-values" className={styles.h2}>
                {valuesIntro.title}
              </h2>
              <p className={styles.headSub}>{valuesIntro.sub}</p>
            </div>
            <ul className={styles.valueGrid}>
              {valueCards.map((v, i) => (
                <li key={v.title} className={styles.value}>
                  <span className={styles.valueNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CaseResults ctaLoc="About Results" />

        <section className={styles.cta} aria-labelledby="about-cta">
          <div className="container">
            <div className={styles.ctaBox}>
              <h2 id="about-cta" className={styles.ctaTitle}>
                {cta.title}
              </h2>
              <p className={styles.ctaText}>{cta.text}</p>
              <BookLink
                label={cta.primaryLabel}
                href={cta.primaryHref}
                loc="About CTA"
                className={styles.btnPrimary}
              />
              <ul className={styles.assure}>
                {cta.assure.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
              <Link to={cta.secondary.href} className={styles.ctaLink}>
                {cta.secondary.label}
                <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  </>
);

export default AboutUs;
