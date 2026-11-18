import { test } from "node:test";
import assert from "node:assert/strict";
import { toFirestoreWrite, pageNameFromPath, submitLead } from "./submitLead.js";

test("toFirestoreWrite builds a create-only write that matches the live rules", () => {
  const { writes } = toFirestoreWrite("contact", { email: "a@b.co", phone: undefined }, "abc");
  assert.equal(writes.length, 1);
  const [w] = writes;
  assert.match(w.update.name, /\/documents\/ingversionsdigital_submissions\/abc$/);
  assert.deepEqual(w.update.fields, {
    site: { stringValue: "ingversionsdigital.com" },
    formName: { stringValue: "contact" },
    page: { stringValue: "" },
    pageName: { stringValue: "Home" },
    email: { stringValue: "a@b.co" },
    phone: { stringValue: "" },
  });
  assert.deepEqual(w.currentDocument, { exists: false });
  assert.deepEqual(w.updateTransforms, [
    { fieldPath: "createdAt", setToServerValue: "REQUEST_TIME" },
  ]);
  assert.ok(Object.keys(w.update.fields).length + 1 <= 30);
});

test("pageNameFromPath gives a readable page name for each form submission", () => {
  assert.equal(pageNameFromPath("/"), "Home");
  assert.equal(pageNameFromPath(""), "Home");
  assert.equal(pageNameFromPath("/pricing"), "Pricing");
  assert.equal(pageNameFromPath("/shopify-development/"), "Shopify Development");
  assert.equal(pageNameFromPath("/ab-testing"), "A/B Testing");
  assert.equal(
    pageNameFromPath("/blog/how-long-to-run-ab-test"),
    "Blog / How Long To Run A/B Test",
  );
});

test("submitLead outside production logs and alerts instead of saving to Firestore", async () => {
  const calls = { fetch: 0, alert: [], info: [] };
  const restore = { fetch: globalThis.fetch, alert: globalThis.alert, info: console.info };
  globalThis.fetch = () => calls.fetch++;
  globalThis.alert = (msg) => calls.alert.push(msg);
  console.info = (...args) => calls.info.push(args);
  try {
    await submitLead("qa-checklist", { email: "test@example.com" });
  } finally {
    Object.assign(globalThis, { fetch: restore.fetch, alert: restore.alert });
    console.info = restore.info;
  }
  assert.equal(calls.fetch, 0);
  assert.equal(calls.alert.length, 1);
  assert.match(calls.alert[0], /qa-checklist/);
  assert.equal(calls.info.length, 1);
});
