import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "./PricingComparison.css";
import { comparisonData } from "../../data/pricingdata";

import checkIcon from "/assets/pricing/tickmark.svg";
import crossIcon from "/assets/pricing/cross.svg";
import prevSvg from "/assets/pricing/left.svg";
import nextSvg from "/assets/pricing/right.svg";

const PricingComparison = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  // PricingPlans se event sunna — slide pe jump karo
  useEffect(() => {
    const handler = (e) => {
      const index = e.detail?.index ?? 0;
      if (swiperRef.current) {
        swiperRef.current.slideTo(index, 400); // 400ms animation
      }
    };
    window.addEventListener("gotoComparisonPlan", handler);
    return () => window.removeEventListener("gotoComparisonPlan", handler);
  }, []);

  const renderValue = (v) => {
    if (v === true || v === "true" || v === "check") {
      return <img className="valueIcon" src={checkIcon} alt="Included" />;
    }
    if (v === false || v === "false" || v === "cross") {
      return <img className="valueIcon" src={crossIcon} alt="Not included" />;
    }
    return <span className="textValue">{v}</span>;
  };

  const colCount = comparisonData.columns.length;

  return (
    <section className="pricingComparison" id="pricingComparison">
      <div className="container">
        <h2 className="sectionTitle">{comparisonData.title}</h2>
        <p className="sectionSubtitle">{comparisonData.subtitle}</p>

        {/* ======= DESKTOP TABLE ======= */}
        <div className="tableWrap">
          <div className="sectionBlock">
            {comparisonData.rows.map((row, idx) => {
              if (row.section) {
                return (
                  <div
                    key={`${row.section}-${idx}`}
                    className="row sectionTitleRow"
                    style={{ gridTemplateColumns: `280px repeat(${colCount}, 1fr)` }}
                  >
                    <div className="cell stub">{row.section}</div>
                    <div className="cell spanner" />
                  </div>
                );
              }
              return (
                <div
                  key={row.label}
                  className="row rowLine"
                  style={{ gridTemplateColumns: `280px repeat(${colCount}, 1fr)` }}
                >
                  <div className="cell labelCell">{row.label}</div>
                  {row.values.map((v, i) => (
                    <div key={i} className="cell">
                      {renderValue(v)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ======= MOBILE SWIPER ======= */}
        <div className="mobileCompare">

          {/* Left Column (Labels) */}
          <div className="labelsCol">
            <div className="labelsHeadSpacer" />
            {comparisonData.rows.map((row, idx) => {
              if (row.section) {
                return (
                  <div key={`m-sec-${idx}`} className="mSectionTitle">
                    {row.section}
                  </div>
                );
              }
              return (
                <div key={`m-lbl-${idx}`} className="mRow">
                  <span className="mLabel">{row.label}</span>
                </div>
              );
            })}
          </div>

          {/* Right Column (Swiper) */}
          <div className="plansCol">
            <Swiper
              modules={[Navigation, A11y]}
              speed={400}
              slidesPerView={1}
              spaceBetween={0}
              onBeforeInit={(sw) => {
                sw.params.navigation.prevEl = prevRef.current;
                sw.params.navigation.nextEl = nextRef.current;
              }}
              onInit={(sw) => {
                swiperRef.current = sw;  // ref save karo
                sw.navigation.init();
                sw.navigation.update();
              }}
              className="planSwiper"
            >
              {comparisonData.columns.map((c, pIdx) => (
                <SwiperSlide key={`m-plan-${pIdx}`} className="slide">

                  <div className="mHead"></div>

                  {comparisonData.rows.map((row, rIdx) => {
                    if (row.section) {
                      return (
                        <div
                          key={`m-secval-${pIdx}-${rIdx}`}
                          className="mSectionTitle emptySecTitle"
                        >
                          &nbsp;
                        </div>
                      );
                    }
                    return (
                      <div key={`m-val-${pIdx}-${rIdx}`} className="valRow">
                        <span className="mValue">{renderValue(row.values[pIdx])}</span>
                      </div>
                    );
                  })}

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