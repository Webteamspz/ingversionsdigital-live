import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import data from "../../data/sitedata";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './BlogSlider.module.css';

const BlogSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className={styles.blogSection}>
      <div className={`container ${styles.blogContainer}`}>
        <div className={styles.blogSectionHeader}>
          <div className={styles.blogHeadingGroup}>
            <span className={styles.blogEyebrow}>From the blog</span>
            <h2 className={styles.startedTitle}>{data.blog.heading}</h2>
          </div>

          <a href={data.blog.seeMoreUrl} className={styles.seeMoreLink}>
            {data.blog.seeMoreText}
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>

        <button
          className={`${styles.tsNav} ${styles.tsPrev}`}
          ref={prevRef}
          aria-label="Previous blog"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M0.999921 8.5H15.5833M15.5833 8.5L8.58325 1.5M15.5833 8.5L8.58325 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <button
          className={`${styles.tsNav} ${styles.tsNext}`}
          ref={nextRef}
          aria-label="Next blog"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M0.999921 8.5H15.5833M15.5833 8.5L8.58325 1.5M15.5833 8.5L8.58325 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onInit={(swiper) => {
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className={styles.blogSwiper}
        >
          {data.blog.list.map((article) => (
            <SwiperSlide key={article.id}>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.blogCardLink}>
                <div className={styles.blogCard}>
                  <div className={styles.imgWrapper}>
                    <img src={article.image} alt={article.title} className={styles.blogImage} loading="lazy" />
                    <span className={styles.blogDateBadge}>{article.date}</span>
                  </div>
                  <div className={styles.blogContent}>
                    <h3 className={styles.blogTitle}>{article.title}</h3>
                    <p className={styles.blogDesc}>{article.desc}</p>
                    <span className={styles.blogReadLink}>
                      Read article
                      <span className={styles.blogReadIcon} aria-hidden="true">
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </span>
                    </span>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BlogSlider;
