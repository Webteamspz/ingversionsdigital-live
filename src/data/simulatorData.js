// Copy for the /ab-test-simulator page (components/AbSimulator). The phone screens are drawn by
// scene.js from the `scene` text below; `changes` ids match the regions it can highlight.
const simulatorData = {
  seo: {
    title: "Live A/B Test Simulator: Watch a Shopify Test Run | Ingversions",
    description:
      "Watch a Shopify A/B test run in 3D: traffic splits between control and variant, confidence builds day by day, and a winner is called only after a full week.",
    keywords: [
      "A/B test simulator",
      "A/B testing visualisation",
      "Shopify A/B test",
      "statistical significance explained",
    ],
  },
  title: "Live A/B Test Simulator",
  subtitle: "Watch a Shopify A/B test play out, visitor by visitor, day by day.",
  hint: "Drag to explore",
  day: "Test day",
  of: "of",
  status: {
    early: "Too early to call. Run at least one full week.",
    running: "Not significant yet. Keep the test running.",
    winner: "Winner: Version B. Ship it.",
  },
  stats: {
    visitors: "Visitors / version",
    rates: "Conversion A → B",
    uplift: "Uplift",
    confidence: "Confidence",
    confidenceNote: "Ship at 95%",
    revenue: "Extra revenue / yr",
  },
  timeline: "Timeline",
  week: "1 full week",
  play: "Play simulation",
  pause: "Pause simulation",
  traffic: "Daily visitors",
  trafficOptions: [2000, 5000, 10000],
  camera: "View",
  views: [
    { id: "overview", label: "Overview" },
    { id: "a", label: "Control" },
    { id: "b", label: "Variant" },
    { id: "office", label: "Office" },
  ],
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  cta: {
    label: "Run a test like this on my store",
    href: "https://calendly.com/ingversionsdigital/30min",
  },
  disclaimer:
    "An example test with simulated traffic: 2.4% conversion rate, $65 order value, 18% lift. Real results vary by store.",
  model: { days: 14, baseRate: 0.024, lift: 0.18, aov: 65, loopSeconds: 28 },
  changesTitle: "What changed in B",
  changesHint: "Hover or tap a change to light it up on the phone.",
  changes: [
    { id: "cta", label: "Bold full-width Add to cart" },
    { id: "reviews", label: "Star rating & review count" },
    { id: "bundle", label: "Bundle & save offer" },
    { id: "trust", label: "Free shipping & returns badges" },
  ],
  chart: "Confidence over time",
  // Text drawn inside the 3D scene
  scene: {
    logo: "/assets/simulator/logo.webp",
    gate: "VISITORS",
    sale: "+$65",
    a: "A · CONTROL",
    b: "B · VARIANT",
    store: "LUMÉ",
    product: "Glow Serum",
    price: "$65.00",
    installments: "or 4 × $16.25",
    reviews: "4.9 · 2,341 reviews",
    bestseller: "BESTSELLER",
    bundle: [
      ["1 bottle", "$65"],
      ["2 bottles", "$110 · Save 15%"],
    ],
    ctaA: "Add to cart",
    ctaB: "Add to cart · Free shipping",
    trust: ["Free shipping", "30-day returns", "Secure checkout"],
    announce: "FREE SHIPPING ON EVERY ORDER",
  },
};

export default simulatorData;
