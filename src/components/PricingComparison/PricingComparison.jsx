import React from "react";
import "./PricingComparison.css";
import { comparisonData } from "../../data/pricingdata";

const PricingComparison = () => {
  return (
    <section className="pricingComparison" id="pricingComparison">
      <div className="container">
        <h2 className="sectionTitle sectionTitleCenter">{comparisonData.title}</h2>
        <p className="sectionSubtitle">{comparisonData.subtitle}</p>

        <div className="pricingTableWrap card">
          <div className="pricingTable">
            <div className="pricingTableRow pricingTableHead">
              <div className="pricingCell pricingFeatureCol">Features</div>
              {comparisonData.columns.map((c) => (
                <div key={c} className="pricingCell pricingPlanCol">
                  {c}
                </div>
              ))}
            </div>

            {comparisonData.rows.map((row, idx) => {
              if (row.section) {
                return (
                  <div key={`${row.section}-${idx}`} className="pricingTableSection">
                    {row.section}
                  </div>
                );
              }

              return (
                <div key={row.label} className="pricingTableRow">
                  <div className="pricingCell pricingFeatureCol">{row.label}</div>
                  {row.values.map((v, i) => (
                    <div key={i} className="pricingCell pricingPlanCol">
                      <span className={`pricingMark ${v ? "isOn" : "isOff"}`}>
                        {v ? "✓" : "×"}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;
