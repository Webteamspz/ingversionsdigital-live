import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ArrowLeftRight, X } from "lucide-react";
import styles from "./ProjectsGrid.module.css";
import Reveal from "../Reveal/Reveal";

const INITIAL_MOBILE_COUNT = 6;
const MOBILE_BREAKPOINT = 767.98;


const BeforeAfterSlider = ({ beforeImg, afterImg, title }) => {
  const [sliderPos, setSliderPos] = useState(50); 

  return (
    <div className={styles.sliderContainer}>
      
      <img
        src={beforeImg}
        alt={`Before - ${title}`}
        className={styles.sliderImage}
        loading="lazy"
        decoding="async"
      />

      
      <div
        className={styles.clippedLayer}
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={afterImg}
          alt={`After - ${title}`}
          loading="lazy"
          decoding="async"
        />
      </div>

      
      <span
        className={`${styles.sliderLabel} ${styles.labelBefore}`}
        style={{ opacity: (100 - sliderPos) / 100 }}
      >
        Before
      </span>
      <span
        className={`${styles.sliderLabel} ${styles.labelAfter}`}
        style={{ opacity: sliderPos / 100 }}
      >
        After
      </span>

      
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(e.target.value)}
        className={styles.sliderInput}
        aria-label="Before and after comparison slider"
      />

      
      <div 
        className={styles.sliderHandleWrap} 
        style={{ left: `${sliderPos}%` }}
      >
        <div className={styles.sliderLine} />
        <div className={styles.sliderButton}>
          <ArrowLeftRight size={18} strokeWidth={2.5} color="var(--palette-border)" />
        </div>
      </div>
    </div>
  );
};

// Tall screenshots scroll inside the phone screen, like a real mobile page.
const SCROLLABLE_RATIO = 1.9;

const PhoneCard = ({ project, onExpand }) => {
  const [scrollable, setScrollable] = useState(false);
  const hasSlider = Boolean(project.beforeImage && project.afterImage);
  const img = (
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      decoding="async"
      onLoad={(e) => setScrollable(e.currentTarget.naturalHeight / e.currentTarget.naturalWidth > SCROLLABLE_RATIO)}
    />
  );

  return (
    <>
      <div className={styles.phoneBar}>
        <span className={styles.phoneUrl}>{project.title}</span>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.phoneGo}
          aria-label={`Visit ${project.title}`}
          data-cta={project.title}
          data-cta-loc="Projects Grid"
        >
          <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
      {hasSlider ? (
        <div
          className={styles.phoneView}
          onClick={() => onExpand(project)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onExpand(project);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`View before and after for ${project.title}`}
        >
          {img}
          <span className={styles.phonePill}>Before / After</span>
        </div>
      ) : (
        <div className={styles.phoneView} tabIndex={scrollable ? 0 : undefined}>
          {img}
          {scrollable && <span className={styles.phonePill}>Scroll</span>}
        </div>
      )}
    </>
  );
};

// Leaving a card sends its screen back to the top of the page.
const resetScroll = (e) => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  e.currentTarget
    .querySelector(`.${styles.phoneView}`)
    ?.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
};

const ProjectsGrid = ({ projects }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(projects.length);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setVisibleCount(mobile ? INITIAL_MOBILE_COUNT : projects.length);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [projects.length]);

  useEffect(() => {
    setVisibleCount(isMobile ? INITIAL_MOBILE_COUNT : projects.length);
  }, [projects, isMobile]);


  useEffect(() => {
    if (!selectedProject) {
      document.body.style.overflow = "unset";
      return;
    }
    document.body.style.overflow = "hidden";
    // Escape closes the before/after modal, like the close button.
    const onKey = (e) => e.key === "Escape" && setSelectedProject(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedProject]);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = isMobile && visibleCount < projects.length;

  return (
    <div className={styles.gridWrap}>
      <div className={styles.grid}>
        {visibleProjects.map((project, i) => (
          <Reveal
            key={project.id}
            delay={(i % 4) * 70}
            className={styles.phone}
            onMouseLeave={resetScroll}
          >
            <PhoneCard project={project} onExpand={setSelectedProject} />
          </Reveal>
        ))}

        {visibleProjects.length === 0 && (
          <p className={styles.empty}>No projects found in this category yet.</p>
        )}
      </div>

      {hasMore && (
        <button
          type="button"
          className={styles.viewMoreBtn}
          onClick={() =>
            setVisibleCount((prev) =>
              Math.min(prev + INITIAL_MOBILE_COUNT, projects.length)
            )
          }
        >
          View More Projects
          <span className={styles.chevron} aria-hidden="true">
            <ArrowRight size={16} strokeWidth={2.5} color="var(--palette-border)" />
          </span>
        </button>
      )}

      
      {selectedProject && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <X size={18} strokeWidth={2.5} color="var(--palette-border)" />
            </button>

            {selectedProject.beforeImage && selectedProject.afterImage ? (
              <BeforeAfterSlider
                beforeImg={selectedProject.beforeImage}
                afterImg={selectedProject.afterImage}
                title={selectedProject.title}
              />
            ) : (
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className={styles.modalSingleImage}
              />
            )}

            <div className={styles.modalCaption}>
              <h4>{selectedProject.title}</h4>
              <span>{selectedProject.industry}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsGrid;
