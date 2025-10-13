import { useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";

import data from "../../data/sitedata";
import styles from "./Pricing.module.css";

import checkIcon from "/assets/pricing/tickmark.svg";
import crossIcon from "/assets/pricing/cross.svg";
import prevSvg from "/assets/pricing/left.svg";
import nextSvg from "/assets/pricing/right.svg";

const DEFAULT_CTA_HREF =
  "https://calendly.com/ingversionsdigital/30min?month=2025-10";

const PricingCompare = () => {
  const pricing = data?.pricing || {};
  const plans = pricing?.plans || [];
  const sections = pricing?.sections || [];
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const valueClass = (v) => {
    const t = typeof v === "object" && v?.icon ? v.icon : v;
    return t === "check"
      ? styles.tickCell
      : t === "cross"
      ? styles.crossCell
      : "";
  };

  const renderValue = (v) => {
    const t = typeof v === "object" && v?.icon ? v.icon : v;
    if (t === "check")
      return (
        <img className={styles.valueIcon} src={checkIcon} alt="Included" />
      );
    if (t === "cross")
      return (
        <img className={styles.valueIcon} src={crossIcon} alt="Not included" />
      );
    return <>{t}</>;
  };

  // Lookup from optional pricing.ctaButtons
  const ctaByPlan = useMemo(() => {
    const out = {};
    (pricing?.ctaButtons || []).forEach((b) => {
      if (!b?.plan) return;
      out[b.plan] = {
        label: b.label || "Get started",
        href: b.href || DEFAULT_CTA_HREF,
        hide: Boolean(b.hide),
      };
    });
    return out;
  }, [pricing?.ctaButtons]);

  // Decide CTA even if JSON missing
  const getPlanCta = (plan) => {
    const name = plan?.name;
    const cfg = name ? ctaByPlan[name] : null;
    if (cfg) return cfg.hide ? null : { label: cfg.label, href: cfg.href };

    const isPaid = typeof plan?.price === "number" && plan.price > 0;
    if (name === "Elite" || isPaid) {
      return { label: "Get started", href: DEFAULT_CTA_HREF };
    }
    return null;
  };

  return (
    <section className={styles.pricingSection} id="pricing">
      <div className="container">
        <h3 className={`section-title ${styles.heading}`}>
          {pricing?.heading || "Pricing"}
        </h3>
        {pricing?.sub && <p className={styles.sub}>{pricing.sub}</p>}

        {/* ======= DESKTOP TABLE ======= */}
        <div className={styles.tableWrap}>
          <div className={`${styles.row} ${styles.headerRow}`}>
            <div className={`${styles.cell} ${styles.stub}`} />
            {plans.map((p, i) => (
              <div key={i} className={`${styles.cell} ${styles.planHead}`}>
                {p?.badge && (
                  <span className={`${styles.badge} ${styles.cta}`}>
                    {p.badge}
                  </span>
                )}
                <div
                  className={`${styles.planName} ${
                    p?.name === "Premium" ? styles.premiumName : ""
                  }`}
                >
                  {p?.name || ""}
                </div>

                {/* Remove 'Contact Us' – keep alignment via spacer */}
                {typeof p?.price === "number" ? (
                  <div className={styles.planPrice}>
                    ${p.price}
                    <span className={styles.period}>/month</span>
                  </div>
                ) : (
                  <div className={styles.planSpacer} aria-hidden="true">
                    &nbsp;
                  </div>
                )}
              </div>
            ))}
          </div>

          {sections.map((sec, sIdx) => (
            <div key={sIdx} className={styles.sectionBlock}>
              <div className={`${styles.row} ${styles.sectionTitle}`}>
                <div className={`${styles.cell} ${styles.stub}`}>
                  {sec?.title || ""}
                </div>
                <div className={`${styles.cell} ${styles.spanner}`} />
              </div>

              {(sec?.rows || []).map((r, rIdx) => (
                <div key={rIdx} className={`${styles.row} ${styles.rowLine}`}>
                  <div className={`${styles.cell} ${styles.labelCell}`}>
                    {r?.label || ""}
                  </div>
                  {(r?.values || []).map((v, i) => (
                    <div key={i} className={`${styles.cell} ${valueClass(v)}`}>
                      {renderValue(v)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {/* ======= FOOTER CTAS (DESKTOP) ======= */}
          {/* DESKTOP FOOTER CTAS */}
          <div className={`${styles.row} ${styles.footerCtas}`}>
            <div
              className={`${styles.cell} ${styles.stub} ${styles.emptyStub}`}
            />
            {plans.map((p, i) => {
              const cta = getPlanCta(p);
              return (
                <div key={`fcta-${i}`} className={styles.cell}>
                  {cta ? (
                    <a className={styles.btn} href={cta.href}>
                      {cta.label}
                    </a>
                  ) : (
                    <span className={styles.planCtaPlaceholder} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ======= MOBILE / SWIPER ======= */}
        <div className={styles.mobileCompare}>
          <div className={styles.labelsCol}>
            <div className={styles.labelsHeadSpacer} />
            {sections.map((sec, sIdx) => (
              <div key={`m-sec-${sIdx}`} className={styles.mSection}>
                <div className={styles.mSectionTitle}>{sec?.title || ""}</div>
                {(sec?.rows || []).map((r, rIdx) => (
                  <div key={`m-l-${sIdx}-${rIdx}`} className={styles.mRow}>
                    <span className={styles.mLabel}>{r?.label || ""}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.plansCol}>
            <button
              className={`${styles.navBtn} ${styles.prev}`}
              ref={prevRef}
              aria-label="Previous plan"
              type="button"
            >
              <img src={prevSvg} alt="" className={styles.navIcon} />
            </button>
            <button
              className={`${styles.navBtn} ${styles.next}`}
              ref={nextRef}
              aria-label="Next plan"
              type="button"
            >
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
              {plans.map((p, pIdx) => {
                const cta = getPlanCta(p);
                return (
                  <SwiperSlide key={`m-plan-${pIdx}`} className={styles.slide}>
                    <div className={styles.mHead}>
                      {p?.badge && (
                        <span className={`${styles.badge} ${styles.cta}`}>
                          {p.badge}
                        </span>
                      )}
                      <div className={styles.planName}>{p?.name || ""}</div>

                      {typeof p?.price === "number" ? (
                        <div className={styles.planPrice}>
                          ${p.price}
                          <span className={styles.period}>/month</span>
                        </div>
                      ) : (
                        <div className={styles.planSpacer} aria-hidden="true">
                          &nbsp;
                        </div>
                      )}
                    </div>

                    {sections.map((sec, sIdx) => (
                      <div key={`m-secvals-${pIdx}-${sIdx}`}>
                        <div className={styles.mSectionTitle}>&nbsp;</div>
                        {(sec?.rows || []).map((r, rIdx) => (
                          <div
                            key={`m-val-${pIdx}-${sIdx}-${rIdx}`}
                            className={`${styles.valRow} ${valueClass(
                              (r?.values || [])[pIdx]
                            )}`}
                          >
                            <span className={styles.mValue}>
                              {renderValue((r?.values || [])[pIdx])}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}

                    {/* MOBILE CTA inside each slide */}
                    <div className={styles.mobileCtaBar}>
                      {cta ? (
                        <a className={styles.btn} href={cta.href}>
                          {cta.label}
                        </a>
                      ) : (
                        <span className={styles.planCtaPlaceholder} />
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCompare;
