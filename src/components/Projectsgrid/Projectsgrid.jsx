import { useEffect, useState } from "react";
import styles from "./ProjectsGrid.module.css";

const INITIAL_MOBILE_COUNT = 6;
const MOBILE_BREAKPOINT = 767.98;

const ProjectsGrid = ({ projects }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(projects.length);

  // Detect mobile vs desktop so we can paginate only on small screens,
  // exactly like the reference design (desktop shows everything at once).
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setVisibleCount(mobile ? INITIAL_MOBILE_COUNT : projects.length);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset pagination whenever the filtered project list changes
  // (e.g. user switches from "All Projects" to "Websites").
  useEffect(() => {
    setVisibleCount(isMobile ? INITIAL_MOBILE_COUNT : projects.length);
  }, [projects, isMobile]);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = isMobile && visibleCount < projects.length;

  return (
    <div className={styles.gridWrap}>
      <div className={styles.grid}>
        {visibleProjects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.imageWrap}>
              <img src={project.image} alt={project.title} loading="lazy" />
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardText}>
                <span className={styles.category}>{project.industry}</span>
                <h4 className={styles.title}>{project.title}</h4>
              </div>
              <span className={styles.arrow} aria-hidden="true">
                &#8594;
              </span>
            </div>
          </a>
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
            &#9662;
          </span>
        </button>
      )}
    </div>
  );
};

export default ProjectsGrid;