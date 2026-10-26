// Saves a form submission to Firestore (collection "leads") over its REST API,
// so no Firebase SDK ships in the bundle. Only creating documents is allowed by
// the security rules (firestore.rules); nobody can read them from the browser.
// The project ID is public, like the analytics IDs.
const PROJECT_ID = import.meta.env?.VITE_FIREBASE_PROJECT_ID || "website-forms-efeba";
const LEADS_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/leads`;

// Firestore's REST format: every value wrapped in its type.
export function toFirestoreDoc(form, data, now = new Date()) {
  const fields = {
    form: { stringValue: form },
    page: { stringValue: typeof location === "undefined" ? "" : location.pathname },
    submitted_at: { timestampValue: now.toISOString() },
  };
  for (const [key, value] of Object.entries(data)) {
    fields[key] = { stringValue: String(value ?? "") };
  }
  return { fields };
}

export async function submitLead(form, data) {
  const res = await fetch(LEADS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toFirestoreDoc(form, data)),
  });
  if (!res.ok) throw new Error(`Form submit failed (${res.status})`);
}
