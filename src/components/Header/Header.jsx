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

  // CTA hide/show behaviour
  const [ctaScrollMode, setCtaScrollMode] = useState(false);
  const [hideHeaderCta, setHideHeaderCta] = useState(false);
  // Default to hidden on the homepage so the CTA never flashes visible for
  // a frame before the IntersectionObserver below confirms the Hero is in
  // view (which is true almost every time the page first loads).
  const [hideCtaOnHero, setHideCtaOnHero] = useState(
    () => location.pathname === "/"
  );

  const isBlogPage = location.pathname.startsWith("/blog");
  const ctaHref = isBlogPage ? cta.href : "/#hero";
  const isHomePage = location.pathname === "/"; // Check if we are on Homepage

  // Whether the CTA should be visually hidden right now. We still always
  // render the CTA element itself (see below) — only its visibility is
  // toggled — so its box keeps reserving the exact same layout space and
  // nothing else in the header ever has to shift or resize.
  const shouldHideCta = hideHeaderCta || hideCtaOnHero;

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

  // Hide CTA when Hero section is visible (Only on Homepage)
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

  // The CTA is always rendered — never conditionally removed from the DOM —
  // so its box always reserves the exact same space in the flex row.
  // We only toggle `styles.desktopCtaHidden` (visibility: hidden) to show/hide it.
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
          {/* Brand logo -> SPA navigation */}
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

          {/* Desktop nav */}
          <nav className={styles.nav}>
            {links.map((linkItem, index) =>
              renderDesktopNavLink(linkItem, index)
            )}
          </nav>

          {/* Desktop CTA — always rendered, visually hidden via CSS when
              needed so its space is always reserved (see ctaClassName). */}
          {isExternalHref(ctaHref) || ctaHref.startsWith("#") ? (
            <a href={ctaHref} {...ctaCommonProps}>
              {cta.label}
            </a>
          ) : (
            <Link to={ctaHref} {...ctaCommonProps}>
              {cta.label}
            </Link>
          )}

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