const PROJECT_ID = import.meta.env?.VITE_FIREBASE_PROJECT_ID || "ingversions-digital";
const DB = `projects/${PROJECT_ID}/databases/(default)/documents`;
const COMMIT_URL = `https://firestore.googleapis.com/v1/${DB}:commit`;
const SITE = "ingversionsdigital.com";
const COLLECTION = "ingversionsdigital_submissions";

const UPPER = {
  ab: "A/B",
  qa: "QA",
  cro: "CRO",
  seo: "SEO",
  bfcm: "BFCM",
  mcp: "MCP",
  pdp: "PDP",
  ui: "UI",
  ux: "UX",
  ai: "AI",
};
export function pageNameFromPath(path) {
  const parts = (path || "/").split("/").filter(Boolean);
  if (!parts.length) return "Home";
  return parts
    .map((part) =>
      part
        .split("-")
        .map((w) => UPPER[w] || w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    )
    .join(" / ");
}

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
