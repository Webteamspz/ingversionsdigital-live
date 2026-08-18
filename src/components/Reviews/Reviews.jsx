import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";

import data from "../../data/sitedata";
import quoteImg from "/assets/reviews/icon.webp";
import styles from "./Reviews.module.css";
import { ctaClick } from "../../gtm";

export default function Reviews() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const toggleAutoplay = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (isPaused) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
    setIsPaused((v) => !v);
    ctaClick({ label: isPaused ? "Reviews Play" : "Reviews Pause", location: "Reviews" });
  };


  return (
    <section ref={sectionRef} className={styles.startedSection} id="reviews">
      <div className={`container ${styles.startedContainer}`}>
        <h3 className={`section-title ${styles.startedTitle}`}>
          {data.review.heading}
        </h3>

        <button
          className={`${styles.tsNav} ${styles.tsPrev}`}
          ref={prevRef}
          aria-label="Previous testimonial"
          data-cta="Reviews Prev"
          data-cta-loc="Reviews"
          onClick={() =>
            ctaClick({ label: "Reviews Prev", location: "Reviews" })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M0.999921 8.5H15.5833M15.5833 8.5L8.58325 1.5M15.5833 8.5L8.58325 15.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          className={`${styles.tsNav} ${styles.tsNext}`}
          ref={nextRef}
          aria-label="Next testimonial"
          data-cta="Reviews Next"
          data-cta-loc="Reviews"
          onClick={() =>
            ctaClick({ label: "Reviews Next", location: "Reviews" })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M0.999921 8.5H15.5833M15.5833 8.5L8.58325 1.5M15.5833 8.5L8.58325 15.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          className={`${styles.tsNav} ${styles.tsPause}`}
          aria-label={isPaused ? "Play testimonial rotation" : "Pause testimonial rotation"}
          aria-pressed={isPaused}
          data-cta={isPaused ? "Reviews Play" : "Reviews Pause"}
          data-cta-loc="Reviews"
          onClick={toggleAutoplay}
          type="button"
        >
          {isPaused ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 1.5L14 8L3 14.5V1.5Z" fill="white" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="1.5" width="3.5" height="13" fill="white" />
              <rect x="9.5" y="1.5" width="3.5" height="13" fill="white" />
            </svg>
          )}
        </button>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
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
            swiperRef.current = swiper;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            stopOnLastSlide: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 18 },
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
                  alt="Quote"
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
