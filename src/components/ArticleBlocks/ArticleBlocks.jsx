import { Link } from "react-router-dom";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
// Icons are resolved by name from blogPosts.json, so every icon is needed.
// This module only loads with the lazy /blog/:slug route.
import * as Lucide from "lucide-react";
import { Calendar, Clock } from "lucide-react";

import styles from "./ArticleBlocks.module.css";
import CodeBlock from "../BlogArticle/CodeBlock";
import BlogFaq from "../BlogFaq/BlogFaq";
import { resolveToc } from "../../data/blog/structuredPosts.js";

// "bar-chart-3" -> Lucide.BarChart3; unknown names fall back to a circle.
const Icon = ({ name, size = 20 }) => {
  if (!name) return null;
  const pascal = name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  const Cmp = Lucide[pascal] ?? Lucide.Circle;
  return <Cmp size={size} />;
};

// Inline markup: **bold**, ==highlight==, [label](url), `code`.
const RichText = ({ text }) => {
  const tokens = text.split(/(\*\*[^*]+\*\*|==[^=]+==|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g);
  return (
    <>
      {tokens.map((tok, i) => {
        if (/^\*\*[^*]+\*\*$/.test(tok)) return <strong key={i}>{tok.slice(2, -2)}</strong>;
        if (/^==[^=]+==$/.test(tok))
          return (
            <mark key={i} className={styles.highlight}>
              {tok.slice(2, -2)}
            </mark>
          );
        if (/^`[^`]+`$/.test(tok))
          return (
            <code key={i} className={styles.inlineCode}>
              {tok.slice(1, -1)}
            </code>
          );
        const link = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link)
          return link[2].startsWith("/") ? (
            <Link key={i} to={link[2]} className={styles.link}>
              {link[1]}
            </Link>
          ) : (
            <a key={i} href={link[2]} className={styles.link}>
              {link[1]}
            </a>
          );
        return <Fragment key={i}>{tok}</Fragment>;
      })}
    </>
  );
};

const BlockView = ({ block: b }) => {
  switch (b.type) {
    case "paragraph":
      return (
        <p className={styles.paragraph}>
          <RichText text={b.text} />
        </p>
      );

    case "list": {
      const List = b.ordered ? "ol" : "ul";
      return (
        <List className={styles.list}>
          {(b.items ?? []).map((it, i) => (
            <li key={i}>
              <RichText text={it} />
            </li>
          ))}
        </List>
      );
    }

    case "callout":
      return (
        <div className={`${styles.callout} ${styles[`callout-${b.variant}`] ?? ""}`}>
          <span className={styles.calloutIcon}>
            <Icon name={b.icon} size={22} />
          </span>
          <div>
            {b.title ? <p className={styles.calloutTitle}>{b.title}</p> : null}
            <p className={styles.calloutText}>
              <RichText text={b.text} />
            </p>
            {b.items?.length ? (
              <ul className={styles.list}>
                {b.items.map((it, i) => (
                  <li key={i}>
                    <RichText text={it} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      );

    case "protip":
      return (
        <div className={styles.protip}>
          <span className={styles.protipIcon}>
            <Icon name={b.icon ?? "lightbulb"} size={20} />
          </span>
          <p className={styles.protipLabel}>{b.label ?? "PRO TIP"}</p>
          <p className={styles.protipText}>
            <RichText text={b.text} />
          </p>
          <ul className={styles.checklist}>
            {b.checklist?.map((it, i) => (
              <li key={i}>
                <Lucide.Check size={16} />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "featureGrid":
      return (
        <div className={styles.featureGrid} style={{ "--cols": b.columns ?? 2 }}>
          {(b.items ?? []).map((it, i) => (
            <div key={i} className={styles.featureCard}>
              <span className={`${styles.featureIcon} ${styles[`accent-${it.color}`] ?? ""}`}>
                <Icon name={it.icon} size={20} />
              </span>
              <p className={styles.featureTitle}>{it.title}</p>
              <p className={styles.featureText}>{it.text}</p>
            </div>
          ))}
        </div>
      );

    case "flowDiagram":
      return (
        <ol className={styles.flow}>
          {(b.steps ?? []).map((s, i) => (
            <li key={i} className={styles.flowStep}>
              <span className={`${styles.flowNum} ${styles[`accent-${s.color}`] ?? ""}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles.flowCard}>
                {s.icon ? (
                  <span className={styles.flowCardIcon}>
                    <Icon name={s.icon} size={18} />
                  </span>
                ) : null}
                <span className={styles.flowCardText}>
                  <span className={styles.flowTitle}>{s.title}</span>
                  {s.subtitle ? <span className={styles.flowSub}>{s.subtitle}</span> : null}
                </span>
              </div>
            </li>
          ))}
        </ol>
      );

    case "stepList":
      return (
        <ol className={styles.stepList}>
          {(b.steps ?? []).map((s, i) => (
            <li key={i} className={styles.step}>
              <span className={`${styles.stepNum} ${styles[`accent-${b.color}`] ?? ""}`}>{i + 1}</span>
              <div>
                <p className={styles.stepTitle}>{s.title}</p>
                <p className={styles.stepText}>
                  <RichText text={s.text ?? ""} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    // Optional width/height give the real aspect ratio; portrait images
    // (taller than wide, e.g. carousel slides) show narrower and centred.
    case "image":
      return (
        <figure className={`${styles.figure} ${b.height > b.width ? styles.figurePortrait : ""}`}>
          <img
            src={b.src}
            alt={b.alt ?? ""}
            width={b.width ?? 1200}
            height={b.height ?? 900}
            loading="lazy"
            decoding="async"
            className={styles.image}
          />
          {b.caption ? <figcaption className={styles.caption}>{b.caption}</figcaption> : null}
        </figure>
      );

    case "quote":
      return (
        <blockquote className={styles.quote}>
          <RichText text={b.text} />
          {b.cite ? <cite className={styles.cite}>— {b.cite}</cite> : null}
        </blockquote>
      );

    case "code":
      return (
        <div className={styles.codeWrap}>
          <CodeBlock>
            <code className={`language-${b.language ?? "text"}`}>{b.code}</code>
          </CodeBlock>
        </div>
      );

    case "table":
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {(b.headers ?? []).map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(b.rows ?? []).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "divider":
      return <hr className={styles.divider} />;

    default:
      return null;
  }
};

// A structured post (blogPosts.json): hero, sticky table of contents, sections, FAQ, CTA.
const ArticleBlocks = ({ post }) => {
  const toc = useMemo(() => resolveToc(post), [post]);
  const [activeAnchor, setActiveAnchor] = useState(toc[0]?.anchor ?? "");
  const itemRefs = useRef([]);
  const [marker, setMarker] = useState(null);

  // Highlight the section whose heading last scrolled past the trigger line.
  useEffect(() => {
    const elements = toc.map((it) => document.getElementById(it.anchor)).filter(Boolean);
    if (elements.length === 0) return;

    const TRIGGER = 130;
    let frame = 0;
    const sync = () => {
      frame = 0;
      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= TRIGGER) current = el.id;
        else break;
      }
      setActiveAnchor(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [toc]);

  // Slide the TOC marker to the active item.
  useEffect(() => {
    const place = () => {
      const li = itemRefs.current[toc.findIndex((it) => it.anchor === activeAnchor)];
      if (!li) return;
      const top = li.offsetTop;
      const height = li.offsetHeight;
      setMarker((m) => (m && m.top === top && m.height === height ? m : { top, height }));
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [activeAnchor, toc]);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroMain}>
          <div className={styles.badges}>
            {post.hero.badges.map((bd, i) => (
              <span key={i} className={`${styles.badge} ${styles[`badge-${bd.color}`] ?? ""}`}>
                {bd.label}
              </span>
            ))}
          </div>
          <h1 className={styles.title}>{post.hero.title}</h1>
          <p className={styles.excerpt}>{post.hero.excerpt}</p>
          <div className={styles.meta}>
            <span>
              <Calendar size={15} /> {post.meta.date}
            </span>
            <span>
              <Clock size={15} /> {post.meta.readTime}
            </span>
          </div>
        </div>
        {post.hero.image ? (
          <img
            src={post.hero.image.src}
            alt={post.hero.image.alt}
            width={1200}
            height={800}
            fetchPriority="high"
            decoding="async"
            className={styles.heroBanner}
          />
        ) : (
          <div className={styles.heroGrid}>
            {(post.hero.highlights ?? []).map((h, i) => (
              <div key={i} className={styles.heroCell}>
                <span className={`${styles.heroCellIcon} ${styles[`accent-${h.color}`] ?? ""}`}>
                  <Icon name={h.icon} size={18} />
                </span>
                <p className={styles.heroCellLabel}>{h.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className={styles.wrap}>
        <div className={styles.layout}>
          <aside className={styles.tocAside}>
            <nav className={styles.toc}>
              <p className={styles.tocEyebrow}>{post.toc.eyebrow}</p>
              <p className={styles.tocTitle}>{post.toc.title}</p>
              <ul className={styles.tocList}>
                <span
                  aria-hidden="true"
                  className={styles.tocMarker}
                  style={
                    marker
                      ? { transform: `translateY(${marker.top}px)`, height: marker.height }
                      : { opacity: 0 }
                  }
                />
                {toc.map((it, i) => (
                  <li
                    key={i}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                  >
                    <a
                      href={`#${it.anchor}`}
                      className={`${styles.tocLink} ${activeAnchor === it.anchor ? styles.tocLinkActive : ""}`}
                    >
                      {it.icon ? <Icon name={it.icon} size={15} /> : null}
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className={styles.content}>
            {post.intro.map((block, i) => (
              <div className={styles.lead} key={`intro-${i}`}>
                <BlockView block={block} />
              </div>
            ))}

            {post.body.sections.map((section) => (
              <section key={section.id} id={section.id} className={styles.section}>
                <h2 className={styles.sectionHead}>
                  <span className={`${styles.sectionNum} ${styles[`accent-${section.accent}`] ?? ""}`}>
                    {section.number}
                  </span>
                  {section.heading}
                </h2>
                {section.blocks.map((block, i) => (
                  <BlockView block={block} key={i} />
                ))}
              </section>
            ))}

            {post.faq ? (
              <section id={post.faq.id} className={styles.section}>
                <h2 className={styles.sectionHead}>{post.faq.heading}</h2>
                <BlogFaq items={post.faq.items} />
              </section>
            ) : null}

            {post.cta ? (
              <div className={styles.ctaBox}>
                <h3 className={styles.ctaHeading}>{post.cta.heading}</h3>
                <p className={styles.ctaText}>{post.cta.text}</p>
                <a
                  href={post.cta.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButton}
                  data-cta={post.cta.buttonLabel}
                  data-cta-loc="Blog Article CTA"
                >
                  {post.cta.buttonLabel}
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleBlocks;
