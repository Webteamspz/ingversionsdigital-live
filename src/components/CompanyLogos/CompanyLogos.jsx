import data from "../../data/siteData";
import styles from "./CompanyLogos.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function CompanyLogos() {
  return (
    <div className={styles.logosSection} id="client-logos">
      <div className={styles.marquee}>
        <div className={styles.marqueeGroup}>
            <Swiper
              modules={[Autoplay]}
              slidesPerView={5}
              spaceBetween={22}
              loop={true}
              grabCursor={true}
              speed={2000}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
              310: {
                slidesPerView: 2
              },
              768: {
                slidesPerView: 3
              },
              1024: {
                slidesPerView: 5
              },
              1600: {
                slidesPerView: 7
              },
        }}
            >
              {data.logos.map((src, i) => (
              <SwiperSlide key={i} className={styles.cardSlide}>
                <img key={`logo1-${i}`} src={src} alt={`logo-${i}`} />
              </SwiperSlide>
              ))}
        </Swiper>
        </div>
      </div>
    </div>
  );
}