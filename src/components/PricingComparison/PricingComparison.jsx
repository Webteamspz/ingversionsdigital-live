import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "./PricingComparison.css";
import { comparisonData } from "../../data/pricingdata";

import checkIcon from "/assets/pricing/tickmark.svg";
import crossIcon from "/assets/pricing/cross.svg";
// Ensure these paths match your project
import prevSvg from "/assets/pricing/left.svg"; 
import nextSvg from "/assets/pricing/right.svg"; 

const PricingComparison = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

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
          
          {/* Header Row */}
          {/* <div 
            className="row headerRow" 
            style={{ gridTemplateColumns: `280px repeat(${colCount}, 1fr)` }}
          >
            <div className="cell stub"></div>
            {comparisonData.columns.map((c, idx) => (
              <div key={idx} className="cell planHead">
                {c.badge && <span className="badge">{c.badge}</span>}
                <div className={`planName ${c.isPremium ? 'premiumName' : ''}`}>{c.name}</div>
                {c.price && (
                  <div className="planPrice">
                    {c.price}
                    {c.price !== "Custom" && <span className="period">/month</span>}
                  </div>
                )}
              </div>
            ))}
          </div> */}

          {/* Table Body */}
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

          {/* Footer Row */}
          {/* <div 
            className="row footerRow"
            style={{ gridTemplateColumns: `280px repeat(${colCount}, 1fr)` }}
          >
            <div className="cell stub"></div>
            {comparisonData.columns.map((c, idx) => (
              <div key={`btn-${idx}`} className="cell">
                <a href={c.link || "#"} className="btn">Get Started</a>
              </div>
            ))}
          </div> */}

        </div>

        {/* ======= MOBILE SWIPER ======= */}
        <div className="mobileCompare">
          
          {/* Left Column (Sticky Labels) */}
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

          {/* Right Column (Swiper for Plans) */}
          <div className="plansCol">
            {/* Arrows removed/commented out as requested */}
            {/* <button className="navBtn prev" ref={prevRef} aria-label="Previous plan">
              <img src={prevSvg} alt="Prev" className="navIcon" />
            </button>
            <button className="navBtn next" ref={nextRef} aria-label="Next plan">
              <img src={nextSvg} alt="Next" className="navIcon" />
            </button> */}

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
              {comparisonData.columns.map((c, pIdx) => (
                <SwiperSlide key={`m-plan-${pIdx}`} className="slide">
                  
                  {/* Slide Header - Content commented out, but div kept so vertical alignment doesn't break */}
                  <div className="mHead">
                    {/* {c.badge && <span className="badge">{c.badge}</span>}
                    <div className={`planName ${c.isPremium ? 'premiumName' : ''}`}>{c.name}</div>
                    {c.price && (
                      <div className="planPrice">
                        {c.price}
                        {c.price !== "Custom" && <span className="period">/month</span>}
                      </div>
                    )} */}
                  </div>

                  {/* Slide Values */}
                  {comparisonData.rows.map((row, rIdx) => {
                    if (row.section) {
                      return <div key={`m-secval-${pIdx}-${rIdx}`} className="mSectionTitle emptySecTitle">&nbsp;</div>;
                    }
                    return (
                      <div key={`m-val-${pIdx}-${rIdx}`} className="valRow">
                        <span className="mValue">{renderValue(row.values[pIdx])}</span>
                      </div>
                    );
                  })}

                  {/* Slide Footer CTA */}
                  {/* <div className="mobileCtaBar">
                    <a href={c.link || "#"} className="btn">Get Started</a>
                  </div> */}

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