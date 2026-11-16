import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import CaseStudies from "../../components/CaseStudies/CaseStudies";
import seo from "../../data/seoData";
import data from "../../data/siteData";
import styles from "./CaseStudy.module.css";

const page = data.caseStudiesPage;

const CaseStudy = ({ slug }) => {
  const study = data.caseStudies.list.find((s) => s.id === slug);
  return (
    <>
      <SEO {...Object.values(seo).find((p) => p.path === `/case-studies/${slug}`)} />
      <Layout header={1} footer={1}>
        <main>
          <section className={styles.hero}>
            <div className={`container ${styles.grid}`}>
              <div>
                <div className={styles.meta}>
                  <span className={styles.tag}>{page.detailTag}</span>
                  <span className={styles.client}>{study.client}</span>
                </div>
                <h1 className={styles.title}>{study.title}</h1>
                <ul className={styles.tags} aria-label="Tags">
                  {study.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className={styles.actions}>
                  <a
                    className={styles.btnPrimary}
                    href={study.cta.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta={study.cta.buttonText}
                    data-cta-loc="Case Study Hero"
                  >
                    {study.cta.buttonText}
                    <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
                  </a>
                  <Link
                    className={styles.btnGhost}
                    to={page.detailBack.href}
                    data-cta={page.detailBack.label}
                    data-cta-loc="Case Study Hero"
                  >
                    {page.detailBack.label}
                  </Link>
                </div>
              </div>

              <dl className={styles.proof}>
                {study.results.stats.slice(0, 3).map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <dd>{s.lift}</dd>
                    <dt>{s.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </section>
          <CaseStudies only={slug} />
        </main>
      </Layout>
    </>
  );
};

export default CaseStudy;
