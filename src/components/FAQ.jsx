import { useRef, useState, useEffect } from "react";
import data from "../data/sitedata";

function FAQItem({ i, item, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [maxH, setMaxH] = useState("0px");

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    // Measure for smooth height transition
    const target = isOpen ? `${el.scrollHeight}px` : "0px";
    setMaxH(target);
  }, [isOpen]);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`} id="FAQ">
      <button
        className="faq-header"
        onClick={() => onToggle(i)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${i}`}
        id={`faq-button-${i}`}
      >
        <span className="faq-question">{item.q}</span>
        <span className="faq-icon" aria-hidden="true" />
      </button>

      <div
        id={`faq-panel-${i}`}
        role="region"
        aria-labelledby={`faq-button-${i}`}
        ref={bodyRef}
        className="faq-body"
        style={{ maxHeight: maxH }}
      >
        <p className="faq-answer">{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { heading, items } = data.faqSection; // uses the new shape
  const [openIndex, setOpenIndex] = useState(0); // first open by default; set to -1 for all closed

  const handleToggle = (i) => {
    setOpenIndex((cur) => (cur === i ? -1 : i)); // one open at a time
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h3 className="section-title faq-title">{heading}</h3>

        <div className="faq">
          {items.map((it, i) => (
            <FAQItem
              key={i}
              i={i}
              item={it}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
