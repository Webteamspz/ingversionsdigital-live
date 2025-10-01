import data from "../../data/sitedata";
import styles from "./Contact.module.css"
import planeIcon from "../../assets/Contact/vector.png"; // adjust path & name


const Icon = ({ name }) => {
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24">
        <path
          d="M4 6h16v12H4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M4 7l8 6 8-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
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
        <circle
          cx="12"
          cy="10"
          r="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }
  return null;
};

export default function Contact() {
  const { heading, form, infoCards } = data.contact;

  return (
    <section id="contact" className={styles["contact-section"]}>
      <div className="container">
        <h3 className={`section-title ${styles["contact-heading"]}`}>
          {heading}
        </h3>

        <div className={styles["contact-grid"]}>
          {/* LEFT: form */}
          <div className={`${styles["contact-card"]} ${styles["form-card"]}`}>
            <h4 className={styles["contact-panel-title"]}>{form.title}</h4>

            {/* two-column row */}
            <div className={`${styles.grid} ${styles.two}`}>
              {form.fields
                .filter((f) => f.col === "half")
                .map((f) =>
                  f.type === "textarea" ? null : (
                    <input
                      key={f.name}
                      className={styles["c-input"]}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                    />
                  )
                )}
            </div>

            {/* full-width (except phone/message) */}
            {form.fields
              .filter(
                (f) =>
                  f.col === "full" && !["phone", "message"].includes(f.name)
              )
              .map((f) =>
                f.type === "textarea" ? null : (
                  <input
                    key={f.name}
                    className={`${styles["c-input"]} ${styles.mt}`}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                  />
                )
              )}

            {/* phone with country pill */}
            {form.fields.some((f) => f.name === "phone") && (
              <div className={`${styles["phone-wrap"]} ${styles.mt}`}>
                <button
                  className={styles["country-pill"]}
                  type="button"
                  aria-label="Country"
                >
                  <span className="flag">{form.country?.flag}</span>
                  <span className={styles.dial}>{form.country?.dial}</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
                <input
                  className={`${styles["c-input"]} ${styles["phone-input"]}`}
                  type="tel"
                  placeholder="Phone Number"
                />
              </div>
            )}

            {/* textarea (message) */}
            {form.fields
              .filter((f) => f.name === "message")
              .map((f) => (
                <textarea
                  key={f.name}
                  className={`${styles["c-input"]} ${styles.mt}`}
                  name={f.name}
                  placeholder={f.placeholder}
                />
              ))}

            {/* submit */}
            <button
              className={`btn ${styles["c-btn"]} ${styles.mt}`}
              type="button"
            >
              {form.submit.label}
              <img src={planeIcon} alt="Send" className={styles.plane} />
            </button>
          </div>

          {/* RIGHT: info cards */}
          <div className={styles["right-col"]}>
            {infoCards.map((card, idx) => (
              <div
                key={idx}
                className={`${styles["contact-card"]} ${styles["info-card"]}`}
              >
                <h4 className={styles["contact-panel-title"]}>{card.title}</h4>

                {card.items && (
                  <ul className={styles["c-list"]}>
                    {card.items.map((it, i) => (
                      <li key={i}>
                        <span className={styles["c-ico"]}>
                          <Icon name={it.icon} />
                        </span>
                        {String(it.text)
                          .split("\n")
                          .map((line, li) => (
                            <span key={li}>
                              {line}
                              {li < String(it.text).split("\n").length - 1 && (
                                <br />
                              )}
                            </span>
                          ))}
                      </li>
                    ))}
                  </ul>
                )}

                {card.description && (
                  <p className={styles["contact-note"]}>{card.description}</p>
                )}

                {card.cta && (
                  <a className={`btn ${styles["c-btn"]}`} href={card.cta.href}>
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
