import data from "../data/sitedata";

const Icon = ({ name }) => {
  // small inline SVGs based on "icon" key in data
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (name === "phone") {
    return (
      <svg viewBox="0 0 24 24">
        <path
          d="M6 4l3 3-2 2a12 12 0 0 0 8 8l2-2 3 3-2 3c-8 1-18-9-17-17z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  if (name === "map") {
    return (
      <svg viewBox="0 0 24 24">
        <path
          d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  return null;
};

export default function Contact() {
  const { heading, form, infoCards } = data.contact;

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h3 className="section-title contact-heading">{heading}</h3>

        <div className="contact-grid">
          {/* LEFT: form (driven by data) */}
          <div className="contact-card form-card">
            <h4 className="contact-panel-title">{form.title}</h4>

            {/* first row: any fields marked 'half' will render in a 2-col grid */}
            <div className="grid two">
              {form.fields
                .filter((f) => f.col === "half")
                .map((f) =>
                  f.type === "textarea" ? null : (
                    <input
                      key={f.name}
                      className="c-input"
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                    />
                  )
                )}
            </div>

            {/* other fields (full width) except phone/textarea which are handled below */}
            {form.fields
              .filter((f) => f.col === "full" && !["phone", "message"].includes(f.name))
              .map((f) =>
                f.type === "textarea" ? null : (
                  <input
                    key={f.name}
                    className="c-input mt"
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                  />
                )
              )}

            {/* phone with country pill (if present) */}
            {form.fields.some((f) => f.name === "phone") && (
              <div className="phone-wrap mt">
                <button className="country-pill" type="button" aria-label="Country">
                  <span className="flag">{form.country?.flag}</span>
                  <span className="dial">{form.country?.dial}</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                    <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <input className="c-input phone-input" type="tel" placeholder="Phone Number" />
              </div>
            )}

            {/* textarea (message) */}
            {form.fields
              .filter((f) => f.name === "message")
              .map((f) => (
                <textarea
                  key={f.name}
                  className="c-input mt"
                  name={f.name}
                  placeholder={f.placeholder}
                />
              ))}

            {/* submit */}
            <button className="btn c-btn mt" type="button">
              {form.submit.label}
              {form.submit.icon && <span className="plane"> {form.submit.icon}</span>}
            </button>
          </div>

          {/* RIGHT: info cards (all from data) */}
          <div className="right-col">
            {infoCards.map((card, idx) => (
              <div key={idx} className="contact-card info-card">
                <h4 className="contact-panel-title">{card.title}</h4>

                {card.items && (
                  <ul className="c-list">
                    {card.items.map((it, i) => (
                      <li key={i}>
                        <span className="c-ico">
                          <Icon name={it.icon} />
                        </span>
                        {String(it.text).split("\n").map((line, li) => (
                          <span key={li}>
                            {line}
                            {li < String(it.text).split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </li>
                    ))}
                  </ul>
                )}

                {card.description && <p className="contact-note">{card.description}</p>}

                {card.cta && (
                  <a className="btn c-btn" href={card.cta.href}>
                    {card.cta.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
