const CAMPAIGN = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
const CLICK_IDS = ["gclid", "gbraid", "wbraid", "fbclid", "msclkid", "li_fat_id"];
const KEY = "lead-attribution";

export function readTouch(href, referrer) {
  const url = new URL(href);
  const touch = {};
  for (const key of [...CAMPAIGN, ...CLICK_IDS]) {
    const value = url.searchParams.get(key);
    if (value) touch[key] = value.slice(0, 200);
  }
  touch.landing_page = url.pathname;
  if (referrer) {
    const ref = new URL(referrer);
    if (ref.host !== url.host) touch.referrer = ref.href.slice(0, 300);
  }
  return touch;
}

export const mergeTouch = (stored, current) =>
  stored && Object.keys(current).length === 1 ? stored : current;

export function withUtm(href, touch) {
  const url = new URL(href);
  for (const key of CAMPAIGN) {
    if (touch[key] && !url.searchParams.has(key)) url.searchParams.set(key, touch[key]);
  }
  return url.toString();
}

export function captureAttribution() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY));
    const touch = mergeTouch(stored, readTouch(location.href, document.referrer));
    localStorage.setItem(KEY, JSON.stringify(touch));
  } catch {
    return;
  }
}

export function getAttribution() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}
