import { useRef } from "react";

import data from "../../data/sitedata";
import styles from "./Reviews.module.css";
import Reveal from "../Reveal/Reveal";

const CARD_TILTS = [-2, 2, -1.5, 1.5, -2.5, 2.5];
const REVIEWER_AVATARS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=85",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=85",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=85",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=85",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=160&h=160&q=85",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=85",
];

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
                  <img
                    className={styles.reviewAvatar}
                    src={REVIEWER_AVATARS[i % REVIEWER_AVATARS.length]}
                    alt={`${t.reviewer}, ${t.reviewerRole}`}
                    loading="lazy"
                  />
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
