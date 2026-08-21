import styles from './AboutTrack.module.css';
import { trackRecordCards, impactCards } from '../../data/aboutusdata';

const AboutTrack = () => {
  return (
    <section className={styles.aboutTrack} id="aboutTrack">
      <div className="container">
        <h2 className={styles.sectionTitle}>Our Track Record</h2>
        <p className={styles.sectionSubtitle}>
          Proof that a disciplined experimentation culture moves the needle.
        </p>

        <div className={styles.aboutTrackCard}>
          <div className={styles.aboutTrackStrip}>
            {trackRecordCards.map((card) => (
              <div key={card.label} className={styles.aboutTrackStat}>
                <span className={styles.aboutTrackLabel}>{card.label}</span>
                <span className={styles.aboutTrackValue}>{card.value}</span>
                <span className={styles.aboutTrackCaption}>{card.caption}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.aboutImpactGrid}>
          {impactCards.map((card) => (
            <div key={card.label} className={`card ${styles.aboutImpactCard}`}>
              <span className={styles.aboutImpactValue}>{card.value}</span>
              <span className={styles.aboutImpactLabel}>{card.label}</span>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTrack;
