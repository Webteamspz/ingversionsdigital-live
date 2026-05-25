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
    name: "Starter",
    price: "$999",
    period: "/month",
    description: "For early-stage brands starting CRO + testing.",
    highlights: [
      "2 Experiments / month",
      "Basic UX audit",
      "Monthly reporting"
    ],
    ctaLabel: "Get Started",
    ctaHref: "/#hero"
  },
  {
    name: "Growth",
    price: "$1899",
    period: "/month",
    description: "For brands scaling paid traffic & optimizing funnel steps.",
    highlights: [
      "4 Experiments / month",
      "Advanced insights",
      "Weekly reporting"
    ],
    ctaLabel: "Get Started",
    ctaHref: "/#hero"
  },
  {
    name: "Premium",
    price: "$2999",
    period: "/month",
    badge: "MOST POPULAR",
    isPremium: true,
    description: "For teams needing faster velocity & deeper analysis.",
    highlights: [
      "6 Experiments / month",
      "Full funnel CRO",
      "Priority support"
    ],
    ctaLabel: "Get Started",
    ctaHref: "/#hero"
  },
  {
    name: "Elite",
    price: "Custom",
    period: "", // Custom price ke aage /month hatane ke liye
    description: "For enterprise brands requiring high-volume testing programs.",
    highlights: [
      "Custom test volume",
      "Dedicated growth pod",
      "Super Priority support"
    ],
    ctaLabel: "Get Started",
    ctaHref: "/#hero"
  }
];

export const comparisonData = {
  title: "The Right Plan For You",
  subtitle: "We offer powerful plans to showcase your business and help creative entrepreneurs get discovered with everything you need to succeed",
  
  // Headers aur Footers yahan se render honge
  columns: [
    { 
      name: "Starter", 
      price: "$999", 
      link: "https://calendly.com/ingversionsdigital/30min?month=2025-10" 
    },
    { 
      name: "Growth", 
      price: "$1899", 
      link: "https://calendly.com/ingversionsdigital/30min?month=2025-10" 
    },
    { 
      name: "Premium", 
      price: "$2999", 
      badge: "MOST POPULAR", 
      isPremium: true, 
      link: "https://calendly.com/ingversionsdigital/30min?month=2025-10" 
    },
    { 
      name: "Elite", 
      price: "Custom", 
      link: "https://calendly.com/ingversionsdigital/30min?month=2025-10" 
    }
  ],

  // Table ki body yahan se render hogi
  rows: [
    { section: "A/B TEST SERVICES" },
    { 
      label: "Number of Tests", 
      values: ["2 to 3", "4 to 5", "Upto 10", "High Volume Test"] 
    },
    { 
      label: "Test Type", 
      values: [
        "Simple (UI changes only)", 
        "Average (UI + Functional)", 
        "Complex", 
        "Complex (Price, Template/Theme)"
      ] 
    },

    { section: "SHOPIFY SERVICES" },
    { 
      label: "Shopify Test", 
      values: ["cross", "1", "2", "3 to 4"] 
    },
    { 
      label: "Winning Test Implantation", 
      values: ["cross", "Upto 2", "Upto 4", "6"] 
    },

    { section: "DEDICATED SUPPORT" },
    { 
      label: "Technical Support", 
      values: [
        "Limited Support", 
        "Email or Scheduled Calls", 
        "Priority Support", 
        "Super Priority Support"
      ] 
    },

    { section: "QA SERVICES" },
    { 
      label: "Visual QA", 
      values: ["cross", "check", "check", "check"] 
    },
    { 
      label: "Technical QA (Browser + Devices)", 
      values: ["cross", "cross", "check", "check"] 
    },
    { 
      label: "Full QA (Edge Case)", 
      values: ["cross", "cross", "cross", "check"] 
    },

    { section: "REPORTING" },
    { 
      label: "Reporting Duration", 
      values: [
        "One Time Report", 
        "Bi-weekly Detailed Report", 
        "Weekly Detailed Report", 
        "Each Task Detailed Report"
      ] 
    }
  ]
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
