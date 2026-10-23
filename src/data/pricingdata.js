const CALENDLY = "https://calendly.com/ingversionsdigital/30min";

export const pricingHeroData = {
  tag: "Pricing",
  title: "Pricing for CRO programs and test development",
  subtitle:
    "Run a full testing program with Shopify development included, or add our developers to your agency's team. Every test gets full QA before it goes live.",
  primaryCta: "Book a strategy call",
  primaryHref: CALENDLY,
  secondaryCta: "Compare Plans",
  secondaryHref: "#pricingComparison",
  toggle: {
    brands: "For brands",
    dev: "For agencies & teams",
  },
};

export const brandPlans = [
  {
    name: "Starter",
    price: "$999",
    period: "/month",
    description: "For stores starting their first testing program.",
    highlights: [
      "Up to 4 tests a month",
      "5 hours of Shopify development",
      "Research sprint in month 1 (analytics, heatmaps, reviews)",
      "Full QA on every test",
      "1 winning test built into your theme",
      "Bi-weekly report",
    ],
    ctaLabel: "Start with Starter",
    ctaHref: CALENDLY,
  },
  {
    name: "Growth",
    price: "$1,899",
    period: "/month",
    description: "For brands scaling paid traffic.",
    highlights: [
      "Up to 8 tests a month",
      "10 hours of Shopify development",
      "Theme and template tests, variant design included",
      "3 winning tests built into your theme",
      "Weekly report + monthly strategy call",
    ],
    ctaLabel: "Start with Growth",
    ctaHref: CALENDLY,
  },
  {
    name: "Premium",
    price: "$2,999",
    period: "/month",
    badge: "MOST POPULAR",
    isPremium: true,
    description: "For high-traffic brands that want to move fast.",
    highlights: [
      "Up to 12 tests a month",
      "20 hours of Shopify development",
      "Price, shipping and offer tests",
      "5 winning tests built into your theme",
      "Dedicated strategist + developer, shared Slack",
    ],
    ctaLabel: "Start with Premium",
    ctaHref: CALENDLY,
  },
  {
    name: "Elite",
    price: "Custom",
    period: "",
    description: "For multi-store and multi-region programs.",
    highlights: [
      "Custom test volume and Shopify development",
      "Dedicated growth pod",
      "Same-day support",
    ],
    ctaLabel: "Talk to us",
    ctaHref: CALENDLY,
  },
];

export const devPlans = [
  {
    name: "Per Test",
    price: "From $99",
    period: "/test",
    description: "White-label test builds when you need them.",
    highlights: [
      "Simple $99 · Standard $199 · Complex from $399",
      "Built on VWO, Optimizely, Convert, AB Tasty, Intelligems, Shoplift and more",
      "Full QA + 1 revision round",
      "3–5 day turnaround",
    ],
    ctaLabel: "Get your first test free",
    ctaHref: CALENDLY,
  },
  {
    name: "Test Dev Pod",
    price: "$1,800",
    period: "/month",
    badge: "MOST POPULAR",
    isPremium: true,
    description: "Steady test capacity without hiring.",
    highlights: [
      "Up to 15 tests a month + 10 h Shopify dev",
      "Bigger pod: $3,200 for 30 tests + 20 h",
      "Shared Slack channel, new tests started within 48 h",
      "Full QA on every build",
    ],
    ctaLabel: "Book a call",
    ctaHref: CALENDLY,
  },
  {
    name: "Dedicated Developer",
    price: "$2,900",
    period: "/month",
    description: "A full-time developer on your team.",
    highlights: [
      "160 h/month: about 25–30 tests, or any mix of tests and Shopify work",
      "Works in your tools: Jira, ClickUp, Slack",
      "Daily standups, your hours overlap",
      "QA support included",
    ],
    ctaLabel: "Book a call",
    ctaHref: CALENDLY,
  },
  {
    name: "Shopify Development",
    price: "From $28",
    period: "/hour",
    description: "Store work with a clear budget.",
    highlights: [
      "20 h $600 · 50 h $1,400 (valid 90 days)",
      "Fixed-price projects from $1,500",
      "Theme builds, custom sections, migrations, speed fixes",
    ],
    ctaLabel: "Get a quote",
    ctaHref: CALENDLY,
  },
];

