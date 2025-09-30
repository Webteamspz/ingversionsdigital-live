import data from "../data/sitedata";

const SocialIcon = ({ name }) => {
  const common = { width: 16, height: 16, fill: "currentColor" };
  switch (name) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.2V5c-.6-.1-1.4-.2-2.4-.2C12 4.8 10.5 6 10.5 8.7V11H8v3h2.5v7h3z" />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M21 6.1c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.2 1.7-2-.8.5-1.7.9-2.6 1.1A3.9 3.9 0 0 0 12 8.7c0 .3 0 .6.1.8A11.1 11.1 0 0 1 3.3 5.6a4 4 0 0 0 .6 5.1c-.6 0-1.2-.2-1.7-.5v.1c0 2 1.4 3.7 3.3 4.1-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1.6 1.7 2.2 2.9 4.1 2.9A7.9 7.9 0 0 1 2 19.5a11 11 0 0 0 6 1.8c7.2 0 11.2-6.1 11.2-11.3v-.5c.8-.6 1.5-1.3 1.8-2.1z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M6 9h3v9H6zM7.5 4.5A1.5 1.5 0 1 1 6 6a1.5 1.5 0 0 1 1.5-1.5zM14.5 9c-1.7 0-2.5 1-2.5 1V9H9v9h3v-5c0-.9.6-1.7 1.6-1.7s1.4.7 1.4 1.6V18h3v-5.3C18 10 16.7 9 14.5 9z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2A3.2 3.2 0 1 1 12 8a3.2 3.2 0 0 1 0 6.4z" />
          <circle cx="17.5" cy="6.5" r="1.2" />
          <path d="M7 2h10c2.8 0 5 2.2 5 5v10c0 2.8-2.2 5-5 5H7c-2.8 0-5-2.2-5-5V7c0-2.8 2.2-5 5-5zm10 2H7c-1.7 0-3 1.3-3 3v10c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V7c0-1.7-1.3-3-3-3z" />
        </svg>
      );
    default:
      return null;
  }
};

const UIIcon = ({ name }) => {
  const common = { width: 18, height: 18, fill: "currentColor" };
  if (name === "pin") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    );
  }
  if (name === "phone") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M6 4l3 3-2 2a12 12 0 0 0 8 8l2-2 3 3-2 3c-8 1-18-9-17-17z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    );
  }
  return null;
};

export default function Footer() {
  const f = data.footer;

  return (
    <footer className="site-footer">
      <div className="footer-border" />

      <div className="container footer-top">
        <div className="foot-left">
          <img src={f.logo} alt={`${f.company} logo`} className="footer-logo" />
        </div>

        <nav className="foot-nav">
          {f.links.map((l, i) => (
            <a key={i} href="#">{l}</a>
          ))}
        </nav>

        <div className="foot-socials">
          {f.socials.map((s, i) => (
            <a key={i} href={s.href} aria-label={s.name} className="social-btn">
              <SocialIcon name={s.name} />
            </a>
          ))}
        </div>
      </div>

      <div className="container footer-mid">
        <div className="foot-address">
          <span className="addr-ico"><UIIcon name="pin" /></span>
          <span>{f.address}</span>
        </div>

        <div className="foot-contacts">
          <a href={`mailto:${f.email}`} className="foot-contact">
            <span className="fc-ico mail"><UIIcon name="mail" /></span>{f.email}
          </a>
          <a href={`tel:${f.phone}`} className="foot-contact">
            <span className="fc-ico phone"><UIIcon name="phone" /></span>{f.phone}
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        © {f.year} {f.company}. All rights reserved.
      </div>
    </footer>
  );
}
