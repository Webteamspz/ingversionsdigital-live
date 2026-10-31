// Runs after `vite build`. Writes one HTML file per route into dist/ with that
// route's <SEO> head tags already in it, so crawlers that do not run JavaScript
// (link-preview bots, most AI crawlers) get a real title, description,
// canonical, and share image. The page body is rendered too (src/entry-server.jsx),
// so they also get the text and <a href> links; it is hidden by style.css and
// main.jsx replaces it with the live app, so visitors see no change.
// nginx.conf serves these files; keep its route list in sync with seoData.js.
// It also covers /blog and every post, and appends the blog URLs to the sitemap.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { createServer } from "vite";
import seo from "../src/data/seoData.js";

const vite = await createServer({
  mode: process.argv[2] || "production",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  logLevel: "error",
});

try {
  const { default: SEO } = await vite.ssrLoadModule("/src/components/SEO/SEO.jsx");
  // The blog data imports JSON, so it is loaded through Vite rather than Node.
  const blog = await vite.ssrLoadModule("/src/data/blog/blogSeo.js");
  const shell = await readFile("dist/index.html", "utf8");

  const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
  const pages = Object.entries(seo).map(([key, props]) => [
    key === "home" ? "index.html" : key === "notFound" ? "404.html" : `${props.path.slice(1)}.html`,
    props,
  ]);
  // /blog -> dist/blog.html, /blog/<slug> -> dist/blog/<slug>.html (see nginx.conf)
  pages.push(["blog.html", blog.blogHomeSeo]);
  for (const { slug } of blog.allPosts) pages.push([`blog/${slug}.html`, blog.getPostSeo(slug)]);

  await mkdir("dist/blog", { recursive: true });
  await mkdir("dist/case-studies", { recursive: true });
  for (const [file, props] of pages) {
    // React 19 renders <SEO>'s tags inline. Mark each one so main.jsx can
    // drop the static copies before the app mounts and adds its own.
    const head = renderToString(createElement(HelmetProvider, null, createElement(SEO, props)))
      .replace(/(^|>)<(title|meta|link|script)/g, "$1\n    <$2 data-prerender");
    if (!head.includes("<title")) throw new Error(`No head tags rendered for ${file}`);

    // The page body too, so crawlers get its text and <a href> links. The head
    // tags React renders inline are already above, so drop the body's copies.
    // It stays hidden (style.css) and main.jsx replaces it with the live app.
    const body = (await render(props.path || "/404"))
      .replace(/<title>[\s\S]*?<\/title>/g, "")
      .replace(/<meta [^>]*\/>/g, "")
      .replace(/<link rel="(canonical|preload)"[^>]*\/>/g, "")
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

    await writeFile(
      `dist/${file}`,
      shell
        .replace("</head>", `${head}\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root" data-prerendered>${body}</div>`)
    );
  }
  console.log(`prerendered ${pages.length} pages into dist/`);

  // public/sitemap.xml lists the main routes by hand; append every blog URL.
  // "April 8, 2026" parses as local midnight; format from local parts so a
  // UTC conversion cannot shift it to the previous day.
  const lastmod = (d) => {
    const t = isNaN(new Date(d).getTime()) ? new Date() : new Date(d);
    const pad = (n) => String(n).padStart(2, "0");
    return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
  };
  const entry = (path, date, freq, priority) =>
    `  <url>\n    <loc>https://ingversionsdigital.com${path}</loc>\n    <lastmod>${lastmod(date)}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  const newest = blog.allPosts.map((p) => p.date).sort((a, b) => new Date(b) - new Date(a))[0];
  const blogUrls =
    entry("/blog", newest, "weekly", "0.8") +
    blog.allPosts.map((p) => entry(`/blog/${p.slug}`, p.date, "monthly", "0.7")).join("");
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  await writeFile("dist/sitemap.xml", sitemap.replace("</urlset>", `\n${blogUrls}\n</urlset>`));
  console.log(`added ${blog.allPosts.length + 1} blog URLs to dist/sitemap.xml`);
} finally {
  await vite.close();
}
