import data from "../../data/sitedata";
import styles from "./CompanyLogos.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const CompanyLogos = () => {
  return (
    <div className={styles.logosSection} id="client-logos">
      <div className={styles.marquee}>
        <div className={styles.marqueeGroup}>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={5}
            spaceBetween={22}
            loop={true}
            speed={2000}
            centeredSlides={false}
            allowTouchMove={false}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              310: {
                slidesPerView: 2,
                spaceBetween: 10,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 3,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 5,
                centeredSlides: true,
              },
              1600: {
                slidesPerView: 7,
                centeredSlides: false,
              },
            }}
          >
            {data.logos.map((a, i) => (
              <SwiperSlide key={i} className={styles.cardSlide}>
                <img key={`logo1-${i}`} src={a.img} alt={a.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogos;
