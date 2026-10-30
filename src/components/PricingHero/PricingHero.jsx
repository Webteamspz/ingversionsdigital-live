import styles from "./PricingHero.module.css";
import { pricingHeroData } from "../../data/pricingdata";
import ToolsMarquee from "../ToolsMarquee/ToolsMarquee";

const PricingHero = ({ track, setTrack }) => {
  const { toggle } = pricingHeroData;

  return (
    <section className={styles.pricingHero} id="pricingHero">
      <div className="container">
        <span className={styles.pricingTag}>
          {pricingHeroData.tag}
        </span>

        <h1 className={styles.pricingHeroTitle}>
          {pricingHeroData.title}
        </h1>

        <p className={styles.pricingHeroSubtitle}>
          {pricingHeroData.subtitle}
        </p>
      </div>

      {/* Outside .container so it runs edge to edge; scrolls opposite to the
          strip under the plan cards. */}
      <ToolsMarquee compact reverse />

      <div className="container">
        <div className={styles.toggle} role="radiogroup" aria-label="Pricing track">
          <button
            type="button"
            role="radio"
            aria-checked={track === "brands"}
            className={`${styles.toggleBtn} ${track === "brands" ? styles.toggleActive : ""}`}
            onClick={() => setTrack("brands")}
          >
            {toggle.brands}
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={track === "dev"}
            className={`${styles.toggleBtn} ${track === "dev" ? styles.toggleActive : ""}`}
            onClick={() => setTrack("dev")}
          >
            {toggle.dev}
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
