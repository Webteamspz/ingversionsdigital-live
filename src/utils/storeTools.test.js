import { test } from "node:test";
import assert from "node:assert/strict";
import { revenueImpact, profitMargin, discountImpact, lifetimeValue } from "./storeTools.js";

const near = (actual, expected, tol = 1e-9) =>
  assert.ok(Math.abs(actual - expected) <= tol, `expected ${expected} ±${tol}, got ${actual}`);

test("revenueImpact: 10k visitors, 2%, $50 AOV, 10% lift", () => {
  const r = revenueImpact({ monthlyVisitors: 10000, rate: 0.02, aov: 50, lift: 0.1 });
  near(r.revenue, 10000);
  near(r.extraOrders, 20);
  near(r.extraMonthly, 1000);
  near(r.extraYearly, 12000);
  assert.equal(revenueImpact({ monthlyVisitors: 10000, rate: 2, aov: 50, lift: 0.1 }), null);
});

test("profitMargin: $100 price, $40 cost, $10 shipping, 2.9% + $0.30", () => {
  const r = profitMargin({ price: 100, cogs: 40, shipping: 10, feePct: 0.029, feeFixed: 0.3 });
  near(r.fees, 3.2);
  near(r.profit, 46.8);
  near(r.margin, 0.468);
  near(r.breakEvenRoas, 100 / 46.8);
  near(r.breakEvenCpa, 46.8);
  assert.equal(r.verdict, null);
});

test("profitMargin: costs above price lose money and have no break-even ROAS", () => {
  const r = profitMargin({ price: 20, cogs: 18, shipping: 5, feePct: 0.029, feeFixed: 0.3 });
  assert.ok(r.profit < 0);
  assert.equal(r.breakEvenRoas, null);
  assert.equal(r.breakEvenCpa, 0);
  assert.equal(r.verdict, "loser");
  assert.equal(profitMargin({ price: 0, cogs: 1, shipping: 0, feePct: 0, feeFixed: 0 }), null);
});

test("discountImpact: 20% off a 50% margin product needs 66.7% more sales", () => {
  const r = discountImpact({ price: 100, cost: 50, discount: 0.2 });
  near(r.saleProfit, 30);
  near(r.unitsFor100, 166.6667, 1e-4);
  near(r.extraSales, 2 / 3);
});

test("discountImpact: a discount bigger than the margin loses money on every sale", () => {
  const r = discountImpact({ price: 100, cost: 50, discount: 0.5 });
  assert.equal(r.unitsFor100, null);
  assert.equal(r.verdict, "loser");
  assert.equal(discountImpact({ price: 100, cost: 50, discount: 0 }), null);
  assert.equal(discountImpact({ price: 100, cost: 120, discount: 0.1 }), null);
});

test("lifetimeValue: $80 AOV, 3 orders/yr, 2 yrs, 40% margin, $50 CAC", () => {
  const r = lifetimeValue({ aov: 80, ordersPerYear: 3, years: 2, margin: 0.4, cac: 50 });
  near(r.revenue, 480);
  near(r.profit, 192);
  near(r.ratio, 3.84);
  near(r.payback, 50 / 8);
  assert.equal(r.verdict, "winner");
  assert.equal(
    lifetimeValue({ aov: 80, ordersPerYear: 3, years: 2, margin: 0.4, cac: 0 }).ratio,
    null,
  );
  assert.equal(
    lifetimeValue({ aov: 80, ordersPerYear: 3, years: 2, margin: 0.4, cac: 200 }).verdict,
    "loser",
  );
});
