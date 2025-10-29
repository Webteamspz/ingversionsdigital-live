import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";

import data from "../../data/siteData";
import styles from "./Pricing.module.css";

import checkIcon from "/assets/pricing/tickmark.svg";
import crossIcon from "/assets/pricing/cross.svg";
import prevSvg from "/assets/pricing/left.svg";
import nextSvg from "/assets/pricing/right.svg";

const DEFAULT_CTA_HREF =
  "https://calendly.com/ingversionsdigital/30min?month=2025-10";

const PricingCompare = () => {
  const { pricing } = data;

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const labelsColRef = useRef(null);
  const plansColRef = useRef(null);
  const swiperRef = useRef(null);

  // ---- helpers
  const valueClass = (v) => {
    const t = typeof v === "object" && v?.icon ? v.icon : v;
    return t === "check" ? styles.tickCell : t === "cross" ? styles.crossCell : "";
  };
  const renderValue = (v) => {
    const t = typeof v === "object" && v?.icon ? v.icon : v;
    if (t === "check") return <img className={styles.valueIcon} src={checkIcon} alt="Included" />;
    if (t === "cross") return <img className={styles.valueIcon} src={crossIcon} alt="Not included" />;
    return <>{t}</>;
  };

  const isPaidPlan = (p) => typeof p?.price === "number" && p.price > 0;

  // show "Get Started" for paid plans AND Elite
  const shouldShowCTA = (p) => isPaidPlan(p) || p?.name === "Elite";

  const footerCtaLabel = (p) => p?.ctaLabel || "Get Started";

  // Always send to Calendly unless an explicit ctaHref is provided.
  // (Ignore contact.href so Elite doesn't go to an old contact page.)
  const footerCtaHref = (p) => p?.ctaHref || DEFAULT_CTA_HREF;

  // filter out empty sections so we don't render a stray grey header row
  const sections = (pricing?.sections || []).filter(
    (sec) => Array.isArray(sec?.rows) && sec.rows.length > 0
  );

  return (
    <section className={styles.pricingSection} id="pricing">
      <div className="container">
        <h3 className={`section-title ${styles.heading}`}>{pricing.heading}</h3>
        {pricing.sub && <p className={styles.sub}>{pricing.sub}</p>}

        {/* ======= DESKTOP/TABLE ======= */}
        <div className={styles.tableWrap}>
          <div className={`${styles.row} ${styles.headerRow}`}>
            <div className={`${styles.cell} ${styles.stub}`} />
            {pricing.plans.map((p, i) => (
              <div key={i} className={`${styles.cell} ${styles.planHead}`}>
                {p.badge && <span className={`${styles.badge} ${styles.cta}`}>{p.badge}</span>}
                <div className={`${styles.planName} ${p.name === "Premium" ? styles.premiumName : ""}`}>
                  {p.name}
                </div>
                {p.contact ? (
                  p.name === "Elite" ? (
                    <div className={styles.planSpacer} aria-hidden="true">&nbsp;</div>
                  ) : (
                    <a className={styles.cta} href={p.contact.href}>{p.contact.label}</a>
                  )
                ) : (
                  <div className={styles.planPrice}>
                    ${p.price}<span className={styles.period}>/month</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {sections.map((sec, sIdx) => (
            <div key={sIdx} className={styles.sectionBlock}>
              {sec.title ? (
                <div className={`${styles.row} ${styles.sectionTitle}`}>
                  <div className={`${styles.cell} ${styles.stub}`}>{sec.title}</div>
                  <div className={`${styles.cell} ${styles.spanner}`} />
                </div>
              ) : null}

              {sec.rows.map((r, rIdx) => (
                <div key={rIdx} className={`${styles.row} ${styles.rowLine}`}>
                  <div className={`${styles.cell} ${styles.labelCell}`}>{r.label}</div>
                  {r.values.map((v, i) => (
                    <div key={i} className={`${styles.cell} ${valueClass(v)}`}>{renderValue(v)}</div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {/* ======= FOOTER CTAS (DESKTOP) ======= */}
          <div className={`${styles.row} ${styles.footerCtas}`}>
            <div className={`${styles.cell} ${styles.stub} ${styles.emptyStub}`} />
            {pricing.plans.map((p, i) => (
              <div key={`fcta-${i}`} className={styles.cell}>
                {shouldShowCTA(p) ? (
                  <a className={styles.btn} href={footerCtaHref(p)}>
                    {footerCtaLabel(p)}
                  </a>
                ) : (
                  <span className={styles.planCtaPlaceholder} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ======= MOBILE / SWIPER ======= */}
        <div className={styles.mobileCompare}>
          <div className={styles.labelsCol} ref={labelsColRef}>
            <div className={styles.labelsHeadSpacer} />
            {sections.map((sec, sIdx) => (
              <div key={`m-sec-${sIdx}`} className={styles.mSection}>
                {sec.title && <div className={styles.mSectionTitle}>{sec.title}</div>}
                {sec.rows.map((r, rIdx) => (
                  <div key={`m-l-${sIdx}-${rIdx}`} className={styles.mRow}>
                    <span className={styles.mLabel}>{r.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.plansCol} ref={plansColRef}>
            <button className={`${styles.navBtn} ${styles.prev}`} ref={prevRef} aria-label="Previous plan" type="button">
              <img src={prevSvg} alt="" className={styles.navIcon} />
            </button>
            <button className={`${styles.navBtn} ${styles.next}`} ref={nextRef} aria-label="Next plan" type="button">
              <img src={nextSvg} alt="" className={styles.navIcon} />
            </button>

            <Swiper
              modules={[Navigation, A11y]}
              speed={500}
              slidesPerView={1}
              spaceBetween={0}
              onBeforeInit={(sw) => {
                sw.params.navigation.prevEl = prevRef.current;
                sw.params.navigation.nextEl = nextRef.current;
              }}
              onInit={(sw) => {
                swiperRef.current = sw;
                sw.navigation.init();
                sw.navigation.update();
              }}
              className={styles.planSwiper}
            >
              {pricing.plans.map((p, pIdx) => (
                <SwiperSlide key={`m-plan-${pIdx}`} className={styles.slide}>
                  <div className={styles.mHead}>
                    {p.badge && <span className={`${styles.badge} ${styles.cta}`}>{p.badge}</span>}
                    <div className={styles.planName}>{p.name}</div>

                    {p.contact ? (
                      p.name === "Elite" ? (
                        <div className={styles.planSpacer} aria-hidden="true">&nbsp;</div>
                      ) : (
                        <a className={styles.cta} href={p.contact.href}>{p.contact.label}</a>
                      )
                    ) : (
                      <div className={styles.planPrice}>
                        ${p.price}<span className={styles.period}>/month</span>
                      </div>
                    )}
                  </div>

                  {sections.map((sec, sIdx) => (
                    <div key={`m-secvals-${pIdx}-${sIdx}`}>
                      {sec.title && <div className={styles.mSectionTitle}>&nbsp;</div>}
                      {sec.rows.map((r, rIdx) => (
                        <div
                          key={`m-val-${pIdx}-${sIdx}-${rIdx}`}
                          className={`${styles.valRow} ${valueClass(r.values[pIdx])}`}
                        >
                          <span className={styles.mValue}>{renderValue(r.values[pIdx])}</span>
                        </div>
                      ))}
                    </div>
                  ))}

                  <div className={styles.mobileCtaBar}>
                    {shouldShowCTA(p) ? (
                      <a className={styles.btn} href={footerCtaHref(p)}>
                        {footerCtaLabel(p)}
                      </a>
                    ) : (
                      <span className={styles.planCtaPlaceholder} />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCompare;
