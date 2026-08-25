import styles from "./ProjectsCTA.module.css";
import data from "../../data/projectsdata";
import Reveal from "../Reveal/Reveal";

const ProjectsCTA = () => {
  return (
    <section className={styles.projectsCta} id="projectsContact">
      <Reveal className={styles.projectsCtaBox}>
        <h2 className={styles.projectsCtaHeading}>{data.cta.title}</h2>
        <p className={styles.projectsCtaText}>{data.cta.subtitle}</p>

        <a href={data.cta.buttonLink} className={styles.projectsCtaButton}>
          {data.cta.buttonText}
        </a>
      </Reveal>
    </section>
  );
};

export default ProjectsCTA;
