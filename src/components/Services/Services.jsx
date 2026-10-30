import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, A11y } from "swiper/modules";
import { SplitSquareHorizontal, ShoppingBag, CheckCircle2, Globe, LayoutTemplate, Users, ArrowUpRight } from "lucide-react";

import data from "../../data/sitedata";
import styles from "./Services.module.css";
import Reveal from "../Reveal/Reveal";
import useIsMobile from "../../hooks/useIsMobile";
import { isExternalHref } from "../../utils/url";

const SERVICE_ICONS = {
  "ab-testing": SplitSquareHorizontal, shopify: ShoppingBag, qa: CheckCircle2,
  wordpress: Globe, "landing-page": LayoutTemplate, lead: Users,
};
const SERVICE_COLORS = ["var(--palette-accent)", "var(--secondary)", "var(--tertiary)", "var(--quaternary)"];
const VISIBLE_SERVICES = data.services.list.filter((service) => service.icon !== "lead");

const ServiceCardBody = ({ service, index }) => {
  const Icon = SERVICE_ICONS[service.icon];
  return (
    <>
      <span className={styles.icon} style={{ "--icon-bg": SERVICE_COLORS[index % 4] }} aria-hidden="true">
        <Icon size={44} strokeWidth={2.2} />
      </span>
      <div className={styles.body}>
        {service.eyebrow && <span className={styles.eyebrow}>{service.eyebrow}</span>}
        <h3 className={styles.serviceTitle}>
          {service.href && isExternalHref(service.href) ? (
            <a
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
              data-cta={service.title}
              data-cta-loc="Services"
            >
              {service.title}
            </a>
          ) : service.href ? (
            <Link to={service.href} className={styles.cardLink} data-cta={service.title} data-cta-loc="Services">
              {service.title}
            </Link>
          ) : (
            service.title
          )}
        </h3>
        <p className={styles.serviceDesc}>{service.desc}</p>
        {service.href && service.linkLabel && (
          <span className={styles.visit} aria-hidden="true">
            {service.linkLabel} <ArrowUpRight size={16} strokeWidth={2.5} />
          </span>
        )}
      </div>
    </>
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
        <h2 className="section-title">{data.services.heading}</h2>
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
                  <ServiceCardBody service={s} index={i} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.services}>
            {VISIBLE_SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 80} className={`${styles.card} ${styles.service}`}>
                <ServiceCardBody service={s} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
