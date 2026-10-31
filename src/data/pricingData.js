const CALENDLY = "https://calendly.com/ingversionsdigital/30min";

export const pricingHeroData = {
  tag: "Pricing",
  title: "Pricing for CRO programs and test development",
  subtitle:
    "Run a full testing program with Shopify development included, or add our developers to your agency's team. Every test gets full QA before it goes live.",
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
      "4 A/B tests / month",
      "Up to 15 hours of Shopify development / month",
      "1 winning test implementation / month",
      "Basic UI/UX audit",
      "Analytics review (GA4 + tracking check)",
      "Basic SEO audit",
      "Page speed (Core Web Vitals) check",
      "Bi-weekly reporting",
      "Priority support",
      "Full QA – Human + AI QA testing",
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
      "6 A/B tests / month",
      "Up to 20 hours of Shopify development / month",
      "Unlimited winning test implementation",
      "GTM custom event creation",
      "Full analytics + on-page SEO audit",
      "Advanced insights",
      "Weekly reporting",
      "Priority support",
      "Full QA – Human + AI QA testing",
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
      "8 A/B tests / month",
      "Up to 30 hours of Shopify development / month",
      "Price tests + Offer tests",
      "Unlimited winning test implementation into your theme",
      "Full funnel CRO",
      "GTM custom events + full SEO audit",
      "Priority support",
      "Full QA – Human + AI QA testing",
    ],
    ctaLabel: "Start with Premium",
    ctaHref: CALENDLY,
  },
  {
    name: "Elite",
    wideTitle: "Elite Plan",
    wideBadge: "ENTERPRISE",
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
    originalPrice: "$399",
    price: "$199.50",
    period: "/test",
    badge: "50% OFF",
    description: "White-label test builds when you need them.",
    highlights: [
      "Complex tests (price, offer, checkout, new templates)",
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
      "80 hours of work / month",
      "A/B testing and Shopify development",
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
      "150 hours of work / month",
      "A/B testing and Shopify development",
      "Works in your tools: Jira, ClickUp, Slack",
      "Daily standups, your hours overlap",
      "QA support included",
    ],
    ctaLabel: "Book a call",
    ctaHref: CALENDLY,
  },
  {
    name: "Shopify Development",
    wideBadge: "STORE WORK",
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

const tool = (name, slug, w, h) => ({ name, logo: `/assets/tools/${slug}.webp`, w, h });
export const toolsStrip = {
  heading: "Tools we work with",
  tools: [
    tool("Optimizely", "optimizely", 393, 96),
    tool("Wingify (VWO + AB Tasty)", "wingify", 311, 96),
    tool("Convert", "convert", 270, 59),
    tool("ABConvert", "abconvert", 497, 96),
    tool("Kameleoon", "kameleoon", 702, 96),
    tool("Webtrends Optimize", "webtrends-optimize", 178, 41),
    tool("Omniconvert", "omniconvert", 380, 70),
    tool("Intelligems", "intelligems", 495, 96),
    tool("Shoplift", "shoplift", 367, 96),
    tool("Varify.io", "varify", 300, 96),
    tool("LaunchDarkly", "launchdarkly", 624, 96),
    tool("Google Analytics", "google-analytics", 279, 96),
    tool("Google Tag Manager", "google-tag-manager", 164, 96),
    tool("Microsoft Clarity", "clarity", 348, 96),
    tool("Fullstory", "fullstory", 516, 96),
    tool("Google Lighthouse", "google-lighthouse", 333, 96),
    tool("Figma", "figma", 201, 96),
    tool("Unbounce", "unbounce", 488, 96),
    tool("Shopify", "shopify", 336, 96),
    tool("WordPress", "wordpress", 470, 96),
  ],
};

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
        { label: "Tests per month", values: ["4", "6", "8", "Custom"] },
        {
          label: "Test types",
          values: [
            "Simple + Standard",
            "+ Theme / template",
            "Complex (Price + Offer tests)",
            "All",
          ],
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
          label: "Shopify development hours",
          values: ["Up to 15 hrs", "Up to 20 hrs", "Up to 30 hrs", "Custom"],
        },
        {
          label: "Winning test implementation",
          values: ["1/mo", "Unlimited", "Unlimited – into your theme", "Custom"],
        },
      ],
    },
    {
      title: "ANALYTICS & SEO",
      rows: [
        { label: "UI/UX audit", values: ["Basic", "Full", "Full", "Full"] },
        {
          label: "Analytics review (GA4)",
          values: ["Tracking check", "Full audit", "Full audit", "Full audit"],
        },
        {
          label: "GTM custom events",
          values: ["—", { icon: "check" }, { icon: "check" }, { icon: "check" }],
        },
        { label: "SEO audit", values: ["Basic", "On-page", "Full", "Full"] },
      ],
    },
    {
      title: "QA & REPORTING",
      rows: [
        {
          label: "Full QA (Human + AI)",
          values: [{ icon: "check" }, { icon: "check" }, { icon: "check" }, { icon: "check" }],
        },
        {
          label: "Reporting",
          values: [
            "Bi-weekly",
            "Weekly + monthly call",
            "Weekly + live dashboard",
            "Per test + live dashboard",
          ],
        },
      ],
    },
    {
      title: "SUPPORT",
      rows: [
        {
          label: "Priority support",
          values: [{ icon: "check" }, { icon: "check" }, { icon: "check" }, { icon: "check" }],
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
    { name: "Per Test", price: null, priceLabel: "$199.50/test (50% off)" },
    { name: "Test Dev Pod", price: null, priceLabel: "$1,800/mo", badge: "Most Popular" },
    { name: "Dedicated Dev", price: null, priceLabel: "$2,900/mo" },
    { name: "Shopify Dev", price: null, priceLabel: "From $28/h" },
  ],
  sections: [
    {
      title: "CAPACITY",
      rows: [
        {
          label: "Tests",
          values: ["Pay as you go (complex)", "Within 80 h/mo", "Within 150 h/mo", "—"],
        },
        {
          label: "Shopify dev hours",
          values: ["—", "Within 80 h/mo", "Within 150 h/mo", "20 or 50 h blocks"],
        },
        {
          label: "Turnaround",
          values: ["3–5 days", "Start within 48 h", "Daily", "Agreed per task"],
        },
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
