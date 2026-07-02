import { useMemo, useState } from "react";
import ProjectsHero from "../ProjectsHero/ProjectsHero";
import ProjectsGrid from "../ProjectsGrid/ProjectsGrid";
import ProjectsCTA from "../ProjectsCTA/ProjectsCTA";
import data from "../../data/projectsdata";
import styles from "./ProjectsPage.module.css";

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState(data.filters[0]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === data.filters[0]) return data.projects;
    return data.projects.filter((project) => project.type === activeFilter);
  }, [activeFilter]);

  return (
    <section className={styles.projectsSection} id="projects">
      <div className="container">
        <ProjectsHero
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <ProjectsGrid projects={filteredProjects} />
        <ProjectsCTA />
      </div>
    </section>
  );
};

export default ProjectsPage;