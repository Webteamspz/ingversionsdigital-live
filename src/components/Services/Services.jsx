import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, A11y } from "swiper/modules";
import { SplitSquareHorizontal, ShoppingBag, CheckCircle2, Globe, LayoutTemplate, Users } from "lucide-react";

import data from "../../data/sitedata";
import styles from "./Services.module.css";
import Reveal from "../Reveal/Reveal";
import useIsMobile from "../../hooks/useIsMobile";

const SERVICE_ICONS = {
  "ab-testing": SplitSquareHorizontal, shopify: ShoppingBag, qa: CheckCircle2,
  wordpress: Globe, "landing-page": LayoutTemplate, lead: Users,
};
const SERVICE_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];
const VISIBLE_SERVICES = data.services.list.filter((service) => service.icon !== "lead");

const ServiceIcon = ({ iconKey, index, title }) => {
  const Icon = SERVICE_ICONS[iconKey];
  return (
    <span className={styles.iconCircle} style={{ background: SERVICE_COLORS[index % 4] }}>
      <Icon size={22} strokeWidth={2.5} color="#1E293B" aria-label={title} />
    </span>
  );
};

const Services = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.servicesSection} id="services">
      <div className={styles.decor} aria-hidden="true">
        <span className={styles.shapeCircleTl} />
        <span className={styles.shapeSquareTr} />
        <span className={styles.shapeCircleBr} />
        <span className={styles.shapeSquareBl} />
      </div>
      <div className="container">
        <h3 className="section-title">{data.services.heading}</h3>
        <p className={styles.servicesSub}>{data.services.sub}</p>

        {isMobile ? (
          <Swiper
            modules={[Pagination, A11y]}
            pagination={{ clickable: true }}
            spaceBetween={24}
            slidesPerView={1}
            className={styles.servicesSwiper}
            autoplay={true}
          >
            {VISIBLE_SERVICES.map((s, i) => (
              <SwiperSlide key={i}>
                <div className={`${styles.card} ${styles.service}`}>
                  <span
                    className={styles.cornerFold}
                    style={{ background: SERVICE_COLORS[(i + 1) % 4] }}
                    aria-hidden="true"
                  />
                  <ServiceIcon iconKey={s.icon} index={i} title={s.title} />
                  <h4 className={styles.serviceTitle}>{s.title}</h4>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.services}>
            {VISIBLE_SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 80} className={`${styles.card} ${styles.service}`}>
                <span
                  className={styles.cornerFold}
                  style={{ background: SERVICE_COLORS[(i + 1) % 4] }}
                  aria-hidden="true"
                />
                <ServiceIcon iconKey={s.icon} index={i} title={s.title} />
                <h4 className={styles.serviceTitle}>{s.title}</h4>
                <p className={styles.serviceDesc}>{s.desc}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
