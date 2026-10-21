import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, CircleCheck } from "lucide-react";
import Layout from "../../layouts/Layouts";
import SEO from "../../components/SEO/SEO";
import ProcessFlow from "../../components/ProcessFlow/ProcessFlow";
import FAQ from "../../components/FAQ/FAQ";
import ProjectsCTA from "../../components/ProjectsCTA/ProjectsCTA";
import Reveal from "../../components/Reveal/Reveal";
import seo from "../../data/seodata";
import siteData from "../../data/sitedata";
import { pricingPlans } from "../../data/pricingdata";
import pages from "../../data/servicepagesdata";
import styles from "./ServicePage.module.css";

const COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];

// A short pricing summary; the full plans and comparison live on /pricing.
const pricingItems = (type) =>
  type === "plans"
    ? pricingPlans.map((p) => ({
        name: p.name,
        price: p.price,
        period: p.period,
        desc: p.description,
        features: p.highlights,
        badge: p.badge,
        cta: { label: p.ctaLabel, href: p.ctaHref },
      }))
    : siteData.engagement.list.map((m) => ({
        name: m.title,
        price: "Custom quote",
        desc: m.desc,
        features: m.features,
        // "#contact" lives on the homepage, not on service pages.
        cta: { label: m.cta.label, href: m.cta.href === "#contact" ? "/#contact" : m.cta.href },
      }));

const CardCta = ({ cta, loc }) =>
  cta.href.startsWith("http") ? (
    <a href={cta.href} target="_blank" rel="noopener noreferrer" className={styles.priceCta} data-cta={cta.label} data-cta-loc={loc}>
      {cta.label} <ArrowRight size={16} aria-hidden="true" />
    </a>
  ) : (
    <Link to={cta.href} className={styles.priceCta} data-cta={cta.label} data-cta-loc={loc}>
      {cta.label} <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );

const ServicePage = ({ slug }) => {
  const page = pages[slug];
  // "What's included" runs card 1 -> last in a loop: the active card gets a
  // border beam and a progress bar, and the bar finishing hands over to the next.
  // Reduced motion: no sequence, every card shown as done.
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [active, setActive] = useState(reduced ? page.included.length : 0);
  const next = () => setActive((a) => (a + 1) % page.included.length);

  return (
    <>
      <SEO {...seo[slug]} />
      <Layout header={1} footer={1}>
        <section className={styles.hero}>
          <div className={styles.grid} aria-hidden="true" />
          <div className="container">
            <span className={styles.eyebrow}>{page.eyebrow}</span>
            <h1 className={styles.title}>{page.title}</h1>
            <p className={styles.intro}>{page.intro}</p>
            {page.keywords && (
              <ul className={styles.keywords} aria-label="Key topics">
                {page.keywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            )}
            <div className={styles.actions}>
              <a
                href={page.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-book"
                data-cta={page.cta.label}
                data-cta-loc={`${page.title} Hero`}
              >
                {page.cta.label}
              </a>
              <Link to="/projects" className={styles.secondary} data-cta="View Projects" data-cta-loc={`${page.title} Hero`}>
                View Projects <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.included}>
          <div className="container">
            <h2 className="section-title">{page.includedHeading}</h2>
            <ol className={styles.includedGrid}>
              {page.included.map((item, i) => (
                <li
                  key={item.title}
                  className={`${styles.includedCard} ${
                    i === active ? styles.current : i < active ? styles.done : ""
                  }`}
                  style={{ "--accent": COLORS[i % COLORS.length] }}
                >
                  {i === active && <span className={styles.beam} aria-hidden="true" />}
                  <div className={styles.includedInner}>
                    <span className={styles.includedIcon} aria-hidden="true">
                      <CircleCheck size={22} strokeWidth={2.5} />
                    </span>
                    <h3 className={styles.includedTitle}>{item.title}</h3>
                    <p className={styles.includedDesc}>{item.desc}</p>
                    {i === active && (
                      <span className={styles.progress} onAnimationEnd={next} aria-hidden="true" />
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <ProcessFlow tabIds={[page.flow]} />

        <section className={styles.pricing}>
          <div className="container">
            <h2 className="section-title">{page.pricingHeading}</h2>
            <p className={styles.pricingSub}>{page.pricingSub}</p>
            <div className={styles.pricingGrid}>
              {pricingItems(page.pricing).map((item, i) => (
                <Reveal
                  key={item.name}
                  delay={i * 70}
                  className={`${styles.priceCard} ${item.badge ? styles.featured : ""}`}
                  style={{ "--accent": COLORS[i % COLORS.length] }}
                >
                  {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  <span className={styles.priceName}>{item.name}</span>
                  <span className={styles.price}>
                    {item.price}
                    {item.period && <span className={styles.period}>{item.period}</span>}
                  </span>
                  <p className={styles.priceDesc}>{item.desc}</p>
                  <ul className={styles.features}>
                    {item.features.map((f) => (
                      <li key={f}>
                        <span className={styles.featureTick} aria-hidden="true">
                          <Check size={12} strokeWidth={3.5} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <CardCta cta={item.cta} loc={`${page.title} Pricing`} />
                </Reveal>
              ))}
            </div>
            <Link to="/pricing" className={`btn ${styles.seeAll}`} data-cta="See full pricing" data-cta-loc={`${page.title} Pricing`}>
              See full pricing <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <FAQ heading={page.faqHeading} list={page.faq} />
        <div className="container">
          <ProjectsCTA />
        </div>
      </Layout>
    </>
  );
};

export default ServicePage;
