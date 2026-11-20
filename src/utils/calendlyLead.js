// The thank-you page counts a booking only after a real Calendly redirect: Calendly's own
// redirect parameters ("Pass event details" on) or a calendly.com referrer. A reload, a shared
// /thank-you?booked=1 link or a bot visit then never counts as a lead.
export const isCalendlyRedirect = (search, referrer = "") => {
  const q = new URLSearchParams(search);
  if (!q.has("booked")) return false;
  if (q.has("invitee_uuid") || q.has("event_type_uuid")) return true;
  try {
    return /(^|\.)calendly\.com$/.test(new URL(referrer).hostname);
  } catch {
    return false;
  }
};

// One lead per booking per browser session, so reloads and back-button visits don't recount.
export const bookingKey = (search) =>
  `lead:calendly:${new URLSearchParams(search).get("invitee_uuid") ?? "booked"}`;
