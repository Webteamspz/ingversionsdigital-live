import styles from "./TeamHero.module.css";

const TeamHero = ({ eyebrow, heading, pill, subtext }) => {
  return (
    <div className={styles.heroWrap}>
      <div className={styles.heroDecor} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroInner}>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}

          <h1 className={styles.heroTitle}>
            {heading}
            <span className={styles.pill}>{pill}</span>
          </h1>

          {subtext && <p className={styles.subtext}>{subtext}</p>}
        </div>
      </div>
    </div>
  );
};

export default TeamHero;
