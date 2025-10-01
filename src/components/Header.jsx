import data from "../data/sitedata";
import logo from "../assets/Main-logo.png"; 

export default function Header() {
  const { links, cta } = data.header;

  return (
    <>
      <header className="site-header">
        <div className="container header-row">
          <div className="brand">
            <img src={logo} alt="Ingversions Logo" className="brand-logo" />
          </div>

          <nav className="nav">
            {links.map((l, i) => (
              <a key={i} href={l.href}>{l.label}</a>
            ))}
          </nav>

          <a className="btn" href={cta.href}>{cta.label}</a>
        </div>
      </header>
    </>
  );
}
