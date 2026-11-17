import { Link } from "react-router-dom";
import data from "../../data/siteData";
import OptimizedImg from "../OptimizedImg/OptimizedImg";
import styles from "./HeroCopy.module.css";

const { eyebrow, heading, emphasis, sub, cta, secondaryCta, assure, trust, proof, simLink } =
  data.hero;

const HeroCopy = () => (
  <div className={styles.copy}>
    <h1 id="hero-heading" className={styles.title}>
      <span className={styles.eyebrow}>{eyebrow}</span> {heading}{" "}
      <span className={styles.emphasis}>{emphasis}</span>
    </h1>

    <p className={styles.sub}>{sub}</p>

    <div className={styles.actions}>
      <a
        className={styles.primaryAction}
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={cta.label}
        data-cta-loc="Hero"
      >
        {cta.label}
      </a>
      <Link
        className={styles.secondaryAction}
        to={secondaryCta.href}
        data-cta={secondaryCta.label}
        data-cta-loc="Hero"
      >
        {secondaryCta.label}
      </Link>
    </div>

    <ul className={styles.assure}>
      {assure.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>

    <div className={styles.proofRow}>
      <div className={styles.trust}>
        <div className={styles.avatars} aria-hidden="true">
          {trust.avatars.map((src, index) => (
            <OptimizedImg
              key={src}
              src={src}
              alt=""
              width="48"
              height="48"
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
        <p dangerouslySetInnerHTML={{ __html: trust.text }} />
      </div>
      <Link className={styles.result} to={proof.href} data-cta={proof.text} data-cta-loc="Hero">
        <span className={styles.stat}>{proof.stat}</span>
        {proof.text} →
      </Link>
    </div>

    <Link className={styles.simLink} to={simLink.href} data-cta={simLink.label} data-cta-loc="Hero">
      {simLink.label} →
    </Link>
  </div>
);

export default HeroCopy;
