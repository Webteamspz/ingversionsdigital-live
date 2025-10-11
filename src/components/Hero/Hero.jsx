import { useEffect, useRef } from "react";
import data from "../../data/siteData";
import CompanyLogos from "../CompanyLogos/CompanyLogos";
import styles from "./Hero.module.css";

/* GTM helpers */
import { ctaClick, dl } from "../../gtm";

const Hero = () => {
  const h = data.hero;
  const sectionRef = useRef(null);
  const viewedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || viewedRef.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          viewedRef.current = true;
          dl().push({ event: "hero_view", section: "Hero" });
          io.disconnect();
        }
      },
      { threshold: [0.5] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleCta = () => {
    ctaClick({ label: h.cta.label, location: "Hero", href: h.cta.href });
  };

  const handleVisual = () => {
    ctaClick({ label: "Hero Visual", location: "Hero" });
  };

  return (
    <section ref={sectionRef} className={`${styles.bannerBg}`} id="hero">
      <div className={`container ${styles.heroRow}`}>
        <div className={styles.textHeroArea}>
          <h1 className={styles.heroTitle}>
            {h.heading} <span className={styles.heroTitlePill}>{h.pill}</span>
          </h1>
          <p className={styles.heroSubtitle}>{h.sub}</p>

          <div className={styles.heroCtaWrap}>
            <a
              className={styles.btnHero}
              href={h.cta.href}
              onClick={handleCta}
              data-cta={h.cta.label}
              data-cta-loc="Hero"
            >
              {h.cta.label}
            </a>

            <div className={styles.heroSocialProof}>
              <div className={styles.avatarStack}>
                {h.avatars.map((src, i) => (
                  <img key={i} src={src} alt={`client ${i + 1}`} />
                ))}
              </div>
              <span
                className={styles.proofText}
                dangerouslySetInnerHTML={{ __html: h.proof }}
              />
            </div>
          </div>
        </div>

        <div className={styles.heroVisual} onClick={handleVisual}>
          <img
            src={h.visual}
            alt="Security bot"
            className={styles.heroVisualImg}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? handleVisual() : null)}
            data-cta="Hero Visual"
            data-cta-loc="Hero"
          />
          <div className={styles.heroShadow} />
        </div>
      </div>

      <CompanyLogos />
    </section>
  );
};

export default Hero;
