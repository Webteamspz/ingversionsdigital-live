import styles from "./Projectscta.module.css";
import data from "../../data/projectsdata";

const ProjectsCTA = () => {
  return (
    <section className={styles.projectsCta} id="projectsContact">
      <div className={styles.projectsCtaBox}>
        <h2 className={styles.projectsCtaHeading}>{data.cta.title}</h2>
        <p className={styles.projectsCtaText}>{data.cta.subtitle}</p>

        <a href={data.cta.buttonLink} className={styles.projectsCtaButton}>
          {data.cta.buttonText}
        </a>
      </div>
    </section>
  );
};

export default ProjectsCTA;
