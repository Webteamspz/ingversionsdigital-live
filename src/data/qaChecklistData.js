const qaChecklist = {
  pdf: "/assets/downloads/final-qa-checklist.pdf",
  fileName: "Final-QA-Checklist.pdf",
  hero: {
    tag: "Free download",
    title: "Claim your free Final QA Checklist",
    subtitle:
      "The 14-page playbook we use to ship Shopify A/B tests and CRO experiments with zero broken layouts, zero flicker and zero lost revenue.",
  },
  stats: [
    { value: "230+", label: "Tick-box checkpoints" },
    { value: "9", label: "QA phases, setup to sign-off" },
    { value: "360px–4K", label: "12 breakpoints on Mac, Windows, iOS & Android" },
  ],
  insideTitle: "What's inside",
  inside: [
    "Task setup and a blocker gate before full QA starts",
    "Pixel-level design checks against the Figma mock-up",
    "Control vs. variant comparison and side-effect checks",
    "Breakpoints from 360px to 4K, plus a Mac, Windows, iPhone, Android and tablet matrix",
    "Flicker and tracking checks: Add to Cart, click goals, GA4 and Meta Pixel events",
    "Shopify QA: ATC, cart, checkout, prices, offers, discounts, Markets and apps",
    "Bug report template, severity scale and a go-live sign-off sheet",
  ],
  previews: [
    { src: "/assets/qa-checklist/cover.webp", alt: "Cover of the Final QA Checklist" },
    {
      src: "/assets/qa-checklist/breakpoints.webp",
      alt: "Breakpoint matrix page from 360px to 4K",
    },
    {
      src: "/assets/qa-checklist/pricing.webp",
      alt: "Price, offers and discounts checklist page",
    },
  ],
  form: {
    title: "Get your free copy",
    note: "Instant download. We never share your email.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Work email",
    emailPlaceholder: "you@company.com",
    submit: "Download the checklist",
    submitting: "Preparing your download...",
    error: "Something went wrong. Please try again.",
  },
  success: {
    title: "Your checklist is downloading",
    text: "If the download did not start, use the button below.",
    button: "Download PDF",
    ctaText: "Want us to run QA on your next test?",
    ctaLink: { label: "See our QA service", href: "/quality-assurance" },
  },
};

export default qaChecklist;
