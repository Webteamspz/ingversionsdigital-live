import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import servicePages from "../../data/servicePagesData";
import styles from "./RelatedService.module.css";

const RelatedService = ({ slug }) => {
  const entry = Object.entries(servicePages).find(([, page]) => page.posts?.some((p) => p.slug === slug));
  if (!entry) return null;
  const [serviceSlug, page] = entry;
  return (
    <aside className={styles.box}>
      <span className={styles.eyebrow}>Related service</span>
      <p className={styles.text}>{page.intro}</p>
      <Link to={`/${serviceSlug}`} className={styles.link} data-cta={`Blog to ${page.title}`} data-cta-loc="Blog Post">
        Explore our {page.title} service <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </aside>
  );
};

export default RelatedService;
