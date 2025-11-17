import { useEffect, useRef } from "react";
import data from "../../data/sitedata";
import CompanyLogos from "../CompanyLogos/CompanyLogos";
import styles from "./Hero.module.css";
import { ctaClick, dl } from "../../gtm";

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
    <section
      ref={sectionRef}
      className={styles.bannerBg}
      id="hero"
      aria-labelledby="hero-heading"
    >
      <div className={`container ${styles.heroRow}`}>
        {/* LEFT TEXT */}
        <div className={styles.textHeroArea}>
          <h1 id="hero-heading" className={styles.heroTitle}>
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
                  <OptimizedImg
                    key={i}
                    src={src}
                    alt={`Client ${i + 1}`}
                    priority={false}
                  />
                ))}
              </div>
              <span
                className={styles.proofText}
                dangerouslySetInnerHTML={{ __html: h.proof }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL (LCP) */}
        <div
          type="button"
          className={styles.heroVisual}
          onClick={handleVisual}
          data-cta="Hero Visual"
          data-cta-loc="Hero"
        >
          <OptimizedImg
            src={h.visual}
            alt="Security bot preview"
            className={styles.heroVisualImg} 
            priority={true}
          />
          <div className={styles.heroShadow} />
        </div>
      </div>

      <CompanyLogos />
    </section>
  );
};

export default Hero;
