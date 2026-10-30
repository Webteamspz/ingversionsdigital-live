// Saves a form submission to Firestore (project "ingversions-digital", collection
// "ingversionsdigital_submissions") over its REST API, so no Firebase SDK ships
// in the bundle. The security rules
// (firestore.rules, live in the Firebase console) only allow creating a document
// with string `site` and `formName` and a server-set `createdAt`; nobody can read
// submissions from the browser. The project ID is public, like the analytics IDs.
const PROJECT_ID = import.meta.env?.VITE_FIREBASE_PROJECT_ID || "ingversions-digital";
const DB = `projects/${PROJECT_ID}/databases/(default)/documents`;
const COMMIT_URL = `https://firestore.googleapis.com/v1/${DB}:commit`;
const SITE = "ingversionsdigital.com";
const COLLECTION = "ingversionsdigital_submissions";

// Readable name of the page a form was sent from, for filtering in Firestore:
// "/" -> "Home", "/shopify-development" -> "Shopify Development",
// "/blog/how-long-to-run-ab-test" -> "Blog / How Long To Run A/B Test".
const UPPER = { ab: "A/B", qa: "QA", cro: "CRO", seo: "SEO", bfcm: "BFCM", mcp: "MCP", pdp: "PDP", ui: "UI", ux: "UX", ai: "AI" };
export function pageNameFromPath(path) {
  const parts = (path || "/").split("/").filter(Boolean);
  if (!parts.length) return "Home";
  return parts
    .map((part) =>
      part
        .split("-")
        .map((w) => UPPER[w] || w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    )
    .join(" / ");
}

// One create-only write. createdAt is filled in by the server (REQUEST_TIME),
// which is what the rule `createdAt == request.time` requires.
export function toFirestoreWrite(formName, data, id = crypto.randomUUID()) {
  const path = typeof location === "undefined" ? "" : location.pathname;
  const fields = {
    site: { stringValue: SITE },
    formName: { stringValue: formName },
    page: { stringValue: path },
    pageName: { stringValue: pageNameFromPath(path) },
  };
  for (const [key, value] of Object.entries(data)) {
    fields[key] = { stringValue: String(value ?? "") };
  }
  return {
    writes: [
      {
        update: { name: `${DB}/${COLLECTION}/${id}`, fields },
        currentDocument: { exists: false },
        updateTransforms: [{ fieldPath: "createdAt", setToServerValue: "REQUEST_TIME" }],
      },
    ],
  };
}

export async function submitLead(formName, data) {
  const res = await fetch(COMMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toFirestoreWrite(formName, data)),
  });
  if (!res.ok) throw new Error(`Form submit failed (${res.status})`);
}
