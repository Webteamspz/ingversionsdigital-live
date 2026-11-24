import { test } from "node:test";
import assert from "node:assert/strict";
import { blackFridayDate, currentOccasion, planPrice } from "./occasions.js";

const id = (y, m, d, h = 0, min = 0) => currentOccasion(new Date(y, m, d, h, min))?.id ?? null;

test("Black Friday is the fourth Friday of November", () => {
  assert.equal(blackFridayDate(2026), 27);
  assert.equal(blackFridayDate(2027), 26);
  assert.equal(blackFridayDate(2028), 24);
});

test("2026 calendar, local time", () => {
  assert.equal(id(2026, 10, 11, 23, 59), null); // normal day
  assert.equal(id(2026, 10, 12), "blackFriday"); // 15 days before 27 Nov
  assert.equal(id(2026, 10, 27, 23, 59), "blackFriday");
  assert.equal(id(2026, 10, 28), "cyberMonday"); // the moment Black Friday ends
  assert.equal(id(2026, 10, 30, 23, 59), "cyberMonday"); // Cyber Monday, 30 Nov
  assert.equal(id(2026, 11, 1), null);
  assert.equal(id(2026, 11, 9, 23, 59), null);
  assert.equal(id(2026, 11, 10), "christmas");
  assert.equal(id(2026, 11, 25, 23, 59), "christmas");
  assert.equal(id(2026, 11, 26), "newYear");
  assert.equal(id(2027, 0, 1, 23, 59), "newYear");
  assert.equal(id(2027, 0, 2), null);
  assert.equal(id(2027, 5, 1), null);
  assert.equal(id(2027, 10, 11), "blackFriday"); // 2027: 15 days before 26 Nov
});

test("counts down to the day, then says today", () => {
  const before = currentOccasion(new Date(2026, 10, 26, 23, 59));
  assert.equal(before.today, false);
  assert.equal(before.left, 60_000);
  assert.equal(currentOccasion(new Date(2026, 10, 27, 9)).today, true);
  assert.equal(currentOccasion(new Date(2026, 10, 29)).today, false); // counting to Cyber Monday
  assert.equal(currentOccasion(new Date(2026, 11, 31, 23, 59)).left, 60_000); // to midnight, 1 Jan
});

test("plans show default prices on normal days and sale prices during occasions", () => {
  const growth = { price: "$1,899", sale: { price: "$1,499", was: "$2,998" } };
  const starter = { price: "$999", sale: { was: "$1,998" } };
  const devPod = { price: null, priceLabel: "$1,800/mo", sale: { was: "$3,600" } };
  assert.deepEqual(planPrice(growth, null), { price: "$1,899", priceLabel: undefined });
  assert.deepEqual(planPrice(growth, "christmas"), {
    price: "$1,499",
    priceLabel: undefined,
    was: "$2,998",
    percent: 50,
  });
  assert.equal(planPrice(starter, "newYear").price, "$999");
  assert.equal(planPrice(starter, "newYear").percent, 50);
  assert.equal(planPrice(devPod, "blackFriday").percent, 50);
  assert.equal(planPrice({ price: "Custom" }, "blackFriday").was, undefined);
});
