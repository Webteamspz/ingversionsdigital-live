import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styles from "./ArticleDetail.module.css";
import CodeBlock from "./CodeBlock";
import Mermaid from "./Mermaid";
import PopularArticles from "../PopularArticles/PopularArticles";
import { legacyHeroImage } from "../../data/blog/blogSeo.js";

const CALENDLY_URL = "https://calendly.com/ingversionsdigital/30min";

const markdownComponents = {
  a({ href = "", children }) {
    return href.startsWith("/") ? <Link to={href}>{children}</Link> : <a href={href}>{children}</a>;
  },
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    if (match?.[1] === "mermaid") {
      return <Mermaid chart={String(children).replace(/\n$/, "")} />;
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre({ children }) {
    const child = Array.isArray(children) ? children[0] : children;
    const cn = child?.props?.className || "";
    if (typeof cn === "string" && cn.includes("language-mermaid")) return <>{children}</>;
    return <CodeBlock>{children}</CodeBlock>;
  },
  img({ src, alt }) {
    if (typeof src !== "string") return null;
    const isDiagram = src.startsWith("/diagrams/");
    return (
      <img
        src={src}
        alt={alt ?? ""}
        width={isDiagram ? 420 : 1200}
        height={isDiagram ? 420 : 800}
        loading="lazy"
        decoding="async"
        className={isDiagram ? styles["markdown-diagram-img"] : undefined}
        style={{ width: "100%", height: "auto" }}
      />
    );
  },
};

const BlogArticle = ({ slug, article }) => (
  <div className={styles["article-main"]}>
    <div className={`${styles["article-hero-shape"]} ${styles["article-hero-shape-circle"]}`} aria-hidden="true" />
    <div className={`${styles["article-hero-shape"]} ${styles["article-hero-shape-square"]}`} aria-hidden="true" />

    <article className={styles["article-container"]}>
      <div className={styles["article-hero-wrapper"]}>
        <img
          src={legacyHeroImage(slug, article)}
          alt={article.title}
          fetchPriority="high"
          decoding="async"
          className={styles["article-hero-img"]}
        />
      </div>

      <div className={styles["article-content-wrapper"]}>
        <div className={styles["badge-container"]}>
          <span className={styles["article-badge"]}>{article.category}</span>
        </div>

        <h1 className={styles["article-title"]}>{article.title}</h1>

        <div className={styles["article-meta"]}>
          <span>{article.date}</span>
          <span className={styles["meta-dot"]}>•</span>
          <span>{article.readTime}</span>
        </div>

        <div className={`${styles["article-body"]} ${styles["markdown-content"]}`}>
          <ReactMarkdown components={markdownComponents}>{article.content}</ReactMarkdown>
        </div>

        <PopularArticles currentSlug={slug} />

        <div className={styles["article-cta-box"]}>
          <h3 className={styles["cta-heading"]}>Want results like these?</h3>
          <p className={styles["cta-text"]}>We help Shopify stores optimize their conversion rates.</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles["cta-button"]}
            data-cta="Get Started"
            data-cta-loc="Blog Article CTA"
          >
            Get Started
          </a>
        </div>
      </div>
    </article>
  </div>
);

export default BlogArticle;
