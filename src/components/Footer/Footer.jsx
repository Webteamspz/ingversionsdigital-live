import data from "../../data/siteData";
import styles from "./Footer.module.css";

const SOCIAL_ICONS = {
  facebook: "/assets/footer/fb.png",
  twitter: "/assets/footer/x.png",
  linkedin: "/assets/footer/linkedin.png",
  instagram: "/assets/footer/instagram.png",
};

const SocialIcon = ({ name }) => {
  const src = SOCIAL_ICONS[name];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={`${name} icon`}
      className={styles.socialIcon}
      width={40}
      height={40}
      loading="lazy"
    />
  );
};

const UI_ICON_PATHS = {
  pin: "/assets/footer/location.svg",
  mail: "/assets/footer/email.svg",
  phone: "/assets/footer/phone.svg",
};

const UIIcon = ({ name, className }) => {
  const src = UI_ICON_PATHS[name];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={`${name} icon`}
      className={className}
      width={18}
      height={18}
      loading="lazy"
    />
  );
};

export default function Footer() {
  const f = data.footer;

  return (
    <footer className={styles.siteFooter} id="footer">
      <div className={styles.footerBorder} />
      <div className={`container ${styles.footerTop}`}>
        <a href="/" className={styles.footerLeft}>
          <img
            src={f.logo}
            alt={`${f.company} logo`}
            className={styles.footerLogo}
          />
        </a>
        <nav className={styles.footNav}>
          {f.links.map((l, i) => (
            <a key={i} href={l.href}>
              {l.name}
            </a>
          ))}
        </nav>
        <div className={styles.footSocials}>
          {f.socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              aria-label={s.name}
              className={styles.socialBtn}
              target="_blank"
              rel="noreferrer"
            >
              <SocialIcon name={s.name} />
            </a>
          ))}
        </div>
      </div>
      <div className={`container ${styles.footerMid}`}>
        <div className={styles.footAddress}>
          <span className={styles.addrIcon}>
            <UIIcon name="pin" className={styles.uiIcon} />
          </span>
          <span>{f.address}</span>
        </div>
        <div className={styles.footContacts}>
          <a href={`mailto:${f.email}`} className={styles.footContact}>
            <span className={`${styles.fcIcon} ${styles.mail}`}>
              <UIIcon name="mail" className={styles.uiIcon} />
            </span>
            {f.email}
          </a>
          <a href={`tel:${f.phone}`} className={styles.footContact}>
            <span className={`${styles.fcIcon} ${styles.phone}`}>
              <UIIcon name="phone" className={styles.uiIcon} />
            </span>
            {f.phone}
          </a>
        </div>
      </div>
      <div className={`container ${styles.footerBottom}`}>
        © {f.year} {f.company}. All rights reserved.
      </div>
    </footer>
  );
}