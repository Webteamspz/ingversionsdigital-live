import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";

import data from "../../data/sitedata";
import styles from "./ProjectsSlider.module.css";

// Only ever show this many cards in the teaser slider, no matter how big
// data.projects.list grows in sitedata.js.
const MAX_VISIBLE = 10;

export default function ProjectsSlider() {
  const { heading, pill, eyebrow, sub, filters, list } = data.projects;

  const [activeFilter, setActiveFilter] = useState("All Projects");
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const filtered =
    activeFilter === "All Projects"
      ? list
      : list.filter((p) => p.filter === activeFilter);

  const visibleProjects = filtered.slice(0, MAX_VISIBLE);

  return (
    <section className={styles.startedSection} id="projects">
      <div className={`container ${styles.startedContainer}`}>
        {/* <p className={styles.eyebrow}>{eyebrow}</p> */}
        <h3 className={`section-title ${styles.startedTitle}`}>
          {heading} <span className={styles.pill}>{pill}</span>
        </h3>
        {/* <p className={styles.subText}>{sub}</p> */}

        {/* <div className={styles.filterTabs}>
          {filters.map((tab) => (
            <button
              key={tab}
              className={`${styles.filterBtn} ${
                activeFilter === tab ? styles.filterBtnActive : ""
              }`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div> */}

        <button
          className={`${styles.tsNav} ${styles.tsPrev}`}
          ref={prevRef}
          aria-label="Previous projects"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M0.999921 8.5H15.5833M15.5833 8.5L8.58325 1.5M15.5833 8.5L8.58325 15.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          className={`${styles.tsNav} ${styles.tsNext}`}
          ref={nextRef}
          aria-label="Next projects"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M0.999921 8.5H15.5833M15.5833 8.5L8.58325 1.5M15.5833 8.5L8.58325 15.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <Swiper
          key={activeFilter}
          modules={[Navigation, A11y]}
          speed={600}
          loop={visibleProjects.length > 3}
          grabCursor
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides={false}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onInit={(swiper) => {
            swiperRef.current = swiper;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 18 },
            900: { slidesPerView: 2, spaceBetween: 22 },
            1200: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className={styles.testimonialSlider}
        >
          {visibleProjects.map((project) => (
            <SwiperSlide key={project.id} className={styles.projectCard}>
              <a href={project.url} className={styles.cardLink}>
                <div className={styles.cardImageWrap}>
                  <img
                    className={styles.cardImage}
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />
                </div>
                <div className={styles.cardBody}>
                  <div>
                    <p className={styles.cardCategory}>{project.category}</p>
                    <p className={styles.cardTitle}>{project.title}</p>
                  </div>
                  <span className={styles.cardArrow}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </SwiperSlide>
          ))}

          {visibleProjects.length === 0 && (
            <SwiperSlide>
              <p className={styles.emptyState}>
                No projects in this category yet.
              </p>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  );
}