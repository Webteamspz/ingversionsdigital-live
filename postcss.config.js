import autoprefixer from "autoprefixer";
import postcss from "postcss";

// Below 1024px: no hover effects.
// Wrap every rule whose selector contains :hover in @media (min-width:1024px),
// so hover styles only take effect at >=1024px. Nesting inside an existing
// @media is valid CSS and resolves as the intersection of both conditions
// (e.g. a max-width:767.98px hover rule ends up never matching -> hover gone).
const hoverDesktopOnly = () => ({
  postcssPlugin: "hover-desktop-only",
  Rule(rule) {
    if (!rule.selector.includes(":hover")) return;
    for (let p = rule.parent; p; p = p.parent) {
      if (p.__hoverWrapped) return; // already wrapped by us
      if (p.type === "atrule" && p.name === "media" && /min-width:\s*1024/.test(p.params)) return;
    }
    const media = postcss.atRule({ name: "media", params: "(min-width: 1024px)" });
    media.__hoverWrapped = true;
    rule.replaceWith(media);
    media.append(rule);
  },
});
hoverDesktopOnly.postcss = true;

export default {
  plugins: [hoverDesktopOnly(), autoprefixer],
};
