import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, A11y } from "swiper/modules";
import data from "../../data/sitedata";
import styles from "./WhyChooseUs.module.css";
import Reveal from "../Reveal/Reveal";
import useIsMobile from "../../hooks/useIsMobile";

const NODE_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];

const WhyChooseUs = () => {
  const isMobile = useIsMobile();

  return (
    <section className={styles.whyChooseUsSection} id="why-choose-us">
      <div className={styles.decor} aria-hidden="true">
        <span className={styles.shapeCircleTl} />
        <span className={styles.shapeSquareTr} />
        <span className={styles.shapeCircleBr} />
        <span className={styles.shapeSquareBl} />
      </div>
      <div className="container">
        <h3 className="section-title">{data.why.heading}</h3>
        <p className={styles.whySub}>Here's what sets our approach apart.</p>

        {isMobile ? (
          <Swiper
            modules={[Pagination, A11y]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className={styles.timelineSwiper}
          >
            {data.why.list.map((w, i) => (
              <SwiperSlide key={i}>
                <div className={styles.timelineSlideCard}>
                  <span
                    className={styles.timelineNumber}
                    style={{ color: NODE_COLORS[i % NODE_COLORS.length] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className={styles.timelineTitle}>{w.title}</h4>
                  <p className={styles.timelineDesc}>{w.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.timeline}>
            <span className={styles.timelineLine} aria-hidden="true" />
            {data.why.list.map((w, i) => (
              <Reveal key={i} delay={i * 100} className={styles.timelineRow}>
                <div className={styles.timelineCard}>
                  <span
                    className={styles.timelineNumber}
                    style={{ color: NODE_COLORS[i % NODE_COLORS.length] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className={styles.timelineTitle}>{w.title}</h4>
                  <p className={styles.timelineDesc}>{w.desc}</p>
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

export default WhyChooseUs;
