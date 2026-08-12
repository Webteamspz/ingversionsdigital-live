import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import data from "../../data/sitedata";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './BlogSlider.css'; 

const BlogSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="blog-section">
      <div className="container blog-container">
        
        {/* === Updated Header Section === */}
        <div className="blog-section-header">
          <h3 className="startedTitle">{data.blog.heading}</h3>
          
          <a href={data.blog.seeMoreUrl} className="see-more-link">
            {data.blog.seeMoreText}
          </a>
        </div>
        {/* ============================== */}

        {/* Custom Prev Button */}
        <button
          className="tsNav tsPrev"
          ref={prevRef}
          aria-label="Previous blog"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M0.999921 8.5H15.5833M15.5833 8.5L8.58325 1.5M15.5833 8.5L8.58325 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Custom Next Button */}
        <button
          className="tsNav tsNext"
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
          className="blog-swiper"
        >
          {data.blog.list.map((article) => (
            <SwiperSlide key={article.id}>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="blog-card-link">
                <div className="blog-card">
                  <div className="img-wrapper">
                    <img src={article.image} alt={article.title} className="blog-image" />
                    <span className="blog-category">{article.category}</span>
                  </div>
                  <div className="blog-content">
                    <h3 className="blog-title">{article.title}</h3>
                    <p className="blog-desc">{article.desc}</p>
                    <div className="blog-meta">
                      <span className="blog-date">{article.date}</span>
                      <span className="blog-read-time">{article.readTime}</span>
                    </div>
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