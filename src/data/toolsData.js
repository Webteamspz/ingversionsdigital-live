// Free Shopify tools. Keys are URL slugs: they generate the routes (App.jsx), the seoData.js
// entries and the footer links. Each field's `key` is the argument its maths function in
// src/utils/storeTools.js expects; `percent: true` fields are entered as 5 and passed as 0.05.

export const toolShared = {
  tag: "Free Shopify Tool",
  cta: {
    title: "Want more profit from the traffic you already have?",
    text: "We build and test Shopify stores that convert. Book a free call and we'll show you where to start.",
    label: "Book A Call",
    href: "https://calendly.com/ingversionsdigital/30min",
  },
  faqTitle: "Frequently Asked Questions",
  moreTitle: "More free tools",
  more: [{ name: "A/B Test Calculator", href: "/ab-test-calculator" }],
};

const tools = {
  "shopify-profit-margin-calculator": {
    name: "Profit Margin & ROAS Calculator",
    seo: {
      title: "Shopify Profit Margin & Break-Even ROAS Calculator",
      description:
        "Work out the real profit per order after product cost, shipping and payment fees, plus the break-even ROAS and CPA for your ads. Free Shopify calculator.",
      keywords: [
        "Shopify profit margin calculator",
        "break-even ROAS calculator",
        "break-even CPA",
        "ecommerce profit calculator",
      ],
    },
    hero: {
      title: "Shopify Profit Margin & Break-Even ROAS Calculator",
      subtitle:
        "See what you really keep from each order, and the ROAS your ads need before they make you money.",
    },
    intro: "Enter the numbers for one order. Check your plan for the exact payment fee.",
    rows: [
      [
        { key: "price", label: "Selling price ($)", default: "60" },
        { key: "cogs", label: "Product cost ($)", default: "20" },
      ],
      [{ key: "shipping", label: "Shipping & packaging cost ($)", default: "8" }],
      [
        { key: "feePct", label: "Payment fee (%)", default: "2.9", percent: true },
        { key: "feeFixed", label: "Fixed fee per order ($)", default: "0.30" },
      ],
    ],
    outputs: [
      { key: "profit", label: "Profit per order", format: "money2" },
      { key: "margin", label: "Profit margin", format: "pct" },
      { key: "breakEvenRoas", label: "Break-even ROAS", format: "ratio", highlight: true },
      {
        key: "breakEvenCpa",
        label: "Max cost per order from ads",
        format: "money2",
        highlight: true,
      },
    ],
    verdicts: {
      loser:
        "You lose money on every order before spending a cent on ads. Raise the price or cut costs.",
    },
    note: "Ads with a ROAS below the break-even number lose money on the first order. Repeat purchases can still make them worth it.",
    invalid: "Enter a selling price above 0 and costs of 0 or more.",
    faq: [
      {
        q: "What is break-even ROAS?",
        a: "The return on ad spend at which an ad pays for itself exactly. It is selling price divided by profit per order. With a $60 price and $30 profit, break-even ROAS is 2: every $1 of ads must bring $2 of sales.",
      },
      {
        q: "What profit margin is good for a Shopify store?",
        a: "Most healthy DTC brands keep 30% or more after product, shipping and payment costs, so there is room left for ads. Under 20% makes paid acquisition very hard.",
      },
      {
        q: "What should I include in product cost?",
        a: "Everything it takes to get one unit ready to ship: manufacturing or wholesale price, inbound freight, duties and any per-unit app or fulfilment fees.",
      },
    ],
  },

  "shopify-discount-calculator": {
    name: "Discount Break-Even Calculator",
    seo: {
      title: "Discount Break-Even Calculator for Black Friday Sales",
      description:
        "Find out how many more sales a discount needs to make the same profit. Plan Black Friday and sale pricing for your Shopify store before you launch.",
      keywords: [
        "discount calculator",
        "Black Friday discount calculator",
        "sale break-even calculator",
        "Shopify discount strategy",
      ],
    },
    hero: {
      title: "Shopify Discount Break-Even Calculator",
      subtitle:
        "Before you run a sale, see how many extra orders the discount needs just to make the same profit.",
    },
    intro: "Enter one product's price, its total cost and the discount you're planning.",
    rows: [
      [
        { key: "price", label: "Regular price ($)", default: "80" },
        { key: "cost", label: "Total cost per unit ($)", default: "35" },
      ],
      [{ key: "discount", label: "Discount (%)", default: "25", percent: true }],
    ],
    outputs: [
      { key: "salePrice", label: "Sale price", format: "money2" },
      { key: "saleProfit", label: "Profit per unit on sale", format: "money2" },
      { key: "extraSales", label: "Extra sales needed", format: "pct0", highlight: true },
      { key: "unitsFor100", label: "Sales needed per 100 now", format: "int", highlight: true },
    ],
    verdicts: {
      loser: "This discount is bigger than your margin. Every sale at this price loses money.",
    },
    note: "Total cost should include product, shipping and payment fees. Bundles or a gift with purchase often protect margin better than a straight discount.",
    invalid: "Enter a price above the cost and a discount between 0 and 100.",
    faq: [
      {
        q: "Why does a small discount need so many extra sales?",
        a: "The discount comes straight out of your profit, not your revenue. On a 40% margin product, 20% off halves the profit per unit, so you need twice the orders to stand still.",
      },
      {
        q: "Is a discount ever worth it if I don't hit the number?",
        a: "Sometimes. A sale can win new customers who buy again at full price, or clear stock that ties up cash. Check the lifetime value of those customers before deciding.",
      },
      {
        q: "What can I offer instead of a big discount?",
        a: "Free shipping over a threshold, bundles, a gift with purchase or tiered offers (spend more, save more). They raise order value instead of cutting price.",
      },
    ],
  },

  "customer-lifetime-value-calculator": {
    name: "Customer Lifetime Value Calculator",
    seo: {
      title: "Customer Lifetime Value (LTV) & LTV:CAC Calculator",
      description:
        "Calculate customer lifetime value, LTV:CAC ratio and CAC payback period for your Shopify store. Free LTV calculator for ecommerce brands.",
      keywords: [
        "customer lifetime value calculator",
        "LTV calculator",
        "LTV to CAC ratio",
        "CAC payback period",
      ],
    },
    hero: {
      title: "Customer Lifetime Value (LTV) Calculator",
      subtitle:
        "Find out what a customer is worth over time, and how much you can afford to pay to win one.",
    },
    intro: "Use averages from your Shopify analytics.",
    rows: [
      [
        { key: "aov", label: "Average order value ($)", default: "70" },
        { key: "ordersPerYear", label: "Orders per customer / year", default: "2.5" },
      ],
      [
        { key: "years", label: "Customer lifespan (years)", default: "2" },
        { key: "margin", label: "Gross margin (%)", default: "45", percent: true },
      ],
      [{ key: "cac", label: "Cost to acquire a customer ($)", default: "40" }],
    ],
    outputs: [
      { key: "revenue", label: "Lifetime revenue", format: "money" },
      { key: "profit", label: "Lifetime gross profit", format: "money", highlight: true },
      { key: "ratio", label: "LTV : CAC", format: "ratio", highlight: true },
      { key: "payback", label: "Months to earn back CAC", format: "months" },
    ],
    verdicts: {
      winner: "Healthy. Each customer is worth at least 3x what it costs to win them.",
      flat: "Profitable but tight. Aim for an LTV:CAC of 3 or more to grow safely.",
      loser: "Each customer costs more to win than they ever bring in. Cut CAC or raise LTV.",
    },
    invalid: "Enter order value, orders per year and lifespan above 0, and a margin up to 100.",
    faq: [
      {
        q: "What is a good LTV:CAC ratio?",
        a: "3:1 or higher is the common benchmark. Under 1:1 you lose money on every customer. Well above 5:1 can mean you are underspending on growth.",
      },
      {
        q: "Why use gross profit instead of revenue?",
        a: "Revenue includes the cost of the products you sold. Gross profit is what is actually left to pay for acquiring the customer, so it gives an honest ratio.",
      },
      {
        q: "How do I raise customer lifetime value?",
        a: "Post-purchase emails, subscriptions, bundles and a smoother checkout all help. Small conversion gains on repeat visits compound over a customer's lifespan.",
      },
    ],
  },

  "cro-revenue-calculator": {
    name: "CRO Revenue Calculator",
    seo: {
      title: "CRO Revenue Calculator: What a Conversion Lift Is Worth",
      description:
        "See how much extra revenue a higher conversion rate adds to your Shopify store each month and year. Free CRO ROI calculator.",
      keywords: [
        "CRO revenue calculator",
        "conversion rate optimization ROI",
        "conversion lift revenue",
        "Shopify revenue calculator",
      ],
    },
    hero: {
      title: "CRO Revenue Calculator",
      subtitle: "See what a higher conversion rate is worth to your store in revenue.",
    },
    intro: "Enter your store's monthly numbers and the lift you're aiming for.",
    rows: [
      [{ key: "monthlyVisitors", label: "Monthly visitors", default: "50000" }],
      [
        { key: "rate", label: "Conversion rate (%)", default: "2", percent: true },
        { key: "aov", label: "Average order value ($)", default: "60" },
      ],
      [{ key: "lift", label: "Expected conversion lift (%)", default: "15", percent: true }],
    ],
    outputs: [
      { key: "revenue", label: "Current monthly revenue", format: "money" },
      { key: "extraOrders", label: "Extra orders / month", format: "int" },
      { key: "extraMonthly", label: "Extra revenue / month", format: "money", highlight: true },
      { key: "extraYearly", label: "Extra revenue / year", format: "money", highlight: true },
    ],
    note: "Assumes traffic and order value stay the same. A good CRO programme lifts conversion rate by 10 to 30% over a year.",
    invalid: "Enter visitors, a conversion rate between 0 and 100, order value and lift.",
    faq: [
      {
        q: "What conversion lift is realistic?",
        a: "Single A/B tests that win usually add 2 to 10%. A year of steady testing often compounds to 10 to 30%, depending on how much traffic you have to test with.",
      },
      {
        q: "Should I also increase average order value?",
        a: "Yes. Bundles, upsells and free-shipping thresholds raise AOV, and every AOV gain multiplies with conversion gains.",
      },
    ],
  },
};

export default tools;
