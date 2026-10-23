// One entry per service page. The key is the URL slug (/ab-testing, ...).
// App.jsx, seodata.js and the Services cards all read this, so a new entry
// here is a new page; nginx.conf and public/sitemap.xml still need the slug.
// Plain data only: seodata.js imports this from Node.
const CALENDLY = "https://calendly.com/ingversionsdigital/30min";

export default {
  "ab-testing": {
    eyebrow: "Experimentation",
    title: "A/B Testing",
    keywords: ["Split testing","Conversion rate optimization","Shopify CRO","Hypothesis-driven","Variant design","Test QA","Data-backed decisions"],
    intro:
      "Stop guessing what your visitors want. We research, design, build and run structured A/B tests on your Shopify store, then scale the winners so every change is backed by data.",
    seoTitle: "A/B Testing for Shopify Stores | Ingversions Digital",
    seoDescription:
      "Structured A/B testing for Shopify and ecommerce brands: research-led hypotheses, designed and coded variants, QA and clear results you can act on.",
    flow: "ab-testing",
    pricing: "plans",
    pricingHeading: "Simple monthly plans",
    pricingSub: "Pick the testing velocity that fits your growth stage. Every plan includes strategy, test builds and reporting.",
    cta: { label: "Book A Call", href: CALENDLY },
    includedHeading: "What's included",
    included: [
      { title: "Research & hypotheses", desc: "We study your data and user behaviour to find what's holding conversions back, then turn it into testable ideas." },
      { title: "Designed variants", desc: "Every variant is designed in Figma for mobile and desktop before a line of code is written." },
      { title: "Clean test builds", desc: "Variants are coded properly, version-controlled and set up in your testing tool." },
      { title: "QA before launch", desc: "Each test is checked across devices and browsers so the data you collect is trustworthy." },
      { title: "Loom walkthroughs", desc: "You get a recorded walkthrough of every test, so you always know what changed and why." },
      { title: "Clear reporting", desc: "Results are reported in plain language, with a recommendation on what to ship next." },
    ],
    faqHeading: "A/B Testing FAQs",
    faq: [
      { q: "How long does an A/B test run?", a: "Until it reaches enough traffic and conversions to give a reliable answer. We agree the target before launch, so tests aren't stopped early on a lucky streak." },
      { q: "Will testing slow down my store?", a: "Variants are built to be lightweight and are QA'd before launch, so visitors get a fast, flicker-free experience." },
      { q: "Which testing tools do you use?", a: "We work in your existing testing tool, such as Convert, or help you choose and set one up." },
      { q: "What happens when a test wins?", a: "We recommend the winner, and can build it permanently into your theme so the gain sticks." },
    ],
  },
  "shopify-development": {
    eyebrow: "Shopify & Shopify Plus",
    title: "Shopify Development",
    keywords: ["Shopify themes","Shopify Plus","Custom sections","Store speed","Theme customization","No page builders"],
    intro:
      "Custom Shopify themes and features built natively for speed and conversions. No page builders, no bloat: just a store that's fast, flexible and easy for your team to run.",
    seoTitle: "Shopify Development & Custom Themes | Ingversions Digital",
    seoDescription:
      "Custom Shopify and Shopify Plus development: native themes, sections and features built for performance, conversions and easy editing.",
    flow: "shopify",
    pricing: "engagement",
    pricingHeading: "Pricing that fits the project",
    pricingSub: "Every project is quoted to its scope. Choose the engagement that suits how you like to work.",
    cta: { label: "Book A Call", href: CALENDLY },
    includedHeading: "What's included",
    included: [
      { title: "Custom themes", desc: "Themes designed for your brand and built natively in Shopify." },
      { title: "Theme sections", desc: "Reusable sections your team can edit in the theme editor without a developer." },
      { title: "Store features", desc: "Custom functionality built to fit how your store actually sells." },
      { title: "Speed & performance", desc: "Lean code and optimised assets so pages load fast on every device." },
      { title: "Shopify Plus", desc: "Support for Plus stores, from checkout customisation to multi-store setups." },
      { title: "Handover & support", desc: "A full handover when we launch, and ongoing support when you need it." },
    ],
    faqHeading: "Shopify Development FAQs",
    faq: [
      { q: "Can you work on my existing theme?", a: "Yes. We can extend and improve your current theme, or build a new one if that's the better long-term option." },
      { q: "Do you use page builders?", a: "No. We build natively in Shopify, which keeps your store faster and easier to maintain." },
      { q: "Will I be able to edit the store myself?", a: "Yes. We build editable sections so your team can update content without touching code." },
      { q: "Do you work with Shopify Plus?", a: "Yes, we build for both standard Shopify and Shopify Plus stores." },
    ],
  },
  "quality-assurance": {
    eyebrow: "Ship With Confidence",
    title: "Quality Assurance",
    keywords: ["Cross-browser testing","Mobile testing","Bug reporting","Checkout testing","Regression testing","Release sign-off"],
    intro:
      "End-to-end QA that catches bugs before your customers do. We test every page, flow and device that matters, log what's broken and retest every fix before it goes live.",
    seoTitle: "Website & Shopify Quality Assurance | Ingversions Digital",
    seoDescription:
      "End-to-end quality assurance for Shopify and ecommerce sites: cross-device testing, clear bug reports and verified fixes before launch.",
    flow: "qa",
    pricing: "engagement",
    pricingHeading: "Pricing that fits the project",
    pricingSub: "Every project is quoted to its scope. Choose the engagement that suits how you like to work.",
    cta: { label: "Book A Call", href: CALENDLY },
    includedHeading: "What's included",
    included: [
      { title: "Test planning", desc: "We map the pages, flows and features that need checking before anything is tested." },
      { title: "Cross-device testing", desc: "Testing across the browsers and devices your visitors actually use." },
      { title: "Functional testing", desc: "Every flow, from browsing to checkout, checked against a clear checklist." },
      { title: "Clear bug reports", desc: "Each issue is logged with screenshots and steps to reproduce." },
      { title: "Fix verification", desc: "Every fix is retested before it's closed, so nothing slips through." },
      { title: "Release sign-off", desc: "A final check and approval before your changes go live." },
    ],
    faqHeading: "Quality Assurance FAQs",
    faq: [
      { q: "Can you QA work built by another team?", a: "Yes. We can test any site or feature, whoever built it, and report back to your developers." },
      { q: "Which devices do you test on?", a: "We agree a device and browser list based on your visitors, covering mobile, tablet and desktop." },
      { q: "Do you fix the bugs you find?", a: "We can. Our developers can fix issues directly, or we hand clear reports to your team." },
      { q: "Do you QA A/B tests?", a: "Yes, every test we run is QA'd before launch, and we can QA tests built by others too." },
    ],
  },
  "wordpress-development": {
    eyebrow: "Custom Builds",
    title: "WordPress Development",
    keywords: ["Custom WordPress themes","Gutenberg blocks","Site speed","Responsive design","WordPress support"],
    intro:
      "Custom WordPress themes and sites built for performance and easy editing. A fast, secure site your team can update without fighting the editor.",
    seoTitle: "Custom WordPress Development | Ingversions Digital",
    seoDescription:
      "Custom WordPress themes and website development built for speed, security and easy content editing.",
    flow: "wordpress",
    pricing: "engagement",
    pricingHeading: "Pricing that fits the project",
    pricingSub: "Every project is quoted to its scope. Choose the engagement that suits how you like to work.",
    cta: { label: "Book A Call", href: CALENDLY },
    includedHeading: "What's included",
    included: [
      { title: "Custom themes", desc: "Themes designed for your brand and built from the ground up." },
      { title: "Easy editing", desc: "Flexible blocks and layouts your team can manage without a developer." },
      { title: "Speed & performance", desc: "Lean, well-structured code so pages load fast." },
      { title: "Responsive design", desc: "Every page built to work across mobile, tablet and desktop." },
      { title: "Plugins & integrations", desc: "The plugins and tools you need, set up and kept to a minimum." },
      { title: "Launch & support", desc: "A smooth go-live, plus ongoing support and updates." },
    ],
    faqHeading: "WordPress Development FAQs",
    faq: [
      { q: "Can you redesign my existing WordPress site?", a: "Yes. We can rebuild or refresh your current site while keeping your content." },
      { q: "Will I be able to update content myself?", a: "Yes. We build editable blocks and layouts so your team stays in control." },
      { q: "Do you use page builders?", a: "We build custom themes, which keeps the site faster and easier to maintain." },
      { q: "Do you offer support after launch?", a: "Yes, we can handle updates, fixes and new features after go-live." },
    ],
  },
  "landing-page-personalization": {
    eyebrow: "Personalization",
    title: "Landing Page Personalization",
    keywords: ["Dynamic content","Audience targeting","Ad-to-page matching","Landing page design","Conversion lift"],
    intro:
      "Landing pages that adapt to who's visiting. We tailor messaging, offers and layouts to each audience so more of your traffic turns into customers.",
    seoTitle: "Landing Page Personalization | Ingversions Digital",
    seoDescription:
      "Personalized landing pages that adapt messaging, offers and layouts to each audience to lift engagement and conversions.",
    flow: "landing-page",
    pricing: "engagement",
    pricingHeading: "Pricing that fits the project",
    pricingSub: "Every project is quoted to its scope. Choose the engagement that suits how you like to work.",
    cta: { label: "Book A Call", href: CALENDLY },
    includedHeading: "What's included",
    included: [
      { title: "Audience mapping", desc: "We identify the audiences and traffic sources worth tailoring pages for." },
      { title: "Tailored messaging", desc: "Headlines, offers and proof matched to what each audience cares about." },
      { title: "Page design", desc: "Landing pages designed for mobile first and built to convert." },
      { title: "Dynamic content", desc: "Content that changes based on campaign, source or visitor type." },
      { title: "Testing", desc: "Personalized pages tested against the default to prove the lift." },
      { title: "Ongoing optimization", desc: "We keep refining pages as results come in." },
    ],
    faqHeading: "Personalization FAQs",
    faq: [
      { q: "What can be personalized?", a: "Headlines, images, offers, layouts and calls to action, based on campaign, traffic source or visitor type." },
      { q: "Does this work with my ads?", a: "Yes. We can match landing pages to your ad campaigns so the message carries through from click to page." },
      { q: "How do you know it's working?", a: "We test personalized pages against your default page, so every change is measured." },
      { q: "Do I need a new website?", a: "No. Personalized pages can be built on your existing Shopify or WordPress site." },
    ],
  },
};
