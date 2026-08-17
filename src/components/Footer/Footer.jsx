import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../data/sitedata";
import styles from "./Footer.module.css";
import parse from "html-react-parser";
import logoDay from "/assets/logos/main-logo-day.png";

const getInitialThemeMode = () => {
  if (typeof document === "undefined") return "night";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "day" || attr === "night" ? attr : "night";
};

const Footer = () => {
  const f = data?.footer;
  const [themeMode, setThemeMode] = useState(getInitialThemeMode);

  // Header owns the toggle; watch <html data-theme> so the footer logo
  // stays in sync without needing shared React state.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeMode(getInitialThemeMode());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Agar galti se footer ka data nahi hai, toh crash se bachne ke liye fallback
  if (!f) return null;

  return (
    <footer className={styles.siteFooter} id="footer">
      <div className="container">
        
        {/* Main Multi-Column Area */}
        <div className={styles.footerMain}>
          
          {/* Column 1: Logo, Bio & Socials */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.footerLeft}>
              {f?.logo && (
                <img
                  src={themeMode === "day" ? logoDay : f.logo}
                  alt={`${f.company} logo`}
                  className={styles.footerLogo}
                />
              )}
            </Link>
            <p className={styles.companyBio}>
              {f.bio || "Ingversions is a digital agency focused on CRO-driven websites. We help e-commerce brands scale conversions with data-backed design and development."}
            </p>
            
            {/* Follow Us Section */}
            <div className={`${styles.linkGroup} ${styles.brandSocials}`}>
              <div className={styles.footSocials}>
                {f.socials.map((s, i) => (
                  /* FIX: Added missing `<a ` opening tag below */
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.name}
                    className={styles.socialBtn}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {parse(s.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Columns 2 & 3: Links Grid */}
          <div className={styles.linksWrapper}>

            {/* Columns 2 & onward: Grouped Links */}
            {f.linkGroups.map((group, gi) => (
              <div className={styles.linkGroup} key={gi}>
                <h4>{group.title}</h4>
                {group.links.map((l, i) => {
                  const isExternal =
                    l.href.startsWith("http") ||
                    l.href.startsWith("mailto:") ||
                    l.href.startsWith("tel:");

                  const displayText = l.name || l.label || "Link";

                  if (isExternal) {
                    return (
                      /* FIX: Added missing `<a ` opening tag below */
                      <a
                        key={i}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        {displayText}
                      </a>
                    );
                  }

                  return (
                    <Link key={i} to={l.href} style={{ textDecoration: "none" }}>
                      {displayText}
                    </Link>
                  );
                })}
              </div>
            ))}

            {/* Column: Contact Info */}
            <div className={styles.linkGroup}>
              
              <a href={`mailto:${f.email}`} className={styles.footContact}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M1.5 8.6691V17.25C1.5 18.9069 2.84315 20.25 4.5 20.25H19.5C21.1569 20.25 22.5 18.9069 22.5 17.25V8.6691L13.5723 14.1631C12.6081 14.7564 11.3919 14.7564 10.4277 14.1631L1.5 8.6691Z" fill="#0A84FF"/>
                  <path d="M22.5 6.90783V6.75C22.5 5.09315 21.1569 3.75 19.5 3.75H4.5C2.84315 3.75 1.5 5.09315 1.5 6.75V6.90783L11.2139 12.8856C11.696 13.1823 12.304 13.1823 12.7861 12.8856L22.5 6.90783Z" fill="#0A84FF"/>
                </svg>
                <span>{f.email}</span>
              </a>
              
              <a href={`tel:${f.phone}`} className={styles.footContact}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.5 4.5C1.5 2.84315 2.84315 1.5 4.5 1.5H5.87163C6.732 1.5 7.48197 2.08556 7.69064 2.92025L8.79644 7.34343C8.97941 8.0753 8.70594 8.84555 8.10242 9.29818L6.8088 10.2684C6.67447 10.3691 6.64527 10.5167 6.683 10.6197C7.81851 13.7195 10.2805 16.1815 13.3803 17.317C13.4833 17.3547 13.6309 17.3255 13.7316 17.1912L14.7018 15.8976C15.1545 15.2941 15.9247 15.0206 16.6566 15.2036L21.0798 16.3094C21.9144 16.518 22.5 17.268 22.5 18.1284V19.5C22.5 21.1569 21.1569 22.5 19.5 22.5H17.25C8.55151 22.5 1.5 15.4485 1.5 6.75V4.5Z" fill="#0A84FF"/>
                </svg>
                <span>{f.phone}</span>
              </a>

              <div className={styles.footAddress}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.5397 22.351C11.57 22.3685 11.5937 22.3821 11.6105 22.3915L11.6384 22.4071C11.8613 22.5294 12.1378 22.5285 12.3608 22.4075L12.3895 22.3915C12.4063 22.3821 12.43 22.3685 12.4603 22.351C12.5207 22.316 12.607 22.265 12.7155 22.1982C12.9325 22.0646 13.2388 21.8676 13.6046 21.6091C14.3351 21.0931 15.3097 20.3274 16.2865 19.3273C18.2307 17.3368 20.25 14.3462 20.25 10.5C20.25 5.94365 16.5563 2.25 12 2.25C7.44365 2.25 3.75 5.94365 3.75 10.5C3.75 14.3462 5.76932 17.3368 7.71346 19.3273C8.69025 20.3274 9.66491 21.0931 10.3954 21.6091C10.7612 21.8676 11.0675 22.0646 11.2845 22.1982C11.393 22.265 11.4793 22.316 11.5397 22.351ZM12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z" fill="#0A84FF"/>
                </svg>
                <span className={styles.addressText}>{f.address}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Area: Copyright */}
        <div className={styles.footerBottomRow}>
          <div className={styles.copyright}>
            © {f.year} {f.company}. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;