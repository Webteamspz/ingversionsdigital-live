import { useEffect, useRef, useState } from "react";
import data from "../../data/siteData";           
import styles from "./FAQ.module.css";            

function FAQItem({ index, q, a, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [maxH, setMaxH] = useState("0px");

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    setMaxH(isOpen ? `${el.scrollHeight}px` : "0px");
  }, [isOpen]);

  useEffect(() => {
    const onResize = () => {
      if (bodyRef.current && isOpen) setMaxH(`${bodyRef.current.scrollHeight}px`);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  return (
    <div
      className={`${styles["accordion-item"]} ${isOpen ? styles.open : ""}`} id="FAQ"
    >
      <button
        className={styles["accordion-item-header"]}
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        id={`faq-button-${index}`}
      >
        {q}
      </button>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-button-${index}`}
        className={styles["accordion-item-body"]}
        ref={bodyRef}
        style={{ maxHeight: maxH }}
      >
        <div className={styles["accordion-item-body-content"]}>{a}</div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { heading, items } = data.faqSection;
  const [openIndex, setOpenIndex] = useState(-1);

  const handleToggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section className={styles["faq-wrapper"]}>
      <h1>{heading}</h1>
      <div className={styles.accordion}>
        {items.map((it, i) => (
          <FAQItem
            key={i}
            index={i}
            q={it.q}
            a={it.a}
            isOpen={openIndex === i}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
}
