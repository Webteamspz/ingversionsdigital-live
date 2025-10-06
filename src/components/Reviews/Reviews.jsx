import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";

import data from "../../data/siteData";
import quoteImg from "/assets/reviews/icon.png";
import arrowLeft from "/assets/reviews/left-button.png";
import arrowRight from "/assets/reviews/right-Button.png";

import styles from "./Reviews.module.css";

export default function Reviews() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className={styles.startedSection} id="reviews">
      <div className={`container ${styles.startedContainer}`}>
        <h3 className={`sectionTitle ${styles.startedTitle}`}>
          {data.review.heading}
        </h3>
        <button
          className={`${styles.tsNav} ${styles.tsPrev}`}
          ref={prevRef}
          aria-label="Previous testimonial"
        >
          <img src={arrowLeft} alt="" width="20" height="20" />
        </button>
        <button
          className={`${styles.tsNav} ${styles.tsNext}`}
          ref={nextRef}
          aria-label="Next testimonial"
        >
          <img src={arrowRight} alt="" />
        </button>
        <Swiper
          modules={[Navigation, A11y]}
          speed={600}
          loop
          grabCursor
          spaceBetween={30}
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
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 1, spaceBetween: 18 },
            900: { slidesPerView: 2, spaceBetween: 22 },
            1200: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className={styles.testimonialSlider}
        >
          {data.review.testimonials.map((t, i) => (
            <SwiperSlide key={i} className={styles.testimonialCard}>
              <div className={styles.quoteLine}>
                <img
                  className={styles.quoteIcon}
                  src={quoteImg}
                  alt=""
                  width="18"
                  height="18"
                  loading="lazy"
                />
              </div>
              <p className={styles.testimonialQuote}>{t.quote}</p>
              <div className={styles.testimonialReviewer}>
                {t.reviewer}
                <div className={styles.testimonialText}>{t.reviewerRole}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}