const WORDS_PER_MINUTE = 230;
const SKIP_KEYS = new Set(["type", "src", "href", "width", "height", "numeric"]);

const countWords = (v) => {
  if (typeof v === "string") return v.split(/\s+/).filter(Boolean).length;
  if (Array.isArray(v)) return v.reduce((n, x) => n + countWords(x), 0);
  if (v && typeof v === "object")
    return Object.entries(v).reduce((n, [k, x]) => n + (SKIP_KEYS.has(k) ? 0 : countWords(x)), 0);
  return 0;
};

export const readTime = (post) => {
  if (post.readTime) return post.readTime;
  const words = countWords([
    post.summary,
    post.tldr,
    post.quickAnswer,
    post.keyTakeaways,
    post.body,
    post.faq,
    post.quickAnswers,
  ]);
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
};

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const CATEGORY_SLUGS = {
  "Shopify Development": "shopify",
  "A/B Testing": "ab-testing",
  "Quality Assurance": "qa",
  CRO: "cro",
};

export const categorySlug = (name) => (name ? (CATEGORY_SLUGS[name] ?? slugify(name)) : "all");

export const headingId = (block) => block.id ?? slugify(block.text);

export const buildToc = (post, { takeawaysHeading, faqHeading }) => [
  ...(post.keyTakeaways?.length ? [{ id: "key-takeaways", label: takeawaysHeading }] : []),
  ...post.body.filter((b) => b.type === "h2").map((b) => ({ id: headingId(b), label: b.text })),
  ...(post.faq?.length ? [{ id: "faq", label: faqHeading }] : []),
];

export const estimateDuration = ({ baseline, mde, daily, variants }) => {
  const p = baseline / 100;
  const perVariant = Math.ceil((16 * p * (1 - p)) / (p * (mde / 100)) ** 2);
  const days = Math.ceil((perVariant * variants) / daily);
  return { perVariant, days, weeks: Math.ceil(days / 7) };
};

export const formatDate = (iso, month = "short") =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month,
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
