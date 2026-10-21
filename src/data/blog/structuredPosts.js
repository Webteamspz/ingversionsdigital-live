import postsJson from "./blogPosts.json";

// Structured posts (blogPosts.json) are rendered block by block by ArticleBlocks.
export const structuredPosts = postsJson;

export const getStructuredPost = (slug) =>
  structuredPosts.find((post) => post.slug === slug) ?? null;

export const resolveToc = (post) => {
  if (post.toc.items && post.toc.items.length > 0) return post.toc.items;
  const items = post.body.sections.map((s) => ({
    label: s.heading,
    anchor: s.id,
  }));
  if (post.faq) items.push({ label: post.faq.heading, anchor: post.faq.id });
  return items;
};

// Home-page card for a structured post; ids continue after the legacy post-40.
export const toCard = (p, i) => ({
  id: `post-${41 + i}`,
  title: p.hero.title,
  slug: p.slug,
  excerpt: p.hero.excerpt,
  author: p.meta.author,
  date: p.meta.date,
  readTime: p.meta.readTime,
  category: p.meta.category,
  coverImage: p.meta.coverImage,
});
