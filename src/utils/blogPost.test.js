import { test } from "node:test";
import assert from "node:assert/strict";
import { readTime, slugify, buildToc, estimateDuration, formatDate, initials } from "./blogPost.js";

test("readTime keeps an explicit value and estimates otherwise", () => {
  assert.equal(readTime({ readTime: "9 min read", body: [] }), "9 min read");
  const words = Array(460).fill("word").join(" ");
  assert.equal(readTime({ body: [{ type: "p", text: words }] }), "2 min read");
  assert.equal(readTime({ body: [{ type: "image", src: "/a b c.webp" }] }), "1 min read");
});

test("buildToc lists takeaways, body h2s and FAQ only when present", () => {
  const copy = { takeawaysHeading: "Key takeaways", faqHeading: "FAQ" };
  const body = [
    { type: "h2", text: "What's the Problem?" },
    { type: "h3", text: "Skip me" },
  ];
  assert.deepEqual(buildToc({ body }, copy), [
    { id: "what-s-the-problem", label: "What's the Problem?" },
  ]);
  assert.equal(buildToc({ body, keyTakeaways: ["a"], faq: [{}] }, copy).length, 3);
  assert.equal(slugify("  A/B Testing!  "), "a-b-testing");
});

test("formatDate and initials", () => {
  assert.equal(formatDate("2026-11-03"), "Nov 3, 2026");
  assert.equal(formatDate("2026-11-03", "long"), "November 3, 2026");
  assert.equal(initials("Ingversions Team"), "IT");
});

test("estimateDuration uses 16·p(1−p)/(p·MDE)² and rounds up to full weeks", () => {
  assert.deepEqual(estimateDuration({ baseline: 3, mde: 10, daily: 5000, variants: 2 }), {
    perVariant: 51734,
    days: 21,
    weeks: 3,
  });
  assert.equal(estimateDuration({ baseline: 3, mde: 10, daily: 5000, variants: 3 }).weeks, 5);
});
