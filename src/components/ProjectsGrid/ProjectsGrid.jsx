import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./ProjectsGrid.module.css";
import Reveal from "../Reveal/Reveal";

const INITIAL_MOBILE_COUNT = 6;
const MOBILE_BREAKPOINT = 767.98;


// Tall screenshots scroll inside the phone screen, like a real mobile page.
const SCROLLABLE_RATIO = 1.9;

// A/B test cards show a still of the site that links to it.
const PhoneCard = ({ project }) => {
  const [scrollable, setScrollable] = useState(false);
  const isTest = project.type === "A/B Testing";
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
      {isTest ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.phoneView} ${styles.phoneFit}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          {img}
        </a>
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
            <PhoneCard project={project} />
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

      
    </div>
  );
};

export default ProjectsGrid;
