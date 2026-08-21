import { useEffect, useRef, useState } from "react";
import { pricingFaq } from "../../data/pricingdata";
import "./PricingFaq.css";

const PricingFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current.forEach((itemEl, idx) => {
      if (!itemEl) return;

      const body = itemEl.querySelector(".accordionItemBody");
      const content = itemEl.querySelector(".accordionItemBodyContent");
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
    <section className="faqWrapper" id="pricingFaq">
      <div className="container">
        <h3>{pricingFaq.title}</h3>

        <div className="accordion">
          {pricingFaq.items.map((item, idx) => (
            <div
              key={item.q}
              className={`accordionItem ${openIndex === idx ? "open" : ""}`}
              ref={(el) => (itemRefs.current[idx] = el)}
            >
              <button
                type="button"
                className="accordionItemHeader"
                onClick={() => handleToggle(idx)}
              >
                <span>{item.q}</span>
                <div className="accordionItemIcon" aria-hidden="true" />
              </button>

              <div className="accordionItemBody">
                <div className="accordionItemBodyContent">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingFaq;
