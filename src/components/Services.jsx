import data from "../data/sitedata";

export default function Services(){
  return (
    <section className="services-section" id="cro-services">
      <div className="container">
        <h3 className="section-title">Our CRO Services</h3>
        <p className="services-sub">Delivering practical wins with conversion-first builds and high-tempo iteration.</p>
        <div className="services">
          {data.services.map((s,i)=>(
            <article key={i} className="card service">
              <img className="icon" src={s.icon} alt="" />
              <h4 className="service-title">{s.title}</h4>
              <p className="service-desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
