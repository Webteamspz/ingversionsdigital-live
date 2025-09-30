import data from "../data/sitedata";

export default function TrackRecord(){
  return (
    <section className="kpi-section" id="success">
      <div className="container">
        <h3 className="section-title">Our Track Record</h3>
        <div className="kpis">
          {data.kpis.map((k,i)=>(
            <div key={i} className="kpi">
              <div className="value">{k.value}</div>
              <div className="label">{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// https://codepen.io/morgoe/pen/rNvEmXd