import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Repeat, Clock, Briefcase } from "lucide-react";
import styles from "./EngagementModels.module.css";
import siteData from "../../data/sitedata";
import ContactModal from "../ContactModal/ContactModal";
import Reveal from "../Reveal/Reveal";

const ENGAGEMENT_ICONS = { retainer: Repeat, hoursblock: Clock, projectengagement: Briefcase };
const ENGAGEMENT_COLORS = { retainer: "var(--palette-accent)", hoursblock: "var(--secondary)", projectengagement: "var(--tertiary)" };

const EngagementModels = () => {
  const { heading, sub, list } = siteData.engagement;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const handleCtaClick = (e, cta, title) => {
    if (cta.href === "#contact") {
      e.preventDefault();
      setModalSource(title);
      setIsModalOpen(true);
    }
  };

  const renderCard = (model) => (
    <>
      <span
        className={styles.cornerFold}
        style={{ background: ENGAGEMENT_COLORS[model.icon] }}
        aria-hidden="true"
      />
      <div className={styles.iconCircle} style={{ background: ENGAGEMENT_COLORS[model.icon] }}>
        {(() => {
          const Icon = ENGAGEMENT_ICONS[model.icon];
          return Icon ? <Icon size={26} strokeWidth={2.5} color="#1E293B" aria-hidden="true" /> : null;
        })()}
      </div>

      <h3 className={styles.cardTitle}>{model.title}</h3>
      <p className={styles.cardDesc}>{model.desc}</p>

      <ul className={styles.featureList}>
        {model.features.map((feature, i) => (
          <li className={styles.featureItem} key={i}>
            <span className={styles.checkIcon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={model.cta.href}
        className={styles.learnMoreBtn}
        onClick={(e) => handleCtaClick(e, model.cta, model.title)}
      >
        {model.cta.label}
      </a>
    </>
  );

  return (
    <section className={styles.engagementSection} id="engagement">
      <div className={styles.decor} aria-hidden="true">
        <span className={styles.shapeCircleTl} />
        <span className={styles.shapeSquareTr} />
        <span className={styles.shapeCircleBr} />
        <span className={styles.shapeSquareBl} />
      </div>
      <div className="container">
        <h2 className="section-title">{heading}</h2>
        <p className={styles.engagementSub}>{sub}</p>

        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className={styles.engagementSwiper}
          >
            {list.map((model, index) => (
              <SwiperSlide key={index}>
                <div className={`${styles.card} ${styles.engagementCard}`}>
                  {renderCard(model)}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.engagementGrid}>
            {list.map((model, index) => (
              <Reveal key={index} delay={index * 80} className={`${styles.card} ${styles.engagementCard}`}>
                {renderCard(model)}
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source={modalSource}
      />
    </section>
  );
};

export default EngagementModels;
