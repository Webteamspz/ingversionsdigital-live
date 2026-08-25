import { useRef } from "react";

import data from "../../data/sitedata";
import styles from "./Reviews.module.css";
import Reveal from "../Reveal/Reveal";
import useIsMobile from "../../hooks/useIsMobile";

const CARD_TILTS = [-2, 2, -1.5, 1.5, -2.5, 2.5];
const REVIEWER_AVATARS = [
  "/assets/reviews/reviewer-1.jpg",
  "/assets/reviews/reviewer-2.jpg",
  "/assets/reviews/reviewer-3.jpg",
  "/assets/reviews/reviewer-4.jpg",
  "/assets/reviews/reviewer-5.jpg",
  "/assets/reviews/reviewer-6.jpg",
];

export default function Reviews() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  const renderCard = (t, i) => (
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
  );

  return (
    <section ref={sectionRef} className={styles.startedSection} id="reviews">
      <div className={`container ${styles.startedContainer}`}>
        <h3 className={`section-title ${styles.startedTitle}`}>
          {data.review.heading}
        </h3>

        {isMobile ? (
          <div className={styles.reviewsMarquee}>
            <div className={styles.reviewsMarqueeTrack}>
              {[0, 1].map((groupIndex) => (
                <div
                  className={styles.reviewsMarqueeGroup}
                  aria-hidden={groupIndex === 1 ? "true" : undefined}
                  key={groupIndex}
                >
                  {data.review.testimonials.map((t, i) => (
                    <div key={`${groupIndex}-${i}`} className={styles.marqueeCard}>
                      {renderCard(t, i)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.reviewsGrid}>
            {data.review.testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 80} className={styles.reviewCardWrap}>
                {renderCard(t, i)}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
