import styles from "./TeamHero.module.css";

const TeamHero = ({ eyebrow, heading, subtext }) => {
  return (
    <div className={styles.heroWrap}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h1 className="section-title">{heading}</h1>
      {subtext && <p className={styles.subtext}>{subtext}</p>}
    </div>
  );
};

export default TeamHero;
