import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import OptimizedImg from "../OptimizedImg/OptimizedImg";
import { RichText } from "../ArticleBlocks/ArticleBlocks";
import PopularArticles from "../PopularArticles/PopularArticles";
import articleStyles from "../BlogArticle/ArticleDetail.module.css";
import { postTemplateCopy as copy } from "../../data/blog/templatePosts.js";
import {
  buildToc,
  estimateDuration,
  formatDate,
  headingId,
  initials,
  readTime,
} from "../../utils/blogPost.js";
import styles from "./BlogPostLayout.module.css";

const SITE_URL = "https://ingversionsdigital.com";
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap";
const MAX_CALENDAR_WEEKS = 12;
const pad = (n) => String(n).padStart(2, "0");

const Emphasis = ({ text, emphasis }) => {
  const at = emphasis ? text.lastIndexOf(emphasis) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <em className={styles.em}>{emphasis}</em>
      {text.slice(at + emphasis.length)}
    </>
  );
};

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

const Slider = ({ id, label, value, min, max, step, format, onChange }) => (
  <div className={styles.slider}>
    <div className={styles.sliderHead}>
      <label htmlFor={id}>{label}</label>
      <output htmlFor={id}>{format(value)}</output>
    </div>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </div>
);

const Estimator = () => {
  const [values, setValues] = useState({ baseline: 3, mde: 10, daily: 5000, variants: 2 });
  const set = (key) => (v) => setValues((s) => ({ ...s, [key]: v }));
  const { perVariant, days, weeks } = estimateDuration(values);
  const shownWeeks = Math.min(weeks, MAX_CALENDAR_WEEKS);
  const e = copy.estimator;

  return (
    <section className={styles.estimator} aria-labelledby="estimator-heading">
      <p className={styles.monoLabel}>{e.label}</p>
      <h3 id="estimator-heading" className={styles.estimatorHeading}>
        {e.heading}
      </h3>
      <div className={styles.estimatorGrid}>
        <div className={styles.sliders}>
          <Slider
            id="est-baseline"
            label={e.baseline}
            value={values.baseline}
            min={0.5}
            max={10}
            step={0.1}
            format={(v) => `${v.toFixed(1)}%`}
            onChange={set("baseline")}
          />
          <Slider
            id="est-mde"
            label={e.mde}
            value={values.mde}
            min={2}
            max={40}
            step={1}
            format={(v) => `${v}%`}
            onChange={set("mde")}
          />
          <Slider
            id="est-daily"
            label={e.daily}
            value={values.daily}
            min={500}
            max={50000}
            step={500}
            format={(v) => v.toLocaleString("en-US")}
            onChange={set("daily")}
          />
          <Slider
            id="est-variants"
            label={e.variants}
            value={values.variants}
            min={2}
            max={5}
            step={1}
            format={(v) => v}
            onChange={set("variants")}
          />
        </div>

        <div className={styles.result} aria-live="polite">
          <p className={styles.weeks}>
            {weeks.toLocaleString("en-US")} <span>{weeks === 1 ? "week" : "weeks"}</span>
          </p>
          <p className={styles.resultMeta}>
            {perVariant.toLocaleString("en-US")} {e.perVariant} · {days.toLocaleString("en-US")}{" "}
            {e.days}
          </p>
          <div className={styles.calendar} aria-hidden="true">
            {Array.from({ length: shownWeeks * 7 }, (_, i) => (
              <span
                key={i}
                className={[
                  styles.day,
                  i < days ? styles.dayOn : styles.dayRest,
                  i % 7 >= 5 ? styles.dayWeekend : "",
                ].join(" ")}
              />
            ))}
          </div>
          {weeks > MAX_CALENDAR_WEEKS && (
            <p className={styles.resultMeta}>
              + {weeks - MAX_CALENDAR_WEEKS} {e.moreWeeks}
            </p>
          )}
          {weeks > 6 && <p className={styles.estimatorWarn}>{e.warning}</p>}
        </div>
      </div>
      <p className={styles.estimatorFoot}>
        {e.assumptions}{" "}
        <Link to={e.calculatorHref} className={styles.estimatorLink}>
          {e.calculatorLabel}
        </Link>
      </p>
    </section>
  );
};

