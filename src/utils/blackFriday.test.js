import { test } from "node:test";
import assert from "node:assert/strict";
import { blackFridayPhase } from "./blackFriday.js";

const at = (d, h = 0, min = 0) => new Date(2026, 10, d, h, min); // local time

test("counts down before Black Friday", () => {
  const r = blackFridayPhase(at(26, 23, 59));
  assert.equal(r.phase, "before");
  assert.equal(r.left, 60_000);
});

test("live for the whole of 27 Nov, local time", () => {
  assert.equal(blackFridayPhase(at(27)).phase, "today");
  assert.equal(blackFridayPhase(at(27, 23, 59)).phase, "today");
});

test("hidden from 28 Nov onward", () => {
  assert.equal(blackFridayPhase(at(28)).phase, "over");
  assert.equal(blackFridayPhase(new Date(2027, 0, 1)).phase, "over");
});
