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
      image: "/assets/project/danhenry.jpg",
      link: "https://danhenrywatches.com/",
    },
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
    buttonLink: "/#hero",
  },
};

export default projectsData;
