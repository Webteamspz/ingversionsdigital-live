import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seoData";
import data from "../../data/siteData";
import servicePages from "../../data/servicePagesData";
import ServiceVisual from "../../components/ServiceVisual/ServiceVisual";
import CaseResults from "../../components/CaseResults/CaseResults";
import ToolsMarquee from "../../components/ToolsMarquee/ToolsMarquee";
import PricingBottomCta from "../../components/PricingBottomCta/PricingBottomCta";
import styles from "./ServicesPage.module.css";

const page = data.servicesPage;

const SERVICES = data.services.list
  .filter((s) => s.href?.startsWith("/"))
  .map((s) => ({ ...s, slug: s.href.slice(1), page: servicePages[s.href.slice(1)] }))
  .filter((s) => s.page);

const BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

const HERO_STATS = [
  ...data.caseStudies.highlights,
  {
    value: data.caseStudiesPage.metrics[0].value,
    label: data.caseStudiesPage.metrics[0].label,
  },
];

const BookButton = ({ label, loc, className }) => (
  <a
    className={className}
    href={page.primaryHref}
    target="_blank"
    rel="noopener noreferrer"
    data-cta={label}
    data-cta-loc={loc}
  >
    {label}
    <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
  </a>
);

const ServicesPage = () => (
  <>
    <SEO {...seo.services} />
    <Layout header={1} footer={1}>
      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={styles.tag}>{page.tag}</span>
              <h1 className={styles.title}>
                {page.title} <span className={styles.titleMark}>{page.highlight}</span>
              </h1>
              <p className={styles.sub}>{page.sub}</p>
              <div className={styles.actions}>
                <BookButton
                  label={page.primaryCta}
                  loc="Services Hero"
                  className={styles.btnPrimary}
                />
                <Link
                  className={styles.btnGhost}
                  to={page.secondaryHref}
                  data-cta={page.secondaryCta}
                  data-cta-loc="Services Hero"
                >
                  {page.secondaryCta}
                </Link>
              </div>
              <ul className={styles.assure}>
                {page.assure.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            <aside className={styles.proofCard} aria-label={page.proof.label}>
              <span className={styles.proofLabel}>{page.proof.label}</span>
              <dl className={styles.proofStats}>
                {HERO_STATS.map((s) => (
                  <div key={s.label} className={styles.proofStat}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
              <Link to={page.proof.href} className={styles.proofLink}>
                {page.proof.linkLabel}
                <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>

        <section className={styles.problems} aria-labelledby="services-problems">
          <div className="container">
            <div className={styles.head}>
              <span className={styles.eyebrow}>{page.problemsEyebrow}</span>
              <h2 id="services-problems" className={styles.h2}>
                {page.problemsHeading}
              </h2>
              <p className={styles.headSub}>{page.problemsSub}</p>
            </div>
            <ul className={styles.problemGrid}>
              {page.problems
                .filter((p) => BY_SLUG[p.slug])
                .map((p, i) => (
                  <li key={p.slug}>
                    <a href={`#${p.slug}`} className={styles.problem}>
                      <span className={styles.problemNum}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.pain}>“{p.pain}”</span>
                      <span className={styles.fix}>
                        <small>{page.problemFix}</small>
                        <strong>{BY_SLUG[p.slug].title}</strong>
                        <ArrowDown size={16} strokeWidth={2.5} aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        <section className={styles.details} aria-labelledby="services-details">
          <div className="container">
            <div className={styles.head}>
              <span className={styles.eyebrow}>{page.detailsEyebrow}</span>
              <h2 id="services-details" className={styles.h2}>
                {page.detailsHeading}
              </h2>
            </div>

            {SERVICES.map((s, i) => (
              <article
                key={s.slug}
                id={s.slug}
                className={`${styles.service} ${i % 2 ? styles.flip : ""}`}
                aria-labelledby={`${s.slug}-title`}
              >
                <div className={styles.serviceVisual}>
                  <span className={styles.serviceNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ServiceVisual icon={s.icon} visual={s.visual} className={styles.visualFrame} />
                </div>
                <div className={styles.serviceBody}>
                  <span className={styles.serviceEyebrow}>{s.page.eyebrow}</span>
                  <h3 id={`${s.slug}-title`} className={styles.serviceTitle}>
                    {s.page.title}
                  </h3>
                  <p className={styles.intro}>{s.page.intro}</p>
                  <p className={styles.includedLabel}>{page.includedLabel}</p>
                  <ul className={styles.included}>
                    {s.page.included?.slice(0, 4).map((item) => (
                      <li key={item.title}>
                        <span className={styles.check} aria-hidden="true">
                          <Check size={13} strokeWidth={3.5} />
                        </span>
                        <span>
                          <strong>{item.title}.</strong> {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.serviceActions}>
                    <Link
                      to={`/${s.slug}`}
                      className={styles.btnDark}
                      data-cta={`${page.exploreLabel} ${s.page.title}`}
                      data-cta-loc="Services Page"
                    >
                      {page.exploreLabel} {s.page.title}
                      <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
                    </Link>
                    <BookButton
                      label={page.primaryCta}
                      loc={`Services Page ${s.page.title}`}
                      className={styles.textLink}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <CaseResults ctaLoc="Services Results" />

        <section className={styles.audience} aria-labelledby="services-audience">
          <div className="container">
            <div className={styles.head}>
              <span className={styles.eyebrow}>{page.audienceEyebrow}</span>
              <h2 id="services-audience" className={styles.h2}>
                {page.audienceHeading}
              </h2>
            </div>
            <div className={styles.audienceGrid}>
              {page.audiences.map((a, i) => (
                <div
                  key={a.title}
                  className={`${styles.audienceCard} ${i ? styles.audienceAlt : ""}`}
                >
                  <h3 className={styles.audienceTitle}>{a.title}</h3>
                  <p className={styles.audienceDesc}>{a.desc}</p>
                  <ul className={styles.audiencePoints}>
                    {a.points.map((p) => (
                      <li key={p}>
                        <span className={styles.check} aria-hidden="true">
                          <Check size={13} strokeWidth={3.5} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link to={a.link.href} className={styles.btnDark}>
                    {a.link.label}
                    <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ToolsMarquee />
        <PricingBottomCta />
      </main>
    </Layout>
  </>
);

export default ServicesPage;
