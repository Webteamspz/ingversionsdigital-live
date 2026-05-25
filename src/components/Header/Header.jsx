import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import data from "../../data/sitedata";
import logo from "/assets/logos/main-logo.png";
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
      stroke="white"
      strokeWidth="2.5"
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
      fill="white"
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

  // CTA hide/show behaviour
  const [ctaScrollMode, setCtaScrollMode] = useState(false);
  const [hideHeaderCta, setHideHeaderCta] = useState(false);

  const isTeamPage = location.pathname === "/teampage";
  const ctaHref = isTeamPage ? "/#contact" : cta.href;

  // Restore scroll mode from sessionStorage (for cross-page navigation)
  useEffect(() => {
    const flag = sessionStorage.getItem("ctaScrollMode");
    if (flag === "1") {
      setCtaScrollMode(true);
    }
  }, []);

  // Lock body scroll when mobile menu open
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

  // Scroll-based hide/show for CTA when CTA has been clicked
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

      // At or below contact => hide CTA and clear scroll mode flag
      if (contactTopRelativeToViewport <= 0) {
        setHideHeaderCta(true);
        sessionStorage.removeItem("ctaScrollMode");
      } else {
        // Above contact => show CTA again
        setHideHeaderCta(false);
      }
    };

    // Run once initially (in case scroll already happened)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ctaScrollMode]);

  const handleNavClick = (label, loc, href) => {
    ctaClick({ label, location: loc, href });
  };

  // Shared "Book a call" CTA click handler (desktop + mobile)
  const handleBookCallClick = (loc) => {
    handleNavClick(cta.label, loc, ctaHref);

    // Only trigger special scroll behaviour when CTA targets contact
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

    return (
      <Link
        key={index}
        to={href}
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

        {/* <div className={styles.menuCtaBar}>
          {isExternalHref(ctaHref) || ctaHref.startsWith("#") ? (
            <a
              className={`btn ${styles.mobileCta}`}
              href={ctaHref}
              data-cta={cta.label}
              data-cta-loc="Mobile Header CTA"
              onClick={() => {
                handleBookCallClick("Mobile Header CTA");
                setOpen(false);
              }}
            >
              {cta.label}
            </a>
          ) : (
            <Link
              className={`btn ${styles.mobileCta}`}
              to={ctaHref}
              data-cta={cta.label}
              data-cta-loc="Mobile Header CTA"
              onClick={() => {
                handleBookCallClick("Mobile Header CTA");
                setOpen(false);
              }}
            >
              {cta.label}
            </Link>
          )}
        </div> */}
      </div>
    </aside>
  );

  return (
    <>
      <header className={styles.siteHeader} id="header">
        <div className={`container ${styles.headerRow}`}>
          {/* Brand logo -> SPA navigation */}
          <Link
            to="/"
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
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav}>
            {links.map((linkItem, index) =>
              renderDesktopNavLink(linkItem, index)
            )}
          </nav>

          {/* Desktop CTA – hidden when scroll logic says so */}
          {!hideHeaderCta &&
            (isExternalHref(ctaHref) || ctaHref.startsWith("#") ? (
              <a
                className={`btn ${styles.desktopCta}`}
                href={ctaHref}
                data-cta={cta.label}
                data-cta-loc="Header CTA"
                onClick={() => handleBookCallClick("Header CTA")}
              >
                {cta.label}
              </a>
            ) : (
              <Link
                className={`btn ${styles.desktopCta}`}
                to={ctaHref}
                data-cta={cta.label}
                data-cta-loc="Header CTA"
                onClick={() => handleBookCallClick("Header CTA")}
              >
                {cta.label}
              </Link>
            ))}

          {/* Mobile hamburger */}
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
