export default {
  header: {
    links: [
      { label: "Home", href: "#hero" },
      { label: "Services", href: "#cro-services" },
      { label: "Success", href: "#success" },
      { label: "Works", href: "#work-process" },
      { label: "FAQ", href: "#FAQ" },
    ],
    cta: { label: "Book a Call", href: "https://calendly.com/ingversionsdigital/30min?month=2025-10" },
  },
  hero: {
    titleLeading: "From idea to",
    pill: "Impact",
    subtitle: "CRO-Driven Websites That Work for You",
    cta: { label: "Book a Call", href: "#contact" },
    avatars: [
      "/src/assets/hero/hero-client-1.png",
      "/src/assets/hero/hero-client-2.png",
      "/src/assets/hero/hero-client-3.png",
    ],
    proof: "Over <strong>10+</strong> clients have worked with us",
    visual: "/src/assets/hero/hero-main.png",
  },
  logos: [
    "/src/assets/hero/zapier.png",
    "/src/assets/hero/spotify.png",
    "/src/assets/hero/zoom.png",
    "/src/assets/hero/slack.png",
    "/src/assets/hero/amazon.png",
    "/src/assets/hero/adobe.png",
  ],
  kpis: [
    { value: "10+", label: "Clients" },
    { value: "500+", label: "Projects" },
    { value: "100%", label: "Happy clients" },
    { value: "5+", label: "Years of experience" },
  ],
  services: [
    {
      title: "A/B Testing",
      desc: "Data-driven experiments to boost conversions and optimize user journeys on your website.",
      icon: "/src/assets/ab-testing.png",
    },
    {
      title: "Shopify Development",
      desc: "Custom Shopify template and theme design and development tailored for performance and scalability.",
      icon: "/src/assets/shopify.png",
    },
    {
      title: "Quality Assurance",
      desc: "End-to-end quality assurance to ensure flawless functionality, usability, and bug-free experiences.",
      icon: "/src/assets/qa.png",
    },
    {
      title: "WordPress Development",
      desc: "Custom WordPress template and theme design, along with development, specifically crafted for performance.",
      icon: "/src/assets/wordpress.png",
    },
    {
      title: "Landing Page Personalization",
      desc: "Deliver tailored experiences that adapt to user behavior, boosting engagement and conversions.",
      icon: "/src/assets/landing-page.png",
    },
  ],
  process: [
    {
      title: "Project Discussion",
      desc: "We start by understanding your business goals, challenges, and requirements to ensure complete clarity before moving forward.",
      icon: "/src/assets/work-process/project-discussion.png",
    },
    {
      title: "Plan & Approach",
      desc: "A tailored strategy and roadmap are created, outlining timelines, tools, and milestones for smooth execution.",
      icon: "/src/assets/work-process/plan.png",
    },
    {
      title: "Development",
      desc: "Our team brings ideas to life with clean, scalable, and high-performing solutions designed for your business needs.",
      icon: "/src/assets/work-process/dev.png",
    },
    {
      title: "Launch",
      desc: "After rigorous testing and refinements, we deliver and launch your project, ensuring a seamless go-live experience.",
      icon: "/src/assets/work-process/goal.png",
    },
  ],
  why: [
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
  testimonials: [
  {
    reviewer: "John Doe",
    reviewerRole: "Founder & CEO",
    quote:
      "That’s when we knew there had to be a better way — a smarter, faster, more intuitive solution.",
  },
  {
    reviewer: "John Doe",
    reviewerRole: "Founder & CEO",
    quote:
      "So we built a platform that empowers companies to transform raw data into real-time decisions using the power of AI.",
  },
  {
    reviewer: "John Doe",
    reviewerRole: "Founder & CEO",
    quote:
      "We’re here to make intelligent systems accessible, actionable, and aligned with real business goals.",
  },
  {
    reviewer: "Jane Roe",
    reviewerRole: "CTO",
    quote:
      "From day one, we focused on reliability and performance so teams can trust the insights they act on.",
  },
  {
    reviewer: "Alex Kim",
    reviewerRole: "COO",
    quote:
      "Our mission is to remove friction, reduce guesswork, and elevate outcomes for every customer.",
  },
  {
    reviewer: "Priya Shah",
    reviewerRole: "Head of Product",
    quote:
      "We ship small, learn fast, and let real user value guide the roadmap.",
  },
],
  contact: {
    heading: "Contact Us",
    form: {
      title: "Send Us a Message",
      country: { flag: "🇮🇳", dial: "+91" }, 
      fields: [
        {
          type: "text",
          name: "firstName",
          placeholder: "First Name",
          col: "half",
        },
        {
          type: "text",
          name: "lastName",
          placeholder: "Last Name",
          col: "half",
        },
        { type: "email", name: "email", placeholder: "Email", col: "full" },
        { type: "text", name: "company", placeholder: "Company", col: "full" },
        {
          type: "tel",
          name: "phone",
          placeholder: "Phone Number",
          col: "full",
        },
        {
          type: "textarea",
          name: "message",
          placeholder: "Message",
          col: "full",
        },
      ],
      submit: { label: "Send" },
    },
    infoCards: [
      {
        title: "Contact Information",
        items: [
          { icon: "mail", text: "hello@ingversionsdigital.com" },
          { icon: "phone", text: "+91-8103684321" },
          {
            icon: "map",
            text: "2599 Shiv Krupa Association,Kansad, Sachin, Surat 394230 India",
          },
        ],
      },
      {
        title: "Contact Information",
        description:
          "Want to discuss your project in detail? Schedule a free 30-minute consultation with our team of experts. We'll help you understand how our solutions can benefit your business.",
        cta: { label: "Book a Call", href: "https://calendly.com/ingversionsdigital/30min?month=2025-10" },
      },
    ],
  },
  faqSection: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "What is Conversion Rate Optimisation?",
        a: "Conversion Rate Optimization (CRO) is the process of refining a website to better convert visitors into customers or subscribers. Essentially, it involves boosting the percentage of visitors who complete a specific action—whether that’s making a purchase, signing up for a newsletter, or downloading a file. By carefully analyzing user behavior and employing techniques such as A/B testing, design adjustments, and improved navigation, businesses can create a more engaging and effective online experience.",
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
        q: "Will CRO impact my website’s SEO?",
        a: "We follow technical best practices; CRO and SEO often complement each other when implemented correctly.",
      },
      {
        q: "Can you integrate CRO with my existing marketing strategies?",
        a: "Yes. We integrate with your existing analytics, ad platforms, and CRM to track end-to-end outcomes.",
      },
    ],
  },
  footer: {
    logo: "/src/assets/main-logo.png",
    company: "Ingversions Digital",
    links: ["Home", "Services", "Review", "About Us", "FAQ"],
    address: "2599 Shiv Krupa Association, Kansad, Sachin, Surat 394230",
    email: "hello@ingversionsdigital.com",
    phone: "+91-8103684321",
    socials: [
      { name: "facebook", href: "https://www.facebook.com/p/Ingversions-Digital-Pvt-Ltd-61573019451087" },
      { name: "twitter", href: "https://x.com/Ingversions" },
      { name: "linkedin", href: "https://in.linkedin.com/company/ingversions" },
      { name: "instagram", href: "https://www.instagram.com/ingversions/" },
    ],
    year: new Date().getFullYear(),
  },
};
