export const isExternalHref = (href = "") =>
  /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
