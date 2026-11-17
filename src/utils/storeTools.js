// Maths for the free Shopify tools in src/data/toolsData.js. Rates are fractions (0.029, not 2.9).
// Each returns null on invalid input; `verdict` keys into the tool's `verdicts` copy.

const isAmount = (n) => Number.isFinite(n) && n >= 0;

export const revenueImpact = ({ monthlyVisitors, rate, aov, lift }) => {
  if (![monthlyVisitors, rate, aov, lift].every(isAmount) || rate > 1) return null;
  const orders = monthlyVisitors * rate;
  const revenue = orders * aov;
  return {
    orders,
    revenue,
    extraOrders: orders * lift,
    extraMonthly: revenue * lift,
    extraYearly: revenue * lift * 12,
  };
};

export const profitMargin = ({ price, cogs, shipping, feePct, feeFixed }) => {
  if (![price, cogs, shipping, feePct, feeFixed].every(isAmount) || !price || feePct > 1)
    return null;
  const fees = price * feePct + feeFixed;
  const profit = price - cogs - shipping - fees;
  return {
    fees,
    profit,
    margin: profit / price,
    breakEvenRoas: profit > 0 ? price / profit : null,
    breakEvenCpa: Math.max(profit, 0),
    verdict: profit > 0 ? null : "loser",
  };
};

export const discountImpact = ({ price, cost, discount }) => {
  if (![price, cost, discount].every(isAmount) || !price || cost >= price) return null;
  if (!(discount > 0 && discount < 1)) return null;
  const profit = price - cost;
  const saleProfit = price * (1 - discount) - cost;
  const ratio = saleProfit > 0 ? profit / saleProfit : null;
  return {
    profit,
    saleProfit,
    salePrice: price * (1 - discount),
    unitsFor100: ratio && 100 * ratio,
    extraSales: ratio && ratio - 1,
    verdict: ratio ? null : "loser",
  };
};

export const lifetimeValue = ({ aov, ordersPerYear, years, margin, cac }) => {
  if (![aov, ordersPerYear, years, margin, cac].every(isAmount) || margin > 1) return null;
  if (!aov || !ordersPerYear || !years) return null;
  const revenue = aov * ordersPerYear * years;
  const profit = revenue * margin;
  const monthlyProfit = (aov * margin * ordersPerYear) / 12;
  const ratio = cac ? profit / cac : null;
  return {
    revenue,
    profit,
    ratio,
    payback: cac && monthlyProfit ? cac / monthlyProfit : null,
    verdict: ratio === null ? null : ratio >= 3 ? "winner" : ratio >= 1 ? "flat" : "loser",
  };
};
