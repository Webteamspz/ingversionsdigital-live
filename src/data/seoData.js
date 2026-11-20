import data from "./siteData.js";
import servicePages from "./servicePagesData.js";
import abTest from "./abTestData.js";
import tools from "./toolsData.js";
import simulator from "./simulatorData.js";

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

const ORG = { "@id": "https://ingversionsdigital.com/#organization" };
const AREA_SERVED = ["Surat", "Gujarat", "India", "Worldwide"];

// Local business details for Surat searches. Production keeps its own index.html, so this lives
// here and reaches every environment through the prerendered home page.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://ingversionsdigital.com/#organization",
  name: "Ingversions Digital",
  url: "https://ingversionsdigital.com/",
  description:
    "CRO, A/B testing and Shopify development agency in Surat, Gujarat, India, working with ecommerce brands worldwide.",
  telephone: "+91-8866167750",
  email: "ingversionsdigital@gmail.com",
  image: "https://ingversionsdigital.com/assets/seo/og-image.jpg",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2599, Shiv Krupa Association, Kansad, Sachin",
    addressLocality: "Surat",
    addressRegion: "Gujarat",
    postalCode: "394230",
    addressCountry: "IN",
  },
  areaServed: AREA_SERVED,
  knowsAbout: [
    "Conversion rate optimization",
    "A/B testing",
    "Shopify development",
    "Shopify Plus",
  ],
};

const serviceJsonLd = (slug, page) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: page.h1 ?? page.title,
  description: page.seoDescription,
  url: `https://ingversionsdigital.com/${slug}`,
  provider: ORG,
  areaServed: AREA_SERVED,
});

const caseStudyJsonLd = ({ title, description, path }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url: `https://ingversionsdigital.com${path}`,
  mainEntityOfPage: `https://ingversionsdigital.com${path}`,
  image: "https://ingversionsdigital.com/assets/seo/og-image.jpg",
  author: ORG,
  publisher: ORG,
});

const servicePageSeo = Object.fromEntries(
  Object.entries(servicePages).map(([slug, page]) => [
    slug,
    {
      title: page.seoTitle,
      description: page.seoDescription,
      keywords: page.seoKeywords,
      path: `/${slug}`,
      breadcrumb: [home, { name: page.title, path: `/${slug}` }],
      jsonLd: [serviceJsonLd(slug, page), faqJsonLd(page.faq)],
    },
  ]),
);

const toolSeo = Object.fromEntries(
  Object.entries(tools).map(([slug, tool]) => [
    slug,
    {
      ...tool.seo,
      path: `/${slug}`,
      breadcrumb: [home, { name: tool.name, path: `/${slug}` }],
      jsonLd: faqJsonLd(tool.faq),
    },
  ]),
);

