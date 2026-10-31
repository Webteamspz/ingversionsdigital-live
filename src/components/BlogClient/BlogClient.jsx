import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styles from "./BlogClient.module.css";
import { postCards } from "../../data/blog/postCards.js";
import { coverThumb, homepageCategoryImages } from "../../data/blog/articleImages.js";

const getCategorySlug = (categoryName) => {
  if (!categoryName) return "all";
  if (categoryName === "Shopify Development") return "shopify";
  if (categoryName === "A/B Testing") return "ab-testing";
  if (categoryName === "Quality Assurance") return "qa";
  if (categoryName === "CRO") return "cro";
  return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

const articles = postCards
  .map((post) => ({ ...post, categorySlug: getCategorySlug(post.category) }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const categoryLabelBySlug = new Map();
for (const a of articles) {
  if (!categoryLabelBySlug.has(a.categorySlug)) categoryLabelBySlug.set(a.categorySlug, a.category);
}

const categories = [
  { id: "all", name: "All Posts", count: articles.length },
  ...[...categoryLabelBySlug.entries()]
    .map(([id, name]) => ({ id, name, count: articles.filter((a) => a.categorySlug === id).length }))
    .sort((a, b) => b.count - a.count),
];

const articleLabel = (n) => `${n} article${n === 1 ? "" : "s"}`;

const categoryCount = (id) => categories.find((c) => c.id === id)?.count ?? 0;

const categoryCards = [
  { id: "cro", title: "CRO", alt: "CRO analytics", hover: "hover-cro", bg: "bg-green-light",
    desc: "Conversion rate optimization strategies and best practices." },
  { id: "ab-testing", title: "A/B Testing", alt: "A/B testing", hover: "hover-ab", bg: "bg-orange-light",
    desc: "Testing methodologies and statistical significance." },
  { id: "shopify", title: "Shopify Development", alt: "Shopify development", hover: "hover-shopify", bg: "bg-purple-light",
    desc: "Theme customization and store optimization." },
  { id: "qa", title: "Quality Assurance", alt: "Quality Assurance", hover: "hover-qa", bg: "bg-blue-light",
    desc: "Automated testing, checklists, and performance tracking." },
  { id: "ai-automation", title: "AI & Automation", alt: "AI and automation", hover: "hover-cro", bg: "bg-green-light",
    desc: "Claude, MCP servers, and AI workflows for e-commerce." },
  { id: "design", title: "Design", alt: "Design", hover: "hover-ab", bg: "bg-orange-light",
    desc: "Product page design, UX, and conversion-focused layouts." },
];

const BlogClient = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const topRef = useRef(null);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredArticles =
    activeCategory === "all" ? articles : articles.filter((a) => a.categorySlug === activeCategory);

  return (
    <div className={styles["blog-main"]}>
      <section className={`${styles["blog-section"]} ${styles["hero-section"]}`} ref={topRef}>
        <div className={styles["hero-grid"]} aria-hidden="true" />
        <div className={`${styles.container} ${styles["text-center"]}`}>
          <h1 className={styles["hero-title"]}>
            Insights for <span className={styles["text-highlight"]}>Founders</span> Who Build
          </h1>
          <p className={styles["hero-subtitle"]}>
            Practical advice on conversion optimization, A/B testing, and Shopify development
          </p>

          <div className={styles["tabs-container"]}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles["tab-btn"]} ${activeCategory === cat.id ? styles.active : styles.inactive}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["blog-section"]}>
        <div className={styles.container}>
          <div className={styles["grid-header"]}>
            <h2 className={styles["section-title"]}>
              {activeCategory === "all"
                ? "Latest Articles"
                : categories.find((c) => c.id === activeCategory)?.name}
            </h2>
            <span className={styles["article-count"]}>{articleLabel(filteredArticles.length)}</span>
          </div>

          <div className={styles["articles-grid"]}>
            {filteredArticles.map((article) => (
              <Link key={article.id} to={`/blog/${article.slug}`} className={styles["block-link"]}>
                <article className={styles["article-card"]}>
                  <div className={styles["article-img-wrapper"]}>
                    <img
                      src={coverThumb(article.coverImage || homepageCategoryImages[article.categorySlug])}
                      alt={article.category}
                      loading="lazy"
                      decoding="async"
                      className={styles["article-img"]}
                    />
                    <span className={styles.badge}>{article.category}</span>
                  </div>

                  <div className={styles["article-content"]}>
                    <h3 className={styles["article-title"]}>{article.title}</h3>
                    <p className={styles["article-excerpt"]}>{article.excerpt}</p>
                    <div className={styles["meta-between"]}>
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["blog-section"]}>
        <div className={styles.container}>
          <h2 className={styles["section-title-center"]}>Browse by Category</h2>
          <div className={styles["categories-grid"]}>
            {categoryCards.map((card) => (
              <div
                key={card.id}
                className={`${styles["category-card"]} ${styles[card.hover]}`}
                onClick={() => handleCategoryClick(card.id)}
              >
                <div className={`${styles["category-img-wrapper"]} ${styles[card.bg]}`}>
                  <img
                    src={coverThumb(homepageCategoryImages[card.id])}
                    alt={card.alt}
                    loading="lazy"
                    decoding="async"
                    className={styles["category-img"]}
                  />
                </div>
                <h3 className={styles["category-title"]}>{card.title}</h3>
                <p className={styles["category-desc"]}>{card.desc}</p>
                <span className={styles["category-link"]}>
                  {articleLabel(categoryCount(card.id))}
                  <ArrowRight size={16} strokeWidth={3} className={styles["arrow-icon"]} aria-hidden="true" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogClient;
