import { Link, useParams } from "react-router-dom";
import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import ArticleBlocks from "../../components/ArticleBlocks/ArticleBlocks";
import BlogArticle from "../../components/BlogArticle/BlogArticle";
import PopularArticles from "../../components/PopularArticles/PopularArticles";
import RelatedService from "../../components/RelatedService/RelatedService";
import articleStyles from "../../components/BlogArticle/ArticleDetail.module.css";
import { articles } from "../../data/blog/articlesData.js";
import { getStructuredPost } from "../../data/blog/structuredPosts.js";
import { getPostSeo, blogNotFoundSeo } from "../../data/blog/blogSeo.js";
import styles from "./BlogNotFound.module.css";
import "./blog.css";

const BlogNotFound = () => (
  <section className={styles.nfWrapper}>
    <div className={styles.decor} aria-hidden="true">
      <span className={styles.shapeCircleTl} />
      <span className={styles.shapeSquareTr} />
      <span className={styles.shapeCircleBr} />
      <span className={styles.shapeSquareBl} />
    </div>
    <div className={styles.nfCard}>
      <h1 className={styles.nfTitle}>404</h1>
      <p className={styles.nfSubtitle}>The page you are looking for does not exist.</p>
      <Link to="/blog" className={styles.nfBtn}>Go Back Home</Link>
    </div>
  </section>
);

const PostBody = ({ slug }) => {
  const structured = getStructuredPost(slug);
  if (structured) {
    return (
      <div className={articleStyles["article-main"]}>
        <div className={`${articleStyles["article-hero-shape"]} ${articleStyles["article-hero-shape-circle"]}`} aria-hidden="true" />
        <div className={`${articleStyles["article-hero-shape"]} ${articleStyles["article-hero-shape-square"]}`} aria-hidden="true" />
        <article className={articleStyles["article-container"]}>
          <ArticleBlocks post={structured} />
          <div className={articleStyles["article-content-wrapper"]}>
            <PopularArticles currentSlug={slug} />
          </div>
        </article>
      </div>
    );
  }

  const article = articles[slug];
  if (article) return <BlogArticle slug={slug} article={article} />;

  return <BlogNotFound />;
};

const BlogPost = () => {
  const { slug } = useParams();
  const seo = getPostSeo(slug) ?? blogNotFoundSeo;

  return (
    <>
      <SEO {...seo} />
      <Layout header={1} footer={1}>
        <div className="ing-blog">
          <PostBody key={slug} slug={slug} />
          <RelatedService slug={slug} />
        </div>
      </Layout>
    </>
  );
};

export default BlogPost;
