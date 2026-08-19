import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { SplitSquareHorizontal, ShoppingBag, CheckCircle2, Globe, LayoutTemplate, Users } from "lucide-react";

import data from "../../data/sitedata";
import styles from "./Services.module.css";
import Reveal from "../Reveal/Reveal";

const SERVICE_ICONS = {
  "ab-testing": SplitSquareHorizontal, shopify: ShoppingBag, qa: CheckCircle2,
  wordpress: Globe, "landing-page": LayoutTemplate, lead: Users,
};
const SERVICE_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];

const ServiceIcon = ({ iconKey, index, title }) => {
  const Icon = SERVICE_ICONS[iconKey];
  return (
    <span className={styles.iconCircle} style={{ background: SERVICE_COLORS[index % 4] }}>
      <Icon size={22} strokeWidth={2.5} color="#1E293B" aria-label={title} />
    </span>
  );
};

const Services = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
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
          >
            {data.services.list.map((s, i) => (
              <SwiperSlide key={i}>
                <div className={`${styles.card} ${styles.service}`}>
                  <ServiceIcon iconKey={s.icon} index={i} title={s.title} />
                  <h4 className={styles.serviceTitle}>{s.title}</h4>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.services}>
            {data.services.list.map((s, i) => (
              <Reveal key={i} delay={i * 80} className={`${styles.card} ${styles.service}`}>
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