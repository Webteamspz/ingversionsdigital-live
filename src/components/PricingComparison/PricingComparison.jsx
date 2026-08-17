import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "./PricingComparison.css";

import data from "../../data/sitedata";

import checkIcon from "/assets/pricing/tickmark.svg";
import crossIcon from "/assets/pricing/cross.svg";
import prevSvg from "/assets/pricing/left.svg";
import nextSvg from "/assets/pricing/right.svg";

const PricingComparison = () => {
  const { pricing } = data;

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  // Listens for a plan-select event from PricingPlans and slides to that plan
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
      return <img className="valueIcon" src={checkIcon} alt="Included" />;
    }
    if (t === "cross") {
      return <img className="valueIcon" src={crossIcon} alt="Not included" />;
    }
    return <span className="textValue">{t}</span>;
  };

  const isPaidPlan = (p) => typeof p?.price === "number" && p.price > 0;
  const shouldShowCTA = (p) => isPaidPlan(p) || p?.name === "Elite";
  const footerCtaLabel = (p) => p?.ctaLabel || "Get Started";
  const planContactHref = (p) => `/?plan=${encodeURIComponent(p.name)}#hero`;

  const sections = (pricing?.sections || []).filter(
    (sec) => Array.isArray(sec?.rows) && sec.rows.length > 0
  );

  const colCount = pricing.plans.length;

  return (
    <section className="pricingComparison" id="pricingComparison">
      <div className="container">
        <h2 className="sectionTitle">{pricing.heading}</h2>
        {pricing.sub && <p className="sectionSubtitle">{pricing.sub}</p>}

        {/* ======= DESKTOP TABLE ======= */}
        <div className="tableWrap">
          <div
            className="row headerRow"
            style={{ gridTemplateColumns: `280px repeat(${colCount}, 1fr)` }}
          >
            <div className="cell stub" />
            {pricing.plans.map((p, i) => (
              <div key={i} className="cell planHead">
                {p.badge && <span className="badge">{p.badge}</span>}
                <div className={`planName ${p.name === "Premium" ? "premiumName" : ""}`}>
                  {p.name}
                </div>
                {p.contact ? (
                  p.name === "Elite" ? (
                    <div className="planSpacer">&nbsp;</div>
                  ) : (
                    <a className="ctaLink" href={p.contact.href}>
                      {p.contact.label}
                    </a>
                  )
                ) : (
                  <div className="planPrice">
                    ${p.price}
                    <span className="period">/month</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {sections.map((sec, sIdx) => (
            <div key={sIdx} className="sectionBlock">
              {sec.title && (
                <div
                  className="row sectionTitleRow"
                  style={{ gridTemplateColumns: `280px repeat(${colCount}, 1fr)` }}
                >
                  <div className="cell stub">{sec.title}</div>
                  <div className="cell spanner" />
                </div>
              )}
              {sec.rows.map((r, rIdx) => (
                <div
                  key={rIdx}
                  className="row rowLine"
                  style={{ gridTemplateColumns: `280px repeat(${colCount}, 1fr)` }}
                >
                  <div className="cell labelCell">{r.label}</div>
                  {r.values.map((v, i) => (
                    <div key={i} className="cell">
                      {renderValue(v)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          <div
            className="row footerRow"
            style={{ gridTemplateColumns: `280px repeat(${colCount}, 1fr)` }}
          >
            <div className="cell stub" />
            {pricing.plans.map((p, i) => (
              <div key={`fcta-${i}`} className="cell">
                {shouldShowCTA(p) ? (
                  <Link className="btn" to={planContactHref(p)}>
                    {footerCtaLabel(p)}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* ======= MOBILE SWIPER ======= */}
        <div className="mobileCompare">
          <div className="labelsCol">
            <div className="labelsHeadSpacer" />
            {sections.map((sec, sIdx) => (
              <div key={`m-sec-${sIdx}`}>
                {sec.title && (
                  <div className="mSectionTitle">{sec.title}</div>
                )}
                {sec.rows.map((r, rIdx) => (
                  <div key={`m-l-${sIdx}-${rIdx}`} className="mRow">
                    <span className="mLabel">{r.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="plansCol">
            <button
              className="navBtn prev"
              ref={prevRef}
              aria-label="Previous plan"
              type="button"
            >
              <img src={prevSvg} alt="" className="navIcon" />
            </button>
            <button
              className="navBtn next"
              ref={nextRef}
              aria-label="Next plan"
              type="button"
            >
              <img src={nextSvg} alt="" className="navIcon" />
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
              className="planSwiper"
            >
              {pricing.plans.map((p, pIdx) => (
                <SwiperSlide key={`m-plan-${pIdx}`} className="slide">
                  <div className="mHead">
                    {p.badge && <span className="badge">{p.badge}</span>}
                    <div className={`planName ${p.name === "Premium" ? "premiumName" : ""}`}>
                      {p.name}
                    </div>
                    {p.contact ? (
                      p.name === "Elite" ? (
                        <div className="planSpacer">&nbsp;</div>
                      ) : (
                        <a className="ctaLink" href={p.contact.href}>
                          {p.contact.label}
                        </a>
                      )
                    ) : (
                      <div className="planPrice">
                        ${p.price}
                        <span className="period">/month</span>
                      </div>
                    )}
                  </div>

                  {sections.map((sec, sIdx) => (
                    <div key={`m-secvals-${pIdx}-${sIdx}`}>
                      {sec.title && (
                        <div className="mSectionTitle emptySecTitle">&nbsp;</div>
                      )}
                      {sec.rows.map((r, rIdx) => (
                        <div key={`m-val-${pIdx}-${sIdx}-${rIdx}`} className="valRow">
                          <span className="mValue">
                            {renderValue(r.values[pIdx])}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}

                  <div className="mobileCtaBar">
                    {shouldShowCTA(p) ? (
                      <Link className="btn" to={planContactHref(p)}>
                        {footerCtaLabel(p)}
                      </Link>
                    ) : null}
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

export default PricingComparison;
