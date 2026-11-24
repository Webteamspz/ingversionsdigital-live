// Sale calendar. All dates are the visitor's local midnight, so every time zone switches at its own
// midnight. Each occasion runs [start, end); `peak` is the day itself (the banner counts down to it,
// then says "today"). Outside every occasion the site shows the default prices and no banner.
const at = (y, m, d) => new Date(y, m, d);

// Black Friday: the fourth Friday of November.
export const blackFridayDate = (y) => {
  const firstFriday = 1 + ((5 - new Date(y, 10, 1).getDay() + 7) % 7);
  return firstFriday + 21;
};

export const occasionsFor = (y) => {
  const bf = blackFridayDate(y);
  return [
    // Starts 15 days before Black Friday, ends at the end of Black Friday.
    { id: "blackFriday", start: at(y, 10, bf - 15), peak: at(y, 10, bf), end: at(y, 10, bf + 1) },
    // From the moment Black Friday ends until the end of Cyber Monday (the following Monday).
    {
      id: "cyberMonday",
      start: at(y, 10, bf + 1),
      peak: at(y, 10, bf + 3),
      end: at(y, 10, bf + 4),
    },
    // 15 days before Christmas until the end of Christmas Day.
    { id: "christmas", start: at(y, 11, 10), peak: at(y, 11, 25), end: at(y, 11, 26) },
    // From 26 Dec until the end of New Year's Day.
    { id: "newYear", start: at(y, 11, 26), peak: at(y + 1, 0, 1), end: at(y + 1, 0, 2) },
  ];
};

// The occasion running at `now`, or null on a normal day.
export const currentOccasion = (now = new Date()) => {
  const y = now.getFullYear();
  for (const o of [...occasionsFor(y - 1), ...occasionsFor(y)]) {
    if (now >= o.start && now < o.end)
      return { id: o.id, today: now >= o.peak, left: Math.max(0, o.peak - now), end: o.end };
  }
  return null;
};

const amount = (v) => Number(String(v).replace(/[^0-9.]/g, ""));

// What a plan shows: its default price on a normal day; during an occasion, its `sale` price (falls
// back to the default) with the struck `was` price and the percent off.
export const planPrice = (plan, occasion) => {
  if (!occasion || !plan.sale) return { price: plan.price, priceLabel: plan.priceLabel };
  const price = plan.sale.price ?? plan.price;
  const priceLabel = plan.sale.priceLabel ?? plan.priceLabel;
  const percent = Math.round((1 - amount(price ?? priceLabel) / amount(plan.sale.was)) * 100);
  return { price, priceLabel, was: plan.sale.was, percent };
};