const seo = {
  ...servicePageSeo,
  ...toolSeo,
  home: {
    title: "Ingversions Digital | Shopify, CRO and A/B Testing Agency",
    description:
      "CRO agency in Surat, India, building high-converting Shopify stores with A/B testing, conversion optimization and custom Shopify development for ecommerce brands.",
    keywords: [
      "CRO agency in Surat",
      "A/B testing agency Surat",
      "Shopify agency Surat",
      "Shopify developer Surat",
      "CRO agency Gujarat",
      "CRO agency India",
      "Shopify CRO agency",
      "A/B testing agency",
      "conversion rate optimization",
      "Shopify development",
      "Shopify Plus agency",
      "ecommerce CRO",
    ],
    path: "/",
    jsonLd: [faqJsonLd(data.faq.list), localBusinessJsonLd],
  },
  projects: {
    title: "Shopify CRO Projects and Client Work | Ingversions Digital",
    description:
      "Shopify development, A/B testing and CRO projects for ecommerce brands: custom themes, landing pages and experiments we've designed, built and QA'd.",
    keywords: [
      "Shopify projects",
      "Shopify development portfolio",
      "CRO case studies",
      "A/B testing examples",
      "ecommerce web design",
    ],
    path: "/projects",
    breadcrumb: [home, { name: "Projects", path: "/projects" }],
  },
  pricing: {
    title: "Shopify CRO & A/B Test Development Pricing | Ingversions",
    description:
      "Shopify CRO plans from $999/mo with A/B tests, Shopify development and full QA included, plus white-label A/B test development for agencies.",
    keywords: [
      "Shopify CRO pricing",
      "A/B testing pricing",
      "CRO agency cost",
      "Shopify development pricing",
      "white label A/B testing pricing",
    ],
    path: "/pricing",
    breadcrumb: [home, { name: "Pricing", path: "/pricing" }],
  },
  services: {
    title: "Shopify CRO, A/B Testing & Development Services",
    description:
      "A/B testing, Shopify and Shopify Plus development, QA and landing page personalization for ecommerce brands. Full QA on every build; your first test is free.",
    keywords: [
      "Shopify CRO services",
      "A/B testing services",
      "Shopify development services",
      "ecommerce QA",
      "landing page personalization",
    ],
    path: "/services",
    breadcrumb: [home, { name: "Services", path: "/services" }],
  },
  abTestCalculator: {
    title: "Free A/B Test Calculator: Sample Size & Significance",
    description:
      "Plan test duration and minimum detectable effect, then check statistical significance and sample ratio mismatch. Free, runs in your browser.",
    keywords: [
      "A/B test calculator",
      "sample size calculator",
      "statistical significance calculator",
      "MDE calculator",
      "sample ratio mismatch",
    ],
    path: "/ab-test-calculator",
    breadcrumb: [home, { name: "A/B Test Calculator", path: "/ab-test-calculator" }],
    jsonLd: faqJsonLd(abTest.faq.items),
  },
  abSimulator: {
    ...simulator.seo,
    path: "/ab-test-simulator",
    breadcrumb: [home, { name: "A/B Test Simulator", path: "/ab-test-simulator" }],
  },
  caseStudies: {
    title: "Shopify CRO & A/B Testing Case Studies | Ingversions Digital",
    description:
      "Real Shopify A/B test and SEO results, measured in GA4: the challenge, what we built, and the numbers after launch, including a +58.62% add-to-cart lift.",
    keywords: [
      "Shopify CRO case studies",
      "A/B testing case study",
      "conversion rate optimization results",
      "ecommerce SEO case study",
    ],
    path: "/case-studies",
    breadcrumb: [home, { name: "Case Studies", path: "/case-studies" }],
  },
  rapidRadiosCaseStudy: {
    title: "Rapid Radios CRO Case Study: 52 A/B Tests, +41.5% Conversion",
    description:
      "52 A/B tests on Rapid Radios' Shopify product page: a sticky add-to-cart, free-gift tiles, an add-on upsell and trust buttons lifted conversion 24% to 41.5%.",
    keywords: [
      "Shopify CRO case study",
      "product page A/B test",
      "sticky add to cart test",
      "upsell A/B test",
      "Convert.com case study",
    ],
    path: "/case-studies/rapid-radios-shopify-cro-case-study",
    breadcrumb: [
      home,
      {
        name: "Rapid Radios Case Study",
        path: "/case-studies/rapid-radios-shopify-cro-case-study",
      },
    ],
  },
  ruffGreensCaseStudy: {
    title: "Ruff Greens CRO Case Study: 54 A/B Tests, +19.9% Conversion",
    description:
      "54 A/B tests on Ruff Greens' Shopify store: a benefit banner, a one-tap $0 trial unlock and feeding info on the trial page lifted conversion 8.8% to 19.9%.",
    keywords: [
      "Shopify CRO case study",
      "free trial page A/B test",
      "subscription CRO",
      "pet supplement ecommerce",
      "Convert.com case study",
    ],
    path: "/case-studies/ruff-greens-shopify-cro-case-study",
    breadcrumb: [
      home,
      { name: "Ruff Greens Case Study", path: "/case-studies/ruff-greens-shopify-cro-case-study" },
    ],
  },
  trustBadgesCaseStudy: {
    title: "Shopify Trust Badges A/B Test: +58.62% Add-to-Cart Case Study",
    description:
      "A 12-day, 4-variation Convert.com test on a Shopify product page: guarantee copy plus trust badges lifted add-to-cart 58.62%, while badges alone dropped 6.61%.",
    keywords: [
      "trust badges A/B test",
      "Shopify product page test",
      "add to cart rate",
      "guarantee copy",
      "Convert.com case study",
    ],
    path: "/case-studies/shopify-pdp-trust-badges-ab-test",
    breadcrumb: [
      home,
      { name: "Trust Badges Case Study", path: "/case-studies/shopify-pdp-trust-badges-ab-test" },
    ],
  },
  aboutUs: {
    title: "About Our Shopify CRO Agency | Ingversions Digital",
    description:
      "Ingversions Digital is a Shopify CRO agency in Surat, India, helping ecommerce brands worldwide grow with A/B testing, Shopify development and QA.",
    keywords: [
      "Shopify CRO agency India",
      "about Ingversions Digital",
      "conversion optimization agency",
      "Shopify experts",
    ],
    path: "/about-us",
    breadcrumb: [home, { name: "About Us", path: "/about-us" }],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      url: "https://ingversionsdigital.com/about-us",
      mainEntity: {
        "@type": "ProfessionalService",
        "@id": "https://ingversionsdigital.com/#organization",
        name: "Ingversions Digital",
        foundingDate: "2024",
        founder: [
          { "@type": "Person", name: "Harsh Jariwala", jobTitle: "Co-founder" },
          { "@type": "Person", name: "Rahul Patil", jobTitle: "Co-founder" },
        ],
        knowsAbout: [
          "Conversion rate optimization",
          "A/B testing",
          "Shopify development",
          "Shopify Plus",
          "Website quality assurance",
          "Landing page personalization",
        ],
      },
    },
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
  qaChecklist: {
    title: "Free Shopify A/B Test QA Checklist (PDF) | Ingversions",
    description:
      "Download the free 14-page QA checklist for Shopify A/B tests: 230+ checks for design, 360px to 4K responsiveness, flicker, tracking, Add to Cart, pricing and discounts.",
    keywords: [
      "QA checklist",
      "A/B test QA checklist",
      "Shopify QA checklist",
      "CRO QA checklist PDF",
      "website launch checklist",
    ],
    path: "/free-qa-checklist",
    breadcrumb: [home, { name: "Free QA Checklist", path: "/free-qa-checklist" }],
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

for (const key of ["rapidRadiosCaseStudy", "ruffGreensCaseStudy", "trustBadgesCaseStudy"]) {
  seo[key].jsonLd = caseStudyJsonLd(seo[key]);
}

export default seo;
