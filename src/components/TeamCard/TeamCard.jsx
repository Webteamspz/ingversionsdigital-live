// src/components/TeamCard/TeamCard.jsx
import styles from './TeamCard.module.css';

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
        <div className={styles.media}>
          <img src={avatar} alt={name} loading="lazy" />
        </div>

        {/* floating bottom content (slides up on hover) */}
        <div className={styles.floatContent}>
          <div className={styles.headerRow}>
            <h3 className={styles.name}>{name}</h3>
            {department && <span className={styles.deptPill}>{department}</span>}
          </div>

          {title && <p className={styles.role}>{title}</p>}
          {location && <p className={styles.location}>{location}</p>}

          {socialEntries.length > 0 && (
            <div className={styles.socialRow}>
              <ul className={styles.socialList}>
                {socialEntries.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noreferrer">{key}</a>
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
