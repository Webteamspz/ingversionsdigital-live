import { useMemo, useState } from "react";
import ProjectsHero from "../ProjectsHero/ProjectsHero";
import ProjectsGrid from "../ProjectsGrid/ProjectsGrid";
import ProjectsCTA from "../ProjectsCTA/ProjectsCTA";
import data from "../../data/projectsData";
import styles from "./ProjectsPage.module.css";

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState(data.filters[0]);

  const filteredProjects = useMemo(
    () => data.projects.filter((project) => project.type === activeFilter),
    [activeFilter]
  );

  return (
    <section className={styles.projectsSection} id="projects">
      <ProjectsHero
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <div className="container">
        <ProjectsGrid projects={filteredProjects} />
        <ProjectsCTA />
      </div>
    </section>
  );
};

export default ProjectsPage;
