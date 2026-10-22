// Copy for the /ab-test-calculator page. The maths lives in src/utils/abtest.js.
const abTestData = {
  hero: {
    tag: "Free Tool",
    title: "A/B Test Calculator",
    subtitle:
      "Plan how long a test needs to run, then check whether your result is real. Everything runs in your browser. Nothing is sent or stored.",
  },
  tabs: {
    plan: "Plan a test",
    results: "Check results",
  },
  plan: {
    intro: "Enter your weekly traffic to see the smallest lift your test can reliably detect each week.",
    fields: {
      weeklyVisitors: "Weekly visitors",
      weeklyConversions: "Weekly conversions",
      variants: "Variants (incl. control)",
      confidence: "Confidence",
      power: "Statistical power",
    },
    baseline: "Baseline conversion rate",
    table: { week: "Week", visitors: "Visitors / variant", mde: "Min. detectable lift" },
    note: "Pick the first week whose lift you could realistically achieve. Run full weeks so weekday and weekend traffic both count.",
    invalid: "Enter weekly visitors and conversions (conversions can't exceed visitors).",
  },
  results: {
    control: "Control (A)",
    variant: "Variant (B)",
    fields: {
      visitors: "Visitors",
      conversions: "Conversions",
      confidence: "Confidence",
      tails: "Test type",
    },
    tailOptions: { 2: "Two-sided", 1: "One-sided" },
    stats: {
      rateA: "Control rate",
      rateB: "Variant rate",
      uplift: "Relative uplift",
      pValue: "p-value",
    },
    verdicts: {
      winner: "Significant win. Variant B beats control.",
      loser: "Significant loss. Variant B performs worse than control.",
      flat: "Not significant yet. Keep the test running or treat it as flat.",
    },
    srm: "Sample ratio mismatch: traffic split is far from 50/50 (p < 0.01). Check your test setup before trusting this result.",
    invalid: "Enter visitors and conversions for both versions (conversions can't exceed visitors).",
  },
  confidenceOptions: [0.9, 0.95, 0.99],
  powerOptions: [0.8, 0.9],
  cta: {
    title: "Want us to run the test for you?",
    text: "We plan, build and analyse A/B tests for Shopify brands every week.",
    label: "Book A Call",
    href: "https://calendly.com/ingversionsdigital/30min",
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "What is minimum detectable effect (MDE)?",
        a: "The smallest relative lift your test can reliably spot with the traffic you have. If your MDE is 20% but you expect a 5% lift, the test will most likely end inconclusive.",
      },
      {
        q: "Which statistical method does this calculator use?",
        a: "A frequentist two-proportion z-test. Sample sizes use the standard power formula, with a Bonferroni correction when you test more than one variant against control.",
      },
      {
        q: "What is a sample ratio mismatch?",
        a: "When the traffic split between versions differs from what you configured more than chance allows. It usually means a tracking or redirect bug, and results from that test can't be trusted.",
      },
      {
        q: "Should I stop a test as soon as it turns significant?",
        a: "No. Checking daily and stopping on the first significant day inflates false positives. Decide the run time up front with the planner, then read the result once.",
      },
    ],
  },
};

export default abTestData;
