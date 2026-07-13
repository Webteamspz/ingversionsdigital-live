import { useEffect, useState } from "react";
import styles from "./Projectsgrid.module.css";

const INITIAL_MOBILE_COUNT = 6;
const MOBILE_BREAKPOINT = 767.98;

// Sub-component for the interactive 2-image comparison slider
// beforeImg = background layer, always fully visible underneath
// afterImg  = top layer, revealed from the LEFT as sliderPos increases (drag right)
const BeforeAfterSlider = ({ beforeImg, afterImg, title }) => {
  const [sliderPos, setSliderPos] = useState(50); // 0 = only before, 100 = only after

  return (
    <div className={styles.sliderContainer}>
      {/* Before Image (background layer, always fully visible) */}
      <img src={beforeImg} alt={`Before - ${title}`} className={styles.sliderImage} />

      {/* After Image (revealed from the LEFT edge as slider moves right) */}
      <div
        className={styles.clippedLayer}
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={afterImg} alt={`After - ${title}`} className={styles.sliderImage} />
      </div>

      {/* Labels fade in/out based on how much of that image is currently revealed */}
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

      {/* Invisible range input overlaying the entire container to capture drags/touches */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(e.target.value)}
        className={styles.sliderInput}
        aria-label="Before and after comparison slider"
      />

      {/* Custom visual dividing line and handle button */}
      <div className={styles.sliderHandleWrap} style={{ left: `${sliderPos}%` }}>
        <div className={styles.sliderLine} />
        <div className={styles.sliderButton}>
          <span>&#8594;</span>
          <span>&#8592;</span>
        </div>
      </div>
    </div>
  );
};

const ProjectsGrid = ({ projects }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(projects.length);
  const [selectedProject, setSelectedProject] = useState(null); // Tracks modal state

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setVisibleCount(mobile ? INITIAL_MOBILE_COUNT : projects.length);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    setVisibleCount(isMobile ? INITIAL_MOBILE_COUNT : projects.length);
  }, [projects, isMobile]);

  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = isMobile && visibleCount < projects.length;

  return (
    <div className={styles.gridWrap}>
      <div className={styles.grid}>
        {visibleProjects.map((project) => {
          // A project gets the slider modal only if it has BOTH before and after images.
          const hasSlider = Boolean(project.beforeImage && project.afterImage);

          return (
            <div key={project.id} className={styles.card}>
              {/* If project has both before/after images, clicking opens the slider modal.
                  Otherwise, clicking the thumbnail navigates directly to the project link. */}
              {hasSlider ? (
                <div
                  className={styles.imageWrap}
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View larger image for ${project.title}`}
                >
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className={styles.zoomHint}>Click to Expand</div>
                </div>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.imageWrap}
                  aria-label={`View ${project.title}`}
                >
                  <img src={project.image} alt={project.title} loading="lazy" />
                </a>
              )}

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardFooter}
              >
                <div className={styles.cardText}>
                  <span className={styles.category}>{project.industry}</span>
                  <h4 className={styles.title}>{project.title}</h4>
                </div>
                <span className={styles.arrow} aria-hidden="true">
                  &#8594;
                </span>
              </a>
            </div>
          );
        })}

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
            &#9662;
          </span>
        </button>
      )}

      {/* --- LIGHTBOX MODAL --- */}
      {selectedProject && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the image
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* If project has both before/after images, render the 2-image slider.
                Otherwise render single large image. */}
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