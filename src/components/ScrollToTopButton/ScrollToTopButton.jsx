import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import styles from "./ScrollToTopButton.module.css";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`${styles.scrollTopBtn} ${visible ? styles.visible : styles.hidden}`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} strokeWidth={2.5} color="var(--palette-border)" />
    </button>
  );
};

export default ScrollToTopButton;
