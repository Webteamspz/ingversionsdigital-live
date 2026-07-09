import { useEffect, useState } from "react";
import styles from "./ProjectsGrid.module.css";

const INITIAL_MOBILE_COUNT = 6;
const MOBILE_BREAKPOINT = 767.98;

// Sub-component for the interactive 3-image comparison slider
// mainImg  = static center image, fully visible when sliderPos = 50 (rest)
// afterImg = revealed growing in from the LEFT as sliderPos moves below 50 (drag left)
// beforeImg = revealed growing in from the RIGHT as sliderPos moves above 50 (drag right)
const BeforeAfterSlider = ({ mainImg, beforeImg, afterImg, title }) => {
  const [sliderPos, setSliderPos] = useState(50); // 50 = centered, mainImg fully visible

  // How much of afterImg to reveal (0-100), only when dragging left of center
  const leftReveal = sliderPos < 50 ? ((50 - sliderPos) / 50) * 100 : 0;
  // How much of beforeImg to reveal (0-100), only when dragging right of center
  const rightReveal = sliderPos > 50 ? ((sliderPos - 50) / 50) * 100 : 0;

  return (
    <div className={styles.sliderContainer}>
      {/* Main Image (Background layer, always fully visible underneath) */}
      <img src={mainImg} alt={`${title}`} className={styles.sliderImage} />

      {/* After Image (revealed from the LEFT edge as slider is dragged left) */}
      {afterImg && (
        <div
          className={styles.clippedLayer}
          style={{ clipPath: `inset(0 ${100 - leftReveal}% 0 0)` }}
        >
          <img src={afterImg} alt={`After - ${title}`} className={styles.sliderImage} />
        </div>
      )}

      {/* Before Image (revealed from the RIGHT edge as slider is dragged right) */}
      {beforeImg && (
        <div
          className={styles.clippedLayer}
          style={{ clipPath: `inset(0 0 0 ${100 - rightReveal}%)` }}
        >
          <img src={beforeImg} alt={`Before - ${title}`} className={styles.sliderImage} />
        </div>
      )}

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
          // A project gets the slider modal if it has at least one of beforeImage / afterImage.
          // The resting/center layer is mainImage, falling back to the thumbnail image.
          const hasSlider = Boolean(project.beforeImage || project.afterImage);

          return (
            <div key={project.id} className={styles.card}>
              {/* If project has slider images, clicking opens the lightbox/slider modal.
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

            {/* If project has slider images, render the 3-image slider (main center, after left, before right).
                Otherwise render single large image. */}
            {selectedProject.beforeImage || selectedProject.afterImage ? (
              <BeforeAfterSlider
                mainImg={selectedProject.mainImage || selectedProject.image}
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