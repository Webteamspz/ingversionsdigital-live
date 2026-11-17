import { significance } from "./abtest.js";

// The /ab-test-simulator page's simulated A/B test, day by day. Early days wobble around the true lift
// (like real tests do), then settle on it as traffic piles up. Deterministic so the prerendered
// HTML and the first client render match.
export const MIN_DAYS = 7;

const wobble = (day, phase) => (0.3 * Math.sin(day * 4.1 + phase)) / (1 + 0.3 * day * day);

export const simAt = ({ day, dailyVisitors, baseRate, lift, aov }) => {
  const visitors = Math.floor((day * dailyVisitors) / 2);
  const convA = Math.round(visitors * baseRate * (1 + wobble(day, 0)));
  const convB = Math.round(visitors * baseRate * (1 + lift) * (1 + wobble(day, 2.3)));
  const test = visitors
    ? significance({ visitorsA: visitors, convA, visitorsB: visitors, convB, confidence: 0.95 })
    : null;
  if (!test)
    return {
      day,
      visitors,
      convA,
      convB,
      uplift: null,
      confidence: null,
      extraYearly: 0,
      status: "early",
    };
  return {
    day,
    visitors,
    convA,
    convB,
    rateA: test.rateA,
    rateB: test.rateB,
    uplift: test.uplift,
    confidence: 1 - test.pValue,
    // Never call a winner before a full week, even when the early numbers look significant.
    status:
      day < MIN_DAYS ? "early" : test.significant && test.rateB > test.rateA ? "winner" : "running",
    extraYearly: Math.max(0, (test.rateB - test.rateA) * dailyVisitors * 365 * aov),
  };
};
