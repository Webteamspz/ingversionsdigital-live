import data from "../data/sitedata";
import icon from "../assets/why-choose-us/checkmark.png"; 

export default function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="container">
        <h3 className="section-title">Why Choose Us</h3>

        <div className="why-cards">
          {data.why.map((w, i) => (
            <div key={i} className="why-card">
              <img src={icon} alt="" className="why-icon" />
              <h4 className="why-title">{w.title}</h4>
              <p className="why-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
