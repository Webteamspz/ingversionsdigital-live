import styles from './AboutValues.module.css';
import { valueCards } from '../../data/aboutusdata';
import { FlaskConical, Users, Lightbulb, ShieldCheck } from 'lucide-react';

const VALUE_ICONS = { flask: FlaskConical, users: Users, lightbulb: Lightbulb, shield: ShieldCheck };
const VALUE_COLORS = { flask: 'var(--palette-accent)', users: 'var(--secondary)', lightbulb: 'var(--tertiary)', shield: 'var(--quaternary)' };

const ValueIcon = ({ iconKey, title }) => {
  const Icon = VALUE_ICONS[iconKey];
  return (
    <span className={styles.valueIconCircle} style={{ background: VALUE_COLORS[iconKey] }}>
      <Icon size={22} strokeWidth={2.5} color="var(--palette-border)" aria-label={title} />
    </span>
  );
};

const AboutValues = () => {
  return (
    <section className={styles.aboutValues} id="aboutValues">
      <div className="container">
        <h2 className={styles.sectionTitle}>Our Value System</h2>
        <p className={styles.sectionSubtitle}>
          The principles that guide every experiment, call, and recommendation.
        </p>

        <div className={styles.aboutValuesGrid}>
          {valueCards.map((card) => (
            <div key={card.title} className={`card ${styles.aboutValuePill}`}>
              <span
                className={styles.cornerFold}
                style={{ background: VALUE_COLORS[card.icon] }}
                aria-hidden="true"
              />
              <ValueIcon iconKey={card.icon} title={card.title} />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
