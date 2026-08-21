import { useRef } from "react";

import data from "../../data/sitedata";
import styles from "./Reviews.module.css";
import Reveal from "../Reveal/Reveal";

const AVATAR_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];
const CARD_TILTS = [-2, 2, -1.5, 1.5, -2.5, 2.5];

const getInitials = (name) =>
  name
    .replace(/\./g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function Reviews() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.startedSection} id="reviews">
      <div className={`container ${styles.startedContainer}`}>
        <h3 className={`section-title ${styles.startedTitle}`}>
          {data.review.heading}
        </h3>

        <div className={styles.reviewsGrid}>
          {data.review.testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 80} className={styles.reviewCardWrap}>
              <div
                className={styles.reviewTilt}
                style={{ transform: `rotate(${CARD_TILTS[i % CARD_TILTS.length]}deg)` }}
              >
                <div className={styles.reviewCard}>
                  <p className={styles.reviewQuote}>&ldquo;{t.quote}&rdquo;</p>
                  <span className={styles.reviewTail} aria-hidden="true" />
                </div>
                <div className={styles.reviewerRow}>
                  <span
                    className={styles.reviewAvatar}
                    style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                    aria-hidden="true"
                  >
                    {getInitials(t.reviewer)}
                  </span>
                  <div>
                    <div className={styles.reviewerName}>{t.reviewer}</div>
                    <div className={styles.reviewerRole}>{t.reviewerRole}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
