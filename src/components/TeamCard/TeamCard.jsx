import styles from "./TeamCard.module.css";
import OptimizedImg from "../OptimizedImg/OptimizedImg";

const ROLE_COLORS = [
  "var(--palette-accent)",
  "var(--secondary)",
  "var(--tertiary)",
  "var(--quaternary)",
];
const ROLE_TEXT_COLORS = [
  "var(--palette-bg-800)",
  "var(--palette-bg-800)",
  "var(--palette-border)",
  "var(--palette-border)",
];

const TeamCard = ({ member, index = 0 }) => {
  const {
    name,
    title,
    avatar,
    department,
    location,
    socials = {},
  } = member || {};

  const socialEntries = Object.entries(socials);
  const roleColor = ROLE_COLORS[index % ROLE_COLORS.length];
  const roleTextColor = ROLE_TEXT_COLORS[index % ROLE_TEXT_COLORS.length];

  return (
    <article className={styles.cardWrap}>
      <div className={styles.cardHover}>

        {/* Image Container */}
        <div className={styles.media}>
          <OptimizedImg
            src={avatar}
            alt={name}
            width={400} // placeholder but CLS-safe
            height={500}
          />
        </div>

        {/* Floating bottom content */}
        <div className={styles.floatContent}>
          <h3 className={styles.name}>{name}</h3>

          {title && (
            <span
              className={styles.rolePill}
              style={{ background: roleColor, color: roleTextColor }}
            >
              {title}
            </span>
          )}
          {department && (
            <span className={styles.deptPill}>{department}</span>
          )}
          {location && <p className={styles.location}>{location}</p>}

          {socialEntries.length > 0 && (
            <div className={styles.socialRow}>
              <ul className={styles.socialList}>
                {socialEntries.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noreferrer">
                      {key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeamCard;
