import data from "../../data/sitedata";
import styles from "./Team.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Team = () => {
  const members = data.team || [];

  return (
    <section className={styles.teamSection} id="team">
      <div className={`container ${styles.teamContainer}`}>
        <h2 className={`section-title ${styles.title}`}>
          {data.team.heading}
          <span className={styles.pill}>{data.team.pill}</span>
        </h2>
        <Swiper
          modules={[Autoplay]}
          className={styles.slider}
          slidesPerView="auto"
          spaceBetween={22}
          loop={true}
          centeredSlides={false}
          grabCursor={true}
          speed={2000}
          autoplay={{
            delay: 10,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            310: {
              centeredSlides: true,
            },
            1024: {
              centeredSlides: false,
            },
          }}
        >
          {members.list.map((m, i) => (
            <SwiperSlide key={i} className={styles.cardSlide}>
              <div className={styles.card}>
                <img className={styles.memberImg} src={m.photo} alt={m.name} loading="lazy" decoding="async" />
                <h4 className={styles.infoName}>{m.name}</h4>
                <h5 className={styles.infoRole}>{m.role}</h5>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Team;
