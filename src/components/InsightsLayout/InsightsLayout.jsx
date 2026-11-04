import { Link } from "react-router-dom";
import { RichText } from "../ArticleBlocks/ArticleBlocks";
import { postCards } from "../../data/blog/postCards.js";
import { insightsCopy as copy } from "../../data/blog/templatePosts.js";
import { categorySlug, formatDate, headingId, readTime, slugify } from "../../utils/blogPost.js";
import styles from "./InsightsLayout.module.css";

const LATEST_COUNT = 3;
const categoryHref = (name) => `/blog?category=${categorySlug(name)}`;

const categories = [...new Set(postCards.map((p) => p.category))]
  .map((name) => ({ name, count: postCards.filter((p) => p.category === name).length }))
  .sort((a, b) => b.count - a.count);

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
        <List className={styles.list}>
          {b.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <figure className={styles.figure}>
          <div className={styles.tableWrap} tabIndex={0} role="region" aria-label={b.caption}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {b.headers.map((h) => (
                    <th key={h} scope="col">
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
                        <td key={i}>{cell}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );
    case "code":
      return (
        <pre className={styles.code} tabIndex={0} aria-label={b.label ?? "Code"}>
          <code>{b.code}</code>
        </pre>
      );
    case "barChart": {
      const max = Math.max(...b.items.map((it) => it.value));
      return (
        <figure className={styles.figure}>
          <ul className={styles.chart}>
            {b.items.map((it) => (
              <li key={it.label}>
                <span className={styles.chartLabel}>{it.label}</span>
                <span className={styles.chartTrack} aria-hidden="true">
                  <span
                    className={styles.chartBar}
                    style={{ width: `${(it.value / max) * 100}%` }}
                  />
                </span>
                <span className={styles.chartValue}>{it.display ?? it.value}</span>
              </li>
            ))}
          </ul>
          {b.caption && <figcaption className={styles.caption}>{b.caption}</figcaption>}
        </figure>
      );
    }
    case "steps":
      return (
        <ol className={styles.steps} start={b.start ?? 1}>
          {b.items.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.badge}>{(b.start ?? 1) + i}</span>
              <div>
                <h3 id={slugify(step.title)} className={styles.stepTitle}>
                  {step.title}
                </h3>
                <p>
                  <RichText text={step.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
};

const InsightsLayout = ({ post }) => {
  const updated = post.updatedDate ?? post.publishedDate;
  const cta = post.sidebarCta ?? copy.reviewCta;
  const quickHeading = `${copy.quickAnswersPrefix} ${post.quickAnswersTopic ?? post.title}`;
  const related = post.relatedPost && postCards.find((p) => p.slug === post.relatedPost);
  const latest = postCards
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, LATEST_COUNT);

  const toc = [
    ...post.body.filter((b) => b.type === "h2").map((b) => ({ id: headingId(b), label: b.text })),
    ...(post.faq?.length ? [{ id: "faq", label: copy.faqHeading }] : []),
    ...(post.quickAnswers?.length ? [{ id: "quick-answers", label: quickHeading }] : []),
    ...(post.closing ? [{ id: slugify(post.closing.heading), label: post.closing.heading }] : []),
  ];

  return (
    <div className={styles.page}>
      <nav className={styles.categoryBar} aria-label={copy.categoriesLabel}>
        <ul className={styles.container}>
          {categories.map((c) => (
            <li key={c.name}>
              <Link
                to={categoryHref(c.name)}
                className={c.name === post.category ? styles.pillActive : styles.pill}
                aria-current={c.name === post.category ? "page" : undefined}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${styles.container} ${styles.columns}`}>
        <article className={styles.article}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link to="/blog">{copy.root}</Link>
              </li>
              <li>
                <Link to={categoryHref(post.category)}>{post.category}</Link>
              </li>
              <li aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <h1 className={styles.title}>{post.title}</h1>
          {post.summary && <p className={styles.summary}>{post.summary}</p>}

          <ul className={styles.meta}>
            <li>By {post.author.name}</li>
            <li>
              Updated <time dateTime={updated}>{formatDate(updated)}</time>
            </li>
            <li>{readTime(post)}</li>
            {post.reviewer && (
              <li>
                {copy.reviewedBy} {post.reviewer}
              </li>
            )}
          </ul>

          {post.tldr?.length > 0 && (
            <aside className={styles.tldr} aria-label={copy.tldrLabel}>
              <p className={styles.tldrLabel}>{copy.tldrLabel}</p>
              <ul>
                {post.tldr.map((t, i) => (
                  <li key={i}>
                    <RichText text={t} />
                  </li>
                ))}
              </ul>
            </aside>
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

          {post.quickAnswers?.length > 0 && (
            <section className={styles.quick} aria-labelledby="quick-answers">
              <h2 id="quick-answers">{quickHeading}</h2>
              <dl>
                {post.quickAnswers.map((q) => (
                  <div key={q.term}>
                    <dt>{q.term}</dt>
                    <dd>{q.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {post.closing && (
            <section aria-labelledby={slugify(post.closing.heading)}>
              <h2 id={slugify(post.closing.heading)}>{post.closing.heading}</h2>
              {post.closing.text.map((t, i) => (
                <p key={i}>
                  <RichText text={t} />
                </p>
              ))}
            </section>
          )}

          {related && (
            <p className={styles.related}>
              <strong>{copy.relatedLabel}</strong>{" "}
              <Link to={`/blog/${related.slug}`}>{related.title}</Link>
            </p>
          )}
        </article>

        <aside className={styles.sidebar}>
          {toc.length > 0 && (
            <nav className={styles.card} aria-labelledby="contents-heading">
              <h2 id="contents-heading" className={styles.cardHeading}>
                {copy.contentsHeading}
              </h2>
              <ol className={styles.toc}>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className={styles.ctaCard}>
            <h2 className={styles.cardHeading}>{cta.heading}</h2>
            <p>{cta.text}</p>
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
              data-cta={cta.buttonLabel}
              data-cta-loc="Blog Insights Sidebar"
            >
              {cta.buttonLabel}
            </a>
          </div>

          {copy.tools.length > 0 && (
            <nav className={styles.card} aria-labelledby="tools-heading">
              <h2 id="tools-heading" className={styles.cardHeading}>
                {copy.toolsHeading}
              </h2>
              <ul className={styles.tools}>
                {copy.tools.map((t) => (
                  <li key={t.href}>
                    <Link to={t.href}>{t.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>
      </div>

      {latest.length > 0 && (
        <section className={styles.container} aria-labelledby="latest-heading">
          <div className={styles.latestHead}>
            <h2 id="latest-heading">
              {copy.latestPrefix} {post.category}
            </h2>
            <Link to={categoryHref(post.category)}>
              {copy.viewAll} {post.category} →
            </Link>
          </div>
          <ul className={styles.latest}>
            {latest.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className={styles.latestCard}>
                  <span className={styles.latestCategory}>{p.category}</span>
                  <span className={styles.latestTitle}>{p.title}</span>
                  <span className={styles.latestMeta}>{p.readTime}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default InsightsLayout;
