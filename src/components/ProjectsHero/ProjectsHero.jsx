import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./ProjectsHero.module.css";
import data from "../../data/projectsdata";

const ProjectsHero = ({ activeFilter, onFilterChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (filter) => {
    onFilterChange(filter);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.heroWrap}>
      <div className={styles.heroDecor} aria-hidden="true" />
      <div className="container">
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

          
          <div className={styles.mobileFilterWrap} ref={dropdownRef}>
            <button
              type="button"
              className={styles.dropdownTrigger}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span>{activeFilter}</span>
              <span
                className={`${styles.dropdownArrow} ${
                  isDropdownOpen ? styles.arrowOpen : ""
                }`}
                aria-hidden="true"
              >
                <ChevronDown size={16} strokeWidth={2.5} />
              </span>
            </button>

            {isDropdownOpen && (
              <ul className={styles.dropdownList} role="listbox">
                {data.filters.map((filter) => (
                  <li key={filter} role="option" aria-selected={activeFilter === filter}>
                    <button
                      type="button"
                      className={`${styles.dropdownItem} ${
                        activeFilter === filter ? styles.dropdownItemActive : ""
                      }`}
                      onClick={() => handleSelect(filter)}
                    >
                      {filter}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsHero;