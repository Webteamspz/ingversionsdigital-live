import { test } from "node:test";
import assert from "node:assert/strict";
import { readTouch, mergeTouch, withUtm } from "./attribution.js";

const SITE = "https://ingversionsdigital.com";

test("readTouch picks campaign params, click ids, landing page and an external referrer", () => {
  const touch = readTouch(
    `${SITE}/pricing?utm_source=google&utm_medium=cpc&utm_campaign=bfcm&gclid=abc&x=1`,
    "https://www.google.com/",
  );
  assert.deepEqual(touch, {
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "bfcm",
    gclid: "abc",
    landing_page: "/pricing",
    referrer: "https://www.google.com/",
  });
});

test("readTouch ignores a same-site referrer and returns a direct touch", () => {
  assert.deepEqual(readTouch(`${SITE}/blog`, `${SITE}/`), { landing_page: "/blog" });
});

test("mergeTouch keeps the earlier campaign when the new visit is direct", () => {
  const paid = { utm_source: "google", landing_page: "/pricing" };
  assert.deepEqual(mergeTouch(paid, { landing_page: "/blog" }), paid);
});

test("mergeTouch replaces it when the new visit has its own campaign or referrer", () => {
  const paid = { utm_source: "google", landing_page: "/pricing" };
  const social = { utm_source: "linkedin", landing_page: "/" };
  assert.deepEqual(mergeTouch(paid, social), social);
  const referred = { landing_page: "/", referrer: "https://reddit.com/" };
  assert.deepEqual(mergeTouch(paid, referred), referred);
});

test("mergeTouch stores the first visit when nothing is stored yet", () => {
  const direct = { landing_page: "/" };
  assert.deepEqual(mergeTouch(null, direct), direct);
});

test("withUtm adds stored utm params to a Calendly link without overwriting its own", () => {
  const touch = { utm_source: "google", utm_campaign: "bfcm", gclid: "abc", landing_page: "/" };
  assert.equal(
    withUtm("https://calendly.com/ingversionsdigital/30min", touch),
    "https://calendly.com/ingversionsdigital/30min?utm_source=google&utm_campaign=bfcm",
  );
  assert.equal(
    withUtm("https://calendly.com/x?utm_source=site", touch),
    "https://calendly.com/x?utm_source=site&utm_campaign=bfcm",
  );
  assert.equal(withUtm("https://calendly.com/x", {}), "https://calendly.com/x");
});
