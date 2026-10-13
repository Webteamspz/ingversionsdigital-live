// Runs after `vite build`. Writes one HTML file per route into dist/ with that
// route's <SEO> head tags already in it, so crawlers that do not run JavaScript
// (link-preview bots, most AI crawlers) get a real title, description,
// canonical, and share image. The body is still the empty app shell.
// nginx.conf serves these files; keep its route list in sync with seodata.js.
import { readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { createServer } from "vite";
import seo from "../src/data/seodata.js";

const vite = await createServer({
  mode: process.argv[2] || "production",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  logLevel: "error",
});

try {
  const { default: SEO } = await vite.ssrLoadModule("/src/components/SEO/SEO.jsx");
  const shell = await readFile("dist/index.html", "utf8");

  for (const [key, props] of Object.entries(seo)) {
    // React 19 renders <SEO>'s tags inline. Mark each one so main.jsx can
    // drop the static copies before the app mounts and adds its own.
    const head = renderToString(createElement(HelmetProvider, null, createElement(SEO, props)))
      .replace(/(^|>)<(title|meta|link|script)/g, "$1\n    <$2 data-prerender");
    if (!head.includes("<title")) throw new Error(`No head tags rendered for ${key}`);

    const file =
      key === "home" ? "index.html" : key === "notFound" ? "404.html" : `${props.path.slice(1)}.html`;
    await writeFile(`dist/${file}`, shell.replace("</head>", `${head}\n  </head>`));
    console.log(`prerendered dist/${file}`);
  }
} finally {
  await vite.close();
}
