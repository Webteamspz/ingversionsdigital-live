import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import data from "../data/sitedata";

export default function WhyWeStarted() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="started-section">
      <div className="container">
        <h3 className="section-title started-title">Why We Started</h3>

        {/* Navigation buttons positioned like the screenshot */}
        <button className="ts-nav ts-prev" ref={prevRef} aria-label="Previous slide">
          <span>←</span>
        </button>
        <button className="ts-nav ts-next" ref={nextRef} aria-label="Next slide">
          <span>→</span>
        </button>

        <Swiper
          modules={[Navigation, A11y]}
          speed={600}
          grabCursor
          loop
          spaceBetween={28}
          slidesPerView={3}
          onBeforeInit={(swiper) => {
            // Attach custom buttons
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            0:   { slidesPerView: 1, spaceBetween: 18 },
            640: { slidesPerView: 1, spaceBetween: 18 },
            900: { slidesPerView: 2, spaceBetween: 22 },
            1200:{ slidesPerView: 3, spaceBetween: 28 },
          }}
          className="testi-slider"
        >
          {data.testimonials.map((t, i) => (
            <SwiperSlide key={i} className="tcard">
              <div className="tquote-line">
                <span className="tquote-marks">“”</span>
              </div>

              <p className="tquote-text">{t.quote}</p>

              <div className="tauthor">
                {t.author}
                <div className="trole">{t.role}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
