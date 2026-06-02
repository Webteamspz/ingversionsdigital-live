// /src/pages/components/AboutExpertise.jsx
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

// 1. Import ko CSS Module format mein change kiya
import styles from "./AboutExpertise.module.css"; 
import { expertiseCards } from "../../data/aboutusdata";

const AboutExpertise = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Screen size check karne ke liye useEffect
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    
    // Initial check
    checkWidth();
    
    // Resize event listener
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    // 2. Classes ko styles object ke through pass kiya
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
          /* Mobile View: Swiper Slider */
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
                <article className={`${styles.card} ${styles.aboutExpertiseCard}`}>
                  <div className={styles.aboutIconWrap}>
                    <img src={card.icon} alt={card.title} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* Desktop/Tablet View: Standard Grid */
          <div className={`${styles.grid} ${styles.aboutExpertiseGrid}`}>
            {expertiseCards.map((card) => (
              <article key={card.title} className={`${styles.card} ${styles.aboutExpertiseCard}`}>
                <div className={styles.aboutIconWrap}>
                  <img src={card.icon} alt={card.title} />
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