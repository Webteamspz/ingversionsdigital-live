import data from "../data/sitedata";

export default function WorkProcess() {
  return (
    <section className="process-section" id="work-process">
      <div className="container">
        <h3 className="section-title process-title">Our Simple Work Process</h3>

        <p className="process-sub">
          Delivering innovative solutions We provide our best service of our consumers choices.
          Lot of happy customers we have.cross diverse industries with deep domain expertise.
        </p>

        <div className="process-grid">
          {data.process.map((p, i) => (
            <article key={i} className="step">
              <div className="step-head">{p.title}</div>

              <div className="step-body">
                {/* 150 × 150 like your overlay; adjust if your art is different */}
                <img
                  src={p.icon}
                  alt={p.title}
                  className="step-icon"
                  width="150"
                  height="150"
                />
              </div>

              <div className="step-desc">{p.desc}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
