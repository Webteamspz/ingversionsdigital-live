export const pricingHeroData = {
  tag: "Pricing",
  title: "The Right Plan For You",
  subtitle:
    "Choose a plan that fits your growth stage. Every plan includes CRO strategy, experiment execution, and transparent reporting.",
  primaryCta: "Book a strategy call",
  primaryHref: "https://calendly.com/ingversionsdigital/30min?month=2025-10",
  secondaryCta: "Compare Plans",
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
    ctaHref: "https://calendly.com/ingversionsdigital/30min?month=2025-10"
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
    ctaHref: "https://calendly.com/ingversionsdigital/30min?month=2025-10"
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
    ctaHref: "https://calendly.com/ingversionsdigital/30min?month=2025-10"
  },
  {
    name: "Elite",
    price: "Custom",
    period: "",
    description: "For enterprise brands requiring high-volume testing programs.",
    highlights: [
      "Custom test volume",
      "Dedicated growth pod",
      "Super Priority support"
    ],
    ctaLabel: "Get Started",
    ctaHref: "https://calendly.com/ingversionsdigital/30min?month=2025-10"
  }
];

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
