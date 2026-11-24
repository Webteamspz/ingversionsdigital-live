// Banner copy for each sale occasion. The dates live in src/utils/occasions.js.
// `today` replaces the fields it names on the day itself.
export const occasionBanner = {
  cta: { label: "See Pricing", to: "/pricing", scrollTo: "pricingHero" },
  hideOn: ["/pricing", "/blog", "/ab-test-simulator"],
  autoOpenMs: 40000,
};

export const occasions = {
  blackFriday: {
    name: "Black Friday",
    ring: "BLACK FRIDAY • 50% OFF • ",
    badge: "Black Friday in",
    eyebrow: "50% off every plan",
    title: "Half price on every plan until Black Friday",
    text: "Our biggest offer of the year is live now for Shopify brands. Every plan is 50% off until the end of Black Friday.",
    today: {
      badge: "Black Friday is live",
      eyebrow: "Today only",
      text: "Last day of Black Friday pricing for Shopify brands. Pick your plan before midnight.",
    },
  },
  cyberMonday: {
    name: "Cyber Monday",
    ring: "CYBER MONDAY • 50% OFF • ",
    badge: "Cyber Monday in",
    eyebrow: "Still 50% off",
    title: "Missed Black Friday? Cyber Monday is on",
    text: "Every plan stays 50% off for Shopify brands until the end of Cyber Monday.",
    today: {
      badge: "Cyber Monday is live",
      eyebrow: "Last chance",
      text: "Final day of 50% off every plan. The offer ends at midnight.",
    },
  },
  christmas: {
    name: "Christmas",
    ring: "CHRISTMAS SALE • 50% OFF • ",
    badge: "Christmas in",
    eyebrow: "Christmas sale",
    title: "Half price on every plan this Christmas",
    text: "Start the new year with a faster, higher-converting store. Every plan is 50% off until Christmas Day.",
    today: {
      badge: "Merry Christmas",
      eyebrow: "Today only",
      text: "Our Christmas price ends tonight. Every plan is 50% off until midnight.",
    },
  },
  newYear: {
    name: "New Year",
    ring: "NEW YEAR SALE • 50% OFF • ",
    badge: "New Year in",
    eyebrow: "New Year sale",
    title: "Start the new year at half price",
    text: "Plan next year's tests now. Every plan is 50% off for Shopify brands until the end of New Year's Day.",
    today: {
      badge: "Happy New Year",
      eyebrow: "Last day",
      text: "The New Year sale ends tonight. Every plan is 50% off until midnight.",
    },
  },
};

// The tag next to a sale price.
export const saleTag = (percent) => `${percent}% OFF`;
