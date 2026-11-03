import { readTime, formatDate } from "../../utils/blogPost.js";

const modules = import.meta.glob("./posts/*.js", { eager: true });

export const templatePosts = Object.values(modules).map((m) => m.default);

export const getTemplatePost = (slug) => templatePosts.find((p) => p.slug === slug) ?? null;

export const templateToCard = (p) => ({
  id: `post-${p.slug}`,
  title: p.title,
  slug: p.slug,
  excerpt: p.metaDescription,
  author: p.author,
  date: formatDate(p.publishedDate, "long"),
  readTime: readTime(p),
  category: p.category,
  coverImage: p.featuredImage.src,
});

export const postTemplateCopy = {
  sidebarCta: {
    heading: "Below the benchmark?",
    text: "We'll record a free 5-minute video review of your store.",
    buttonLabel: "Get my free review",
    href: "https://calendly.com/ingversionsdigital/30min",
  },
  midCta: {
    heading: "Want to know where your store is leaking sales?",
    text: "Book a free 30-minute call. We'll look at your store and tell you the first three tests we'd run.",
    buttonLabel: "Book a free call",
    href: "https://calendly.com/ingversionsdigital/30min",
  },
  endCta: {
    heading: "Want results like these?",
    text: "We help Shopify stores optimize their conversion rates.",
    buttonLabel: "Get Started",
    href: "https://calendly.com/ingversionsdigital/30min",
  },
  faqHeading: "Frequently asked questions",
  takeawaysHeading: "Key takeaways",
  tocHeading: "On this page",
};
