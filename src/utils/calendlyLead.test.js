import { test } from "node:test";
import assert from "node:assert/strict";
import { isCalendlyRedirect, bookingKey } from "./calendlyLead.js";

test("counts only a real Calendly redirect", () => {
  assert.equal(isCalendlyRedirect("?booked=1", "https://calendly.com/"), true);
  assert.equal(isCalendlyRedirect("?booked=1&invitee_uuid=abc", ""), true);
  assert.equal(isCalendlyRedirect("?booked=1", ""), false);
  assert.equal(isCalendlyRedirect("?booked=1", "https://ingversionsdigital.com/"), false);
  assert.equal(isCalendlyRedirect("?booked=1", "https://notcalendly.com/"), false);
  assert.equal(isCalendlyRedirect("", "https://calendly.com/"), false);
});

test("one key per booking", () => {
  assert.equal(bookingKey("?booked=1&invitee_uuid=abc"), "lead:calendly:abc");
  assert.equal(bookingKey("?booked=1"), "lead:calendly:booked");
});
