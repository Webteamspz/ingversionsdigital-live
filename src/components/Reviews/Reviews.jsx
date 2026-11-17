import { useEffect, useRef, useState } from "react";
import { Hash } from "lucide-react";
import data from "../../data/siteData";
import styles from "./Reviews.module.css";

const AVATARS = [
  "/assets/reviews/reviewer-1.webp",
  "/assets/reviews/reviewer-2.webp",
  "/assets/reviews/reviewer-3.webp",
  "/assets/reviews/reviewer-4.webp",
  "/assets/reviews/reviewer-5.webp",
  "/assets/reviews/reviewer-6.webp",
];
const STEP_MS = 1100;

const Marked = ({ quote, highlight }) => {
  const at = highlight ? quote.indexOf(highlight) : -1;
  if (at < 0) return quote;
  return (
    <>
      {quote.slice(0, at)}
      <mark>{highlight}</mark>
      {quote.slice(at + highlight.length)}
    </>
  );
};

export default function Reviews() {
  const { eyebrow, heading, sub, channel, members, cta, testimonials } = data.review;
  const count = testimonials.length;
  const [shown, setShown] = useState(count);
  const [started, setStarted] = useState(false);
  const windowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(windowRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || shown >= count) return;
    const id = setTimeout(() => setShown((n) => n + 1), STEP_MS);
    return () => clearTimeout(id);
  }, [started, shown, count]);

  return (
    <section className={styles.section} id="reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <h2 id="reviews-heading" className={styles.title}>
              {heading}
            </h2>
            <p className={styles.sub}>{sub}</p>
            <div className={styles.faces} aria-hidden="true">
              {AVATARS.map((src) => (
                <img key={src} src={src} alt="" width="44" height="44" loading="lazy" />
              ))}
            </div>
            <a
              className={styles.cta}
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cta={cta.label}
              data-cta-loc="Reviews"
            >
              {cta.label}
            </a>
          </div>

          <div className={styles.window} ref={windowRef}>
            <div className={styles.bar}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.channel}>
                <Hash size={15} strokeWidth={3} aria-hidden="true" />
                {channel.replace("#", "")}
              </span>
              <span className={styles.members}>{members}</span>
            </div>

            <ol className={styles.thread}>
              {testimonials.map((t, i) => (
                <li
                  key={t.reviewer}
                  className={`${styles.msg} ${i < shown ? styles.in : ""} ${
                    i % 2 ? styles.alt : ""
                  }`}
                >
                  <img
                    className={styles.avatar}
                    src={AVATARS[i % AVATARS.length]}
                    alt=""
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                  <figure className={styles.body}>
                    <figcaption className={styles.who}>
                      <strong>{t.reviewer}</strong>
                      <span>{t.reviewerRole}</span>
                    </figcaption>
                    <blockquote className={styles.bubble}>
                      <p>
                        <Marked quote={t.quote} highlight={t.highlight} />
                      </p>
                    </blockquote>
                  </figure>
                  {started && i === shown && (
                    <span className={styles.typing} aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
