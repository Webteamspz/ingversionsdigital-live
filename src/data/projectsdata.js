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
    "A/B Testing",
    "E-commerce",
    "Shopify",
  ],

  // ---------- Project cards ----------
  // industry    -> small label shown above the title (e.g. "Fitness")
  // type        -> must match one of the values in `filters` above (used for filtering)
  // image       -> path/URL to the project thumbnail shown in the grid
  // beforeImage -> (OPTIONAL) path to the "Before" image for the modal slider
  // afterImage  -> (OPTIONAL) path to the "After" image for the modal slider
  // link        -> where the card should navigate to (live site / case study)
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
      type: "A/B Testing",
      image: "/assets/project/Rapidradios.webp",
      mainImage: "/assets/project/Rapidradios.webp",
      beforeImage: "/assets/project/afterrapidradio.png",
      afterImage: "/assets/project/beforerapidradio.png",
      link: "https://rapidradios.com/",
    },
    {
      id: 4,
      industry: "Online Learning",
      title: "Grooved Learning",
      type: "E-commerce",
      image: "/assets/project/codebreakers.webp",
      // No before/after images here -> Clicking this will just open a single large modal image!
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
      type: "A/B Testing",
      image: "/assets/project/oliviapearl.webp",
      beforeImage: "/assets/project/Beforenecklace.png", 
      afterImage: "/assets/project/afternecklace.png",
      link: "https://oliviaandpearl.com/",
    },
    {
      id: 7,
      industry: "Mattresses & Sleep Products",
      title: "Sonno",
      type: "A/B Testing",
      beforeImage: "/assets/project/beforesonno.png", 
      afterImage: "/assets/project/aftersonno.png",
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
      type: "A/B Testing",
      beforeImage: "/assets/project/beforebijou.png", 
      afterImage: "/assets/project/afterbijou.png",
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
    {
      id: 11,
      industry: "Healthcare",
      title: "JS Dental",
      type: "Websites",
      image: "/assets/project/jsdental.webp",
      link: "https://jsdentallab.com/",
    },
    {
      id: 12,
      industry: "Fitness",
      title: "SHAPERLUV",
      type: "Shopify",
      image: "/assets/project/shaperluv.webp",
      link: "https://shaperluv.com/",
    },
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