export const brandCompare = {
  heading: "Compare CRO Plans",
  sub: "Every plan includes full QA on every test. Pick the one that matches your traffic and velocity.",
  plans: [
    { name: "Starter", price: 999 },
    { name: "Growth", price: 1899 },
    { name: "Premium", price: 2999, badge: "Most Popular" },
    { name: "Elite", contact: { label: "Talk to us", href: CALENDLY } },
  ],
  sections: [
    {
      title: "TESTING",
      rows: [
        { label: "Tests per month", values: ["Up to 4", "Up to 8", "Up to 12", "Custom"] },
        {
          label: "Test types",
          values: ["Simple + Standard", "+ Theme / template", "+ Price, shipping, offer", "All"],
        },
        {
          label: "Research",
          values: ["Month 1 sprint", "Ongoing", "Ongoing + surveys", "Ongoing + surveys"],
        },
        {
          label: "Variant design",
          values: ["Basic", "Included", "Included", "Included"],
        },
      ],
    },
    {
      title: "SHOPIFY DEVELOPMENT",
      rows: [
        {
          label: "Dev hours included",
          values: ["5 h/mo", "10 h/mo", "20 h/mo", "Custom"],
        },
        {
          label: "Winning test implementation",
          values: ["1/mo", "3/mo", "5/mo", "Custom"],
        },
      ],
    },
    {
      title: "QA & REPORTING",
      rows: [
        {
          label: "QA (browsers, devices, edge cases)",
          values: [{ icon: "check" }, { icon: "check" }, { icon: "check" }, { icon: "check" }],
        },
        {
          label: "Reporting",
          values: ["Bi-weekly", "Weekly + monthly call", "Weekly + live dashboard", "Per test + live dashboard"],
        },
      ],
    },
    {
      title: "SUPPORT",
      rows: [
        {
          label: "Support",
          values: ["Email, 1 business day", "Email + calls", "Slack, same day", "Slack, priority"],
        },
      ],
    },
    {
      ctaButtons: [
        { plan: "Starter", label: "Start with Starter", href: CALENDLY },
        { plan: "Growth", label: "Start with Growth", href: CALENDLY },
        { plan: "Premium", label: "Start with Premium", href: CALENDLY },
        { plan: "Elite", label: "Talk to us", href: CALENDLY },
      ],
    },
  ],
};

export const devCompare = {
  heading: "Compare Development Options",
  sub: "Full QA on every build. White-label by default.",
  plans: [
    { name: "Per Test", price: null, priceLabel: "From $99/test" },
    { name: "Test Dev Pod", price: null, priceLabel: "$1,800 or $3,200/mo", badge: "Most Popular" },
    { name: "Dedicated Dev", price: null, priceLabel: "$2,900/mo" },
    { name: "Shopify Dev", price: null, priceLabel: "From $28/h" },
  ],
  sections: [
    {
      title: "CAPACITY",
      rows: [
        { label: "Tests", values: ["Pay as you go", "15 or 30/mo", "About 25–30/mo", "—"] },
        { label: "Shopify dev hours", values: ["—", "10 or 20 h/mo", "Any mix within 160 h", "20 or 50 h blocks"] },
        { label: "Turnaround", values: ["3–5 days", "Start within 48 h", "Daily", "Agreed per task"] },
      ],
    },
    {
      title: "QUALITY & PROCESS",
      rows: [
        {
          label: "QA",
          values: [{ icon: "check" }, { icon: "check" }, { icon: "check" }, { icon: "check" }],
        },
        {
          label: "White-label",
          values: [{ icon: "check" }, { icon: "check" }, { icon: "check" }, { icon: "check" }],
        },
        {
          label: "Communication",
          values: ["Email", "Shared Slack", "Your tools + standups", "Email"],
        },
      ],
    },
    {
      ctaButtons: [
        { plan: "Per Test", label: "Get your first test free", href: CALENDLY },
        { plan: "Test Dev Pod", label: "Book a call", href: CALENDLY },
        { plan: "Dedicated Dev", label: "Book a call", href: CALENDLY },
        { plan: "Shopify Dev", label: "Get a quote", href: CALENDLY },
      ],
    },
  ],
};

export const aiSection = {
  title: "Faster builds. Same human checks.",
  text: "We use AI to speed up research and the first draft of test code. That's why our plans include more tests than before. Every test is still planned by a strategist, reviewed by a developer and checked by QA on real browsers and devices before launch.",
};

export const pricingFaq = {
  title: "Frequently Asked Questions",
  items: [
    {
      q: "How does testing work with my Shopify theme?",
      a: "We build tests as clean, reversible changes, either in your testing tool or in your theme code. Nothing permanent goes live until a test proves it.",
    },
    {
      q: "How many tests can you ship a month?",
      a: "Your plan sets the number. A complex test (price, checkout, new template) can count as two. We keep a backlog ready, so no month is wasted.",
    },
    {
      q: "How much traffic do I need?",
      a: "About 30,000 sessions a month for reliable results. Below that, start with an audit or development work.",
    },
    {
      q: "Do you design the variants?",
      a: "Yes, on Growth and above. On Starter we handle simple design changes.",
    },
    {
      q: "Do you work white-label for agencies?",
      a: "Yes. Your client never sees our name. We work in your tools and under your process.",
    },
    {
      q: "Do you use AI?",
      a: "Yes, for research and first drafts of code. People plan every test, review the code and do the QA.",
    },
    {
      q: "What if a test loses?",
      a: "We write down what we learned and use it for the next test. A losing test still stops you from shipping a change that would have cost sales.",
    },
    {
      q: "Can I cancel?",
      a: "Yes. Give 30 days' notice. No long contract. We suggest 3 months to see real results.",
    },
  ],
};

export const bottomCta = {
  title: "Not sure which plan fits?",
  text: "Book a 30-minute call. We'll look at your store or your test backlog and suggest a plan.",
  primaryCta: "Book a call",
  primaryHref: CALENDLY,
  secondaryCta: "Get a free test build",
  secondaryHref: CALENDLY,
};
