import { useEffect, useRef, useState } from "react";
import { pricingFaq } from "../../data/pricingdata";
import styles from "./PricingFAQ.module.css";

const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current.forEach((itemEl, idx) => {
      if (!itemEl) return;

      const body = itemEl.querySelector(`.${styles.accordionItemBody}`);
      const content = itemEl.querySelector(`.${styles.accordionItemBodyContent}`);
      if (!body || !content) return;

      if (idx === openIndex) {
        body.style.maxHeight = content.scrollHeight + "px";
      } else {
        body.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className={styles.faqWrapper} id="pricingFaq">
      <div className="container">
        <h3 className="section-title">{pricingFaq.title}</h3>

        <div className={styles.accordion}>
          {pricingFaq.items.map((item, idx) => (
            <div
              key={item.q}
              className={`${styles.accordionItem} ${openIndex === idx ? styles.open : ""}`}
              ref={(el) => (itemRefs.current[idx] = el)}
            >
              <button
                type="button"
                className={styles.accordionItemHeader}
                onClick={() => handleToggle(idx)}
              >
                <span>{item.q}</span>
                <div className={styles.accordionItemIcon} aria-hidden="true" />
              </button>

              <div className={styles.accordionItemBody}>
                <div className={styles.accordionItemBodyContent}>{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
