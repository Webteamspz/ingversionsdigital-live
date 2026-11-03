import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, Link2 } from "lucide-react";
import OptimizedImg from "../OptimizedImg/OptimizedImg";
import { RichText } from "../ArticleBlocks/ArticleBlocks";
import PopularArticles from "../PopularArticles/PopularArticles";
import articleStyles from "../BlogArticle/ArticleDetail.module.css";
import { postTemplateCopy as copy } from "../../data/blog/templatePosts.js";
import { buildToc, formatDate, headingId, initials, readTime } from "../../utils/blogPost.js";
import styles from "./BlogPostLayout.module.css";

const SITE_URL = "https://ingversionsdigital.com";
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Source+Sans+3:wght@400;600&display=swap";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.9h-4v-11Z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
    <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.73H5.58l11.09 14.44Z" />
  </svg>
);

const Avatar = ({ author, size }) =>
  author.avatar ? (
    <img
      src={author.avatar}
      alt=""
      width={size}
      height={size}
      className={styles.avatar}
      loading="lazy"
    />
  ) : (
    <span
      className={styles.avatar}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials(author.name)}
    </span>
  );

const ShareButtons = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={styles.share}>
      <a
        className={styles.shareBtn}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon />
      </a>
      <a
        className={styles.shareBtn}
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
      >
        <XIcon />
      </a>
      <button
        type="button"
        className={styles.shareBtn}
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        {copied ? <Check size={18} aria-hidden="true" /> : <Link2 size={18} aria-hidden="true" />}
      </button>
      <span className={styles.srOnly} aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
};

const CtaPanel = () => (
  <aside className={styles.midCta} aria-labelledby="mid-cta-heading">
    <h2 id="mid-cta-heading" className={styles.midCtaHeading}>
      {copy.midCta.heading}
    </h2>
    <p>{copy.midCta.text}</p>
    <a
      href={copy.midCta.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.creamBtn}
      data-cta={copy.midCta.buttonLabel}
      data-cta-loc="Blog Post Mid CTA"
    >
      {copy.midCta.buttonLabel}
    </a>
  </aside>
);

