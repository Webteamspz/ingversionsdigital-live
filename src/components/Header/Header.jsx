// src/components/Header/Header.jsx
import data from "../../data/sitedata";          // ⬅️ two levels up
import logo from "../../assets/Main-logo.png";   // ⬅️ two levels up
import styles from "./Header.module.css";        // ⬅️ same folder

export default function Header() {
  const { links, cta } = data.header;

  return (
    <header className={styles.siteHeader}>
      <div className={`container ${styles.headerRow}`}>
        <div className={styles.brand}>
          <img src={logo} alt="Ingversions Logo" className={styles.brandLogo} />
        </div>

        <nav className={styles.nav}>
          {links.map((l, i) => (
            <a key={i} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <a className="btn" href={cta.href}>{cta.label}</a>
      </div>
    </header>
  );
}
