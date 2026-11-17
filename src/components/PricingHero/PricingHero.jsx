import { useRef } from "react";
import { pricingHeroData as hero } from "../../data/pricingData";
import styles from "./PricingHero.module.css";

const TRACKS = ["brands", "dev"];

const PricingHero = ({ track, setTrack }) => {
  const refs = useRef([]);

  const onKeyDown = (e) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const next = TRACKS[(TRACKS.indexOf(track) + 1) % TRACKS.length];
    setTrack(next);
    refs.current[TRACKS.indexOf(next)]?.focus();
  };

  return (
    <section className={styles.hero} id="pricingHero">
      <div className="container">
        <span className={styles.tag}>{hero.tag}</span>
        <h1 className={styles.title}>
          {hero.title} <span className={styles.mark}>{hero.highlight}</span>
        </h1>
        <p className={styles.sub}>{hero.subtitle}</p>

        <div
          className={styles.toggle}
          role="radiogroup"
          aria-label={hero.toggleLabel}
          onKeyDown={onKeyDown}
        >
          {TRACKS.map((t, i) => {
            const on = track === t;
            return (
              <button
                key={t}
                ref={(el) => (refs.current[i] = el)}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                className={`${styles.option} ${on ? styles.optionOn : ""}`}
                onClick={() => {
                  setTrack(t);
                  document.getElementById("pricingPlans")?.scrollIntoView({ block: "start" });
                }}
              >
                <span className={styles.optionTitle}>{hero.toggle[t]}</span>
                <span className={styles.optionHint}>{hero.toggleHint[t]}</span>
              </button>
            );
          })}
        </div>

        <ul className={styles.assure}>
          {hero.assure.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PricingHero;
