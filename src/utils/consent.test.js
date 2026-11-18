import { test } from "node:test";
import assert from "node:assert/strict";
import { consentState, CONSENT_DEFAULTS } from "./consent.js";

test("consentState maps the banner choice to all four consent mode v2 signals", () => {
  assert.deepEqual(consentState("granted"), {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  assert.equal(consentState("denied").analytics_storage, "denied");
  assert.equal(consentState("denied").ad_user_data, "denied");
});

test("CONSENT_DEFAULTS denies in the EEA, UK and Switzerland and grants elsewhere", () => {
  const [regional, global] = CONSENT_DEFAULTS;
  assert.equal(regional.analytics_storage, "denied");
  assert.equal(regional.ad_storage, "denied");
  assert.ok(regional.region.includes("DE"));
  assert.ok(regional.region.includes("GB"));
  assert.ok(regional.region.includes("CH"));
  assert.ok(!regional.region.includes("IN"));
  assert.equal(regional.wait_for_update, 500);
  assert.equal(global.analytics_storage, "granted");
  assert.equal(global.region, undefined);
});
