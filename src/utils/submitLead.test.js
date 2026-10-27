import { test } from "node:test";
import assert from "node:assert/strict";
import { toFirestoreWrite } from "./submitLead.js";

test("toFirestoreWrite builds a create-only write that matches the live rules", () => {
  const { writes } = toFirestoreWrite("contact", { email: "a@b.co", phone: undefined }, "abc");
  assert.equal(writes.length, 1);
  const [w] = writes;
  assert.match(w.update.name, /\/documents\/form_submissions\/abc$/);
  assert.deepEqual(w.update.fields, {
    site: { stringValue: "ingversionsdigital.com" },
    formName: { stringValue: "contact" },
    page: { stringValue: "" },
    email: { stringValue: "a@b.co" },
    phone: { stringValue: "" },
  });
  // Rules: hasAll(['site','formName','createdAt']), size() <= 30, createdAt == request.time.
  assert.deepEqual(w.currentDocument, { exists: false });
  assert.deepEqual(w.updateTransforms, [{ fieldPath: "createdAt", setToServerValue: "REQUEST_TIME" }]);
  assert.ok(Object.keys(w.update.fields).length + 1 <= 30);
});
