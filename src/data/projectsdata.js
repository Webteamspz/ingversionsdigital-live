const projectsData = {
  // ---------- Top heading section ----------
  hero: {
    tag: "Our Amazing Work",
    headingPart1: "Explore Our",
    headingHighlight: "Projects",
    description:
      "We take pride in delivering CRO-driven websites that not only look great but also drive real results for businesses.",
  },

  // ---------- Filter tabs ----------
  // First item is always treated as the "show everything" filter.
  filters: [
    "All Projects",
    "Websites",
    "Landing Pages",
    "E-commerce",
    "Branding",
  ],

  // ---------- Project cards ----------
  // industry -> small label shown above the title (e.g. "Fitness")
  // type     -> must match one of the values in `filters` above (used for filtering)
  // image    -> path/URL to the project thumbnail
  // link     -> where the card should navigate to (live site / case study)
  projects: [
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
      image: "/assets/project/Fragrance.webp",
      link: "https://matchwithnature.com/",
    },
    {
      id: 3,
      industry: "Wireless Communication",
      title: "Rapid Radios",
      type: "Websites",
      image: "/assets/project/Rapidradios.webp",
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
    // {
    //   id: 6,
    //   industry: "Beauty & Lifestyle",
    //   title: "Radiant You",
    //   type: "Landing Pages",
    //   image: "/assets/projects/radiant-you.jpg",
    //   link: "#",
    // },
    // {
    //   id: 7,
    //   industry: "Skincare",
    //   title: "Pure Essence",
    //   type: "Landing Pages",
    //   image: "/assets/projects/pure-essence.jpg",
    //   link: "#",
    // },
    // {
    //   id: 8,
    //   industry: "Fashion",
    //   title: "Vogue House",
    //   type: "E-commerce",
    //   image: "/assets/projects/vogue-house.jpg",
    //   link: "#",
    // },
    // {
    //   id: 9,
    //   industry: "Health & Wellness",
    //   title: "Herbal Pure",
    //   type: "Landing Pages",
    //   image: "/assets/projects/herbal-pure.jpg",
    //   link: "#",
    // },
    // {
    //   id: 10,
    //   industry: "Business",
    //   title: "NextGen Solutions",
    //   type: "Websites",
    //   image: "/assets/projects/nextgen-solutions.jpg",
    //   link: "#",
    // },
    // {
    //   id: 11,
    //   industry: "Business",
    //   title: "Elite Consulting",
    //   type: "Websites",
    //   image: "/assets/projects/elite-consulting.jpg",
    //   link: "#",
    // },
    // {
    //   id: 12,
    //   industry: "Jewelry",
    //   title: "Golden Touch",
    //   type: "E-commerce",
    //   image: "/assets/projects/golden-touch.jpg",
    //   link: "#",
    // },
    // {
    //   id: 13,
    //   industry: "Education",
    //   title: "Bright Future Academy",
    //   type: "Websites",
    //   image: "/assets/projects/bright-future-academy.jpg",
    //   link: "#",
    // },
    // {
    //   id: 14,
    //   industry: "Healthcare",
    //   title: "LifeCare Hospital",
    //   type: "Websites",
    //   image: "/assets/projects/lifecare-hospital.jpg",
    //   link: "#",
    // },
    // {
    //   id: 15,
    //   industry: "Art & Design",
    //   title: "Color Canvas",
    //   type: "Branding",
    //   image: "/assets/projects/color-canvas.jpg",
    //   link: "#",
    // },
    // {
    //   id: 16,
    //   industry: "Technology",
    //   title: "CodeCraft Labs",
    //   type: "Websites",
    //   image: "/assets/projects/codecraft-labs.jpg",
    //   link: "#",
    // },
    // {
    //   id: 17,
    //   industry: "Fitness",
    //   title: "Zen Yoga Studio",
    //   type: "Landing Pages",
    //   image: "/assets/projects/zen-yoga-studio.jpg",
    //   link: "#",
    // },
    // {
    //   id: 18,
    //   industry: "Entertainment",
    //   title: "BeatWave Events",
    //   type: "Branding",
    //   image: "/assets/projects/beatwave-events.jpg",
    //   link: "#",
    // },
  ],

  // ---------- Bottom call-to-action box ----------
  cta: {
    title: "Have a project in mind?",
    subtitle: "Let's build something that drives real impact.",
    buttonText: "Book a Free Consultation",
    buttonLink: "#contact",
  },
};

export default projectsData;
