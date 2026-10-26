import data from "./sitedata.js";
import servicePages from "./servicepagesdata.js";
import abTest from "./abtestdata.js";

// Head tags per route: the props each page spreads into <SEO>.
// scripts/prerender.mjs reads this too, to write the same tags into static
// HTML for crawlers that do not run JavaScript. Plain data only, no JSX.
const home = { name: "Home", path: "/" };

const faqJsonLd = (list) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: list.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

const servicePageSeo = Object.fromEntries(
  Object.entries(servicePages).map(([slug, page]) => [
    slug,
    {
      title: page.seoTitle,
      description: page.seoDescription,
      path: `/${slug}`,
      breadcrumb: [home, { name: page.title, path: `/${slug}` }],
      jsonLd: faqJsonLd(page.faq),
    },
  ])
);

export default {
  ...servicePageSeo,
  home: {
    title: "Ingversions Digital | Shopify, CRO and A/B Testing Agency",
    description:
      "Shopify CRO agency building high-converting stores with A/B testing, conversion optimization, and custom Shopify development for fast-growing ecommerce brands.",
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faq.list.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  },
  projects: {
    title: "Shopify CRO Projects and Client Work | Ingversions Digital",
    description:
      "See how we've helped ecommerce brands grow through Shopify development, A/B testing, and conversion rate optimization.",
    path: "/projects",
    breadcrumb: [home, { name: "Projects", path: "/projects" }],
  },
  pricing: {
    title: "Shopify CRO & A/B Test Development Pricing | Ingversions Digital",
    description:
      "Clear monthly pricing for Shopify CRO programs and white-label A/B test development. Full QA on every test. Shopify development included. Plans from $999/mo or $99 per test.",
    path: "/pricing",
    breadcrumb: [home, { name: "Pricing", path: "/pricing" }],
  },
  abTestCalculator: {
    title: "Free A/B Test Calculator: Sample Size, MDE & Significance | Ingversions Digital",
    description:
      "Plan test duration and minimum detectable effect, then check statistical significance and sample ratio mismatch. Free, runs in your browser.",
    path: "/ab-test-calculator",
    breadcrumb: [home, { name: "A/B Test Calculator", path: "/ab-test-calculator" }],
    jsonLd: faqJsonLd(abTest.faq.items),
  },
  aboutUs: {
    title: "About Our Shopify CRO Agency | Ingversions Digital",
    description:
      "Ingversions Digital is a Shopify CRO agency serving ecommerce brands worldwide, based in Surat, India.",
    path: "/about-us",
    breadcrumb: [home, { name: "About Us", path: "/about-us" }],
  },
  team: {
    title: "Our Shopify CRO Team | Ingversions Digital",
    description:
      "Meet the team behind Ingversions Digital's Shopify CRO and conversion optimization work.",
    path: "/teampage",
    breadcrumb: [home, { name: "Team", path: "/teampage" }],
  },
  privacyPolicy: {
    title: "Privacy Policy | Ingversions Digital",
    description:
      "How Ingversions Digital collects, uses, shares, and protects your information across ingversionsdigital.com.",
    path: "/privacy-policy",
    breadcrumb: [home, { name: "Privacy Policy", path: "/privacy-policy" }],
  },
  termsOfService: {
    title: "Terms of Service | Ingversions Digital",
    description:
      "Terms and conditions for using ingversionsdigital.com and engaging Ingversions Digital's CRO, Shopify, and web development services.",
    path: "/terms-of-service",
    breadcrumb: [home, { name: "Terms of Service", path: "/terms-of-service" }],
  },
  thankYou: {
    title: "Thank You | Ingversions Digital",
    description: "Thanks for getting in touch with Ingversions Digital.",
    path: "/thank-you",
    noindex: true,
  },
  notFound: {
    title: "Page Not Found | Ingversions Digital",
    description: "The page you're looking for doesn't exist or may have moved.",
    noindex: true,
  },
};
