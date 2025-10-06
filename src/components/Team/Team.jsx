// Team.jsx
import data from "../../data/siteData";
import styles from "./team.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, FreeMode } from "swiper/modules";
import "swiper/css";

export default function Team() {
  const members = data.team || [];

  return (
    <section className={styles.teamSection} id="team">
      <div className="container">
        {/* Heading */}
        <h2 className={styles.title}>
          Meet Our <span className={styles.pill}>Team</span>
        </h2>
        <p className={styles.subtitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, A11y, FreeMode]}
          className={styles.slider}
          slidesPerView="auto"
          spaceBetween={18}
          freeMode
          freeModeMomentum={false}
          loop
          loopAdditionalSlides={members.length}         
          speed={2000}                                 
          autoplay={{ delay: 1, disableOnInteraction: false, pauseOnMouseEnter: true }}
        >
          {members.map((m, i) => (
            <SwiperSlide key={i} className={styles.cardSlide}>
              <article className={styles.card}>
                <div className={styles.photoWrap}>
                  <img src={m.photo} alt={m.name} loading="lazy" />
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
