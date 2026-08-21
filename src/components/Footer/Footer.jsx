import React from "react";
import { Link } from "react-router-dom";
import data from "../../data/sitedata";
import styles from "./Footer.module.css";
import logo from "/assets/logos/main-logo.png";

// lucide-react ships no brand/logo marks (by design), so the social glyphs
// stay as local brand-accurate SVGs, wired through the same key -> component
// lookup pattern lucide icons would use elsewhere.
const Facebook = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M24 12.0728C24 5.44533 18.6274 0.0727539 12 0.0727539C5.37258 0.0727539 0 5.44533 0 12.0728C0 18.0622 4.3882 23.0267 10.125 23.927V15.5415H7.07812V12.0728H10.125V9.429C10.125 6.4215 11.9166 4.76025 14.6576 4.76025C15.9701 4.76025 17.3438 4.99463 17.3438 4.99463V7.94775H15.8306C14.34 7.94775 13.875 8.87283 13.875 9.82275V12.0728H17.2031L16.6711 15.5415H13.875V23.927C19.6118 23.0267 24 18.0622 24 12.0728Z" fill="currentColor"/>
  </svg>
);
const Twitter = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * (20 / 24)} viewBox="0 0 24 20" fill="none" {...props}>
    <path d="M7.55016 19.7502C16.6045 19.7502 21.5583 12.2469 21.5583 5.74211C21.5583 5.53117 21.5536 5.31554 21.5442 5.1046C22.5079 4.40771 23.3395 3.5445 24 2.55554C23.1025 2.95484 22.1496 3.21563 21.1739 3.32898C22.2013 2.71315 22.9705 1.74572 23.3391 0.606011C22.3726 1.1788 21.3156 1.58286 20.2134 1.80085C19.4708 1.01181 18.489 0.48936 17.4197 0.314295C16.3504 0.13923 15.2532 0.321295 14.2977 0.832341C13.3423 1.34339 12.5818 2.15495 12.1338 3.14156C11.6859 4.12816 11.5754 5.23486 11.8195 6.29054C9.86249 6.19233 7.94794 5.68395 6.19998 4.79834C4.45203 3.91274 2.90969 2.66968 1.67297 1.14976C1.0444 2.23349 0.852057 3.51589 1.13503 4.73634C1.418 5.95678 2.15506 7.02369 3.19641 7.72023C2.41463 7.69541 1.64998 7.48492 0.965625 7.10617V7.1671C0.964925 8.30439 1.3581 9.40683 2.07831 10.287C2.79852 11.1672 3.80132 11.7708 4.91625 11.9952C4.19206 12.1934 3.43198 12.2222 2.69484 12.0796C3.00945 13.0577 3.62157 13.9131 4.44577 14.5266C5.26997 15.14 6.26512 15.4808 7.29234 15.5015C5.54842 16.8714 3.39417 17.6144 1.17656 17.6109C0.783287 17.6103 0.390399 17.5861 0 17.5387C2.25286 18.984 4.87353 19.7516 7.55016 19.7502Z" fill="currentColor"/>
  </svg>
);
const Linkedin = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="currentColor"/>
  </svg>
);
const Instagram = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#footer-instagram-clip)">
      <path d="M16.8499 0H7.15014C5.25425 0.00144471 3.43642 0.755225 2.09582 2.09582C0.755225 3.43642 0.00144471 5.25425 0 7.15014V16.8499C0.00115577 18.7459 0.754809 20.564 2.09544 21.9049C3.43607 23.2457 5.25406 23.9996 7.15014 24.0011H16.8499C18.7458 23.9994 20.5637 23.2453 21.9042 21.9046C23.2448 20.5638 23.9986 18.7458 24 16.8499V7.15014C23.9991 5.25407 23.2455 3.43591 21.9048 2.09519C20.5641 0.754463 18.7459 0.000867304 16.8499 0ZM21.5868 16.8499C21.5865 18.1061 21.0873 19.3108 20.1991 20.1991C19.3108 21.0873 18.1061 21.5865 16.8499 21.5868H7.15014C6.52813 21.5868 5.91221 21.4643 5.33756 21.2262C4.76291 20.9881 4.24078 20.6392 3.801 20.1993C3.36123 19.7594 3.01241 19.2372 2.77447 18.6625C2.53654 18.0878 2.41415 17.4719 2.41429 16.8499V7.15014C2.41415 6.52818 2.53655 5.91229 2.77449 5.33764C3.01244 4.763 3.36128 4.24086 3.80107 3.80107C4.24086 3.36128 4.763 3.01244 5.33764 2.7745C5.91229 2.53655 6.52818 2.41415 7.15014 2.41429H16.8499C18.1058 2.41458 19.3102 2.91363 20.1983 3.80171C21.0864 4.68979 21.5854 5.89421 21.5857 7.15014L21.5868 16.8499Z" fill="currentColor"/>
      <path d="M12.0005 5.79516C8.57711 5.79516 5.79517 8.5782 5.79517 12.0005C5.79517 15.4229 8.5782 18.2059 12.0005 18.2059C15.4229 18.2059 18.2059 15.4229 18.2059 12.0005C18.2059 8.5782 15.424 5.79516 12.0005 5.79516ZM12.0005 15.7916C10.9951 15.7918 10.0307 15.3925 9.31968 14.6816C8.60861 13.9708 8.20906 13.0065 8.20891 12.0011C8.20877 10.9956 8.60804 10.0313 9.31891 9.32022C10.0298 8.60915 10.994 8.2096 11.9994 8.20945C13.0049 8.20931 13.9692 8.60858 14.6803 9.31945C15.3914 10.0303 15.7909 10.9945 15.7911 12C15.7912 13.0054 15.3919 13.9698 14.6811 14.6808C13.9702 15.3919 13.006 15.7915 12.0005 15.7916ZM18.219 4.354C18.513 4.35422 18.8003 4.44159 19.0447 4.60506C19.2891 4.76853 19.4795 5.00078 19.5919 5.27244C19.7043 5.54411 19.7337 5.843 19.6763 6.13134C19.6189 6.41969 19.4773 6.68454 19.2694 6.89243C19.0615 7.10032 18.7966 7.24192 18.5083 7.29933C18.2199 7.35674 17.921 7.32739 17.6494 7.21498C17.3777 7.10257 17.1455 6.91215 16.982 6.66778C16.8185 6.42342 16.7312 6.13607 16.7309 5.84207C16.7309 5.02167 17.2873 4.354 18.219 4.354Z" fill="currentColor"/>
    </g>
    <defs><clipPath id="footer-instagram-clip"><rect width="24" height="24" fill="currentColor"/></clipPath></defs>
  </svg>
);

