import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { TrendingDown, Search, Calculator, Hourglass, ArrowUpRight, ArrowLeft, ArrowRight, X } from "lucide-react";
import siteData from "../../data/sitedata";
import OptimizedImg from "../OptimizedImg/OptimizedImg";
import Reveal from "../Reveal/Reveal";
import styles from "./CaseStudies.module.css";

const ICONS = { challenge: TrendingDown, action: Search, method: Calculator, timing: Hourglass };
const ICON_COLORS = {
  challenge: "var(--secondary)",
  action: "var(--quaternary)",
  method: "var(--tertiary)",
  timing: "var(--palette-accent-soft)",
};

const StoryCard = ({ heading, icon, paragraphs }) => {
  const Icon = ICONS[icon];
  return (
    <Reveal className={styles.story}>
      <span className={styles.cornerFold} style={{ background: ICON_COLORS[icon] }} aria-hidden="true" />
      <span className={styles.iconCircle} style={{ background: ICON_COLORS[icon] }} aria-hidden="true">
        <Icon />
      </span>
      <h4 className={styles.storyHeading}>{heading}</h4>
      {paragraphs.map((p) => (
        <p key={p} className={styles.text}>{p}</p>
      ))}
    </Reveal>
  );
};

// On the homepage the studies are a slider. `only` renders one study as a
// standalone page instead (its title becomes the h1).
const CaseStudies = ({ only }) => {
  const { heading, sub } = siteData.caseStudies;
  const list = siteData.caseStudies.list.filter((s) => !only || s.id === only);
  const Title = only ? "h1" : "h3";
  const dialogRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dotsRef = useRef(null);
  const [zoomed, setZoomed] = useState(null);

  const openShot = (shot) => {
    setZoomed(shot);
    dialogRef.current.showModal();
  };

  const renderStudy = (study) => (
    <article key={study.id} id={study.id} className={styles.card}>
      <header className={styles.head}>
        <div className={styles.tags}>
          {study.tags.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>
        <Title className={styles.title}>{study.title}</Title>
      </header>

      <div className={styles.body}>
        {/* The story cards only show on the standalone page, not in the homepage slider. */}
        {only && (
          <div className={styles.storyGrid}>
            {study.sections.map((s) => (
              <StoryCard key={s.heading} {...s} />
            ))}
          </div>
        )}

        <div className={styles.results}>
          <h4 className={styles.resultsHeading}>{study.results.heading}</h4>
          <ul className={styles.kpis}>
            {study.results.stats.map((s) => (
              <li key={s.label} className={styles.kpi}>
                <span className={styles.kpiValue}>{s.lift}</span>
                <span className={styles.kpiLabel}>{s.label}</span>
                <span className={styles.kpiRange}>
                  {s.before} → <strong>{s.after}</strong>
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.totals}>{study.results.totals}</p>

          {study.results.screenshots.length > 0 && (
            <div className={styles.shots}>
              {study.results.screenshots.map((shot) => (
                <figure key={shot.src} className={styles.shot}>
                  <span className={`${styles.shotLabel} ${styles[`shot${shot.label}`]}`}>
                    {shot.label}
                  </span>
                  <button
                    type="button"
                    className={styles.shotFrame}
                    onClick={() => openShot(shot)}
                    aria-label={`Enlarge: ${shot.caption}`}
                  >
                    <OptimizedImg src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
                  </button>
                  <figcaption>{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>

        {only && (
          <div className={styles.storyGrid}>
            {study.notes.map((n) => (
              <StoryCard key={n.heading} {...n} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.cta}>
        <div>
          <h4 className={styles.ctaHeading}>{study.cta.heading}</h4>
          <p className={styles.ctaText}>{study.cta.text}</p>
        </div>
        <a
          href={study.cta.buttonLink}
          className={styles.ctaButton}
          target="_blank"
          rel="noopener noreferrer"
          data-cta={study.cta.buttonText}
          data-cta-loc="Case Study"
        >
          {study.cta.buttonText}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </article>
  );

  return (
    <section className={`${styles.caseStudies} ${only ? styles.page : ""}`} id="case-studies">
      <div className={styles.decor} aria-hidden="true">
        <span className={styles.shapeCircle} />
        <span className={styles.shapeSquare} />
      </div>
      <div className="container">
        {only ? (
          list.map(renderStudy)
        ) : (
          <>
            <h2 className="section-title">{heading}</h2>
            <p className={styles.sub}>{sub}</p>

            {/* Controls come first in the markup so their refs exist when Swiper
                initialises; CSS `order` shows them below the slides. */}
            <div className={styles.sliderWrap}>
            <div className={styles.controls}>
              <button ref={prevRef} type="button" className={styles.navBtn} aria-label="Previous case study">
                <ArrowLeft size={20} strokeWidth={2.5} aria-hidden="true" />
              </button>
              <div ref={dotsRef} className={styles.dots} />
              <button ref={nextRef} type="button" className={styles.navBtn} aria-label="Next case study">
                <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>

            <Swiper
              modules={[Navigation, Pagination, A11y]}
              slidesPerView={1}
              spaceBetween={32}
              autoHeight
              a11y={{ prevSlideMessage: "Previous case study", nextSlideMessage: "Next case study" }}
              onBeforeInit={(swiper) => {
                // The controls render below the slider, so hand Swiper the elements here.
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.params.pagination.el = dotsRef.current;
              }}
              onInit={(swiper) => {
                swiper.navigation.init();
                swiper.navigation.update();
                swiper.pagination.init();
                swiper.pagination.render();
                swiper.pagination.update();
              }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              pagination={{ el: dotsRef.current, clickable: true }}
              className={styles.slider}
            >
              {list.map((study) => (
                <SwiperSlide key={study.id}>{renderStudy(study)}</SwiperSlide>
              ))}
            </Swiper>
            </div>
            <div className={styles.allLink}>
              <Link to="/case-studies" className="btn" data-cta="See all case studies" data-cta-loc="Case Studies">
                See all case studies <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Native dialog: Esc closes it; clicking the backdrop closes it too. */}
      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label={zoomed?.caption}
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        onClose={() => setZoomed(null)}
      >
        {zoomed && (
          <>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => dialogRef.current.close()}
              aria-label="Close"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <img src={zoomed.src} alt={zoomed.alt} width={zoomed.width} height={zoomed.height} />
          </>
        )}
      </dialog>
    </section>
  );
};

export default CaseStudies;
