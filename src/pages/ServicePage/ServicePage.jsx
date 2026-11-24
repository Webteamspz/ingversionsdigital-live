import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import ProcessFlow from "../../components/ProcessFlow/ProcessFlow";
import FAQ from "../../components/FAQ/FAQ";
import PricingBottomCta from "../../components/PricingBottomCta/PricingBottomCta";
import ServiceVisual from "../../components/ServiceVisual/ServiceVisual";
import seo from "../../data/seoData";
import siteData from "../../data/siteData";
import { brandPlans, devPlans } from "../../data/pricingData";
import pages, { servicePageCopy as copy } from "../../data/servicePagesData";
import WasPrice from "../../components/WasPrice/WasPrice";
import styles from "./ServicePage.module.css";

const VISUALS = Object.fromEntries(
  siteData.services.list.filter((s) => s.visual).map((s) => [s.icon, s.visual]),
);

const pricingItems = (type) =>
  type === "plans" || type === "dev"
    ? (type === "dev" ? devPlans : brandPlans).map((p) => ({
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        bfWas: p.bfWas,
        period: p.period,
        desc: p.description,
        features: p.highlights,
        badge: p.badge,
        cta: { label: p.ctaLabel, href: p.ctaHref },
      }))
    : siteData.engagement.list.map((m) => ({
        name: m.title,
        price: m.priceLabel,
        desc: m.desc,
        features: m.features,
        cta: { label: m.cta.label, href: m.cta.href === "#contact" ? "/#contact" : m.cta.href },
      }));

const SmartLink = ({ href, className, children, label, loc }) =>
  href.startsWith("http") ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-cta={label}
      data-cta-loc={loc}
    >
      {children}
    </a>
  ) : (
    <Link to={href} className={className} data-cta={label} data-cta-loc={loc}>
      {children}
    </Link>
  );

const ServicePage = ({ slug }) => {
  const page = pages[slug];
  const visual = VISUALS[page.flow];
  const plans = pricingItems(page.pricing);
  const hasExplore = page.related || page.posts?.length;

  return (
    <>
      <SEO {...seo[slug]} />
      <Layout header={1} footer={1}>
        <main>
          <section className={styles.hero}>
            <div className={`container ${styles.heroGrid}`}>
              <div>
                <span className={styles.tag}>{page.eyebrow}</span>
                <h1 className={styles.title}>{page.h1 ?? page.title}</h1>
                <p className={styles.intro}>{page.intro}</p>
                <div className={styles.actions}>
                  <SmartLink
                    href={page.cta.href}
                    className={styles.btnPrimary}
                    label={page.cta.label}
                    loc={`${page.title} Hero`}
                  >
                    {page.cta.label}
                    <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
                  </SmartLink>
                  <Link
                    to={copy.secondaryCta.href}
                    className={styles.btnGhost}
                    data-cta={copy.secondaryCta.label}
                    data-cta-loc={`${page.title} Hero`}
                  >
                    {copy.secondaryCta.label}
                  </Link>
                </div>
                <ul className={styles.assure}>
                  {copy.assure.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.window} aria-hidden="true">
                <div className={styles.bar}>
                  <span className={styles.dots}>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className={styles.url}>
                    {copy.urlBase}/{slug}
                  </span>
                </div>
                {visual ? (
                  <ServiceVisual icon={page.flow} visual={visual} className={styles.visual} />
                ) : (
                  <ul className={styles.chipCloud}>
                    {page.keywords?.map((k) => (
                      <li key={k}>{k}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>

          <section className={styles.included} aria-labelledby="included-heading">
            <div className="container">
              <div className={styles.head}>
                <span className={styles.eyebrow}>{copy.includedEyebrow}</span>
                <h2 id="included-heading" className={styles.h2}>
                  {page.includedHeading}
                </h2>
              </div>
              <ol className={styles.includedGrid}>
                {page.included.map((item, i) => (
                  <li key={item.title} className={styles.includedCard}>
                    <span className={styles.includedNum} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </li>
                ))}
              </ol>
              {visual && page.keywords?.length > 0 && (
                <div className={styles.topics}>
                  <span>{copy.topicsLabel}</span>
                  <ul>
                    {page.keywords.map((k) => (
                      <li key={k}>{k}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          <ProcessFlow tabIds={[page.flow]} />

          <section className={styles.pricing} aria-labelledby="service-pricing">
            <div className="container">
              <div className={styles.head}>
                <span className={styles.eyebrow}>{copy.pricingEyebrow}</span>
                <h2 id="service-pricing" className={styles.h2}>
                  {page.pricingHeading}
                </h2>
                {page.pricingSub && <p className={styles.headSub}>{page.pricingSub}</p>}
              </div>
              <div className={`${styles.pricingGrid} ${plans.length === 3 ? styles.three : ""}`}>
                {plans.map((item) => (
                  <article
                    key={item.name}
                    className={`${styles.priceCard} ${item.badge ? styles.featured : ""}`}
                  >
                    {item.badge && <span className={styles.badge}>{item.badge}</span>}
                    <h3 className={styles.priceName}>{item.name}</h3>
                    <p className={styles.price}>
                      {item.price}
                      {item.period && <span className={styles.period}>{item.period}</span>}
                      {item.originalPrice && <s className={styles.was}>{item.originalPrice}</s>}
                      <WasPrice was={item.bfWas} className={styles.was} tagClassName={styles.off} />
                    </p>
                    <p className={styles.priceDesc}>{item.desc}</p>
                    <SmartLink
                      href={item.cta.href}
                      className={styles.priceCta}
                      label={item.cta.label}
                      loc={`${page.title} Pricing`}
                    >
                      {item.cta.label}
                      <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                    </SmartLink>
                    <ul className={styles.features}>
                      {item.features.map((f) => (
                        <li key={f}>
                          <span className={styles.tick} aria-hidden="true">
                            <Check size={12} strokeWidth={3.5} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <div className={styles.seeAllRow}>
                <Link
                  to="/pricing"
                  className={styles.textLink}
                  data-cta={copy.seeAllPricing}
                  data-cta-loc={`${page.title} Pricing`}
                >
                  {copy.seeAllPricing}
                  <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          {hasExplore && (
            <section className={styles.explore} aria-labelledby="explore-heading">
              <div className="container">
                <div className={styles.head}>
                  <span className={styles.eyebrow}>{copy.exploreEyebrow}</span>
                  <h2 id="explore-heading" className={styles.h2}>
                    {copy.exploreHeading}
                  </h2>
                </div>
                <div className={styles.exploreGrid}>
                  {page.related && (
                    <div className={styles.linkCard}>
                      <h3>{page.related.heading}</h3>
                      <ul>
                        {page.related.links.map((l) => (
                          <li key={l.href}>
                            <Link to={l.href}>
                              {l.label}
                              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {page.posts?.length > 0 && (
                    <div className={styles.linkCard}>
                      <h3>{copy.readingHeading}</h3>
                      <ul>
                        {page.posts.map((p) => (
                          <li key={p.slug}>
                            <Link to={`/blog/${p.slug}`}>
                              {p.title}
                              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          <FAQ heading={page.faqHeading} list={page.faq} />
          <PricingBottomCta />
        </main>
      </Layout>
    </>
  );
};

export default ServicePage;
