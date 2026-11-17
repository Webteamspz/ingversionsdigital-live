import { test } from "node:test";
import assert from "node:assert/strict";
import { simAt } from "./abSimulator.js";

const base = { dailyVisitors: 5000, baseRate: 0.024, lift: 0.18, aov: 65 };

test("simAt: day 0 has no data yet", () => {
  const r = simAt({ ...base, day: 0 });
  assert.equal(r.visitors, 0);
  assert.equal(r.uplift, null);
  assert.equal(r.confidence, null);
});

test("simAt: settles on the true lift and reaches significance by day 14", () => {
  const r = simAt({ ...base, day: 14 });
  assert.equal(r.visitors, 35000);
  assert.ok(Math.abs(r.uplift - base.lift) < 0.02, `uplift ${r.uplift}`);
  assert.ok(r.confidence > 0.99);
  assert.equal(r.status, "winner");
  assert.ok(r.extraYearly > 0);
});

test("simAt: less traffic means less confidence on the same day", () => {
  const low = simAt({ ...base, dailyVisitors: 1000, day: 4 });
  const high = simAt({ ...base, dailyVisitors: 10000, day: 4 });
  assert.ok(low.confidence < high.confidence);
});

test("simAt: a lucky day 1 is still too early to call", () => {
  const r = simAt({ ...base, day: 1 });
  assert.ok(r.confidence > 0.95);
  assert.equal(r.status, "early");
});

test("simAt: low traffic is still running at day 10", () => {
  assert.equal(simAt({ ...base, dailyVisitors: 2000, day: 10 }).status, "running");
});
