import { aiSection } from "../../data/pricingdata";
import styles from "./PricingAI.module.css";

const PricingAI = () => (
  <section className={styles.aiSection}>
    <div className="container">
      <div className={styles.card}>
        <h2 className={styles.title}>{aiSection.title}</h2>
        <p className={styles.text}>{aiSection.text}</p>
      </div>
    </div>
  </section>
);

export default PricingAI;
