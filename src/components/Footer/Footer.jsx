import data from "../../data/siteData";
import styles from "./footer.module.css";

import iconFacebook from "../../assets/footer/fb.png";
import iconTwitter from "../../assets/footer/x.png";
import iconLinkedin from "../../assets/footer/linkedin.png";
import iconInstagram from "../../assets/footer/instagram.png";

const ICONS = {
  facebook: iconFacebook,
  twitter: iconTwitter,
  linkedin: iconLinkedin,
  instagram: iconInstagram,
};

const SocialIcon = ({ name }) => {
  const src = ICONS[name];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={`${name} icon`}
      className={styles["social-icon"]}
      width={40}
      height={40}
      loading="lazy"
    />
  );
};


const UIIcon = ({ name }) => {
  const common = { width: 18, height: 18, fill: "currentColor" };
  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path
          d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path
          d="M4 6h16v12H4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M4 7l8 6 8-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  if (name === "phone") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path
          d="M6 4l3 3-2 2a12 12 0 0 0 8 8l2-2 3 3-2 3c-8 1-18-9-17-17z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  return null;
};

export default function Footer() {
  const f = data.footer;

  return (
    <footer className={styles["site-footer"]}>
      <div className={styles["footer-border"]} />
      <div className={`container ${styles["footer-top"]}`}>
        <div className={styles["foot-left"]}>
          <img
            src={f.logo}
            alt={`${f.company} logo`}
            className={styles["footer-logo"]}
          />
        </div>
        <nav className={styles["foot-nav"]}>
          {f.links.map((l, i) => (
            <a key={i} href="#">
              {l}
            </a>
          ))}
        </nav>
        <div className={styles["foot-socials"]}>
          {f.socials.map((s, i) => (
            <a
              key={i}
              href={s.href}
              aria-label={s.name}
              className={styles["social-btn"]}
            >
              <SocialIcon name={s.name} />
            </a>
          ))}
        </div>
      </div>
      <div className={`container ${styles["footer-mid"]}`}>
        <div className={styles["foot-address"]}>
          <span className={styles["addr-ico"]}>
            <UIIcon name="pin" />
          </span>
          <span>{f.address}</span>
        </div>
        <div className={styles["foot-contacts"]}>
          <a href={`mailto:${f.email}`} className={styles["foot-contact"]}>
            <span className={`${styles["fc-ico"]} ${styles.mail}`}>
              <UIIcon name="mail" />
            </span>
            {f.email}
          </a>
          <a href={`tel:${f.phone}`} className={styles["foot-contact"]}>
            <span className={`${styles["fc-ico"]} ${styles.phone}`}>
              <UIIcon name="phone" />
            </span>
            {f.phone}
          </a>
        </div>
      </div>
      <div className={`container ${styles["footer-bottom"]}`}>
        © {f.year} {f.company}. All rights reserved.
      </div>
    </footer>
  );
}