const Block = ({ block: b }) => {
  switch (b.type) {
    case "p":
      return (
        <p>
          <RichText text={b.text} />
        </p>
      );
    case "h2":
      return <h2 id={headingId(b)}>{b.text}</h2>;
    case "h3":
      return <h3 id={headingId(b)}>{b.text}</h3>;
    case "ul":
    case "ol": {
      const List = b.type;
      return (
        <List>
          {b.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "formula":
      return (
        <div className={styles.formula}>
          <p className={styles.formulaText}>{b.text}</p>
          {b.note && <p className={styles.formulaNote}>{b.note}</p>}
        </div>
      );
    case "table":
      return (
        <figure className={styles.tableFigure}>
          <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={b.caption}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {b.headers.map((h, i) => (
                    <th key={i} scope="col" className={b.numeric?.includes(i) ? styles.num : ""}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className={b.numeric?.includes(i) ? styles.num : ""}>
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.caption && <figcaption className={styles.caption}>{b.caption}</figcaption>}
        </figure>
      );
    case "compare":
      return (
        <figure className={styles.compare}>
          <div className={styles.compareGrid}>
            {[
              ["Control", b.control, false],
              ["Variant · winner", b.variant, true],
            ].map(([label, img, win]) => (
              <div key={label} className={styles.compareItem}>
                <span className={`${styles.compareLabel} ${win ? styles.compareWin : ""}`}>
                  {label}
                </span>
                <OptimizedImg {...img} className={styles.compareImg} />
              </div>
            ))}
          </div>
          {b.caption && <figcaption className={styles.caption}>{b.caption}</figcaption>}
        </figure>
      );
    case "image":
      return (
        <figure className={styles.figure}>
          <OptimizedImg src={b.src} alt={b.alt} width={b.width} height={b.height} />
          {b.caption && <figcaption className={styles.caption}>{b.caption}</figcaption>}
        </figure>
      );
    case "statCards":
      return (
        <ul className={styles.stats}>
          {b.items.map((s) => (
            <li key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>
      );
    case "warning":
      return (
        <aside className={styles.warning}>
          <p className={styles.warningTitle}>{b.title}</p>
          <p>
            <RichText text={b.text} />
          </p>
        </aside>
      );
    case "cta":
      return <CtaPanel />;
    default:
      return null;
  }
};

const BlogPostLayout = ({ post }) => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const toc = buildToc(post, copy);
  const { author, featuredImage: img } = post;
  const chips = [post.category, post.tags?.[0]].filter(Boolean);
  const updated = post.updatedDate ?? post.publishedDate;

  return (
    <>
      <div className={styles.page}>
        <Helmet>
          <link rel="stylesheet" href={FONTS_URL} />
        </Helmet>

        <div className={styles.container}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>{post.category}</li>
              <li aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <header className={styles.hero}>
            <ul className={styles.chips} aria-label="Topics">
              {chips.map((c, i) => (
                <li key={c} className={i === 0 ? styles.chipPurple : styles.chipPink}>
                  {c}
                </li>
              ))}
            </ul>
            <h1 className={styles.title}>{post.title}</h1>
            {post.subtitle && <p className={styles.subtitle}>{post.subtitle}</p>}

            <div className={styles.authorRow}>
              <div className={styles.authorMeta}>
                <Avatar author={author} size={48} />
                <div>
                  <p className={styles.authorName}>{author.name}</p>
                  <p className={styles.metaLine}>
                    {author.role} · Updated <time dateTime={updated}>{formatDate(updated)}</time> ·{" "}
                    {readTime(post)}
                  </p>
                </div>
              </div>
              <ShareButtons url={url} title={post.title} />
            </div>
          </header>

          <figure className={styles.featured}>
            <OptimizedImg
              src={img.src}
              alt={img.alt}
              width={img.width ?? 1600}
              height={img.height ?? 840}
              priority
              className={styles.featuredImg}
            />
            {img.caption && <figcaption className={styles.caption}>{img.caption}</figcaption>}
          </figure>

          <div className={styles.columns}>
            <aside className={styles.sidebar}>
              {toc.length > 0 && (
                <nav aria-labelledby="toc-heading" className={styles.toc}>
                  <p id="toc-heading" className={styles.tocHeading}>
                    {copy.tocHeading}
                  </p>
                  <ol>
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`}>{t.label}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className={styles.sidePanel}>
                <p className={styles.sidePanelHeading}>{copy.sidebarCta.heading}</p>
                <p>{copy.sidebarCta.text}</p>
                <a
                  href={copy.sidebarCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.purpleBtn}
                  data-cta={copy.sidebarCta.buttonLabel}
                  data-cta-loc="Blog Post Sidebar"
                >
                  {copy.sidebarCta.buttonLabel}
                </a>
              </div>
            </aside>

            <article className={styles.article}>
              {post.quickAnswer && (
                <div className={styles.quickAnswer}>
                  <p className={styles.quickLabel}>Quick answer</p>
                  <p className={styles.quickText}>{post.quickAnswer}</p>
                </div>
              )}

              {post.keyTakeaways?.length > 0 && (
                <>
                  <h2 id="key-takeaways">{copy.takeawaysHeading}</h2>
                  <ul>
                    {post.keyTakeaways.map((t, i) => (
                      <li key={i}>
                        <RichText text={t} />
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {post.body.map((b, i) => (
                <Block key={i} block={b} />
              ))}

              {post.faq?.length > 0 && (
                <section aria-labelledby="faq">
                  <h2 id="faq">{copy.faqHeading}</h2>
                  <div className={styles.faqList}>
                    {post.faq.map((f, i) => (
                      <details key={f.question} className={styles.faqItem} open={i === 0}>
                        <summary>{f.question}</summary>
                        <p>{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <section className={styles.authorBox} aria-label="About the author">
                <Avatar author={author} size={80} />
                <div>
                  <p className={styles.writtenBy}>Written by</p>
                  <p className={styles.authorBoxName}>{author.name}</p>
                  {author.bio && <p className={styles.authorBio}>{author.bio}</p>}
                  {author.linkedin && (
                    <a href={author.linkedin} target="_blank" rel="noopener noreferrer">
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>

      <div className={`${articleStyles["article-main"]} ${styles.endMain}`}>
        <div className={articleStyles["article-content-wrapper"]}>
          <PopularArticles currentSlug={post.slug} />

          <div className={articleStyles["article-cta-box"]}>
            <h3 className={articleStyles["cta-heading"]}>{copy.endCta.heading}</h3>
            <p className={articleStyles["cta-text"]}>{copy.endCta.text}</p>
            <a
              href={copy.endCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={articleStyles["cta-button"]}
              data-cta={copy.endCta.buttonLabel}
              data-cta-loc="Blog Article CTA"
            >
              {copy.endCta.buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostLayout;
