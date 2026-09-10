import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, A11y } from "swiper/modules";
import styles from "./AboutValues.module.css";
import { valueCards } from "../../data/aboutusdata";
import Reveal from "../Reveal/Reveal";
import useIsMobile from "../../hooks/useIsMobile";

const NODE_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];

const AboutValues = () => {
  const isMobile = useIsMobile();

  return (
    <section className={styles.aboutValues} id="aboutValues">
      <div className="container">
        <h2 className="section-title">Our Value System</h2>
        <p className={styles.whySub}>
          The principles that guide every experiment, call, and recommendation.
        </p>

        {isMobile ? (
          <Swiper
            modules={[Pagination, A11y]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className={styles.timelineSwiper}
          >
            {valueCards.map((v, i) => (
              <SwiperSlide key={i}>
                <div className={styles.timelineSlideCard}>
                  <span
                    className={styles.timelineNumber}
                    style={{ color: NODE_COLORS[i % NODE_COLORS.length] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className={styles.timelineTitle}>{v.title}</h4>
                  <p className={styles.timelineDesc}>{v.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.timeline}>
            <span className={styles.timelineLine} aria-hidden="true" />
            {valueCards.map((v, i) => (
              <Reveal key={i} delay={i * 100} className={styles.timelineRow}>
                <div className={styles.timelineCard}>
                  <span
                    className={styles.timelineNumber}
                    style={{ color: NODE_COLORS[i % NODE_COLORS.length] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className={styles.timelineTitle}>{v.title}</h4>
                  <p className={styles.timelineDesc}>{v.text}</p>
                </div>
                <span
                  className={styles.timelineNode}
                  style={{ borderColor: NODE_COLORS[i % NODE_COLORS.length] }}
                  aria-hidden="true"
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutValues;