const Block = ({ block: b, numbers, showEstimator }) => {
  switch (b.type) {
    case "p":
      return (
        <p>
          <RichText text={b.text} />
        </p>
      );
    case "h2":
      return (
        <h2 id={headingId(b)} className={styles.h2}>
          <span className={styles.num}>{numbers[headingId(b)]}</span>
          {b.text}
        </h2>
      );
    case "h3":
      return (
        <h3 id={headingId(b)} className={styles.h3}>
          {b.text}
        </h3>
      );
    case "ul":
      return (
        <ul className={styles.squareList}>
          {b.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className={styles.letterList}>
          {b.items.map((item, i) => (
            <li key={i}>
              <span className={styles.letter} aria-hidden="true">
                {String.fromCharCode(97 + i)}.
              </span>
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className={styles.quote}>
          <p>{b.text}</p>
        </blockquote>
      );
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
                    <th key={i} scope="col" className={b.numeric?.includes(i) ? styles.tnum : ""}>
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
                        <td key={i} className={b.numeric?.includes(i) ? styles.tnum : ""}>
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
                <span className={`${styles.monoLabel} ${win ? styles.compareWin : ""}`}>
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
              <span className={styles.monoLabel}>{s.label}</span>
            </li>
          ))}
        </ul>
      );
    case "warning":
      return (
        <aside className={styles.warning} aria-label={b.title}>
          <p className={styles.monoLabel}>{b.title}</p>
          <ul>
            {b.items.map((item, i) => (
              <li key={i}>
                <span className={styles.bang} aria-hidden="true">
                  !
                </span>
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </aside>
      );
    case "estimator":
      return showEstimator ? <Estimator /> : null;
    default:
      return null;
  }
};

const BlogPostLayout = ({ post }) => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const toc = buildToc(post, copy);
  const numbers = Object.fromEntries(toc.map((t, i) => [t.id, pad(i + 1)]));
  const { author, featuredImage: img } = post;
  const showProgress = post.progressBar !== false;
  const tocIds = toc.map((t) => t.id).join(" ");
  const [active, setActive] = useState(toc[0]?.id);
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      const ids = tocIds.split(" ");
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tocIds]);

  const goTo = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const encoded = encodeURIComponent(url);
  const cta = copy.serviceCta;

  return (
    <>
      <div className={styles.page}>
        <Helmet>
          <link rel="stylesheet" href={FONTS_URL} />
        </Helmet>
        {showProgress && <div ref={barRef} className={styles.progress} aria-hidden="true" />}

        <div className={styles.container}>
          <header className={styles.hero}>
            <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
              <ol>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <span className={styles.pill}>{post.category}</span>
                </li>
              </ol>
            </nav>
            <h1 className={styles.title}>
              <Emphasis text={post.title} emphasis={post.titleEmphasis} />
            </h1>
            <div className={styles.heroBottom}>
              {post.subtitle && <p className={styles.dek}>{post.subtitle}</p>}
              <dl className={styles.meta}>
                <div>
                  <dt>Written by</dt>
                  <dd>{author.name}</dd>
                </div>
                <div>
                  <dt>Published</dt>
                  <dd>
                    <time dateTime={post.publishedDate}>
                      {formatDate(post.publishedDate, "long")}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt>Reading</dt>
                  <dd>{readTime(post).replace(" read", "")}</dd>
                </div>
              </dl>
            </div>
          </header>
        </div>

        <figure
          className={`${styles.cover} ${post.coverLayout === "full" ? styles.coverFull : ""}`}
        >
          <div className={styles.coverFrame}>
            <OptimizedImg
              src={img.src}
              alt={img.alt}
              width={img.width ?? 1600}
              height={img.height ?? 840}
              priority
              className={styles.coverImg}
            />
            {img.caption && (
              <figcaption className={styles.coverCaption}>FIG. 00 — {img.caption}</figcaption>
            )}
          </div>
        </figure>

        <div className={`${styles.container} ${styles.columns}`}>
          <aside className={styles.sidebar}>
            {toc.length > 0 && (
              <nav aria-labelledby="toc-heading">
                <p id="toc-heading" className={styles.monoLabel}>
                  {copy.tocHeading}
                </p>
                <ol className={styles.toc}>
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        onClick={(e) => goTo(e, t.id)}
                        className={active === t.id ? styles.tocActive : undefined}
                        aria-current={active === t.id ? "location" : undefined}
                      >
                        <span className={styles.tocNum}>{numbers[t.id]}</span>
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className={styles.share}>
              <a
                className={styles.ghostPill}
                href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Share on X
              </a>
              <a
                className={styles.ghostPill}
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </aside>

          <article className={styles.article}>
            {post.quickAnswer && <p className={styles.lede}>{post.quickAnswer}</p>}

            {post.keyTakeaways?.length > 0 && (
              <>
                <h2 id="key-takeaways" className={styles.h2}>
                  <span className={styles.num}>{numbers["key-takeaways"]}</span>
                  {copy.takeawaysHeading}
                </h2>
                <ul className={styles.squareList}>
                  {post.keyTakeaways.map((t, i) => (
                    <li key={i}>
                      <RichText text={t} />
                    </li>
                  ))}
                </ul>
              </>
            )}

            {post.body.map((b, i) => (
              <Block
                key={i}
                block={b}
                numbers={numbers}
                showEstimator={post.showEstimator !== false}
              />
            ))}

            {post.faq?.length > 0 && (
              <section aria-labelledby="faq">
                <h2 id="faq" className={styles.h2}>
                  <span className={styles.num}>{numbers.faq}</span>
                  {copy.faqHeading}
                </h2>
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
              <Avatar author={author} size={64} />
              <div>
                <p className={styles.monoLabel}>Written by</p>
                <p className={styles.authorName}>{author.name}</p>
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

        <div className={styles.container}>
          <aside className={styles.serviceCta} aria-labelledby="service-cta-heading">
            <p className={styles.monoLabel}>{cta.label}</p>
            <h2 id="service-cta-heading" className={styles.serviceHeading}>
              {cta.heading}
            </h2>
            <p className={styles.serviceText}>{cta.text}</p>
            <div className={styles.serviceButtons}>
              <a
                href={cta.primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.creamPill}
                data-cta={cta.primaryLabel}
                data-cta-loc="Blog Post Service CTA"
              >
                {cta.primaryLabel}
              </a>
              <Link
                to={cta.secondaryHref}
                className={styles.outlinePill}
                data-cta={cta.secondaryLabel}
                data-cta-loc="Blog Post Service CTA"
              >
                {cta.secondaryLabel}
              </Link>
            </div>
          </aside>
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
