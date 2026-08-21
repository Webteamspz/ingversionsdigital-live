import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import data from "../../data/sitedata";
import styles from "./FAQ.module.css";

const FAQItem = ({ index, q, a, isOpen, onToggle }) => {
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
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}>
      <button
        className={styles.accordionItemHeader}
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        id={`faq-button-${index}`}
      >
        <span>{q}</span>
        <span className={styles.accordionItemIcon} aria-hidden="true">
          {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
        </span>
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
};

const FAQ = () => {
  const { heading, list } = data.faq;
  const [openIndex, setOpenIndex] = useState(-1);

  const handleToggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section className={styles.faqWrapper} id="faq">
      <div className="container">
        <h3 className="section-title">{heading}</h3>
        <div className={styles.accordion}>
          {list.map((it, i) => (
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
      </div>
    </section>
  );
};

export default FAQ;
