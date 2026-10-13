import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import seo from "../../data/seodata";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <section className={styles.nfWrapper}>
      <SEO {...seo.notFound} />
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
        <p className={styles.nfSubtitle}>
          Or visit <Link to="/projects">Projects</Link>, <Link to="/pricing">Pricing</Link>,{" "}
          <Link to="/about-us">About Us</Link> or <Link to="/teampage">our Team</Link>.
        </p>
      </div>
    </section>
  );
};

export default NotFound;
