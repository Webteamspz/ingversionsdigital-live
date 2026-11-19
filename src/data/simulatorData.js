// Copy for the /ab-test-simulator page (components/AbSimulator). The phone screens are drawn by
// scene.js from the `scene` text below; `changes` ids match the regions it can highlight.
const simulatorData = {
  seo: {
    title: "Live A/B Test Simulator: Watch a Shopify Test Run",
    description:
      "Watch a Shopify A/B test run in 3D: traffic splits between control and variant, confidence builds day by day, and a winner is called only after a full week.",
    keywords: [
      "A/B test simulator",
      "A/B testing visualisation",
      "Shopify A/B test",
      "statistical significance explained",
    ],
  },
  tag: "Free interactive tool",
  title: "Live A/B Test Simulator",
  subtitle:
    "Our old homepage against the new one. Watch the test play out, visitor by visitor, day by day.",
  hint: "Drag to explore",
  load3d: "Load the 3D view",
  explore: "360° view",
  exploreExit: "Exit 360°",
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
  ],
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  ctaTitle: "Want to see this happen on your store?",
  ctaText:
    "Book a 30-minute call. We will find the first thing worth testing and build that test for free.",
  cta: {
    label: "Run a test like this on my store",
    href: "https://calendly.com/ingversionsdigital/30min",
  },
  model: { days: 14, baseRate: 0.024, lift: 0.18, aov: 65, loopSeconds: 28 },
  changesTitle: "What changed in B",
  changesHint: "Hover or tap a change to light it up on the phone.",
  changes: [
    { id: "headline", label: "Outcome headline: more revenue, same traffic" },
    { id: "cta", label: "High-contrast main button" },
    { id: "assure", label: "Risk reversal: free call, no contract" },
    { id: "proof", label: "Real result: +33.7% case study" },
  ],
  chart: "Confidence over time",
  // Text drawn inside the 3D scene
  scene: {
    logo: "/assets/simulator/logo.webp",
    gate: "VISITORS",
    sale: "+$65",
    a: "A · OLD HOMEPAGE",
    b: "B · NEW HOMEPAGE",
    screens: {
      a: "/assets/simulator/home-old.webp",
      b: "/assets/simulator/home-new.webp",
    },
    regions: {
      headline: [95, 310, 790, 516],
      cta: [95, 1110, 790, 355],
      assure: [95, 1475, 790, 150],
      proof: [95, 1660, 790, 330],
    },
  },
};

export default simulatorData;
