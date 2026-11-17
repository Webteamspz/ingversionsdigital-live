import { useEffect } from "react";

export default function useFloaterClearance(ref, name, active) {
  useEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    const prop = `--floater-${name}`;
    if (!active || !el) {
      root.style.removeProperty(prop);
      return;
    }
    const update = () => {
      const promo = parseFloat(getComputedStyle(root).getPropertyValue("--promo-bar-h")) || 0;
      const space = window.innerHeight - el.offsetTop - promo;
      root.style.setProperty(prop, `${Math.max(0, Math.ceil(space))}px`);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      root.style.removeProperty(prop);
    };
  }, [ref, name, active]);
}
