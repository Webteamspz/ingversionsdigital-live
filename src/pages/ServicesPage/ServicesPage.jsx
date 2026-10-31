import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seoData";
import data from "../../data/siteData";
import servicePages from "../../data/servicePagesData";
import ToolsMarquee from "../../components/ToolsMarquee/ToolsMarquee";
import PricingBottomCta from "../../components/PricingBottomCta/PricingBottomCta";
import Reveal from "../../components/Reveal/Reveal";
import styles from "./ServicesPage.module.css";

// Soft purple, not the strong accent, so dark text on the panels stays readable.
const COLORS = ["var(--palette-accent-soft)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];

// The services shown on the home page, with each one's full details from its
// own service page (/ab-testing, /shopify-development, ...).
const SERVICES = data.services.list
  .filter((s) => s.href?.startsWith("/"))
  .map((s) => ({ slug: s.href.slice(1), ...servicePages[s.href.slice(1)] }))
  .filter((s) => s.title);

const ServicesPage = () => {
  const hero = data.servicesPage;
  return (
    <>
      <SEO {...seo.services} />
      <Layout header={1} footer={1}>
        <main>
          <section className={styles.hero}>
            <div className="container">
              <span className={styles.tag}>{hero.tag}</span>
              <h1 className={styles.title}>{hero.title}</h1>
              <p className={styles.sub}>{hero.sub}</p>
              <div className={styles.actions}>
                <a
                  className="btn"
                  href={hero.primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={hero.primaryCta}
                  data-cta-loc="Services Hero"
                >
                  {hero.primaryCta}
                </a>
                <Link className="c-btn" to={hero.secondaryHref}>
                  {hero.secondaryCta}
                </Link>
              </div>

              <nav className={styles.jump} aria-label="Jump to a service">
                {SERVICES.map((s, i) => (
                  <a key={s.slug} href={`#${s.slug}`} className={styles.jumpLink}>
                    <span className={styles.jumpNum} style={{ background: COLORS[i % 4] }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </section>

          <section className={styles.details} aria-labelledby="services-details">
            <div className="container">
              <h2 id="services-details" className="section-title">{hero.detailsHeading}</h2>
              {SERVICES.map((s, i) => (
                <Reveal key={s.slug} className={`${styles.service} ${i % 2 ? styles.flip : ""}`}>
                  <article id={s.slug} className={styles.serviceInner}>
                    <div className={styles.panel} style={{ background: COLORS[i % 4] }}>
                      <span className={styles.panelNum}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.panelEyebrow}>{s.eyebrow}</span>
                      <ul className={styles.keywords}>
                        {s.keywords?.slice(0, 4).map((k) => <li key={k}>{k}</li>)}
                      </ul>
                    </div>
                    <div className={styles.body}>
                      <h3 className={styles.serviceTitle}>{s.title}</h3>
                      <p className={styles.intro}>{s.intro}</p>
                      <ul className={styles.included}>
                        {s.included?.slice(0, 4).map((item) => (
                          <li key={item.title}>
                            <Check size={18} strokeWidth={3} aria-hidden="true" className={styles.check} />
                            <span>
                              <strong>{item.title}</strong> {item.desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link to={`/${s.slug}`} className={styles.more} data-cta={`Explore ${s.title}`} data-cta-loc="Services Page">
                        Explore {s.title} <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section className={styles.audience} aria-labelledby="services-audience">
            <div className="container">
              <h2 id="services-audience" className="section-title">{hero.audienceHeading}</h2>
              <div className={styles.audienceGrid}>
                {hero.audiences.map((a, i) => (
                  <div key={a.title} className={styles.audienceCard} style={{ "--accent": COLORS[(i + 1) % 4] }}>
                    <span className={styles.cornerFold} aria-hidden="true" />
                    <h3 className={styles.audienceTitle}>{a.title}</h3>
                    <p className={styles.audienceDesc}>{a.desc}</p>
                    <ul className={styles.audiencePoints}>
                      {a.points.map((p) => (
                        <li key={p}>
                          <Check size={16} strokeWidth={3} aria-hidden="true" className={styles.check} />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <Link to={a.link.href} className={styles.more}>
                      {a.link.label} <ArrowRight size={16} aria-hidden="true" />
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
};

export default ServicesPage;
