import { useEffect, useRef, useState } from "react";
import { pricingFaq } from "../../data/pricingdata";
import styles from "./PricingFAQ.module.css";
import Reveal from "../Reveal/Reveal";

const PricingFAQItem = ({ index, q, a, isOpen, onToggle }) => {
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
        aria-controls={`pricing-faq-panel-${index}`}
        id={`pricing-faq-button-${index}`}
      >
        <span>{q}</span>
        <span className={styles.accordionItemIcon} aria-hidden="true" />
      </button>
      <div
        id={`pricing-faq-panel-${index}`}
        role="region"
        aria-labelledby={`pricing-faq-button-${index}`}
        className={styles.accordionItemBody}
        ref={bodyRef}
        style={{ maxHeight }}
      >
        <div className={styles.accordionItemBodyContent}>{a}</div>
      </div>
    </div>
  );
};

const PricingFAQ = () => {
  const { title, items } = pricingFaq;
  const [openIndex, setOpenIndex] = useState(-1);

  const handleToggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));

  return (
    <section className={styles.faqWrapper} id="pricingFaq">
      <div className="container">
        <h3 className="section-title">{title}</h3>
        <div className={styles.accordion}>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <PricingFAQItem
                index={i}
                q={it.q}
                a={it.a}
                isOpen={openIndex === i}
                onToggle={handleToggle}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
