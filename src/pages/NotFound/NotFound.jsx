import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <section className={styles.nfWrapper}>
      <SEO
        title="Page Not Found | Ingversions Digital"
        description="The page you're looking for doesn't exist or may have moved."
        noindex
      />
      <div className={styles.nfDecor} aria-hidden="true">
        <span className={styles.nfShapeCircleTl} />
        <span className={styles.nfShapeSquareTr} />
        <span className={styles.nfShapeCircleBr} />
        <span className={styles.nfShapeSquareBl} />
      </div>
      <div className={styles.nfCard}>
        <h1 className={styles.nfTitle}>404</h1>
        <p className={styles.nfSubtitle}>The page you are looking for does not exist.</p>
        <Link to="/" className={styles.nfBtn}>Go Back Home</Link>
      </div>
    </section>
  );
};

export default NotFound;
