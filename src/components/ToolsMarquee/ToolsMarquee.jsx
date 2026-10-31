import { useId } from "react";
import { toolsStrip } from "../../data/pricingData";
import styles from "./ToolsMarquee.module.css";

// Infinite logo strip: one track holds COPIES copies of the list and slides by
// one copy's width, so the loop is seamless and at least three copies are always
// on screen (no empty gap on wide or zoomed-out screens). CSS only; pauses on hover.
// `reverse` scrolls the other way; `compact` drops the section padding and
// background so it can sit inside another section (the pricing hero).
// `hideHeading` keeps the heading for screen readers only.
const COPIES = 4; // keep in sync with the -25% in ToolsMarquee.module.css

// Every logo gets the same area (px², desktop) instead of the same box, so wide
// wordmarks and compact icons look equally big. CSS scales it down on phones.
const LOGO_AREA = 3400;

// Eager, not lazy: copies off to the side would otherwise appear blank as they slide in.
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