const SOCIAL_ICONS = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
};

const Footer = () => {
  const f = data?.footer;

  if (!f) return null;

  return (
    <footer className={styles.siteFooter} id="footer">
      <svg
        className={styles.footerWave}
        viewBox="0 0 1920 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1920,0 L1920,30 C1400,110 700,-10 0,70 Z"
          style={{ fill: "var(--palette-bg-950)" }}
        />
      </svg>
      <div className="container">
        
        {/* Main Multi-Column Area */}
        <div className={styles.footerMain}>
          
          {/* Column 1: Logo, Bio & Socials */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.footerLeft}>
              {f?.logo && (
                <img
                  src={logo}
                  alt={`${f.company} logo`}
                  className={styles.footerLogo}
                />
              )}
            </Link>
            <p className={styles.companyBio}>
              {f.bio || "Ingversions is a digital agency focused on CRO-driven websites. We help e-commerce brands scale conversions with data-backed design and development."}
            </p>
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

          </div>
        </div>

        {/* Bottom Area: Copyright + Socials */}
        <div className={styles.footerBottomRow}>
          <div className={styles.copyright}>
            © {f.year} {f.company}. All rights reserved.
          </div>
          <div className={styles.footSocials}>
            {f.socials.map((s, i) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.name}
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noreferrer"
                >
                  {Icon && <Icon size={18} strokeWidth={2.5} />}
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;