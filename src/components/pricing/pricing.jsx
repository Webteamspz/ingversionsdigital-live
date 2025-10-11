import { useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";

import data from "../../data/siteData";
import styles from "./Pricing.module.css";

import checkIcon from "/assets/pricing/tickmark.svg";
import crossIcon from "/assets/pricing/cross.svg";
import prevSvg from "/assets/pricing/left.svg";
import nextSvg from "/assets/pricing/right.svg";

const PricingCompare = () => {
  const { pricing } = data;
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // NEW: refs for syncing heights on mobile
  const labelsColRef = useRef(null);
  const plansColRef = useRef(null);
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

  // NEW: sync heights between left (labels) and right (active slide)
  const syncRowHeights = useCallback(() => {
    const labelsCol = labelsColRef.current;
    const plansCol = plansColRef.current;
    if (!labelsCol || !plansCol) return;

    const leftRows = Array.from(
      labelsCol.querySelectorAll(`.${styles.mSectionTitle}, .${styles.mRow}`)
    );

    const activeSlide = plansCol.querySelector(
      `.${styles.slide}.swiper-slide-active`
    );
    if (!activeSlide) return;

    const rightRows = Array.from(
      activeSlide.querySelectorAll(
        `.${styles.mSectionTitle}, .${styles.valRow}`
      )
    );

    // clear any previous values
    rightRows.forEach((el) => (el.style.minHeight = ""));

    leftRows.forEach((leftEl, i) => {
      const rightEl = rightRows[i];
      if (!rightEl) return;
      const h = Math.max(leftEl.offsetHeight, 48); // base row height
      rightEl.style.minHeight = `${h}px`;
    });
  }, []);

  // Re-sync on window resize (mobile widths where wrapping changes)
  useEffect(() => {
    const onResize = () => syncRowHeights();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncRowHeights]);

  return (
    <section className={styles.pricingSection} id="pricing">
      <div className="container">
        <h3 className={`section-title ${styles.heading}`}>{pricing.heading}</h3>
        {pricing.sub && <p className={styles.sub}>{pricing.sub}</p>}

        {/* DESKTOP/TABLET TABLE */}
        <div className={styles.tableWrap}>
          <div className={`${styles.row} ${styles.headerRow}`}>
            <div className={`${styles.cell} ${styles.stub}`} />
            {pricing.plans.map((p, i) => (
              <div key={i} className={`${styles.cell} ${styles.planHead}`}>
                {p.badge && (
                  <span className={`${styles.badge} ${styles.cta}`}>
                    {p.badge}
                  </span>
                )}
                <div
                  className={`${styles.planName} ${
                    p.name === "Premium" ? styles.premiumName : ""
                  }`}
                >
                  {p.name}
                </div>
                {p.contact ? (
                  <a className={styles.cta} href={p.contact.href}>
                    {p.contact.label}
                  </a>
                ) : (
                  <div className={styles.planPrice}>
                    $ {p.price}
                    <span className={styles.period}>/month</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {pricing.sections.map((sec, sIdx) => (
            <div key={sIdx} className={styles.sectionBlock}>
              <div className={`${styles.row} ${styles.sectionTitle}`}>
                <div className={`${styles.cell} ${styles.stub}`}>
                  {sec.title}
                </div>
                <div className={`${styles.cell} ${styles.spanner}`} />
              </div>
              {sec.rows.map((r, rIdx) => (
                <div key={rIdx} className={`${styles.row} ${styles.rowLine}`}>
                  <div className={`${styles.cell} ${styles.labelCell}`}>
                    {r.label}
                  </div>
                  {r.values.map((v, i) => (
                    <div key={i} className={`${styles.cell} ${valueClass(v)}`}>
                      {renderValue(v)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* MOBILE COMPARISON */}
        <div className={styles.mobileCompare}>
          {/* LEFT: labels */}
          <div className={styles.labelsCol} ref={labelsColRef}>
            <div className={styles.labelsHeadSpacer} />
            {pricing.sections.map((sec, sIdx) => (
              <div key={`m-sec-${sIdx}`} className={styles.mSection}>
                <div className={styles.mSectionTitle}>{sec.title}</div>
                {sec.rows.map((r, rIdx) => (
                  <div key={`m-l-${sIdx}-${rIdx}`} className={styles.mRow}>
                    <span className={styles.mLabel}>{r.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: swiper plans */}
          <div className={styles.plansCol} ref={plansColRef}>
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
                // wait a frame for layout, then sync
                requestAnimationFrame(syncRowHeights);
                // keep in sync on slide change / internal resize
                sw.on("slideChangeTransitionEnd", syncRowHeights);
                sw.on("resize", syncRowHeights);
              }}
              className={styles.planSwiper}
            >
              {pricing.plans.map((p, pIdx) => (
                <SwiperSlide key={`m-plan-${pIdx}`} className={styles.slide}>
                  <div className={styles.mHead}>
                    {p.badge && (
                      <span className={`${styles.badge} ${styles.cta}`}>
                        {p.badge}
                      </span>
                    )}
                    <div className={styles.planName}>{p.name}</div>
                    {p.contact ? (
                      <a className={styles.cta} href={p.contact.href}>
                        {p.contact.label}
                      </a>
                    ) : (
                      <div className={styles.planPrice}>
                        ${p.price}
                        <span className={styles.period}>/month</span>
                      </div>
                    )}
                  </div>

                  {pricing.sections.map((sec, sIdx) => (
                    <div key={`m-secvals-${pIdx}-${sIdx}`}>
                      {/* Spacer aligned with left section title */}
                      <div className={styles.mSectionTitle}>&nbsp;</div>
                      {sec.rows.map((r, rIdx) => (
                        <div
                          key={`m-val-${pIdx}-${sIdx}-${rIdx}`}
                          className={`${styles.valRow} ${valueClass(
                            r.values[pIdx]
                          )}`}
                        >
                          <span className={styles.mValue}>
                            {renderValue(r.values[pIdx])}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
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
