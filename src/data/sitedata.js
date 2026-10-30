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
  // Hero of the /services page; the cards below it come from `services`.
  servicesPage: {
    tag: "Services",
    title: "Shopify CRO, A/B Testing & Development Services",
    sub: "Everything your store needs to convert more visitors: research-led A/B tests, Shopify development, and full QA on every build. Your first test is free.",
    primaryCta: "Book a call",
    primaryHref: "https://calendly.com/ingversionsdigital/30min",
    secondaryCta: "See pricing",
    secondaryHref: "/pricing",
    // Each service block's details (intro, included, keywords) come from
    // servicepagesdata.js, for the services listed in `services` below.
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
        // Shown as the big "price" line on service-page pricing cards.
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
        // Shown as the big "price" line on service-page pricing cards.
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
        // Shown as the big "price" line on service-page pricing cards.
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
  // The /case-studies page (CaseStudiesPage). The studies themselves are caseStudies.list below.
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
    sub: "Real numbers from real work, measured in Google Analytics 4.",
    list: [
      {
        // Also the standalone page /case-studies/<id> (see CaseStudyPage).
        id: "shopify-pdp-trust-badges-ab-test",
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
    linkGroups: [
      {
        title: "Quick Links",
        links: [
          { name: "Home", href: "/#hero" },
          { name: "Services", href: "/services" },
          { name: "Pricing", href: "/pricing" },
          { name: "Projects", href: "/projects" },
          { name: "Case Studies", href: "/case-studies" },
        ],
      },
      {
        title: "Services",
        links: [
          { name: "A/B Testing", href: "/ab-testing" },
          { name: "Shopify Development", href: "/shopify-development" },
          { name: "Quality Assurance", href: "/quality-assurance" },
          { name: "Landing Page Personalization", href: "/landing-page-personalization" },
        ],
      },
      {
        title: "Company",
        links: [
          { name: "Team Page", href: "/teampage" },
          { name: "About Us", href: "/about-us" },
          { name: "Blog", href: "/blog" },
          { name: "A/B Test Calculator", href: "/ab-test-calculator" },
        ],
      },
      {
        title: "Legal",
        links: [
          { name: "Privacy Policy", href: "/privacy-policy" },
          { name: "Terms of Service", href: "/terms-of-service" },
          { name: "Cookie Settings", action: "cookie-settings" },
        ],
      },
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
