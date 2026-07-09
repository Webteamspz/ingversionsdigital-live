import styles from "./ProjectsHero.module.css";
import data from "../../data/projectsdata";

const ProjectsHero = ({ activeFilter, onFilterChange }) => {
  return (
    <div className={styles.heroTop}>
      <span className={styles.tag}>{data.hero.tag}</span>
      <h2 className={styles.heading}>
        {data.hero.headingPart1}{" "}
        <span className={styles.highlight}>{data.hero.headingHighlight}</span>
      </h2>
      <p className={styles.description}>{data.hero.description}</p>

      <div className={styles.filters}>
        {data.filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`${styles.filterBtn} ${
              activeFilter === filter ? styles.active : ""
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectsHero;
