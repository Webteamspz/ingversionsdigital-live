import { useEffect, useRef, useState } from "react";
import data from "../../data/siteData";
import styles from "./faq.module.css";

function FAQItem({ index, q, a, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (bodyRef.current) {
      setMaxHeight(isOpen ? `${bodyRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (bodyRef.current && isOpen) {
        setMaxHeight(`${bodyRef.current.scrollHeight}px`);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <div
      className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}
      id="FAQ"
    >
      <button
        className={styles.accordionItemHeader}
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
        className={styles.accordionItemBody}
        ref={bodyRef}
        style={{ maxHeight }}
      >
        <div className={styles.accordionItemBodyContent}>{a}</div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { heading, items } = data.faqSection;
  const [openIndex, setOpenIndex] = useState(-1);

  const handleToggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section className={styles.faqWrapper}>
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
