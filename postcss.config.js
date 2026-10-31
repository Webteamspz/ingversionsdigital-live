import autoprefixer from "autoprefixer";
import postcss from "postcss";

const hoverDesktopOnly = () => ({
  postcssPlugin: "hover-desktop-only",
  Rule(rule) {
    if (!rule.selector.includes(":hover")) return;
    for (let p = rule.parent; p; p = p.parent) {
      if (p.__hoverWrapped) return;
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
