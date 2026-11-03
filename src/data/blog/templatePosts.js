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
  serviceCta: {
    label: "Related service — A/B Testing",
    heading: "Stop guessing what your visitors want.",
    text: "We research, design, build and run structured A/B tests on Shopify, from the hypothesis to the GA4-checked result, so every change you ship is backed by your own data.",
    primaryLabel: "Book a free CRO review",
    primaryHref: "https://calendly.com/ingversionsdigital/30min",
    secondaryLabel: "Explore the service",
    secondaryHref: "/ab-testing",
  },
  estimator: {
    label: "Interactive",
    heading: "Estimate your test duration",
    baseline: "Baseline conversion",
    mde: "Minimum detectable effect",
    daily: "Daily visitors",
    variants: "Variants (incl. control)",
    perVariant: "visitors per variant",
    days: "days",
    moreWeeks: "more weeks not shown",
    warning: "Over 6 weeks: consider testing a bigger, bolder change.",
    assumptions: "95% confidence, 80% power, rounded up to full weeks.",
    calculatorLabel: "Open the full A/B test calculator →",
    calculatorHref: "/ab-test-calculator",
  },
  endCta: {
    heading: "Want results like these?",
    text: "We help Shopify stores optimize their conversion rates.",
    buttonLabel: "Get Started",
    href: "https://calendly.com/ingversionsdigital/30min",
  },
  faqHeading: "Frequently asked questions",
  takeawaysHeading: "Key takeaways",
  tocHeading: "In this article",
};
