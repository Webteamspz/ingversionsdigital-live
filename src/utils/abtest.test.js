import { test } from "node:test";
import assert from "node:assert/strict";
import { normCdf, normInv, significance, mdeByWeek, srm } from "./abtest.js";

const near = (actual, expected, tol) =>
  assert.ok(Math.abs(actual - expected) <= tol, `expected ${expected} ±${tol}, got ${actual}`);

test("normCdf matches the standard normal table", () => {
  near(normCdf(0), 0.5, 1e-7);
  near(normCdf(1.96), 0.975, 1e-4);
  near(normCdf(-1.96), 0.025, 1e-4);
});

test("normInv inverts normCdf", () => {
  near(normInv(0.975), 1.959964, 1e-4);
  near(normInv(0.8), 0.841621, 1e-4);
  near(normInv(0.05), -1.644854, 1e-4);
});

test("significance: 5.0% vs 5.8% on 10k each is significant at 95%, two-sided", () => {
  const r = significance({ visitorsA: 10000, convA: 500, visitorsB: 10000, convB: 580, confidence: 0.95 });
  near(r.uplift, 0.16, 1e-9);
  near(r.pValue, 0.0123, 5e-4);
  assert.equal(r.significant, true);
  assert.ok(r.ci[0] > 0, "CI lower bound should be positive for a significant win");
  assert.ok(r.ci[1] > r.ci[0], "CI upper > lower");
  near(r.ci[0], 0.00175, 5e-4);
  near(r.ci[1], 0.01425, 5e-4);
});

test("significance: one-sided halves the p-value", () => {
  const r = significance({ visitorsA: 10000, convA: 500, visitorsB: 10000, convB: 580, confidence: 0.95, tails: 1 });
  near(r.pValue, 0.00616, 3e-4);
});

test("significance: one-sided CI agrees with the one-sided verdict", () => {
  const r = significance({ visitorsA: 10000, convA: 500, visitorsB: 10000, convB: 558, confidence: 0.95, tails: 1 });
  assert.equal(r.significant, true);
  assert.ok(r.ci[0] > 0, `CI lower bound should be positive for a significant win, got ${r.ci[0]}`);
});

test("significance: tiny difference is not significant", () => {
  const r = significance({ visitorsA: 1000, convA: 50, visitorsB: 1000, convB: 52, confidence: 0.95 });
  assert.equal(r.significant, false);
});

test("significance: invalid input returns null", () => {
  assert.equal(significance({ visitorsA: 0, convA: 0, visitorsB: 100, convB: 5, confidence: 0.95 }), null);
  assert.equal(significance({ visitorsA: 100, convA: 120, visitorsB: 100, convB: 5, confidence: 0.95 }), null);
  assert.equal(significance({ visitorsA: 100, convA: -1, visitorsB: 100, convB: 5, confidence: 0.95 }), null);
  assert.equal(significance({ visitorsA: 100, convA: 0, visitorsB: 100, convB: 0, confidence: 0.95 }), null);
});

test("mdeByWeek: 10k visitors/week at 5% gives ~24.4% relative MDE in week 1", () => {
  const weeks = mdeByWeek({ weeklyVisitors: 10000, weeklyConversions: 500, variants: 2, confidence: 0.95, power: 0.8 });
  assert.equal(weeks.length, 6);
  near(weeks[0].relative, 0.2443, 2e-3);
  near(weeks[3].relative, weeks[0].relative / 2, 1e-9);
  assert.equal(weeks[0].visitorsPerVariant, 5000);
});

test("mdeByWeek: more variants means a bigger MDE", () => {
  const two = mdeByWeek({ weeklyVisitors: 10000, weeklyConversions: 500, variants: 2, confidence: 0.95, power: 0.8 });
  const four = mdeByWeek({ weeklyVisitors: 10000, weeklyConversions: 500, variants: 4, confidence: 0.95, power: 0.8 });
  assert.ok(four[0].relative > two[0].relative);
});

test("mdeByWeek: invalid input returns null", () => {
  assert.equal(mdeByWeek({ weeklyVisitors: 0, weeklyConversions: 0, variants: 2, confidence: 0.95, power: 0.8 }), null);
  assert.equal(mdeByWeek({ weeklyVisitors: 100, weeklyConversions: 200, variants: 2, confidence: 0.95, power: 0.8 }), null);
});

test("srm: 10,000 vs 10,400 on a 50/50 split is a mismatch", () => {
  const r = srm(10000, 10400);
  near(r.pValue, 0.0051, 3e-4);
  assert.equal(r.mismatch, true);
});

test("srm: 10,000 vs 10,050 is fine", () => {
  assert.equal(srm(10000, 10050).mismatch, false);
});
