// Saves a form submission to Firestore (collection "form_submissions") over its
// REST API, so no Firebase SDK ships in the bundle. The security rules
// (firestore.rules, live in the Firebase console) only allow creating a document
// with string `site` and `formName` and a server-set `createdAt`; nobody can read
// submissions from the browser. The project ID is public, like the analytics IDs.
const PROJECT_ID = import.meta.env?.VITE_FIREBASE_PROJECT_ID || "website-forms-efeba";
const DB = `projects/${PROJECT_ID}/databases/(default)/documents`;
const COMMIT_URL = `https://firestore.googleapis.com/v1/${DB}:commit`;
const SITE = "ingversionsdigital.com";

// One create-only write. createdAt is filled in by the server (REQUEST_TIME),
// which is what the rule `createdAt == request.time` requires.
export function toFirestoreWrite(formName, data, id = crypto.randomUUID()) {
  const fields = {
    site: { stringValue: SITE },
    formName: { stringValue: formName },
    page: { stringValue: typeof location === "undefined" ? "" : location.pathname },
  };
  for (const [key, value] of Object.entries(data)) {
    fields[key] = { stringValue: String(value ?? "") };
  }
  return {
    writes: [
      {
        update: { name: `${DB}/form_submissions/${id}`, fields },
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
