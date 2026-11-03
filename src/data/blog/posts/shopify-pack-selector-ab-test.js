export default {
  title: "How a Clearer Pack Selector Lifted Shopify Mobile Conversion by 33.4%",
  titleEmphasis: "by 33.4%",
  slug: "shopify-pack-selector-ab-test",
  seoTitle: "Shopify Pack Selector A/B Test: +33.4% Mobile Conversion | Ingversions",
  metaDescription:
    "A real Shopify A/B test: one pack selector, visible free gifts and two simple tags lifted mobile conversion from 1.60% to 2.14% and revenue per visitor by 35.6%.",
  subtitle:
    "What we changed on Rapid Radios' product page, the numbers from the Convert reports, and the version that lost.",
  category: "A/B Testing",
  tags: ["Case study", "Product page"],
  author: {
    name: "Ingversions Team",
    role: "Shopify CRO & A/B testing",
    avatar: null,
    bio: "We plan, design, build and QA A/B tests for Shopify brands. Every result we publish comes straight from the testing tool's report.",
    linkedin: "https://in.linkedin.com/company/ingversions",
    type: "Organization",
  },
  showEstimator: true,
  progressBar: true,
  coverLayout: "inset",
  publishedDate: "2026-11-03",
  updatedDate: "2026-11-03",
  featuredImage: {
    src: "/assets/blog/covers/shopify-pack-selector-ab-test.webp",
    alt: "A shopper paying with a phone at a shop counter",
    caption: "Most product page decisions now happen on a phone, so we tested mobile first.",
    width: 1600,
    height: 840,
  },
  quickAnswer:
    "Rapid Radios sold walkie-talkies in packs, but shoppers had to work out the deal themselves. Replacing two quantity selectors with one pack selector that showed prices, savings, free gifts and Most popular / Best value tags lifted mobile conversion from 1.60% to 2.14% (+33.4%) at 98.9% confidence over 22 days.",
  keyTakeaways: [
    "One clear pack selector beat plain pack buttons plus a separate quantity box.",
    "Mobile conversion rose 33.4% and revenue per visitor rose 35.6% ($8.13 to $11.03).",
    "A desktop rebuild of the same idea won too: +25.6% conversion at 99.6% confidence.",
    "Adding the free gift tiles on their own looked worse early. The win came from the full package.",
  ],
  body: [
    { type: "h2", text: "The problem: shoppers had to do the maths" },
    {
      type: "p",
      text: "Rapid Radios sells nationwide push-to-talk radios in 2, 3, 4 and 6 packs, and every pack comes with free gifts. On mobile, the gifts only appeared in a small pop-up after a shopper picked a pack, and two quantity selectors competed for attention. Baseline mobile conversion was 1.60%.",
    },
    { type: "h3", text: "The hypothesis" },
    {
      type: "p",
      text: 'If we show the gifts for each pack clearly, use one pack selector, and label the 3-pack "Most popular" and the 6-pack "Best value", conversion will rise, because shoppers can see the deal and choose a pack faster.',
    },
    { type: "h2", text: "How we measured the lift" },
    {
      type: "p",
      text: "Traffic was split evenly between the original page and six variants that built up the idea in layers. Mobile and desktop were tested separately, and we do not call a winner below 95% confidence.",
    },
    {
      type: "formula",
      text: "Lift = (Variant CR − Control CR) ÷ Control CR",
      note: "(2.14% − 1.60%) ÷ 1.60% ≈ +33.4%, using Convert's unrounded figures",
    },
    {
      type: "table",
      caption: "Results for the winning variant (V3) against the original page",
      headers: ["Device", "Days", "Visitors", "Control CR", "V3 CR", "Lift", "Confidence"],
      numeric: [1, 2, 3, 4, 5, 6],
      rows: [
        ["Mobile", "22", "28,457", "1.60%", "2.14%", "+33.4%", "98.9%"],
        ["Desktop", "28", "26,698", "3.52%", "4.42%", "+25.6%", "99.6%"],
      ],
    },
    { type: "estimator" },
    { type: "h2", text: "What the winning page looked like" },
    {
      type: "compare",
      control: {
        src: "/assets/blog/pack-selector-ab-test/control.webp",
        alt: "Original mobile product page with plain 2-, 3-, 4- and 6-pack buttons and a separate quantity box",
        width: 282,
        height: 760,
      },
      variant: {
        src: "/assets/blog/pack-selector-ab-test/variant.webp",
        alt: "Winning mobile product page with one pack selector showing prices and savings, Most Popular and Best Value tags, and free gift tiles",
        width: 252,
        height: 760,
      },
      caption: "Mobile: the original pack buttons (left) and the winning V3 (right).",
    },
    {
      type: "statCards",
      items: [
        { value: "+33.4%", label: "Mobile conversion rate" },
        { value: "+35.6%", label: "Mobile revenue per visitor" },
        { value: "+25.6%", label: "Desktop conversion rate" },
      ],
    },
    {
      type: "warning",
      title: "What didn't work",
      items: [
        "The free gift tiles on their own (V1) looked much worse in the first days and were switched off.",
        "On desktop, adding only a per-radio price (V2) also looked worse early and was stopped.",
      ],
    },
    {
      type: "quote",
      text: "The lift only appeared once the clutter was removed and the tags were added.",
    },
    { type: "h2", text: "How to try this on your store" },
    {
      type: "ol",
      items: [
        "If you sell bundles or packs, show every option in one selector with its price and saving.",
        "Show what's included (gifts, shipping) next to each option, not in a pop-up.",
        "Tag one option as the default choice, but test the wording.",
        "Test mobile and desktop separately. See our guide on [how long to run an A/B test](/blog/how-long-to-run-ab-test).",
      ],
    },
    {
      type: "p",
      text: "You can read every Rapid Radios test, with the Convert reports, in the [full case study](/case-studies/rapid-radios-shopify-cro-case-study).",
    },
  ],
  faq: [
    {
      question: "Why did the gift tiles alone not work?",
      answer:
        "They added more to a page that was already busy. The win came when the gifts were shown inside a single, simpler pack selector.",
    },
    {
      question: "Was revenue per visitor significant too?",
      answer:
        "Yes. On mobile, revenue per visitor rose from $8.13 to $11.03 (+35.6%) at 97.9% confidence.",
    },
    {
      question: "Will the same change work on my store?",
      answer:
        "Not guaranteed. It suits stores that sell packs or bundles. Treat it as a hypothesis and A/B test it on your own traffic.",
    },
  ],
  relatedPostSlugs: ["how-long-to-run-ab-test", "testing-cta-buttons", "shopify-bundles-boost-aov"],
};
