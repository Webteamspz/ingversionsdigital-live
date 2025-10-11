import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import data from "../../data/siteData";
import styles from "./Services.module.css";

/* GTM helpers */
import { dl } from "../../gtm";

const Services = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const viewedRef = useRef(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Fire a single view event when section is ≥50% visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!viewedRef.current && entry?.isIntersecting && entry.intersectionRatio >= 0.5) {
          viewedRef.current = true;
          dl().push({ event: "services_view", section: "Services" });
          io.disconnect();
        }
      },
      { threshold: [0.5] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.servicesSection} id="services">
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
            onInit={(sw) => {
              swiperRef.current = sw;

              // initial slide event
              const idx = sw.realIndex ?? 0;
              const svc = data.services.list[idx];
              dl().push({
                event: "services_slide_change",
                index: idx,
                title: svc?.title || "",
              });

              // pagination click -> GTM
              const el = sw.pagination?.el;
              if (el) {
                el.addEventListener("click", (e) => {
                  const t = e.target;
                  if (t && t.classList.contains("swiper-pagination-bullet")) {
                    const bullets = Array.from(el.children);
                    const index = bullets.indexOf(t);
                    dl().push({ event: "services_pagination_click", index });
                  }
                });
              }
            }}
            onSlideChange={(sw) => {
              const idx = sw.realIndex ?? 0;
              const svc = data.services.list[idx];
              dl().push({
                event: "services_slide_change",
                index: idx,
                title: svc?.title || "",
              });
            }}
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
