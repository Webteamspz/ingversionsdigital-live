import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";

import { brandCompare, devCompare } from "../../data/pricingData";
import WasPrice from "../WasPrice/WasPrice";
import useOccasion from "../../hooks/useOccasion";
import { planPrice } from "../../utils/occasions";
import styles from "./Pricing.module.css";

import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";

const PricingCompare = ({ track }) => {
  const occasion = useOccasion();
  const pricing = track === "dev" ? devCompare : brandCompare;

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      const index = e.detail?.index ?? 0;
      if (swiperRef.current) {
        swiperRef.current.slideTo(index, 400);
      }
    };
    window.addEventListener("gotoComparisonPlan", handler);
    return () => window.removeEventListener("gotoComparisonPlan", handler);
  }, []);

  const renderValue = (v) => {
    const t = typeof v === "object" && v?.icon ? v.icon : v;
    if (t === "check") {
      return (
        <span className={styles.valueIcon} role="img" aria-label="Included">
          <Check size={20} strokeWidth={2.5} />
        </span>
      );
    }
    if (t === "cross") {
      return (
        <span className={`${styles.valueIcon} ${styles.dash}`} role="img" aria-label="Not included">
          <X size={18} strokeWidth={2.5} />
        </span>
      );
    }
    if (t === "—") return <span className={styles.dash}>—</span>;
    return <>{t}</>;
  };

  const sections = (pricing?.sections || []).filter(
    (sec) => Array.isArray(sec?.rows) && sec.rows.length > 0,
  );
  const ctas = pricing?.sections?.find((sec) => sec.ctaButtons)?.ctaButtons || [];
  const featIdx = pricing.plans.findIndex((p) => p.badge);

  const renderCta = (c, i, extra = "") =>
    c ? (
      <a
        className={`btn ${i === featIdx ? "" : styles.ghostCta} ${extra}`}
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={c.label}
        data-cta-loc={`Pricing Compare: ${c.plan}`}
      >
        {c.label}
      </a>
    ) : null;

  const goTo = (i) => swiperRef.current?.slideTo(i, 400);

  const renderPrice = (plan) => {
    const { price, priceLabel, was, percent } = planPrice(plan, occasion);
    const p = { ...plan, price, priceLabel };
    if (p.contact)
      return (
        <a
          className={styles.cta}
          href={p.contact.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cta={p.contact.label}
          data-cta-loc={`Pricing Compare: ${p.name}`}
        >
          {p.contact.label}
        </a>
      );
    if (p.priceLabel)
      return (
        <div className={styles.planPrice}>
          {p.priceLabel}
          <WasPrice was={was} percent={percent} className={styles.was} />
        </div>
      );
    if (p.price != null)
      return (
        <div className={styles.planPrice}>
          ${p.price.toLocaleString("en-US")}
          <span className={styles.period}>/month</span>
          <WasPrice was={was} percent={percent} className={styles.was} />
        </div>
      );
    return (
      <div className={styles.planSpacer} aria-hidden="true">
        &nbsp;
      </div>
    );
  };

  return (
    <section className={styles.pricingSection} id="pricingComparison">
      <div className="container">
        <h3 className={`section-title ${styles.heading}`}>{pricing.heading}</h3>
        {pricing.sub && <p className={styles.sub}>{pricing.sub}</p>}

        <div className={styles.tableWrap} style={{ "--feat": featIdx }}>
          {featIdx >= 0 && <div className={styles.featLane} aria-hidden="true" />}
          <div className={`${styles.row} ${styles.headerRow}`}>
            <div className={`${styles.cell} ${styles.stub}`} />
            {pricing.plans.map((p, i) => (
              <div key={i} className={`${styles.cell} ${styles.planHead}`}>
                {p.badge && <span className={`${styles.badge} ${styles.cta}`}>{p.badge}</span>}
                <div className={`${styles.planName} ${p.badge ? styles.premiumName : ""}`}>
                  {p.name}
                </div>
                {renderPrice(p)}
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
                    <div key={i} className={styles.cell}>
                      {renderValue(v)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {ctas.length > 0 && (
            <div className={`${styles.row} ${styles.ctaRow}`}>
              <div className={styles.cell} />
              {pricing.plans.map((_, i) => (
                <div key={i} className={styles.cell}>
                  {renderCta(ctas[i], i)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.tabs} role="group" aria-label="Choose a plan">
          {pricing.plans.map((p, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
              aria-pressed={i === active}
              onClick={() => goTo(i)}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className={styles.mobileCompare}>
          <div className={styles.labelsCol}>
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

          <div className={styles.plansCol}>
            <button
              className={`${styles.navBtn} ${styles.prev}`}
              ref={prevRef}
              aria-label="Previous plan"
              type="button"
            >
              <ChevronLeft className={styles.navIcon} size={20} strokeWidth={2.5} />
            </button>
            <button
              className={`${styles.navBtn} ${styles.next}`}
              ref={nextRef}
              aria-label="Next plan"
              type="button"
            >
              <ChevronRight className={styles.navIcon} size={20} strokeWidth={2.5} />
            </button>

            <Swiper
              modules={[Navigation, A11y]}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
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
              onSlideChange={(sw) => setActive(sw.activeIndex)}
              className={styles.planSwiper}
            >
              {pricing.plans.map((p, pIdx) => (
                <SwiperSlide key={`m-plan-${pIdx}`} className={styles.slide}>
                  <div className={`${styles.mHead} ${pIdx === featIdx ? styles.mHeadFeat : ""}`}>
                    {p.badge && <span className={`${styles.badge} ${styles.cta}`}>{p.badge}</span>}
                    <div className={styles.planName}>{p.name}</div>
                    {renderPrice(p)}
                  </div>

                  {sections.map((sec, sIdx) => (
                    <div key={`m-secvals-${pIdx}-${sIdx}`}>
                      {sec.title && <div className={styles.mSectionTitle}>&nbsp;</div>}
                      {sec.rows.map((r, rIdx) => (
                        <div key={`m-val-${pIdx}-${sIdx}-${rIdx}`} className={styles.valRow}>
                          <span className={styles.mValue}>{renderValue(r.values[pIdx])}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {ctas[active] && (
          <div className={styles.mCta}>{renderCta(ctas[active], active, styles.mCtaBtn)}</div>
        )}
      </div>
    </section>
  );
};

export default PricingCompare;
