import data from "../../data/siteData";
import logo from "/assets/logos/main-logo.png";
import styles from "./Header.module.css";

export default function Header() {
  const { links, cta } = data.header;

  return (
    <header className={styles.siteHeader} id="header">
      <div className={`container ${styles.headerRow}`}>
        <a href="/" className={styles.brand}>
          <img src={logo} alt="Ingversions Logo" className={styles.brandLogo} />
        </a>
        <nav className={styles.nav}>
          {links.map((l, i) => (
            <a key={i} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn" href={cta.href}>
          {cta.label}
        </a>
      </div>
    </header>
  );
}