import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  SplitSquareHorizontal,
  ShoppingBag,
  CheckCircle2,
  LayoutTemplate,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import data from "../../data/siteData";
import logoDay from "/assets/logos/main-logo-violet.png";
import mobileLogo from "/assets/logos/mobile-logo.png";
import styles from "./Header.module.css";
import { ctaClick, dl } from "../../gtm";
import { isExternalHref } from "../../utils/url";
import BlackFridayBanner from "../BlackFridayBanner/BlackFridayBanner.jsx";

const { servicesMenu, mobileMenu } = data.header;
const { email, phone } = data.footer;
const SERVICE_HREFS = servicesMenu.groups.flatMap((g) => g.items.map((i) => i.href));

const SERVICE_ICONS = {
  "ab-testing": SplitSquareHorizontal,
  shopify: ShoppingBag,
  qa: CheckCircle2,
  "landing-page": LayoutTemplate,
  wordpress: Globe,
};

const ICON_COLORS = [
  "var(--palette-accent-soft)",
  "var(--secondary)",
  "var(--tertiary)",
  "var(--quaternary)",
  "var(--palette-tint-blue)",
];

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

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

const Header = () => {
  const { links, cta } = data.header;
  const location = useLocation();
  const { pathname } = location;

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const isServicesActive = pathname === "/services" || SERVICE_HREFS.includes(pathname);
  const [level, setLevel] = useState(0);
  const [groupIndex, setGroupIndex] = useState(0);

  const [ctaScrollMode, setCtaScrollMode] = useState(false);
  const [hideHeaderCta, setHideHeaderCta] = useState(false);

  const [hideCtaOnHero, setHideCtaOnHero] = useState(() => pathname === "/");

  const ctaHref = cta.href;
  const isHomePage = pathname === "/";

  const shouldHideCta = hideHeaderCta || hideCtaOnHero;

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const closeTimer = useRef(null);
  const hamburgerRef = useRef(null);
  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const wasOpen = useRef(false);
  const panelRefs = useRef([]);
  const servicesRowRef = useRef(null);
  const groupRowRefs = useRef([]);
  const prevLevel = useRef(0);

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
    if (open) closeBtnRef.current?.focus();
    else if (wasOpen.current) hamburgerRef.current?.focus();
    if (!open) setLevel(0);
    wasOpen.current = open;
    return () => {
      document.documentElement.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      prevLevel.current = level;
      return;
    }
    if (level > prevLevel.current) {
      panelRefs.current[level]?.querySelector("button")?.focus({ preventScroll: true });
    } else if (level < prevLevel.current) {
      (level === 0 ? servicesRowRef.current : groupRowRefs.current[groupIndex])?.focus({
        preventScroll: true,
      });
    }
    const body = panelRefs.current[0]?.parentElement?.parentElement;
    if (body) body.scrollLeft = 0;
    prevLevel.current = level;
  }, [level, open, groupIndex]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

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
      { threshold: 0.18 },
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

  const openServices = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };
  const onDropdownKeyDown = (e) => {
    if (e.key === "Escape" && servicesOpen) {
      setServicesOpen(false);
      triggerRef.current?.focus();
    }
  };
  const onDropdownBlur = (e) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) setServicesOpen(false);
  };

  const onDrawerKeyDown = (e) => {
    if (e.key === "Escape") {
      if (level > 0) setLevel(level - 1);
      else setOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = drawerRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const visible = [...(focusable || [])].filter(
      (el) => el.offsetParent !== null && !el.closest("[inert]"),
    );
    if (!visible.length) return;
    const first = visible[0];
    const last = visible[visible.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const renderDesktopNavLink = (linkItem, index) => {
    const { href, label, scrollTo } = linkItem;

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

    const isActive = !scrollTo && href === pathname;

    return (
      <Link
        key={index}
        to={href}
        state={scrollTo && { scrollTo }}
        className={isActive ? styles.navLinkActive : undefined}
        aria-current={isActive ? "page" : undefined}
        data-cta={label}
        data-cta-loc="Header Nav"
        onClick={() => handleNavClick(label, "Header Nav", href)}
      >
        {label}
      </Link>
    );
  };

  const renderMobileRow = (linkItem, index) => {
    const { href, label, scrollTo } = linkItem;
    const isActive = !scrollTo && href === pathname;
    const common = {
      className: `${styles.mRow} ${isActive ? styles.mRowActive : ""}`,
      "data-cta": label,
      "data-cta-loc": "Mobile Nav",
      onClick: () => {
        handleNavClick(label, "Mobile Nav", href);
        setOpen(false);
      },
    };
    const inner = <span>{label}</span>;

    return (
      <li key={index}>
        {href.startsWith("#") || isExternalHref(href) ? (
          <a href={href} {...common}>
            {inner}
          </a>
        ) : (
          <Link
            to={href}
            state={scrollTo && { scrollTo }}
            aria-current={isActive ? "page" : undefined}
            {...common}
          >
            {inner}
          </Link>
        )}
      </li>
    );
  };

  const [coreGroup, ...otherGroups] = servicesMenu.groups;

  const ServicesPanel = (
    <div
      id="services-menu"
      className={`${styles.submenu} ${servicesOpen ? styles.submenuOpen : ""}`}
    >
      <div className={`container ${styles.submenuCols}`}>
        <div className={styles.submenuCol}>
          <p className={styles.submenuGroupTitle}>{coreGroup.title}</p>
          <ul className={styles.submenuList}>
            {coreGroup.items.map((item, i) => {
              const Icon = SERVICE_ICONS[item.icon] || SplitSquareHorizontal;
              const isItemActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`${styles.submenuItem} ${isItemActive ? styles.submenuItemActive : ""}`}
                    aria-current={isItemActive ? "page" : undefined}
                    data-cta={item.label}
                    data-cta-loc="Header Services Dropdown"
                    onClick={() =>
                      handleNavClick(item.label, "Header Services Dropdown", item.href)
                    }
                  >
                    <span
                      className={styles.submenuIconWrap}
                      style={{ backgroundColor: ICON_COLORS[i % ICON_COLORS.length] }}
                      aria-hidden="true"
                    >
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <span className={styles.submenuText}>
                      <span className={styles.submenuTitle}>{item.label}</span>
                      <span className={styles.submenuDesc}>{item.desc}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {otherGroups.map((group) => (
          <div key={group.title} className={`${styles.submenuCol} ${styles.submenuColAlt}`}>
            <p className={styles.submenuGroupTitle}>{group.title}</p>
            <ul className={styles.submenuList}>
              {group.items.map((item) => {
                const isItemActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`${styles.submenuItem} ${styles.submenuItemCompact} ${
                        isItemActive ? styles.submenuItemActive : ""
                      }`}
                      aria-current={isItemActive ? "page" : undefined}
                      data-cta={item.label}
                      data-cta-loc="Header Services Dropdown"
                      onClick={() =>
                        handleNavClick(item.label, "Header Services Dropdown", item.href)
                      }
                    >
                      <span className={styles.submenuText}>
                        <span className={styles.submenuTitle}>{item.label}</span>
                        <span className={styles.submenuDesc}>{item.desc}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className={styles.submenuPromo}>
          <p className={styles.submenuPromoTitle}>{servicesMenu.promo.title}</p>
          <p className={styles.submenuPromoText}>{servicesMenu.promo.text}</p>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.submenuPromoBtn}
            data-cta={servicesMenu.promo.label}
            data-cta-loc="Header Services Dropdown"
            onClick={() =>
              handleNavClick(servicesMenu.promo.label, "Header Services Dropdown", ctaHref)
            }
          >
            {servicesMenu.promo.label}
          </a>
          <Link
            to={servicesMenu.all.href}
            className={styles.footerLink}
            data-cta={servicesMenu.all.label}
            data-cta-loc="Header Services Dropdown"
            onClick={() =>
              handleNavClick(
                servicesMenu.all.label,
                "Header Services Dropdown",
                servicesMenu.all.href,
              )
            }
          >
            <span>{servicesMenu.all.label}</span>
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className={styles.footerArrow}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );

  const Overlay = (
    <div
      className={`${styles.overlay} ${open ? styles.show : ""}`}
      onClick={() => setOpen(false)}
      aria-hidden="true"
    />
  );

  const Drawer = (
    <div
      id="mobile-menu"
      ref={drawerRef}
      className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      onKeyDown={onDrawerKeyDown}
    >
      <div className={styles.mobileHeader}>
        <Link
          to="/"
          className={styles.mBrand}
          onClick={() => setOpen(false)}
          aria-label="Ingversions Digital home"
        >
          <img src={mobileLogo} alt="" width="36" height="40" />
        </Link>
        <button
          ref={closeBtnRef}
          className={styles.closeBtn}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          type="button"
        >
          <CloseIcon className={styles.closeIcon} />
        </button>
      </div>

      <nav className={styles.menuBody} aria-label="Mobile">
        <div className={styles.mTrack} style={{ transform: `translateX(${level * -100}%)` }}>
          <div
            className={styles.mPanel}
            ref={(el) => (panelRefs.current[0] = el)}
            inert={level !== 0}
          >
            <ul className={styles.mList}>
              {links.map((linkItem, index) =>
                linkItem.href === "/services" ? (
                  <li key={index}>
                    <button
                      ref={servicesRowRef}
                      type="button"
                      className={`${styles.mRow} ${isServicesActive ? styles.mRowActive : ""}`}
                      onClick={() => setLevel(1)}
                    >
                      <span>{linkItem.label}</span>
                      <ChevronRight
                        size={20}
                        strokeWidth={2.5}
                        className={styles.mRowIcon}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ) : (
                  renderMobileRow(linkItem, index)
                ),
              )}
            </ul>
          </div>

          <div
            className={styles.mPanel}
            ref={(el) => (panelRefs.current[1] = el)}
            inert={level !== 1}
          >
            <button type="button" className={styles.mBack} onClick={() => setLevel(0)}>
              <ChevronLeft size={18} strokeWidth={2.5} aria-hidden="true" />
              <span>Back</span>
            </button>
            <p className={styles.mPanelTitle}>Services</p>
            <ul className={styles.mList}>
              {servicesMenu.groups.map((group, g) => (
                <li key={group.title}>
                  <button
                    ref={(el) => (groupRowRefs.current[g] = el)}
                    type="button"
                    className={`${styles.mRow} ${styles.mRowTall}`}
                    onClick={() => {
                      setGroupIndex(g);
                      setLevel(2);
                    }}
                  >
                    <span className={styles.mRowText}>
                      <span>{group.title}</span>
                      <span className={styles.mRowNote}>{group.note}</span>
                    </span>
                    <ChevronRight
                      size={20}
                      strokeWidth={2.5}
                      className={styles.mRowIcon}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              ))}
            </ul>
            <Link
              to={servicesMenu.all.href}
              className={styles.mAll}
              aria-current={pathname === servicesMenu.all.href ? "page" : undefined}
              data-cta={servicesMenu.all.label}
              data-cta-loc="Mobile Nav Services"
              onClick={() => {
                handleNavClick(
                  servicesMenu.all.label,
                  "Mobile Nav Services",
                  servicesMenu.all.href,
                );
                setOpen(false);
              }}
            >
              <span>{servicesMenu.all.short}</span>
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>

          <div
            className={styles.mPanel}
            ref={(el) => (panelRefs.current[2] = el)}
            inert={level !== 2}
          >
            <button type="button" className={styles.mBack} onClick={() => setLevel(1)}>
              <ChevronLeft size={18} strokeWidth={2.5} aria-hidden="true" />
              <span>Services</span>
            </button>
            <p className={styles.mPanelTitle}>{servicesMenu.groups[groupIndex].title}</p>
            <ul className={styles.mList}>
              {servicesMenu.groups[groupIndex].items.map((item) => {
                const isItemActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`${styles.mRow} ${styles.mRowTall} ${isItemActive ? styles.mRowActive : ""}`}
                      aria-current={isItemActive ? "page" : undefined}
                      data-cta={item.label}
                      data-cta-loc="Mobile Nav Services"
                      onClick={() => {
                        handleNavClick(item.label, "Mobile Nav Services", item.href);
                        setOpen(false);
                      }}
                    >
                      <span className={styles.mRowText}>
                        <span>{item.short || item.label}</span>
                        <span className={styles.mRowNote}>{item.desc}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      <div className={styles.mFooter}>
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-book ${styles.mCta}`}
          data-cta={mobileMenu.ctaLabel}
          data-cta-loc="Mobile Menu CTA"
          onClick={() => handleNavClick(mobileMenu.ctaLabel, "Mobile Menu CTA", ctaHref)}
        >
          {mobileMenu.ctaLabel}
        </a>
        <p className={styles.mNote}>{mobileMenu.ctaNote}</p>
        <div className={styles.mContact}>
          <a
            href={`mailto:${email}`}
            className={styles.mContactBtn}
            data-cta={mobileMenu.emailLabel}
            data-cta-loc="Mobile Menu Contact"
            onClick={() =>
              handleNavClick(mobileMenu.emailLabel, "Mobile Menu Contact", `mailto:${email}`)
            }
          >
            <Mail size={16} strokeWidth={2.5} aria-hidden="true" />
            <span>{mobileMenu.emailLabel}</span>
          </a>
          <a
            href={`tel:${phone.replace(/[^+\d]/g, "")}`}
            className={styles.mContactBtn}
            data-cta={mobileMenu.phoneLabel}
            data-cta-loc="Mobile Menu Contact"
            onClick={() =>
              handleNavClick(mobileMenu.phoneLabel, "Mobile Menu Contact", `tel:${phone}`)
            }
          >
            <Phone size={16} strokeWidth={2.5} aria-hidden="true" />
            <span>{mobileMenu.phoneLabel}</span>
          </a>
        </div>
      </div>
    </div>
  );

  const ctaClassName = `btn btn-book ${styles.desktopCta} ${
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

          <nav className={styles.nav} aria-label="Main">
            {links.map((linkItem, index) =>
              linkItem.href === "/services" ? (
                <div
                  key={index}
                  ref={dropdownRef}
                  className={styles.dropdown}
                  onMouseEnter={() => canHover() && openServices()}
                  onMouseLeave={() => canHover() && closeServicesSoon()}
                  onKeyDown={onDropdownKeyDown}
                  onBlur={onDropdownBlur}
                >
                  <button
                    ref={triggerRef}
                    type="button"
                    className={`${styles.dropdownTrigger} ${
                      isServicesActive ? styles.navLinkActive : ""
                    } ${servicesOpen ? styles.dropdownTriggerOpen : ""}`}
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    data-cta={linkItem.label}
                    data-cta-loc="Header Nav"
                    onClick={() => {
                      handleNavClick(linkItem.label, "Header Nav", "/services");
                      setServicesOpen((v) => !v);
                    }}
                  >
                    <span>{linkItem.label}</span>
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      className={styles.chevron}
                      aria-hidden="true"
                    />
                  </button>
                  {ServicesPanel}
                </div>
              ) : (
                renderDesktopNavLink(linkItem, index)
              ),
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
            ref={hamburgerRef}
            className={styles.hamburger}
            aria-label="Open menu"
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
      <BlackFridayBanner />

      {typeof document !== "undefined" && createPortal(Overlay, document.body)}
      {typeof document !== "undefined" && createPortal(Drawer, document.body)}
    </>
  );
};

export default Header;
