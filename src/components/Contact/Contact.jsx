import React from "react";
import data from "../../data/sitedata";
import styles from "./Contact.module.css";
import parse from "html-react-parser";

const OptimizedImg = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  ...rest
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
    decoding="async"
    className={className}
    {...rest}
  />
);

const Contact = () => {
  const { heading, infoCards } = data.contact;
  const h = data.hero; // Image Hero data se aayegi

  return (
    <section className={styles.contactSection} id="contact">
      <div className="container">
        <h3 className={`section-title ${styles.contactHeading}`}>
          {heading}
        </h3>
        <div className={styles.contactGrid}>
          
          {/* LEFT: 3D IMAGE */}
          <div className={styles.heroVisualWrap}>
            <div className={styles.heroVisual}>
              <OptimizedImg
                src={h.visual}
                alt="3D Visual"
                className={styles.heroVisualImg}
                priority={false}
              />
              <div className={styles.heroShadow} />
            </div>
          </div>

          {/* RIGHT COLUMN – Success Snapshot + Contact info */}
          <div className={styles.rightCol}>
            <div className={`${styles.contactCard} ${styles.highlightCard}`}>
              <h4 className={styles.contactPanelTitle}>
                <span className={styles.snapshotEmoji} aria-hidden="true">🚀</span>{" "}
                Success Snapshot
              </h4>

              <p className={styles.snapshotText}>
                Increased a D2C brand&apos;s conversions by{" "}
                <span className={styles.snapshotEmphasis}>27%</span> in 60 days.
              </p>

              <div className={styles.snapshotBlock}>
                <p className={styles.snapshotRatingsLineTop}>
                  <span className={styles.snapshotStars} aria-hidden="true">★★★★★</span>{" "}
                  <span className={styles.snapshotTitleInline}>Client Ratings</span>
                </p>
                <p className={styles.snapshotRatingsDetail}>
                  Overall: <strong>5/5</strong> | Communication{" "}
                  <strong>5/5</strong> | On-time{" "}
                  <strong>5/5</strong> | Value{" "}
                  <strong>5/5</strong>
                </p>
              </div>

              <p className={styles.snapshotTrust}>
                <span aria-hidden="true">👥</span> Trusted by{" "}
                <strong>6+ agencies</strong> and{" "}
                <strong>10+ brands in Ecommerce</strong>
              </p>

              <p className={styles.snapshotSubheading}>
                <span aria-hidden="true">🔗</span> What You Get on the Call
              </p>

              <ul className={styles.snapshotList}>
                <li>30-minute free audit</li>
                <li>CRO roadmap tailored to your goals</li>
                <li>Zero obligations</li>
              </ul>

              <div className={styles.contactDivider} />

              {infoCards[0] && (
                <div className={styles.contactInfoBlock}>
                  <h4 className={styles.contactPanelTitle}>{infoCards[0].title}</h4>
                  {infoCards[0].items && (
                    <ul className={styles.cList}>
                      {infoCards[0].items.map((item, i) => (
                        <li key={i}>
                          <span className={styles.cIco}>{parse(item.icon)}</span>
                          {String(item.text).split("\n").map((line, li) => (
                            <span key={li}>
                              {line}
                              {li < String(item.text).split("\n").length - 1 && <br />}
                            </span>
                          ))}
                        </li>
                      ))}
                    </ul>
                  )}
                  {infoCards[0].description && (
                    <p className={styles.contactNote}>{infoCards[0].description}</p>
                  )}
                  {infoCards[0].cta && (
                    <a className={`btn ${styles.cBtn}`} href={infoCards[0].cta.href}>
                      {infoCards[0].cta.label}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
