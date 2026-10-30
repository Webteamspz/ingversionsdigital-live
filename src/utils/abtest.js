// Frequentist A/B test maths for the /ab-test-calculator page. Pure functions,
// no React, so `npm test` runs them under plain Node. Bad input returns null.

const isCount = (n) => Number.isFinite(n) && n >= 0;

// Abramowitz & Stegun 7.1.26, max error ~1.5e-7.
export const normCdf = (z) => {
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const erf = 1 - poly * Math.exp(-x * x);
  return z >= 0 ? (1 + erf) / 2 : (1 - erf) / 2;
};

// Acklam's rational approximation of the inverse normal CDF.
const A = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
const B = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
const C = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
const D = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];

export const normInv = (p) => {
  const tail = (q) =>
    (((((C[0] * q + C[1]) * q + C[2]) * q + C[3]) * q + C[4]) * q + C[5]) /
    ((((D[0] * q + D[1]) * q + D[2]) * q + D[3]) * q + 1);
  if (p < 0.02425) return tail(Math.sqrt(-2 * Math.log(p)));
  if (p > 1 - 0.02425) return -tail(Math.sqrt(-2 * Math.log(1 - p)));
  const q = p - 0.5;
  const r = q * q;
  return (
    ((((((A[0] * r + A[1]) * r + A[2]) * r + A[3]) * r + A[4]) * r + A[5]) * q) /
    (((((B[0] * r + B[1]) * r + B[2]) * r + B[3]) * r + B[4]) * r + 1)
  );
};

// Two-proportion pooled z-test. One-sided tests "B beats A".
export const significance = ({ visitorsA, convA, visitorsB, convB, confidence, tails = 2 }) => {
  if (![visitorsA, convA, visitorsB, convB].every(isCount)) return null;
  if (!visitorsA || !visitorsB || convA > visitorsA || convB > visitorsB) return null;
  const rateA = convA / visitorsA;
  const rateB = convB / visitorsB;
  const pooled = (convA + convB) / (visitorsA + visitorsB);
  if (pooled === 0 || pooled === 1) return null;
  const se = Math.sqrt(pooled * (1 - pooled) * (1 / visitorsA + 1 / visitorsB));
  const z = (rateB - rateA) / se;
  const pValue = tails === 1 ? normCdf(-z) : 2 * normCdf(-Math.abs(z));
  const seUnpooled = Math.sqrt(rateA * (1 - rateA) / visitorsA + rateB * (1 - rateB) / visitorsB);
  // One-sided: the lower bound must match the one-sided test, so use z at `confidence`.
  const zCI = normInv(tails === 1 ? confidence : 1 - (1 - confidence) / 2);
  const diff = rateB - rateA;
  return {
    rateA,
    rateB,
    uplift: rateA ? diff / rateA : null,
    z,
    pValue,
    significant: pValue < 1 - confidence,
    ci: [diff - zCI * seUnpooled, diff + zCI * seUnpooled],
  };
};

// Smallest relative lift detectable each week. Bonferroni-corrects alpha when
// several variants are compared against control.
export const mdeByWeek = ({ weeklyVisitors, weeklyConversions, variants, confidence, power, weeks = 6 }) => {
  if (!isCount(weeklyVisitors) || !isCount(weeklyConversions) || !weeklyVisitors || weeklyConversions > weeklyVisitors) return null;
  const rate = weeklyConversions / weeklyVisitors;
  if (rate === 0 || rate === 1 || variants < 2) return null;
  const alpha = (1 - confidence) / (variants - 1);
  const zSum = normInv(1 - alpha / 2) + normInv(power);
  return Array.from({ length: weeks }, (_, i) => {
    const visitorsPerVariant = Math.floor((weeklyVisitors / variants) * (i + 1));
    const absolute = zSum * Math.sqrt((2 * rate * (1 - rate)) / visitorsPerVariant);
    return { week: i + 1, visitorsPerVariant, absolute, relative: absolute / rate };
  });
};

// Sample ratio mismatch: chi-square (1 df) on the observed split.
export const srm = (visitorsA, visitorsB, expectedSplit = 0.5) => {
  if (!isCount(visitorsA) || !isCount(visitorsB) || !(visitorsA + visitorsB)) return null;
  const total = visitorsA + visitorsB;
  const expA = total * expectedSplit;
  const expB = total - expA;
  const chi2 = (visitorsA - expA) ** 2 / expA + (visitorsB - expB) ** 2 / expB;
  const pValue = 2 * normCdf(-Math.sqrt(chi2));
  return { chi2, pValue, mismatch: pValue < 0.01 };
};
