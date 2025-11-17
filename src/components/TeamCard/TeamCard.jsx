import styles from "./TeamCard.module.css";
import OptimizedImg from "../OptimizedImg/OptimizedImg";

const TeamCard = ({ member }) => {
  const {
    name,
    title,
    avatar,
    department,
    location,
    socials = {},
  } = member || {};

  const socialEntries = Object.entries(socials);

  return (
    <article className={styles.cardWrap}>
      <div className={styles.cardHover}>
        
        {/* Image Container */}
        <div className={styles.media}>
          <OptimizedImg
            src={avatar}
            alt={name}
            width={400}      // placeholder but CLS-safe
            height={500}
            className={styles.avatarImg}
          />
        </div>

        {/* Floating bottom content */}
        <div className={styles.floatContent}>
          <div className={styles.headerRow}>
            <h3 className={styles.name}>{name}</h3>
            {department && (
              <span className={styles.deptPill}>{department}</span>
            )}
          </div>

          {title && <p className={styles.role}>{title}</p>}
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
