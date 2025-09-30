import data from "../data/sitedata";

export default function CompanyLogos(){
  return (
    <section className="logos-section">
      <div className="container logo-row">
        {data.logos.map((src,i)=> <img key={i} src={src} alt="logo" />)}
      </div>
    </section>
  );
}
