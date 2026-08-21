import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Sparkles, Blocks, TrendingUp, BarChart3 } from "lucide-react";

import styles from "./AboutExpertise.module.css";
import { expertiseCards } from "../../data/aboutusdata";

const EXPERTISE_ICONS = { ai: Sparkles, blockchain: Blocks, trading: TrendingUp, analytics: BarChart3 };
const EXPERTISE_COLORS = { ai: "var(--palette-accent)", blockchain: "var(--secondary)", trading: "var(--tertiary)", analytics: "var(--quaternary)" };

const ExpertiseIcon = ({ iconKey, title }) => {
  const Icon = EXPERTISE_ICONS[iconKey];
  return (
    <span className={styles.iconCircle} style={{ background: EXPERTISE_COLORS[iconKey] }}>
      <Icon size={22} strokeWidth={2.5} color="var(--palette-border)" aria-label={title} />
    </span>
  );
};

const AboutExpertise = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <section className={styles.aboutExpertise} id="coreExpertise">
      <div className="container">
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleCenter}`}>
          Core Expertise
        </h2>
        <p className={styles.sectionSubtitle}>
          A focused stack of capabilities designed to own experimentation from
          idea to implementation.
        </p>

        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            className={styles.aboutExpertiseSwiper}
            autoplay={true}
          >
            {expertiseCards.map((card, index) => (
              <SwiperSlide key={index}>
                <article
                  className={`${styles.card} ${styles.aboutExpertiseCard}`}
                  style={{ borderTopColor: EXPERTISE_COLORS[card.icon] }}
                >
                  <div className={styles.aboutIconWrap}>
                    <ExpertiseIcon iconKey={card.icon} title={card.title} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.aboutExpertiseGrid}>
            {expertiseCards.map((card) => (
              <article
                key={card.title}
                className={`${styles.card} ${styles.aboutExpertiseCard}`}
                style={{ borderTopColor: EXPERTISE_COLORS[card.icon] }}
              >
                <div className={styles.aboutIconWrap}>
                  <ExpertiseIcon iconKey={card.icon} title={card.title} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutExpertise;