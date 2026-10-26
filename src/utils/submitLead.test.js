import { test } from "node:test";
import assert from "node:assert/strict";
import { toFirestoreDoc } from "./submitLead.js";

test("toFirestoreDoc wraps every value as a Firestore string and stamps the form", () => {
  const now = new Date("2026-10-26T10:00:00Z");
  const doc = toFirestoreDoc("hero", { email: "a@b.co", "main website url": "x.com", phone: undefined }, now);
  assert.deepEqual(doc.fields, {
    form: { stringValue: "hero" },
    page: { stringValue: "" },
    submitted_at: { timestampValue: "2026-10-26T10:00:00.000Z" },
    email: { stringValue: "a@b.co" },
    "main website url": { stringValue: "x.com" },
    phone: { stringValue: "" },
  });
});
