export default {
  header: {
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Pricing", href: "/pricing" },
      { label: "About Us", href: "/about-us" },
      { label: "Blog", href: "/blog" },
    ],
    cta: {
      label: "Book A Call",
      href: "https://calendly.com/ingversionsdigital/30min",
    },
    servicesMenu: {
      groups: [
        {
          title: "Core services",
          note: "Testing, development and QA",
          items: [
            { label: "A/B Testing", href: "/ab-testing", short: "A/B Testing", icon: "ab-testing", desc: "Research-led tests that lift conversion" },
            { label: "Shopify Development", href: "/shopify-development", short: "Shopify Development", icon: "shopify", desc: "Fast, custom themes and sections" },
            { label: "Quality Assurance", href: "/quality-assurance", short: "Quality Assurance", icon: "qa", desc: "Every test and release checked by hand" },
            { label: "Landing Page Personalization", href: "/landing-page-personalization", short: "Personalization", icon: "landing-page", desc: "Pages that adapt to each visitor" },
            { label: "WordPress Development", href: "/wordpress-development", short: "WordPress", icon: "wordpress", desc: "Fast, easy-to-edit WordPress sites" },
          ],
        },
        {
          title: "Shopify CRO",
          note: "Specialist services for Shopify stores",
          items: [
            { label: "Shopify CRO Agency", href: "/shopify-cro-agency", short: "CRO Agency", desc: "Find and fix why traffic doesn't convert" },
            { label: "Shopify A/B Testing", href: "/shopify-ab-testing-services", short: "Store A/B Testing", desc: "From hypothesis to winning variant" },
            { label: "Shopify Plus Development & QA", href: "/shopify-plus-development-qa", short: "Plus Dev & QA", desc: "Plus features with QA built in" },
            { label: "Convert.com Testing Agency", href: "/convert-com-shopify-ab-testing-agency", short: "Convert.com Agency", desc: "Get results from your Convert plan" },
            { label: "White-Label Testing for Agencies", href: "/white-label-ab-testing-development-for-agencies", short: "White-Label for Agencies", desc: "We build and QA your clients' tests" },
            { label: "Black Friday QA Testing", href: "/shopify-bfcm-load-and-qa-testing-service", short: "Black Friday QA", desc: "Load and checkout testing before BFCM" },
          ],
        },
      ],
      all: { label: "Explore all services", short: "All services", href: "/services" },
      promo: {
        title: "Not sure where to start?",
        text: "Get a free 30-minute CRO review of your store.",
        label: "Book A Call",
      },
    },
    mobileMenu: {
      ctaLabel: "Book A Call",
      ctaNote: "30 minutes. No commitment.",
      emailLabel: "Email us",
      phoneLabel: "Call us",
    },
  },
  promoBar: {
    enabled: true,
    eyebrow: "Limited Slots",
    text: "Get a free test build and explore our skills!",
    cta: {
      label: "Book A Call",
      href: "https://calendly.com/ingversionsdigital/30min",
    },
    whatsapp: {
      label: "WhatsApp",
      phone: "+91-8866167750",
      message: "Hi, I'd like a free funnel audit for my store.",
    },
  },
  hero: {
    eyebrow: "Shopify & Shopify Plus CRO Engineering",
    heading: "We'll Design, Build & QA",
    pill: "Shopify A/B Tests That Lift Revenue.",
    sub: "Data-backed experiments for Shopify and Shopify Plus stores. Every test ships with a Figma prototype, clean Git code, full QA and GA4 revenue tracking, like the product-page test that lifted Add-to-Cart conversions +58.62% in 12 days.",
    cta: {
      label: "Get my free test build",
      href: "https://calendly.com/ingversionsdigital/30min",
    },
    secondaryCta: { label: "See plans from $999/mo", href: "/pricing" },
    avatars: [
      "/assets/reviews/reviewer-1.jpg",
      "/assets/reviews/reviewer-2.jpg",
      "/assets/reviews/reviewer-3.jpg",
    ],
    proof: "Trusted by <strong>6+ agencies</strong> and <strong> 10+ brands in Ecommerce</strong>",
    visual: "/assets/hero/hero-main-1.webp",
  },
  logos: [
    {
      img: "/assets/hero/logo-1.webp",
      name: "Plastic Place",
    },
    {
      img: "/assets/hero/logo-2.webp",
      name: "Dan Henry",
    },
    {
      img: "/assets/hero/logo-3.webp",
      name: "Northline Express",
    },
    {
      img: "/assets/hero/logo-4.webp",
      name: "Dive Right in Scuba",
    },
    {
      img: "/assets/hero/logo-5.webp",
      name: "Patriot Crew",
    },
    {
      img: "/assets/hero/logo-6.webp",
      name: "Scgolistico",
    },
    {
      img: "/assets/hero/logo-7.webp",
      name: "Ripley Radar",
    },
    {
      img: "/assets/hero/logo-8.webp",
      name: "Hedon",
    },
    {
      img: "/assets/hero/logo-9.webp",
      name: "Robust",
    },
    {
      img: "/assets/hero/logo-10.webp",
      name: "Ruff Greens",
    },
    {
      img: "/assets/hero/logo-11.webp",
      name: "Ridge & River",
    },
    {
      img: "/assets/hero/logo-12.webp",
      name: "Pavoi",
    },
  ],
  records: {
    heading: "Our Track Record",
    list: [
      { value: "10+", label: "Clients" },
      { value: "500+", label: "Projects" },
      { value: "100%", label: "Happy clients" },
      { value: "5+", label: "Years of experience" },
    ],
  },
  servicesPage: {
    tag: "Services",
    title: "Shopify CRO, A/B Testing & Development Services",
    sub: "Everything your store needs to convert more visitors: research-led A/B tests, Shopify development, and full QA on every build. Your first test is free.",
    primaryCta: "Book a call",
    primaryHref: "https://calendly.com/ingversionsdigital/30min",
    secondaryCta: "See pricing",
    secondaryHref: "/pricing",
    detailsHeading: "What we do, in detail",
    audienceHeading: "Who we work with",
    audiences: [
      {
        title: "Shopify brands",
        desc: "DTC and Shopify Plus stores that want more revenue from the traffic they already pay for.",
        points: ["Monthly CRO plans from $999", "Shopify development included", "Your first test built free"],
        link: { label: "See brand plans", href: "/pricing" },
      },
      {
        title: "Agencies & teams",
        desc: "CRO agencies and in-house teams that need reliable, white-label test development and QA.",
        points: ["Complex tests from $199.50", "Test dev pods and dedicated developers", "Your name on the work, not ours"],
        link: { label: "See agency pricing", href: "/pricing" },
      },
    ],
  },
  services: {
    heading: "Our CRO Services",
    sub: "A/B testing, Shopify development and QA for ecommerce brands, all aimed at one number: your conversion rate.",
    list: [
      {
        title: "A/B Testing",
        href: "/ab-testing",
        linkLabel: "Learn More",
        eyebrow: "Experimentation",
        desc: "Data-driven experiments to boost conversions and optimize user journeys on your website.",
        icon: "ab-testing",
      },
      {
        title: "Shopify Development",
        href: "/shopify-development",
        linkLabel: "Learn More",
        eyebrow: "Shopify & Shopify Plus",
        desc: "Custom Shopify template and theme design and development tailored for performance and scalability.",
        icon: "shopify",
      },
      {
        title: "Quality Assurance",
        href: "/quality-assurance",
        linkLabel: "Learn More",
        eyebrow: "Ship With Confidence",
        desc: "End-to-end quality assurance to ensure flawless functionality, usability, and bug-free experiences.",
        icon: "qa",
      },
      {
        title: "Landing Page Personalization",
        href: "/landing-page-personalization",
        linkLabel: "Learn More",
        eyebrow: "Personalization",
        desc: "Deliver tailored experiences that adapt to user behaviour, boosting engagement and conversions.",
        icon: "landing-page",
      },
      {
        title: "Lead Generation",
        eyebrow: "Growth",
        desc: "Convert potential customers through targeted, data-driven marketing to boost sales and drive business growth.",
        icon: "lead",
      },
    ],
  },
  process: {
    heading: "Our Simple Work Process",
    sub: "Every project follows the same tracked steps, so you always know what is being built, who is building it, and when it goes live.",
    list: [
      {
        title: "Project Discussion",
        desc: "We start by understanding your business goals, challenges, and requirements to ensure complete clarity before moving forward.",
        icon: "project-discussion",
      },
      {
        title: "Plan & Approach",
        desc: "A tailored strategy and roadmap are created, outlining timelines, tools, and milestones for smooth execution.",
        icon: "plan",
      },
      {
        title: "Development",
        desc: "Our team brings ideas to life with clean, scalable, and high-performing solutions designed for your business needs.",
        icon: "dev",
      },
      {
        title: "Launch",
        desc: "After rigorous testing and refinements, we deliver and launch your project, ensuring a seamless go-live experience.",
        icon: "goal",
      },
    ],
  },
  processFlow: {
    eyebrow: "How every project runs",
    heading: "Every project runs on a",
    highlight: "system.",
    sub: "Nothing gets built on a guess. Each service follows the same tracked flow, from the first brief to the final sign-off, so every stage sets up the next one.",
    tabs: [
      {
        id: "ab-testing",
        label: "A/B Testing",
        note: "Every test ships with a Loom walkthrough, a Figma file, the code and a live test link, so you can see exactly what changed and why.",
        steps: [
          { icon: "brief", title: "Brief", tag: "the hypothesis", desc: "A task with the test ID, page and goal." },
          { icon: "loom", title: "Loom", tag: "the walkthrough", desc: "A recorded walkthrough of the idea." },
          { icon: "figma", title: "Figma", tag: "the design", desc: "Each variant designed for mobile and desktop." },
          { icon: "variants", title: "Variants", tag: "the options", desc: "V1, V2, V3, each building on the last." },
          { icon: "code", title: "Build", tag: "the code", desc: "Variants coded and pushed to Git." },
          { icon: "qa", title: "QA", tag: "the check", desc: "Checked across devices before going live." },
          { icon: "launch", title: "Launch", tag: "the test", desc: "Live in the testing tool, tracked to a winner." },
        ],
      },
      {
        id: "shopify",
        label: "Shopify",
        note: "Your store is built in your own theme, reviewed with you at each step and handed over with support, so the work keeps paying off after launch.",
        steps: [
          { icon: "brief", title: "Scope", tag: "the plan", desc: "Pages, features and timeline agreed up front." },
          { icon: "figma", title: "Design", tag: "the look", desc: "Layouts designed in Figma for your brand." },
          { icon: "store", title: "Theme", tag: "the build", desc: "Built natively in Shopify, no page builders." },
          { icon: "qa", title: "QA", tag: "the check", desc: "Tested on every device and browser." },
          { icon: "review", title: "Review", tag: "the feedback", desc: "You review, we refine until it's right." },
          { icon: "launch", title: "Launch", tag: "the go-live", desc: "Published live with a full handover." },
          { icon: "support", title: "Support", tag: "the follow-up", desc: "We stay on hand for fixes and updates." },
        ],
      },
      {
        id: "qa",
        label: "QA",
        note: "Every bug is logged with steps to reproduce, fixed and retested, so nothing ships until it works for every visitor.",
        steps: [
          { icon: "scope", title: "Scope", tag: "the pages", desc: "Which pages, flows and features to test." },
          { icon: "devices", title: "Devices", tag: "the matrix", desc: "Browsers and devices your visitors use." },
          { icon: "checklist", title: "Test", tag: "the run", desc: "Each flow tested against a checklist." },
          { icon: "bug", title: "Log", tag: "the bugs", desc: "Every issue logged with steps to reproduce." },
          { icon: "code", title: "Fix", tag: "the patch", desc: "Issues fixed and pushed for review." },
          { icon: "retest", title: "Retest", tag: "the confirm", desc: "Each fix retested before it's closed." },
          { icon: "signoff", title: "Sign-off", tag: "the release", desc: "Approved and cleared to go live." },
        ],
      },
      {
        id: "wordpress",
        label: "WordPress",
        note: "Your site is built as a custom theme, reviewed with you at each step and handed over ready for your team to edit.",
        steps: [
          { icon: "brief", title: "Scope", tag: "the plan", desc: "Pages, features and timeline agreed up front." },
          { icon: "figma", title: "Design", tag: "the look", desc: "Layouts designed in Figma for your brand." },
          { icon: "code", title: "Build", tag: "the theme", desc: "A custom theme built for speed and editing." },
          { icon: "qa", title: "QA", tag: "the check", desc: "Tested on every device and browser." },
          { icon: "review", title: "Review", tag: "the feedback", desc: "You review, we refine until it's right." },
          { icon: "launch", title: "Launch", tag: "the go-live", desc: "Published live with a full handover." },
          { icon: "support", title: "Support", tag: "the follow-up", desc: "We stay on hand for fixes and updates." },
        ],
      },
      {
        id: "landing-page",
        label: "Personalization",
        note: "Every personalized page is tested against your default page, so you can see exactly what each audience responds to.",
        steps: [
          { icon: "scope", title: "Audiences", tag: "the who", desc: "Which visitors and traffic sources to target." },
          { icon: "brief", title: "Message", tag: "the angle", desc: "Copy and offers matched to each audience." },
          { icon: "figma", title: "Design", tag: "the page", desc: "Each page designed mobile-first in Figma." },
          { icon: "code", title: "Build", tag: "the logic", desc: "Pages built with the right content for each visitor." },
          { icon: "qa", title: "QA", tag: "the check", desc: "Every version checked before going live." },
          { icon: "launch", title: "Launch", tag: "the test", desc: "Live and tested against your default page." },
          { icon: "retest", title: "Refine", tag: "the lift", desc: "Pages refined as the results come in." },
        ],
      },
    ],
  },
  engagement: {
    heading: "Flexible Engagement Models",
    sub: "We recognize that every business has unique needs and priorities. That's why we offer flexible engagement models to deliver the support and expertise you need, when you need it.",
    list: [
      {
        title: "Retainer-Based Partnerships",
        priceLabel: "Fixed monthly fee",
        desc: "Ideal for businesses with ongoing development needs, including eCommerce companies and CRO agencies.",
        icon: "retainer",
        features: [
          "Predictable Costs",
          "Dedicated Resources",
          "Priority Service",
          "Long-Term Collaboration",
        ],
        cta: {
          label: "Learn more about this model",
          href: "/pricing",
        },
      },
      {
        title: "Block of Hours",
        priceLabel: "Prepaid hours",
        desc: "Perfect for businesses looking to start testing development, establish a testing culture, or require on-demand services without a long-term commitment.",
        icon: "hoursblock",
        features: [
          "Flexibility",
          "On-Demand Support",
          "Budget Control",
          "Trial Opportunity",
        ],
        cta: {
          label: "Contact Us",
          href: "#contact",
        },
      },
      {
        title: "Project-Based Engagements",
        priceLabel: "Fixed project price",
        desc: "Designed for one-time projects or specific initiatives with clearly defined scopes and timelines.",
        icon: "projectengagement",
        features: [
          "Defined Scope and Timeline",
          "Focused Expertise",
          "Transparent Pricing",
          "Specialized Solutions",
        ],
        cta: {
          label: "Contact Us",
          href: "#contact",
        },
      },
    ],
  },
  caseStudiesPage: {
    tag: "Case Studies",
    title: "Real tests. Real lifts. Every number checked in GA4.",
    sub: "What was holding each store back, what we built to fix it, and what the data said after launch. No mockups, no made-up results.",
    primaryCta: { label: "Get my free test build", href: "https://calendly.com/ingversionsdigital/30min" },
    secondaryCta: { label: "See plans from $999/mo", href: "/pricing" },
    metrics: [
      { value: "+58.62%", label: "Add-to-cart lift" },
      { value: "3.2x", label: "Daily users after SEO fixes" },
      { value: "43,933", label: "Visitors in one test" },
      { value: "100%", label: "Confidence on the winner" },
    ],
  },
  caseStudies: {
    heading: "Case Studies",
    sub: "Real A/B tests on real Shopify stores. Open a study to see the designs, the test reports and what we learned.",
    highlights: [
      { value: "106", label: "A/B tests run for two Shopify brands" },
      { value: "17", label: "Clear winners at 95%+ confidence" },
    ],
    list: [
      {
        id: "rapid-radios-shopify-cro-case-study",
        client: "Rapid Radios",
        title: "52 A/B Tests for Rapid Radios: Four Product Page Wins, Up to +41.5% Conversion",
        tags: ["CRO program", "Convert.com", "Feb 2025 – Oct 2026"],
        sections: [
          {
            heading: "The Client and the Challenge",
            icon: "challenge",
            paragraphs: [
              "Rapid Radios (rapidradios.com) sells nationwide push-to-talk walkie-talkies that work over cellular networks, sold in packs and bundled with free gifts. Customers range from families to businesses running crews.",
              "Almost everything happens on one product page. That page has to explain a technical product, sell multi-packs, show the free gifts, and earn trust from first-time buyers, mostly on a phone screen. Baseline mobile conversion was between 0.9% and 1.6%, so there was room to grow.",
            ],
          },
          {
            heading: "How We Ran the Program",
            icon: "action",
            paragraphs: [
              "Every test followed the same five steps: a one-sentence hypothesis, three or more variants designed in Figma, build and QA in Convert on real devices, an even traffic split with mobile and desktop tested separately and no winner called below 95% confidence, then winners coded into the live Shopify theme and tracked in Git.",
              "For big wins we ran a reverse test, taking the change away again. After the sticky add-to-cart went live, removing it for a test group in June 2025 cut conversion by 5.9% (84% confidence), pointing the same way as the original result.",
            ],
          },
        ],
        results: {
          heading: "The Results (conversion rate vs the original page)",
          stats: [
            { label: "Sticky add-to-cart with quantity breaks (mobile)", before: "1.28%", after: "1.71%", lift: "+33.7%" },
            { label: "Free-gift tiles + pack tags (mobile)", before: "1.60%", after: "2.14%", lift: "+33.4%" },
            { label: "Same idea, rebuilt for desktop", before: "3.52%", after: "4.42%", lift: "+25.6%" },
            { label: "Case + screen protector upsell (all devices)", before: "2.60%", after: "3.23%", lift: "+24.2%" },
            { label: "Trust buttons + cleaner product details (mobile)", before: "0.93%", after: "1.31%", lift: "+41.5%" },
          ],
          totals:
            "52 A/B tests from February 2025 to October 2026; 11 won at 95% confidence or higher. Each winner above reached 98.6%–99.7% confidence on conversion rate, its primary goal, and lifted revenue per visitor by 28.7%, 35.6%, 21.6%, 15.3% and 27.3%. Every number comes from the Convert reports.",
          screenshots: [],
        },
        tests: [
          {
            heading: "1. Keep the buy button in reach on mobile: +33.7% conversion",
            points: [
              ["What we saw", "On mobile, the product page is long. Once a shopper scrolled into specs and reviews, the only way to buy was to scroll all the way back up."],
              ["Hypothesis", "If we add a sticky add-to-cart bar with quantity-break pricing, conversion rate will rise, because shoppers always have a visible way to buy without hunting for the buy box."],
              ["What we changed", "Three versions of a sticky bar. V1 scrolled the shopper back to the pack selector. V2 opened the pack selector inside the bar. V3 did the same with the price inside the button."],
              ["Result", "10 days, 57,430 mobile visitors. The simplest version won: V1 lifted conversion from 1.28% to 1.71% (+33.7%) at 99.7% confidence, and revenue per visitor from $8.08 to $10.41 (+28.7%). V2 and V3 also beat control, but by much less. Shoppers wanted a shortcut back to the full pack choice, not a cramped version of it."],
            ],
            screenshots: [
              {
                src: "/assets/case-studies/rapid-radios-rr9-design.webp",
                width: 968,
                height: 525,
                wide: true,
                label: "Design",
                caption: "Control, then V1 (the winner), V2 and V3, once the shopper has scrolled past the buy box",
                alt: "Figma mobile mockups of the Rapid Radios product page: the control with no sticky bar, V1 with a sticky Add to Cart button, V2 with a sticky pack selector and button, and V3 with the price inside the button.",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr9-cr.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: conversion rate",
                alt: "Convert report for the sticky add-to-cart test: original page 1.28% conversion rate, Variation 1 1.71% (+33.71%, 99.69% confidence), Variation 2 1.39% (+8.78%), Variation 3 1.45% (+13.44%).",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr9-rpv.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: revenue per visitor",
                alt: "Convert report for the sticky add-to-cart test: revenue per visitor $8.08 on the original page and $10.41 on Variation 1 (+28.73%, 97.91% confidence).",
              },
            ],
          },
          {
            heading: "2. Make the free gifts and the best pack obvious: +33.4% mobile, then +25.6% desktop",
            points: [
              ["What we saw", "Each pack comes with free gifts, but shoppers only saw them in a small pop-up after picking a pack, and two quantity selectors competed for attention."],
              ["Hypothesis", "If we show the gifts for each pack clearly, use one pack selector, and label the 3-pack \"Most popular\" and the 6-pack \"Best value\", conversion will rise, because shoppers can see the deal and choose a pack faster."],
              ["What we changed (mobile)", "Six variants, building up the idea in layers: gift tiles, then a single new pack selector, then the two tags."],
              ["Result (mobile)", "22 days, 28,457 visitors. The full version (V3) lifted conversion from 1.60% to 2.14% (+33.4%) at 98.9% confidence, and revenue per visitor from $8.13 to $11.03 (+35.6%). The gift tiles alone (V1) looked much worse in the first days and were switched off. The win only appeared once the clutter was removed and the tags were added."],
              ["Result (desktop rebuild)", "We then rebuilt the layout for desktop and tested it again for 28 days with 26,698 visitors. The best version (V3, which also showed how much each radio saves per pack) lifted conversion from 3.52% to 4.42% (+25.6%) at 99.6% confidence, and revenue per visitor from $21.95 to $26.69 (+21.6%). Adding only a per-radio price (V2) looked worse early and was stopped. Two separate tests, two devices, same direction."],
            ],
            screenshots: [
              {
                src: "/assets/case-studies/rapid-radios-rr37-design.webp",
                width: 624,
                height: 840,
                wide: true,
                label: "Design",
                caption: "Mobile: the old pack buttons (left) and the winning V3 (right)",
                alt: "Mobile product page before and after: the control with plain 2-, 3-, 4- and 6-pack buttons, and the winning V3 with one pack selector showing prices and savings, Most Popular and Best Value tags, and free gift tiles.",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr37-cr.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report (mobile): conversion rate",
                alt: "Convert report for the mobile free-gift test: original page 1.60% conversion rate, V3 2.14% (+33.38%, 98.85% confidence); V1 and V2 were stopped early.",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr37-rpv.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report (mobile): revenue per visitor",
                alt: "Convert report for the mobile free-gift test: revenue per visitor $8.13 on the original page and $11.03 on V3 (+35.60%, 97.90% confidence).",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr37d-design.webp",
                width: 1349,
                height: 643,
                wide: true,
                label: "Design",
                caption: "Desktop: control (left) and the winning V3 with per-radio savings under each pack (right)",
                alt: "Desktop product page before and after: the control with plain pack buttons, and the winning V3 with a two-column pack selector showing per-radio prices and savings, tags, and free gift tiles.",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr37d-cr.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report (desktop): conversion rate",
                alt: "Convert report for the desktop rebuild: original page 3.52% conversion rate, V1 4.14% (+17.62%), V2 2.89% (stopped), V3 4.42% (+25.55%, 99.62% confidence).",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr37d-rpv.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report (desktop): revenue per visitor",
                alt: "Convert report for the desktop rebuild: revenue per visitor $21.95 on the original page and $26.69 on V3 (+21.64%, 97.86% confidence).",
              },
            ],
          },
          {
            heading: "3. Offer the case and screen protector together: +24.2% conversion",
            points: [
              ["What we saw", "Buyers of rugged radios often need a case and a screen protector, but the buy box offered neither."],
              ["Hypothesis", "If we offer protection add-ons right above the add-to-cart button, conversion and revenue per visitor will rise, because shoppers can complete their setup in one place."],
              ["What we changed", "V1 added a case upsell, V2 a screen-protector upsell, and V3 both."],
              ["Result", "14 days, 51,709 visitors on all devices. Either add-on on its own did almost nothing (+1.5% and 0.0%). Both together (V3) lifted conversion from 2.60% to 3.23% (+24.2%) at 99.7% confidence. Revenue per visitor rose 15.3% ($14.51 to $16.72), at 94.2% confidence, just under our 95% bar."],
            ],
            screenshots: [
              {
                src: "/assets/case-studies/rapid-radios-rr18-design.webp",
                width: 1375,
                height: 644,
                wide: true,
                label: "Design",
                caption: "Control, then the case upsell (V1), the screen protector upsell (V2), and both together (V3, the winner)",
                alt: "Figma mockups of the buy box: the control, V1 with a silicone case add-on, V2 with a tempered glass screen protector add-on, and V3 with both add-ons above the Add to Cart button.",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr18-cr.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: conversion rate",
                alt: "Convert report for the upsell test: original page 2.60% conversion rate, V1 2.64% (+1.49%), V2 2.60% (-0.01%), V3 3.23% (+24.20%, 99.65% confidence).",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr18-rpv.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: revenue per visitor",
                alt: "Convert report for the upsell test: revenue per visitor $14.51 on the original page and $16.72 on V3 (+15.27%, 94.22% confidence).",
              },
            ],
          },
          {
            heading: "4. Answer doubts before they become exits: +41.5% mobile conversion",
            points: [
              ["What we saw", "First-time buyers had questions about coverage, the guarantee and how the radios work. The product details section was dense and hard to scan on a phone."],
              ["Hypothesis", "If we add quick Warranty and Security buttons and redesign the product details for mobile, conversion will rise, because shoppers get answers to their main doubts without leaving the page."],
              ["What we changed", "Four variants mixing two things: Warranty and Security buttons that open a short pop-up (like the warranty policy), and a cleaner product-details section."],
              ["Result", "7 days, 51,079 mobile visitors across five groups. V2, with the buttons right under Add to Cart and the cleaner details below them, won: conversion went from 0.93% to 1.31% (+41.5%) at 98.6% confidence, and revenue per visitor from $8.19 to $10.42 (+27.3%) at 95.6%. Each change alone was flat or negative, and V4, the same two pieces with the buttons moved below the details, did worse than control (-7.7%). Placement mattered as much as content. It ran for one full week, shorter than the others, so the direction is clear but the exact size of the lift deserves some caution."],
            ],
            screenshots: [
              {
                src: "/assets/case-studies/rapid-radios-rr5-design.webp",
                width: 1568,
                height: 508,
                wide: true,
                label: "Design",
                caption: "Control, then the four variants (V2 won), and the warranty pop-up the buttons open",
                alt: "Figma mobile mockups: the control, four variants combining Warranty and Security buttons with a cleaner Description, Specifications and Reviews section, and the Warranty Policy pop-up.",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr5-cr.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: conversion rate",
                alt: "Convert report for the trust elements test: original page 0.93% conversion rate, Variation 1 0.93% (-0.22%), Variation 2 1.31% (+41.46%, 98.60% confidence), Variation 3 0.92% (-0.98%).",
              },
              {
                src: "/assets/case-studies/rapid-radios-rr5-rpv.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: revenue per visitor",
                alt: "Convert report for the trust elements test: revenue per visitor $8.19 on the original page and $10.42 on Variation 2 (+27.31%, 95.58% confidence).",
              },
            ],
          },
        ],
        notes: [
          {
            heading: "What We Learned",
            icon: "method",
            paragraphs: [
              "Combinations win where single tweaks don't. In three of the four tests, each change alone was flat or negative. Testing layered variants found the combination that worked.",
              "Simple beats clever. The sticky bar that just scrolled back to the pack selector beat the fancier versions.",
            ],
          },
          {
            heading: "Why These Numbers Hold Up",
            icon: "timing",
            paragraphs: [
              "We confirm big wins twice. The free-gift idea won on mobile and again on desktop, and the sticky bar held up in a reverse test.",
              "Most ideas lose, and that's useful. 11 of 52 tests won clearly. The other 41 kept changes off the site that would have cost sales.",
            ],
          },
        ],
        cta: {
          heading: "Where Is Your Product Page Losing Customers?",
          text: "We design, build and ship A/B tests for Shopify brands, from hypothesis to live theme code.",
          buttonText: "Book a 30-minute call",
          buttonLink: "https://calendly.com/ingversionsdigital/30min",
        },
      },
      {
        id: "ruff-greens-shopify-cro-case-study",
        client: "Ruff Greens",
        title: "54 A/B Tests for Ruff Greens: Three Trial-Page Wins, Up to +19.9% Conversion",
        tags: ["CRO program", "Convert.com", "Feb 2025 – Oct 2026"],
        sections: [
          {
            heading: "The Client and the Challenge",
            icon: "challenge",
            paragraphs: [
              "Ruff Greens (ruffgreens.com) sells a daily greens and vitamin supplement for dogs, plus Meow Greens for cats. Most new customers start with the Jumpstart trial: a free bag, they pay only shipping, and it becomes a subscription.",
              "That model makes the trial page the most important page on the store. A visitor has to trust a supplement they have never tried, understand what \"free\" means, and get through the offer without second thoughts. Small points of doubt there cost real trial starts.",
            ],
          },
          {
            heading: "How We Ran the Program",
            icon: "action",
            paragraphs: [
              "Every test followed the same five steps: a one-sentence hypothesis, variants designed in Figma with a walkthrough video for the build team, build and QA in Convert on mobile and desktop and on both the dog and cat pages, an even traffic split with no winner called below 95% confidence, then winners coded into the live Shopify theme, editable in the theme customizer and tracked in Git.",
              "Of the 54 tests, 6 cleared the 95% bar. That rate is normal for a store that is already well built: most ideas don't beat a good page, and the testing is what tells you which ones do.",
            ],
          },
        ],
        results: {
          heading: "The Results (conversion rate vs the original page)",
          stats: [
            { label: "Key-benefit banner under the header (desktop)", before: "6.21%", after: "7.45%", lift: "+19.9%" },
            { label: "\"Tap to unlock $0 trial\" button (mobile)", before: "8.39%", after: "9.81%", lift: "+17.0%" },
            { label: "Feeding & nutrition info on the trial page", before: "12.56%", after: "13.67%", lift: "+8.8%" },
          ],
          totals:
            "54 A/B tests from February 2025 to October 2026, all measured in Convert. Confidence on conversion rate, each test's primary goal: 99.3%, 95.1% and 99.1%. Revenue per visitor rose 34.8%, 25.8% and 8.8%. All three winners were coded into the live theme.",
          screenshots: [],
        },
        tests: [
          {
            heading: "1. Answer \"how much do I feed?\" on the trial page: +8.8% conversion",
            points: [
              ["What we saw", "The trial page asked people to commit without the feeding and nutrition details that lived on the full product page. Shoppers who wanted those answers had to leave the offer to find them."],
              ["Hypothesis", "If we add feeding and nutrition information to the trial page, conversion rate will rise, because new visitors will understand the product well enough to start the trial."],
              ["What we changed", "One variant that added four tap-to-open sections under the buy button on both trial pages (dog and cat): how the trial works, description, nutrition information and feeding instructions."],
              ["Result", "25 days, 22,591 visitors, 2,964 orders. Conversion rate went from 12.56% to 13.67% (+8.8%) at 99.1% confidence. Revenue per visitor also rose 8.8%, though at 82% confidence that part is a good sign rather than proof. This is the largest sample in the program, so it is also the most reliable win."],
            ],
            screenshots: [
              {
                src: "/assets/case-studies/ruff-greens-rg1-design.webp",
                width: 906,
                height: 641,
                wide: true,
                label: "Design",
                caption: "Control (left), then the new version for dogs and cats (right)",
                alt: "Mobile trial page before and after: the control buy box, and the dog and cat variations with four tap-to-open sections under the Claim My Jumpstart Bag button: how the trial works, description, nutrition information and feeding instructions.",
              },
              {
                src: "/assets/case-studies/ruff-greens-rg1-cr.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: conversion rate",
                alt: "Convert report for the feeding and nutrition test: original page 12.56% conversion rate from 11,154 visitors, Variation 1 13.67% from 11,437 visitors (+8.80%, 99.08% confidence).",
              },
              {
                src: "/assets/case-studies/ruff-greens-rg1-rpv.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: revenue per visitor",
                alt: "Convert report for the feeding and nutrition test: revenue per visitor $3.11 on the original page and $3.39 on Variation 1 (+8.79%, 82.34% confidence).",
              },
            ],
          },
          {
            heading: "2. Put the reasons to buy under the header: +19.9% desktop conversion",
            points: [
              ["What we saw", "On desktop, the top of the page had a headline and a button but no proof points: nothing said why this supplement could be trusted until visitors scrolled."],
              ["Hypothesis", "If we add a slim, non-sticky banner of key science-backed benefits under the header on every page, desktop conversion will rise, because visitors see why the product is worth trying before they start scrolling."],
              ["What we changed", "A sitewide benefit strip for desktop only, scrolling away with the page so it never covers content: scientifically formulated, human-grade all-natural ingredients, and made in the USA."],
              ["Result", "19 days, 12,184 desktop visitors. Conversion rate went from 6.21% to 7.45% (+19.9%) at 99.3% confidence. Revenue per visitor rose 34.8% ($3.65 to $4.92), at 94.1% confidence."],
            ],
            screenshots: [
              {
                src: "/assets/case-studies/ruff-greens-rg7-design.webp",
                width: 1568,
                height: 488,
                wide: true,
                label: "Design",
                caption: "Control homepage (left) and the benefit strip under the header (right)",
                alt: "Desktop homepage before and after: the variation adds a slim strip under the header reading Scientifically Formulated, Human Grade All-Natural Ingredients, and Expertly Crafted in the USA.",
              },
              {
                src: "/assets/case-studies/ruff-greens-rg7-cr.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: conversion rate",
                alt: "Convert report for the benefit banner test: original page 6.21% conversion rate, Variation 1 7.45% (+19.90%, 99.32% confidence).",
              },
              {
                src: "/assets/case-studies/ruff-greens-rg7-rpv.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: revenue per visitor",
                alt: "Convert report for the benefit banner test: revenue per visitor $3.65 on the original page and $4.92 on Variation 1 (+34.80%, 94.09% confidence).",
              },
            ],
          },
          {
            heading: "3. Make the free trial feel earned, not hidden: +17.0% mobile conversion",
            points: [
              ["What we saw", "The trial card showed $19.95 crossed out next to $0.00 and the words \"Free with promo code\". On mobile, it wasn't clear whether a code was needed or how to get the bag free."],
              ["Hypothesis", "If we show the full $19.95 value first and let first-time visitors unlock the $0 trial with one tap, mobile conversion will rise, because the offer feels clear and valuable instead of buried in a code field."],
              ["What we changed", "Three variants. The winner (V3) added a callout above the price: \"First time? Claim your free trial bag. Tap to unlock your $0 trial, just cover shipping.\" One tap drops the price to $0.00 with a short confirmation."],
              ["Result", "17 days, 8,105 mobile visitors. Conversion rate went from 8.39% to 9.81% (+17.0%) at 95.1% confidence, and revenue per visitor rose 25.8% (96.0% confidence). The test was stopped before its full planned sample, so this is the least certain of the three wins. Showing $19.95 without the button (V1) looked worse early and was switched off. The value anchor only worked when paired with an easy way to claim the free bag."],
            ],
            screenshots: [
              {
                src: "/assets/case-studies/ruff-greens-rg26-design.webp",
                width: 956,
                height: 578,
                wide: true,
                label: "Design",
                caption: "Control, V1, V2 and the winning V3, plus the V3 button before and after the tap",
                alt: "Mobile trial card mockups: the control showing $19.95 crossed out and $0.00, V1 and V2 showing $19.95, and V3 adding a First Time? Claim Your Free Trial Bag button that turns into Congrats! Your Trial Bag Is Reserved when tapped.",
              },
              {
                src: "/assets/case-studies/ruff-greens-rg26-cr.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: conversion rate",
                alt: "Convert report for the free trial flow test: original page 8.39% conversion rate, V1 7.69% (stopped), V2 8.87% (+5.76%), V3 9.81% (+17.00%, 95.06% confidence).",
              },
              {
                src: "/assets/case-studies/ruff-greens-rg26-rpv.webp",
                width: 1536,
                height: 639,
                label: "Report",
                caption: "Convert report: revenue per visitor",
                alt: "Convert report for the free trial flow test: revenue per visitor $1.98 on the original page and $2.49 on V3 (+25.81%, 95.98% confidence).",
              },
            ],
          },
        ],
        notes: [
          {
            heading: "What We Learned",
            icon: "method",
            paragraphs: [
              "Clarity beats persuasion on a trial page. All three wins removed a question (how much to feed, why it works, what \"free\" means). None of them added hype.",
              "Device matters. Two of the three wins were device-specific. Testing mobile and desktop separately kept a strong result on one from being hidden by the other.",
            ],
          },
          {
            heading: "Losing Variants Teach Too",
            icon: "timing",
            paragraphs: [
              "Showing $19.95 alone looked worse; showing it with a one-tap unlock lifted conversion. Without the test, the first idea would have looked reasonable.",
            ],
          },
        ],
        cta: {
          heading: "Where Is Your Store Losing Customers?",
          text: "We design, build and ship A/B tests for Shopify brands, from hypothesis to live theme code.",
          buttonText: "Book a 30-minute call",
          buttonLink: "https://calendly.com/ingversionsdigital/30min",
        },
      },
      {
        id: "shopify-pdp-trust-badges-ab-test",
        client: "Radio equipment store",
        title: "+58.62% Add-to-Cart: Trust Badges vs Guarantee Copy on a Shopify Product Page",
        tags: ["A/B Testing", "Convert.com", "12 days"],
        sections: [
          {
            heading: "The Challenge",
            icon: "challenge",
            paragraphs: [
              "Shoppers on our client's product pages, a mobile radio and communications equipment store, hesitated at the last step: adding to cart. They weren't sure about guarantees and purchase security.",
            ],
          },
          {
            heading: "What We Did",
            icon: "action",
            paragraphs: [
              "We designed three product-page variations in Figma, each with a different mix of trust signals near the Add-to-Cart button. Our development partner TechnoSpective built them in Convert.com, and traffic was split evenly across the original and the three variations for 12 days.",
            ],
          },
        ],
        results: {
          heading: "The Results (add-to-cart rate vs the original page)",
          stats: [
            { label: "Guarantee copy + trust badges", before: "1.67%", after: "2.65%", lift: "+58.62%" },
            { label: "Guarantee copy only", before: "1.67%", after: "2.14%", lift: "+28.34%" },
            { label: "Trust badges only", before: "1.67%", after: "1.56%", lift: "-6.61%" },
          ],
          totals:
            "43,933 visitors across 4 variations, about 10,980 each. Original: 183 add-to-carts from 10,984 visitors. Winner: 291 from 10,983, at 100% statistical confidence. Guarantee copy alone reached 99.99% confidence; the badges-only drop was not statistically significant.",
          screenshots: [],
        },
        notes: [
          {
            heading: "Why It Matters",
            icon: "method",
            paragraphs: [
              "Trust badges on their own did not help. They only worked when paired with clear guarantee copy. Copying a 'best practice' without testing it would have missed the real win, which is why we test before we ship.",
            ],
          },
          {
            heading: "Where the Numbers Come From",
            icon: "timing",
            paragraphs: [
              "The Convert.com test report, published by TechnoSpective at technospective.se/case-studies/pdp-trust-signals (July 2025).",
            ],
          },
        ],
        cta: {
          heading: "Want a Test Like This?",
          text: "We'll design, build and QA your first Shopify A/B test free.",
          buttonText: "Claim your free test build",
          buttonLink: "https://calendly.com/ingversionsdigital/30min",
        },
      },
      {
        id: "seo-3x-daily-traffic",
        client: "Ingversions Digital",
        title: "3x More Daily Traffic in 4 Days After SEO Fixes",
        tags: ["SEO", "Early results"],
        sections: [
          {
            heading: "The Challenge",
            icon: "challenge",
            paragraphs: [
              "Traffic to ingversionsdigital.com was low and getting worse. Between Oct 1 and Oct 11, the site averaged about 4 users a day. By Oct 9–11, daily users had dropped to almost zero. A site that nobody visits can't bring in leads, no matter how good the offer is.",
            ],
          },
          {
            heading: "What We Did",
            icon: "action",
            paragraphs: [
              "On Oct 12 we rolled out a round of SEO improvements across the site. Then we tracked the impact in GA4, comparing daily averages before and after the changes.",
            ],
          },
        ],
        results: {
          heading: "The Results (daily average)",
          stats: [
            { label: "Users", before: "~4/day", after: "13/day", lift: "3.2x" },
            { label: "Events (engagement)", before: "~53/day", after: "189/day", lift: "3.6x" },
            { label: "Key events (conversions)", before: "~7/day", after: "22/day", lift: "3.4x" },
          ],
          totals:
            "Totals: 45 users, 581 events and 73 key events in the 11 days before, compared with 52 users, 756 events and 90 key events in the 4 days after.",
          screenshots: [
            {
              src: "/assets/case-studies/seo-ga4-before.webp",
              width: 1032,
              height: 615,
              label: "Before",
              caption: "GA4, Oct 1–11, before SEO",
              alt: "Google Analytics 4 overview for Oct 1 to Oct 11, 2026: 45 total users, 581 events and 73 key events, with daily key events falling to zero by Oct 9.",
            },
            {
              src: "/assets/case-studies/seo-ga4-after.webp",
              width: 1023,
              height: 631,
              label: "After",
              caption: "GA4, Oct 12–15, after SEO",
              alt: "Google Analytics 4 overview for Oct 12 to Oct 15, 2026: 52 total users, 756 events and 90 key events, peaking at about 60 key events on Oct 14.",
            },
          ],
        },
        notes: [
          {
            heading: "Why We Measure Per Day",
            icon: "method",
            paragraphs: [
              "The two periods aren't the same length (11 days vs 4 days). Comparing raw totals, 52 vs 45 users looks like a 15% gain. Per day, it's about 3x. We bring the same habit to every A/B test and CRO report we run for clients: compare like with like, or the numbers will mislead you.",
            ],
          },
          {
            heading: "Early Days",
            icon: "timing",
            paragraphs: [
              "These are early results from a short 4-day window, and Oct 14 was a strong spike day. We're tracking the full 30 days and will update this case study with the longer-term numbers.",
            ],
          },
        ],
        cta: {
          heading: "Want Results Like This?",
          text: "Ingversions Digital helps Shopify and e-commerce brands grow with CRO, A/B testing and SEO.",
          buttonText: "Book a free 30-minute call",
          buttonLink: "https://calendly.com/ingversionsdigital/30min",
        },
      },
    ],
  },
  why: {
    heading: "Why Choose Us",
    list: [
      {
        title: "Innovation",
        desc: "Pushing boundaries with AI and quantitative trading to deliver cutting-edge solutions.",
      },
      {
        title: "Collaboration",
        desc: "Working closely with clients to develop tailored solutions that drive measurable success.",
      },
      {
        title: "Excellence",
        desc: "Maintaining the highest standards in code quality, system performance, and client outcomes.",
      },
      {
        title: "Integrity",
        desc: "Operating with transparency and ethical considerations at the forefront of all decisions.",
      },
    ],
  },
  review: {
    heading: "Reviews",
    testimonials: [
      {
        reviewer: "James R",
        reviewerRole: "Founder",
        quote:
          "Reliable, fast, and super professional. They helped us optimize our Shopify store and we instantly saw better conversions.",
      },
      {
        reviewer: "Emily T",
        reviewerRole: "Director",
        quote:
          "The CRO experiments they ran boosted our sales within weeks. Smart strategies, well executed.",
      },
      {
        reviewer: "Oliver K",
        reviewerRole: "Vice President",
        quote:
          "They rebuilt our homepage and PDPs with clean design and better UX. Our bounce rate dropped noticeably",
      },
      {
        reviewer: "Abhijit M",
        reviewerRole: "CTO",
        quote:
          "Amazing Shopify experts! They customized our store flawlessly and gave us a clear CRO roadmap.",
      },
      {
        reviewer: "Daniel H",
        reviewerRole: "CEO",
        quote:
          "We saw a 20% lift in conversions after their changes to our cart and checkout. Highly recommend.",
      },
      {
        reviewer: "Mia L.",
        reviewerRole: "Head of Product",
        quote:
          "Their A/B testing insights were game-changing. We're finally making decisions with data, not guesses.",
      },
    ],
  },
  contact: {
    heading: "Contact Us",
    form: {
      title: "Ready To Scale Your Conversions ?",
      country: { flag: "🇮🇳", dial: "+91" },
      fields: [
        {
          type: "text",
          name: "firstName",
          placeholder: "Your Full Name",
          col: "half",
        },
        {
          type: "text",
          name: "organization",
          placeholder: "Organization",
          col: "half",
        },
        { type: "email", name: "email", placeholder: "Work Email", col: "full" },
        { type: "text", name: "main website url", placeholder: "Main Website URL", col: "full" },
        {
          type: "tel",
          name: "phone",
          placeholder: "Phone Number",
          col: "full",
        },
        {
          type: "textarea",
          name: "message",
          placeholder: "Share Your Project Details and Goals",
          col: "full",
        },
      ],
      submit: { label: "Send" },
    },
    infoCards: [
      {
        title: "Contact Information",
        items: [
          {
            icon: "email",
            text: "ingversionsdigital@gmail.com",
          },
          {
            icon: "phone",
            text: "+91-8866167750",
          },
          {
            icon: "location",
            text: "2599, Shiv Krupa Association, Kansad, Sachin, Surat 394230 India.",
          },
        ],
      },

    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    list: [
      {
        q: "What is Conversion Rate Optimization?",
        a: "Conversion Rate Optimization (CRO) is the process of refining a website to better convert visitors into customers or subscribers. Essentially, it involves boosting the percentage of visitors who complete a specific action—whether that's making a purchase, signing up for a newsletter, or downloading a file. By carefully analyzing user behavior and employing techniques such as A/B testing, design adjustments, and improved navigation, businesses can create a more engaging and effective online experience.",
      },
      {
        q: "How can a CRO agency help your business?",
        a: "We identify and prioritize high-impact opportunities, run experiments, and ship iterative improvements that lift revenue and lead quality.",
      },
      {
        q: "What services do you offer as a CRO agency?",
        a: "A/B testing, UX research, analytics, Shopify/WordPress development, QA, personalization, and performance fixes.",
      },
      {
        q: "How long does it take to see results from CRO efforts?",
        a: "Usually 2–4 weeks for directional signal (depending on traffic) and 6–8 weeks for stronger confidence.",
      },
      {
        q: "Do I need to redesign my entire website for CRO?",
        a: "Not necessarily. We start with targeted improvements and experiments before considering a full redesign.",
      },
      {
        q: "Will CRO impact my website's SEO?",
        a: "We follow technical best practices; CRO and SEO often complement each other when implemented correctly.",
      },
      {
        q: "Can you integrate CRO with my existing marketing strategies?",
        a: "Yes. We integrate with your existing analytics, ad platforms, and CRM to track end-to-end outcomes.",
      },
    ],
  },
blog: {
  heading: "Latest Articles",
  seeMoreText: "See more articles",
  seeMoreUrl: "/blog",
  list: [
    {
      id: 1,
      title: "5 Shopify Theme Customizations That Boost Sales",
      category: "Shopify Development",
      desc: "From product page layouts to checkout optimizations, these theme changes can significantly improve conversions and customer retention...",
      date: "April 8, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1742454582165-deab666a8763?q=80&w=1200&auto=format&fit=crop",
      url: "/blog/shopify-theme-customizations-boost-sales"
    },
    {
      id: 2,
      title: "A/B Testing Mistakes That Cost You Money",
      category: "A/B Testing",
      desc: "Avoid common experimentation mistakes that lead to inaccurate data and poor conversion decisions in your marketing funnels...",
      date: "April 5, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1643917853964-434e78b21cf7?q=80&w=1200&auto=format&fit=crop",
      url: "/blog/ab-testing-mistakes-cost-money"
    },
    {
      id: 3,
      title: "CRO Fundamentals: Where to Start From",
      category: "CRO",
      desc: "Learn the core principles of conversion rate optimization and how to build a strategy that drives measurable growth...",
      date: "April 3, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=1200&auto=format&fit=crop",
      url: "/blog/cro-fundamentals-where-to-start"
    },
    {
      id: 4,
      title: "The Psychology of High-Converting Landing Pages",
      category: "CRO",
      desc: "Understand how visual hierarchy, trust signals, and emotional triggers influence user actions on landing pages...",
      date: "April 12, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?q=80&w=1200&auto=format&fit=crop",
      url: "/blog/psychology-high-converting-landing-pages"
    },
    {
      id: 5,
      title: "Essential QA Checklists Before Launching Your Store",
      category: "Quality Assurance",
      desc: "A complete pre-launch checklist to ensure your ecommerce website is bug-free, responsive, and optimized for users...",
      date: "April 15, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1586282023338-52aa50a846ba?q=80&w=1200&auto=format&fit=crop",
      url: "/blog/qa-checklist-before-launching-store"
    },
    {
      id: 6,
      title: "Headless Shopify: Is It Right for Your Brand?",
      category: "Shopify Development",
      desc: "Explore the pros and cons of headless commerce and whether your business actually needs a decoupled storefront...",
      date: "April 18, 2026",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1610989001873-03968eed0f08?q=80&w=1200&auto=format&fit=crop",
      url: "/blog/headless-shopify-is-it-right-for-your-brand"
    },
    {
      id: 7,
      title: "Multivariate vs A/B Testing: When to Use Which",
      category: "A/B Testing",
      desc: "Compare multivariate testing with standard A/B testing and learn which approach delivers better insights for your campaigns...",
      date: "April 20, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1667984390533-64bdefe719ea?q=80&w=1200&auto=format&fit=crop",
      url: "/blog/multivariate-vs-ab-testing"
    },
    {
      id: 8,
      title: "Micro-Commitments: The Secret to Better Funnels",
      category: "CRO",
      desc: "Small user actions can lead to larger conversions. Discover how micro-commitments improve engagement and reduce bounce rates...",
      date: "April 24, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1773047747593-b2f10e0579c5?q=80&w=1200&auto=format&fit=crop",
      url: "/blog/micro-commitments-better-funnels"
    },
    {
      id: 9,
      title: "Automated UI Testing for E-commerce Websites",
      category: "Quality Assurance",
      desc: "Implement automated frontend testing workflows to catch UI bugs early and maintain a seamless shopping experience...",
      date: "April 28, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1753998941488-fc3064ab6094?q=80&w=1200&auto=format&fit=crop",
      url: "/blog/automated-ui-testing-ecommerce"
    },
    {
      id: 10,
      title: "Optimizing Shopify Core Web Vitals for SEO",
      category: "Shopify Development",
      desc: "Improve loading speed, visual stability, and responsiveness in Shopify to rank better and convert more visitors...",
      date: "May 2, 2026",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1563131630-79ca2b9b47f5?q=80&w=1200&auto=format&fit=crop",
      url: "/blog/optimizing-shopify-core-web-vitals"
    }
  ]
},

  projects: {
    heading: "Our Work",
       seeMoreText: "Discover",
    seeMoreUrl: "/projects",
    list: [
       {
      id: 1,
      industry: "Pet Care",
      title: "Ruff Greens",
      type: "Landing Pages",
      image: "/assets/project/vet-approved-guide-2026.webp",
      link: "https://ruffgreens.com/",
    },
    {
      id: 2,
      industry: "Household Supplies",
      title: "Match With Nature",
      type: "Websites",
      image: "/assets/project/fragrance.webp",
      link: "https://matchwithnature.com/",
    },
    {
      id: 3,
      industry: "Wireless Communication",
      title: "Rapid Radios",
      type: "Websites",
      image: "/assets/project/rapid-radios.webp",
      link: "https://rapidradios.com/",
    },
    {
      id: 4,
      industry: "Online Learning",
      title: "Grooved Learning",
      type: "E-commerce",
      image: "/assets/project/codebreakers.webp",
      link: "https://groovedlearning.com/",
    },
    {
      id: 5,
      industry: "Personal Protective Equipment",
      title: "Safety Gear",
      type: "E-commerce",
      image: "/assets/project/safetgear.webp",
      link: "https://www.safetygear.com/",
    },
    {
      id: 6,
      industry: "Jewelry & Accessories",
      title: "Olivia & Pearl",
      type: "Landing Pages",
      image: "/assets/project/oliviapearl.webp",
      link: "https://oliviaandpearl.com/",
    },
    {
      id: 7,
      industry: "Mattresses & Sleep Products",
      title: "Sonno",
      type: "Landing Pages",
      image: "/assets/project/sonno.webp",
      link: "https://www.sleepsonno.com/",
    },
    {
      id: 8,
      industry: "Fashion",
      title: "Manto Store",
      type: "E-commerce",
      image: "/assets/project/manto.webp",
      link: "https://www.manto.ae/",
    },
    {
      id: 9,
      industry: "Outdoor Play Equipment",
      title: "Bijou Build",
      type: "Landing Pages",
      image: "/assets/project/bijoubuild.webp",
      link: "https://bijoubuild.com/",
    },
    {
      id: 10,
      industry: "Business",
      title: "Dan Henry Watches",
      type: "Websites",
      image: "/assets/project/danhenry.webp",
      link: "https://danhenrywatches.com/",
    }
    ],
  },
footer: {
    logo: "/assets/logos/main-logo.png",
    company: "Ingversions Digital",
    bio: "Ingversions is a digital agency focused on CRO-driven websites. We help e-commerce brands scale conversions with data-backed design and development.",
    contactTitle: "Get in touch",
    linkGroups: [
      {
        title: "Company",
        links: [
          { name: "Projects", href: "/projects" },
          { name: "Case Studies", href: "/case-studies" },
          { name: "Pricing", href: "/pricing" },
          { name: "About Us", href: "/about-us" },
          { name: "Team", href: "/teampage" },
          { name: "Blog", href: "/blog" },
          { name: "A/B Test Calculator", href: "/ab-test-calculator" },
        ],
      },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Settings", action: "cookie-settings" },
    ],
    address: "2599, Shiv Krupa Association, Kansad, Sachin, Surat 394230 India",
    email: "ingversionsdigital@gmail.com",
    phone: "+91-8866167750",
    socials: [
      {
        name: "facebook",
        icon: "facebook",
        href: "https://www.facebook.com/p/Ingversions-Digital-Pvt-Ltd-61573019451087",
      },
      {
        name: "twitter",
        icon: "twitter",
        href: "https://x.com/Ingversions",
      },
      {
        name: "linkedin",
        icon: "linkedin",
        href: "https://in.linkedin.com/company/ingversions",
      },
      {
        name: "instagram",
        icon: "instagram",
        href: "https://www.instagram.com/ingversions/",
      },
    ],
    year: new Date().getFullYear(),
  },
};
