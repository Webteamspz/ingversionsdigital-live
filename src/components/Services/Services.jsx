import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import data from "../../data/siteData";
import styles from "./Services.module.css";

const Services = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <section className={styles.servicesSection} id="services">
      <div className="container">
        <h3 className="section-title">{data.services.heading}</h3>
        <p className={styles.servicesSub}>{data.services.sub}</p>

        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            className={styles.servicesSwiper}
            autoplay={true}
          >
            {data.services.list.map((s, i) => (
              <SwiperSlide key={i}>
                <div className={`${styles.card} ${styles.service}`}>
                  <img className={styles.icon} src={s.icon} alt={s.title} />
                  <h4 className={styles.serviceTitle}>{s.title}</h4>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Normal grid layout for tablet & desktop
          <div className={styles.services}>
            {data.services.list.map((s, i) => (
              <div key={i} className={`${styles.card} ${styles.service}`}>
                <img className={styles.icon} src={s.icon} alt={s.title} />
                <h4 className={styles.serviceTitle}>{s.title}</h4>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
