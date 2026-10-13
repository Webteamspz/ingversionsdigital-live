import data from "./sitedata.js";

// Head tags per route: the props each page spreads into <SEO>.
// scripts/prerender.mjs reads this too, to write the same tags into static
// HTML for crawlers that do not run JavaScript. Plain data only, no JSX.
const home = { name: "Home", path: "/" };

export default {
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
    title: "Shopify CRO Pricing | Ingversions Digital",
    description:
      "Transparent pricing for Shopify CRO, A/B testing, UX research, and conversion optimization services for ecommerce brands.",
    path: "/pricing",
    breadcrumb: [home, { name: "Pricing", path: "/pricing" }],
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
