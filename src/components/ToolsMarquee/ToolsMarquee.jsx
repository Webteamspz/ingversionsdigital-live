import { useId } from "react";
import { toolsStrip } from "../../data/pricingData";
import styles from "./ToolsMarquee.module.css";

const COPIES = 4;

const LOGO_AREA = 3400;

const Tool = ({ name, logo, w, h, copy }) => {
  const height = Math.round(Math.sqrt((LOGO_AREA * h) / w));
  const width = Math.round((height * w) / h);
  return (
    <li className={styles.tool} aria-hidden={copy > 0 || undefined}>
      <img
        src={logo}
        alt={copy > 0 ? "" : name}
        width={width}
        height={height}
        style={{ "--w": width, "--h": height }}
        decoding="async"
        className={styles.logo}
      />
    </li>
  );
};

const ToolsMarquee = ({ reverse = false, compact = false, hideHeading = false }) => {
  const headingId = useId();
  return (
    <section
      className={`${styles.section} ${compact ? styles.compact : ""} ${reverse ? styles.reverse : ""}`}
      aria-labelledby={headingId}
    >
      <div className="container">
        <h2 id={headingId} className={hideHeading ? "sr-only" : styles.heading}>{toolsStrip.heading}</h2>
      </div>
      <div className={styles.viewport}>
        <ul className={styles.track}>
          {Array.from({ length: COPIES }, (_, copy) =>
            toolsStrip.tools.map((t) => <Tool key={`${copy}-${t.name}`} {...t} copy={copy} />)
          )}
        </ul>
      </div>
    </section>
  );
};

export default ToolsMarquee;
