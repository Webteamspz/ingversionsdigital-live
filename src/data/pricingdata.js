export const pricingHeroData = {
  tag: "Pricing",
  title: "The Right Plan For You",
  subtitle:
    "Choose a plan that fits your growth stage. Every plan includes CRO strategy, experiment execution, and transparent reporting.",
  primaryCta: "Book a strategy call",
  primaryHref: "/#contact",
  secondaryCta: "See comparison",
  secondaryHref: "#pricingComparison",
};

export const pricingPlans = [
  {
    badge: "Starter",
    name: "Growth",
    price: "$999",
    period: "/month",
    description: "For early-stage brands starting CRO + testing.",
    highlights: ["2 Experiments / month", "Basic UX audit", "Monthly reporting"],
    features: [
      { label: "CRO Audit", value: true },
      { label: "Experiment Roadmap", value: true },
      { label: "A/B Testing", value: true },
      { label: "Shopify Dev Support", value: true },
      { label: "Dedicated QA", value: true },
      { label: "Weekly Sync", value: false },
      { label: "Landing Page Personalization", value: false },
      { label: "Priority Support", value: false },
    ],
    ctaLabel: "Get Started",
    ctaHref: "/#contact",
    featured: false,
  },
  {
    badge: "Most Popular",
    name: "Scale",
    price: "$1499",
    period: "/month",
    description: "For brands scaling paid traffic & optimizing funnel steps.",
    highlights: ["4 Experiments / month", "Advanced insights", "Weekly reporting"],
    features: [
      { label: "CRO Audit", value: true },
      { label: "Experiment Roadmap", value: true },
      { label: "A/B Testing", value: true },
      { label: "Shopify Dev Support", value: true },
      { label: "Dedicated QA", value: true },
      { label: "Weekly Sync", value: true },
      { label: "Landing Page Personalization", value: true },
      { label: "Priority Support", value: false },
    ],
    ctaLabel: "Choose Scale",
    ctaHref: "/#contact",
    featured: true,
  },
  {
    badge: "Premium",
    name: "Enterprise",
    price: "$1999",
    period: "/month",
    description: "For teams needing faster velocity & deeper analysis.",
    highlights: ["6 Experiments / month", "Full funnel CRO", "Priority support"],
    features: [
      { label: "CRO Audit", value: true },
      { label: "Experiment Roadmap", value: true },
      { label: "A/B Testing", value: true },
      { label: "Shopify Dev Support", value: true },
      { label: "Dedicated QA", value: true },
      { label: "Weekly Sync", value: true },
      { label: "Landing Page Personalization", value: true },
      { label: "Priority Support", value: true },
    ],
    ctaLabel: "Talk to Us",
    ctaHref: "/#contact",
    featured: false,
  },
];

export const comparisonData = {
  title: "Compare Plans",
  subtitle:
    "Everything is designed for measurable experiments. The difference is velocity, depth, and support.",
  columns: ["Growth", "Scale", "Enterprise"],
  rows: [
    { section: "CRO Strategy" },
    { label: "CRO Audit", values: [true, true, true] },
    { label: "Experiment Roadmap", values: [true, true, true] },
    { label: "Analytics Setup Review", values: [false, true, true] },

    { section: "Execution" },
    { label: "A/B Testing Setup", values: [true, true, true] },
    { label: "Shopify Development", values: [true, true, true] },
    { label: "QA & Rollback Plan", values: [true, true, true] },
    { label: "Landing Page Personalization", values: [false, true, true] },

    { section: "Support" },
    { label: "Weekly Sync", values: [false, true, true] },
    { label: "Priority Support", values: [false, false, true] },
  ],
};

export const pricingFaq = {
  title: "Frequently Asked Questions",
  items: [
    {
      q: "How does CRO work with my existing Shopify theme?",
      a: "We implement experiments as clean, reversible changes—either via your theme codebase or A/B testing tooling. No messy permanent changes without validation.",
    },
    {
      q: "How many experiments can you ship per month?",
      a: "Depends on complexity, but the plan defines monthly velocity. We keep a backlog so we never waste sprint time.",
    },
    {
      q: "Do you also design the variants?",
      a: "Yes. We handle UX/UI (aligned with your brand), and implement the variants with proper QA.",
    },
    {
      q: "What if a test loses?",
      a: "We document learnings clearly and use them to improve the next hypothesis. Losing tests still reduce risk and guide strategy.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Most clients stay because we build a compounding experimentation system, but you’re not locked in.",
    },
  ],
};

export const pricingCtaData = {
  title: "Ready to start improving conversions?",
  text: "Tell us your goal (CR, AOV, subscriptions, retention). We’ll recommend the best plan and share a 90-day experiment roadmap.",
  primaryLabel: "Book a call",
  primaryHref: "/#contact",
  secondaryLabel: "Email us",
  secondaryHref: "mailto:hello@ingversionsdigital.com",
};
