import styles from "./TeamHero.module.css";

const TeamHero = ({ eyebrow, heading, pill, subtext }) => {
  return (
    <div className={styles.heroWrap}>
      <h2 className={styles.heroTitle}>
        {heading}
        <span className={styles.pill}>{pill}</span>
      </h2>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}

      {subtext && <p className={styles.subtext}>{subtext}</p>}
    </div>
  );
};

export default TeamHero;
