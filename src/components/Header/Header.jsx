import { useState, useEffect } from "react";
import data from "../../data/siteData";
import logo from "/assets/logos/main-logo.png";
import mobileLogo from "/assets/header/mobile-logo.svg";
import hamburger from "/assets/header/hamburger.svg";
import close from "/assets/header/cross.svg";
import styles from "./Header.module.css";

const Header = () => {
  const { links, cta } = data.header;
  const [open, setOpen] = useState(false);

  // lock scroll when menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => (document.documentElement.style.overflow = "");
  }, [open]);

  return (
    <header className={styles.siteHeader} id="header">
      <div className={`container ${styles.headerRow}`}>
        <a href="/" className={styles.brand}>
          {/* Desktop logo */}
          <img
            src={logo}
            alt="Ingversions Logo"
            className={`${styles.brandLogo} ${styles.desktopLogo}`}
          />
          {/* Mobile logo */}
          <img
            src={mobileLogo}
            alt="Ingversions Mobile Logo"
            className={`${styles.brandLogo} ${styles.mobileLogoOnly}`}
          />
        </a>

        {/* desktop nav */}
        <nav className={styles.nav}>
          {links.map((l, i) => (
            <a key={i} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* desktop CTA */}
        <a className={`btn ${styles.desktopCta}`} href={cta.href}>
          {cta.label}
        </a>

        {/* hamburger (visible <=1024px) */}
        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <img src={hamburger} alt="menu" className={styles.menuIcon} />
        </button>
      </div>

      {/* overlay */}
      <div
        className={`${styles.overlay} ${open ? styles.show : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* mobile drawer */}
      <aside
        id="mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
      >
        <div className={styles.mobileHeader}>
          <img
            src={mobileLogo}
            alt="Ingversions Mobile Logo"
            className={styles.mobileLogo}
          />
          <button
            className={styles.closeBtn}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            type="button"
          >
            <img src={close} alt="close" className={styles.closeIcon} />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {links.map((l, i) => (
            <a key={i} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          className={`btn ${styles.mobileCta}`}
          href={cta.href}
          onClick={() => setOpen(false)}
        >
          {cta.label}
        </a>
      </aside>
    </header>
  );
};

export default Header;
