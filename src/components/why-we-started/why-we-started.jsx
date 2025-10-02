import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";

import data from "../../data/siteData";
import quoteImg from "../../assets/why-we-started/icon.png";
import arrowLeft from "../../assets/why-we-started/left-button.png";
import arrowRight from "../../assets/why-we-started/right-Button.png";

import styles from "./why-we-started.module.css";

export default function WhyWeStarted() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className={styles["started-section"]}>
      <div className={`container ${styles["started-container"]}`}>
        <h3 className={`section-title ${styles["started-title"]}`}>Why We Started</h3>
        <button className={`${styles["ts-nav"]} ${styles["ts-prev"]}`} ref={prevRef} aria-label="Previous">
          <img src={arrowLeft} alt="" width="20" height="20" />
        </button>
        <button className={`${styles["ts-nav"]} ${styles["ts-next"]}`} ref={nextRef} aria-label="Next">
          <img src={arrowRight} alt="" />
        </button>
        <Swiper
          modules={[Navigation, A11y]}
          speed={600}
          loop
          grabCursor
          spaceBetween={28}
          slidesPerView={3}
          centeredSlides={false}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onInit={(swiper) => {
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            0:    { slidesPerView: 1, spaceBetween: 16 },
            640:  { slidesPerView: 1, spaceBetween: 18 },
            900:  { slidesPerView: 2, spaceBetween: 22 },
            1200: { slidesPerView: 3, spaceBetween: 28 },
          }}
          className={styles["testi-slider"]}
        >
          {data.testimonials.map((t, i) => (
            <SwiperSlide key={i} className={styles.tcard}>
              <div className={styles["tquote-line"]}>
                <img
                  className={styles["tquote-icon"]}
                  src={quoteImg}
                  alt=""
                  width="18"
                  height="18"
                  loading="lazy"
                />
              </div>
              <p className={styles["tquote-text"]}>{t.quote}</p>
              <div className={styles.tauthor}>
                {t.author}
                <div className={styles.trole}>{t.role}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}