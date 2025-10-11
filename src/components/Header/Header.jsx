import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import data from "../../data/siteData";
import logo from "/assets/logos/main-logo.png";
import mobileLogo from "/assets/logos/mobile-logo.png";
import styles from "./Header.module.css";


import { ctaClick, dl } from "../../gtm";

const HamburgerIcon = (props) => (
  <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path d="M9 13.1221H27.75M9 24.6221H39M20.25 36.1221H39" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = (props) => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
    <path d="M26.5608 0.439274C25.9751 -0.146425 25.0255 -0.146425 24.4398 0.439274L13.5 11.3791L2.56024 0.439274C1.97456 -0.146425 1.02496 -0.146425 0.439275 0.439274C-0.146425 1.02496 -0.146425 1.97456 0.439275 2.56024L11.379 13.5L0.439305 24.4397C-0.146395 25.0255 -0.146395 25.975 0.439305 26.5608C1.02499 27.1464 1.97459 27.1464 2.56027 26.5608L13.5 15.621L24.4398 26.5608C25.0255 27.1464 25.9751 27.1464 26.5608 26.5608C27.1464 25.975 27.1464 25.0255 26.5608 24.4398L15.6209 13.5L26.5608 2.56024C27.1464 1.97456 27.1464 1.02496 26.5608 0.439274Z" fill="white" />
  </svg>
);

const Header = () => {
  const { links, cta } = data.header;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);
    // GTM: fire menu_open / menu_close
    dl().push({ event: open ? "menu_open" : "menu_close", menu_location: "Header" });
    return () => {
      document.documentElement.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  const handleNavClick = (label, loc, href) => {
    ctaClick({ label, location: loc, href });
  };

  const Overlay = (
    <div
      className={`${styles.overlay} ${open ? styles.show : ""}`}
      onClick={() => setOpen(false)}
      aria-hidden="true"
    />
  );

  const Drawer = (
    <aside
      id="mobile-menu"
      className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
    >
      <div className={styles.mobileHeader}>
        <button
          className={styles.closeBtn}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          type="button"
        >
          <CloseIcon className={styles.closeIcon} />
        </button>
      </div>

      <nav className={styles.mobileNav}>
        {links.map((l, i) => (
          <a
            key={i}
            href={l.href}
            data-cta={l.label}
            data-cta-loc="Mobile Nav"
            onClick={(e) => {
              handleNavClick(l.label, "Mobile Nav", l.href);
              setOpen(false);
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <a
        className={`btn ${styles.mobileCta}`}
        href={cta.href}
        data-cta={cta.label}
        data-cta-loc="Mobile Header CTA"
        onClick={(e) => {
          handleNavClick(cta.label, "Mobile Header CTA", cta.href);
          setOpen(false);
        }}
      >
        {cta.label}
      </a>
    </aside>
  );

  return (
    <>
      <header className={styles.siteHeader} id="header">
        <div className={`container ${styles.headerRow}`}>
          <a
            href="/"
            className={styles.brand}
            data-cta="Logo"
            data-cta-loc="Header Brand"
            onClick={() => handleNavClick("Logo", "Header Brand", "/")}
          >
            <img
              src={logo}
              alt="Ingversions Logo"
              className={`${styles.brandLogo} ${styles.desktopLogo}`}
            />
            <img
              src={mobileLogo}
              alt="Ingversions Logo"
              className={`${styles.brandLogo} ${styles.mobileLogoOnly}`}
            />
          </a>

          <nav className={styles.nav}>
            {links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                data-cta={l.label}
                data-cta-loc="Header Nav"
                onClick={() => handleNavClick(l.label, "Header Nav", l.href)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            className={`btn ${styles.desktopCta}`}
            href={cta.href}
            data-cta={cta.label}
            data-cta-loc="Header CTA"
            onClick={() => handleNavClick(cta.label, "Header CTA", cta.href)}
          >
            {cta.label}
          </a>

          <button
            className={styles.hamburger}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            data-cta="Hamburger"
            data-cta-loc="Header"
            onClick={() => {
              ctaClick({ label: "Hamburger", location: "Header" });
              setOpen((v) => !v);
            }}
            type="button"
          >
            <HamburgerIcon className={styles.menuIcon} />
          </button>
        </div>
      </header>

      {createPortal(Overlay, document.body)}
      {createPortal(Drawer, document.body)}
    </>
  );
};

export default Header;
