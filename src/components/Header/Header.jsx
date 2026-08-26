import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import data from "../../data/sitedata";
import logoDay from "/assets/logos/main-logo-violet.png";
import mobileLogo from "/assets/logos/mobile-logo.png";
import styles from "./Header.module.css";
import { ctaClick, dl } from "../../gtm";

const HamburgerIcon = (props) => (
  <svg
    width="48"
    height="49"
    viewBox="0 0 48 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M9 13.1221H27.75M9 24.6221H39M20.25 36.1221H39"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M26.5608 0.439274C25.9751 -0.146425 25.0255 -0.146425 24.4398 0.439274L13.5 11.3791L2.56024 0.439274C1.97456 -0.146425 1.02496 -0.146425 0.439275 0.439274C-0.146425 1.02496 -0.146425 1.97456 0.439275 2.56024L11.379 13.5L0.439305 24.4397C-0.146395 25.0255 -0.146395 25.975 0.439305 26.5608C1.02499 27.1464 1.97459 27.1464 2.56027 26.5608L13.5 15.621L24.4398 26.5608C25.0255 27.1464 25.9751 27.1464 26.5608 26.5608C27.1464 25.975 27.1464 25.0255 26.5608 24.4398L15.6209 13.5L26.5608 2.56024C27.1464 1.97456 27.1464 1.02496 26.5608 0.439274Z"
      fill="currentColor"
    />
  </svg>
);

const isExternalHref = (href = "") =>
  /^https?:\/\//i.test(href) ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");

const Header = () => {
  const { links, cta } = data.header;
  const location = useLocation();

  const [open, setOpen] = useState(false);

  
  const [ctaScrollMode, setCtaScrollMode] = useState(false);
  const [hideHeaderCta, setHideHeaderCta] = useState(false);
  
  
  
  const [hideCtaOnHero, setHideCtaOnHero] = useState(
    () => location.pathname === "/"
  );

  const ctaHref = cta.href;
  const isHomePage = location.pathname === "/";

  
  
  
  
  const shouldHideCta = hideHeaderCta || hideCtaOnHero;

  
  useEffect(() => {
    const flag = sessionStorage.getItem("ctaScrollMode");
    if (flag === "1") {
      setCtaScrollMode(true);
    }
  }, []);

  
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);
    dl().push({
      event: open ? "menu_open" : "menu_close",
      menu_location: "Header",
    });
    return () => {
      document.documentElement.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  
  useEffect(() => {
    if (!ctaScrollMode) {
      setHideHeaderCta(false);
      return;
    }

    const handleScroll = () => {
      const contactEl = document.getElementById("contact");
      const headerEl = document.getElementById("header");

      if (!contactEl || !headerEl) return;

      const headerHeight = headerEl.offsetHeight || 0;
      const rect = contactEl.getBoundingClientRect();
      const contactTopRelativeToViewport = rect.top - headerHeight;

      
      if (contactTopRelativeToViewport <= 0) {
        setHideHeaderCta(true);
        sessionStorage.removeItem("ctaScrollMode");
      } else {
        
        setHideHeaderCta(false);
      }
    };

    
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ctaScrollMode]);

  
  useEffect(() => {
    if (!isHomePage) {
      setHideCtaOnHero(false);
      return;
    }

    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideCtaOnHero(entry.isIntersecting);
      },
      { threshold: 0.18 } 
    );

    observer.observe(heroEl);

    return () => {
      if (heroEl) observer.unobserve(heroEl);
      observer.disconnect();
    };
  }, [isHomePage]);

  const handleNavClick = (label, loc, href) => {
    ctaClick({ label, location: loc, href });
  };

  
  const handleBookCallClick = (loc) => {
    handleNavClick(cta.label, loc, ctaHref);

    
    if (ctaHref.includes("#contact")) {
      sessionStorage.setItem("ctaScrollMode", "1");
      setCtaScrollMode(true);
    }
  };

  const renderDesktopNavLink = (linkItem, index) => {
    const { href, label } = linkItem;

    if (href.startsWith("#") || isExternalHref(href)) {
      return (
        <a
          key={index}
          href={href}
          data-cta={label}
          data-cta-loc="Header Nav"
          onClick={() => handleNavClick(label, "Header Nav", href)}
        >
          {label}
        </a>
      );
    }

    const isActive = href === location.pathname;

    return (
      <Link
        key={index}
        to={href}
        className={isActive ? styles.navLinkActive : undefined}
        data-cta={label}
        data-cta-loc="Header Nav"
        onClick={() => handleNavClick(label, "Header Nav", href)}
      >
        {label}
      </Link>
    );
  };

  const renderMobileNavLink = (linkItem, index) => {
    const { href, label } = linkItem;

    if (href.startsWith("#") || isExternalHref(href)) {
      return (
        <a
          key={index}
          href={href}
          data-cta={label}
          data-cta-loc="Mobile Nav"
          onClick={() => {
            handleNavClick(label, "Mobile Nav", href);
            setOpen(false);
          }}
        >
          {label}
        </a>
      );
    }

    return (
      <Link
        key={index}
        to={href}
        data-cta={label}
        data-cta-loc="Mobile Nav"
        onClick={() => {
          handleNavClick(label, "Mobile Nav", href);
          setOpen(false);
        }}
      >
        {label}
      </Link>
    );
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

      <div className={styles.menuBody}>
        <nav className={styles.mobileNav}>
          {links.map((linkItem, index) =>
            renderMobileNavLink(linkItem, index)
          )}
        </nav>
      </div>
    </aside>
  );

  
  
  
  const ctaClassName = `btn ${styles.desktopCta} ${
    shouldHideCta ? styles.desktopCtaHidden : ""
  }`;

  const ctaCommonProps = {
    className: ctaClassName,
    "data-cta": cta.label,
    "data-cta-loc": "Header CTA",
    onClick: () => handleBookCallClick("Header CTA"),
    "aria-hidden": shouldHideCta ? "true" : undefined,
    tabIndex: shouldHideCta ? -1 : undefined,
  };

  return (
    <>
      <header className={styles.siteHeader} id="header">
        <div className={`container ${styles.headerRow}`}>
          
          <Link
            to="/"
            className={styles.brand}
            data-cta="Logo"
            data-cta-loc="Header Brand"
            onClick={() => handleNavClick("Logo", "Header Brand", "/")}
          >
            <img
              src={logoDay}
              alt="Ingversions Logo"
              className={`${styles.brandLogo} ${styles.desktopLogo}`}
            />
            <img
              src={mobileLogo}
              alt="Ingversions Logo"
              className={`${styles.brandLogo} ${styles.mobileLogoOnly}`}
            />
          </Link>

          
          <nav className={styles.nav}>
            {links.map((linkItem, index) =>
              renderDesktopNavLink(linkItem, index)
            )}
          </nav>

          
          {isExternalHref(ctaHref) || ctaHref.startsWith("#") ? (
            <a href={ctaHref} {...ctaCommonProps}>
              {cta.label}
            </a>
          ) : (
            <Link to={ctaHref} {...ctaCommonProps}>
              {cta.label}
            </Link>
          )}

          
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