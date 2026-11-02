import { articles } from "./articlesData.js";
import { articleImages, fallbackImagesByCategory } from "./articleImages.js";
import { structuredPosts, getStructuredPost } from "./structuredPosts.js";

const SITE_URL = "https://ingversionsdigital.com";
const home = { name: "Home", path: "/" };
const blog = { name: "Blog", path: "/blog" };

const toIso = (d) => {
  const t = new Date(d);
  return isNaN(t.getTime()) ? undefined : t.toISOString();
};

export const legacyHeroImage = (slug, article) =>
  articleImages[slug] ||
  fallbackImagesByCategory[article.categorySlug] ||
  fallbackImagesByCategory.cro;

const postingJsonLd = ({ headline, description, image, date, url }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline,
  description,
  image: [`${SITE_URL}${image}`],
  datePublished: toIso(date),
  author: { "@type": "Organization", name: "Ingversions Digital" },
  publisher: {
    "@type": "Organization",
    name: "Ingversions Digital",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logos/logo-192.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
});

export const blogHomeSeo = {
  title: "CRO, A/B Testing & Shopify Development Blog | Ingversions",
  description:
    "Practical insights on conversion rate optimization, A/B testing methodologies, and Shopify development best practices. Learn from real case studies and client experiences.",
  keywords: [
    "CRO",
    "conversion rate optimization",
    "A/B testing",
    "Shopify development",
    "eCommerce blog",
    "Shopify tips",
    "blog",
  ],
  path: "/blog",
  image: `${SITE_URL}/assets/blog/covers/photo-1460925895917-afdab827c52f.webp`,
  breadcrumb: [home, blog],
};

export const blogNotFoundSeo = {
  title: "Page Not Found | Ingversions Digital",
  description: "The page you're looking for doesn't exist or may have moved.",
  noindex: true,
};

export const getPostSeo = (slug) => {
  const path = `/blog/${slug}`;
  const url = `${SITE_URL}${path}`;

  const structured = getStructuredPost(slug);
  if (structured) {
    return {
      title: structured.seo.title,
      description: structured.seo.description,
      keywords: structured.seo.keywords,
      path,
      image: `${SITE_URL}${structured.meta.coverImage}`,
      breadcrumb: [home, blog, { name: structured.hero.title, path }],
      jsonLd: postingJsonLd({
        headline: structured.hero.title,
        description: structured.seo.description,
        image: structured.meta.coverImage,
        date: structured.meta.date,
        url,
      }),
    };
  }

  const article = articles[slug];
  if (!article) return null;

  const description =
    article.description ||
    article.content
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/## |### |`|\*\*|\*/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160)
      .replace(/\s+\S*$/, "");
  const image = legacyHeroImage(slug, article);

  return {
    title: `${article.title} | Ingversions Blog`,
    description,
    keywords: article.keywords || [article.category.toLowerCase(), "Shopify", "CRO", "A/B testing"],
    path,
    image: `${SITE_URL}${image}`,
    breadcrumb: [home, blog, { name: article.title, path }],
    jsonLd: postingJsonLd({ headline: article.title, description, image, date: article.date, url }),
  };
};

export const allPosts = [
  ...Object.entries(articles).map(([slug, a]) => ({ slug, date: a.date })),
  ...structuredPosts.map((p) => ({ slug: p.slug, date: p.meta.date })),
];
