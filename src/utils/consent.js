const SIGNALS = ["ad_storage", "ad_user_data", "ad_personalization", "analytics_storage"];

const CONSENT_REQUIRED = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "CH",
];

export const consentState = (value) => Object.fromEntries(SIGNALS.map((key) => [key, value]));

export const CONSENT_DEFAULTS = [
  { ...consentState("denied"), region: CONSENT_REQUIRED, wait_for_update: 500 },
  consentState("granted"),
];
