import { useState } from "react";
import data from "../../data/siteData";
import styles from "./Contact.module.css";
import PhoneField from "./PhoneField";
import parse from "html-react-parser";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/manppeoz";

const Contact = () => {
  const { heading, form, infoCards } = data.contact;

  const [formData, setFormData] = useState({
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [phoneInteracted, setPhoneInteracted] = useState(false); // NEW

  const setField = (name, value) => {
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const touch = (name) => setTouched((p) => ({ ...p, [name]: true }));
  const setError = (name, msg) =>
    setErrors((p) => (msg ? { ...p, [name]: msg } : (delete p[name], { ...p })));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const lettersRegex = /^[\p{L}\s'-]+$/u;
  const onlyDigits = (s) => /^\d+$/.test(s);

  const validateField = (name, value) => {
    let msg = "";

    if (/name/i.test(name)) {
      if (value.trim() && !lettersRegex.test(value)) {
        msg = "Only letters are accepted.";
      } else if (!value.trim()) {
        msg = "This field is required";
      }
    }

    if (name === "email") {
      if (!value.trim()) msg = "Email is required";
      else if (!emailRegex.test(value)) msg = "Please enter a valid email";
    }

    if (name === "company") {
      if (!value.trim()) msg = "Company is required";
    }

    if (name === "message") {
      if (!value.trim()) msg = "Message is required";
      else if (value.length < 5) msg = "Message must be at least 5 characters";
    }

    // Phone: required, but only validate after user interaction
    if (name === "phone") {
      const digits = (value || "").replace(/\D/g, "");
      if (!digits) msg = "Phone number is required";
      else if (!onlyDigits(digits)) msg = "Only numbers are accepted";
      else if (digits.length < 6) msg = "Please enter a valid phone number";
    }

    setError(name, msg);
    return !msg;
  };

  const validateAll = () => {
    let ok = true;
    form.fields.forEach((f) => {
      if (f.type === "textarea") return;
      const v = formData[f.name] ?? "";
      touch(f.name);
      ok = validateField(f.name, v) && ok;
    });
    touch("message");
    ok = validateField("message", formData.message || "") && ok;

    // Ensure phone is validated at submit time even if not interacted
    setPhoneInteracted(true);
    touch("phone");
    ok = validateField("phone", formData.phone || "") && ok;

    return ok;
  };

  const handleInput = (f) => (e) => {
    const val = e.currentTarget.value;
    setField(f.name, val);
    touch(f.name);
    validateField(f.name, val);
  };

  const handleBlur = (f) => (e) => {
    touch(f.name);
    validateField(f.name, e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Thanks! Your details have been sent.");
        window.location.reload();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Found some error please try again.", err);
    }
  };

  return (
    <section className={styles.contactSection} id="contact">
      <div className="container">
        <h3 className={`section-title ${styles.contactHeading}`}>{heading}</h3>
        <div className={styles.contactGrid}>
          <div className={`${styles.contactCard} ${styles.formCard}`}>
            <h4 className={styles.contactPanelTitle}>{form.title}</h4>
            <form data-gtm-form="contact" onSubmit={handleSubmit} noValidate>
              <div className={`${styles.grid} ${styles.two}`}>
                {form.fields
                  .filter((f) => f.col === "half")
                  .map((f) =>
                    f.type === "textarea" ? null : (
                      <div key={f.name}>
                        <input
                          className={`${styles.cInput} ${
                            errors[f.name] ? styles.invalid : ""
                          }`}
                          type={f.type}
                          name={f.name}
                          placeholder={f.placeholder}
                          onInput={handleInput(f)}
                          onBlur={handleBlur(f)}
                          inputMode={/name/i.test(f.name) ? "text" : undefined}
                          aria-invalid={!!errors[f.name]}
                        />
                        {errors[f.name] && (
                          <div className={styles.errorMessage}>
                            {errors[f.name]}
                          </div>
                        )}
                      </div>
                    )
                  )}
              </div>

              {form.fields
                .filter(
                  (f) =>
                    f.col === "full" && !["phone", "message"].includes(f.name)
                )
                .map((f) =>
                  f.type === "textarea" ? null : (
                    <div key={f.name} className={styles.mt}>
                      <input
                        className={`${styles.cInput} ${
                          errors[f.name] ? styles.invalid : ""
                        }`}
                        type={f.type}
                        name={f.name}
                        placeholder={f.placeholder}
                        onInput={handleInput(f)}
                        onBlur={handleBlur(f)}
                        inputMode={/name/i.test(f.name) ? "text" : undefined}
                        aria-invalid={!!errors[f.name]}
                      />
                      {errors[f.name] && (
                        <div className={styles.errorMessage}>
                          {errors[f.name]}
                        </div>
                      )}
                    </div>
                  )
                )}

              {form.fields.some((f) => f.name === "phone") && (
                <div className={styles.mt}>
                  <PhoneField
                    defaultCountry="in"
                    classSelector={`${errors.phone ? styles.invalid : ""}`}
                    // When user focuses phone, start validating it
                    onFocus={() => {
                      setPhoneInteracted(true);
                      touch("phone");
                      validateField("phone", formData.phone || "");
                    }}
                    // Only validate on change after user has interacted
                    onChange={(val) => {
                      setField("phone", val);
                      if (phoneInteracted) {
                        touch("phone");
                        validateField("phone", val);
                      }
                    }}
                  />
                  {errors.phone && (
                    <div className={styles.errorMessage}>{errors.phone}</div>
                  )}
                </div>
              )}

              {form.fields
                .filter((f) => f.name === "message")
                .map((f) => (
                  <div key={f.name} className={styles.mt}>
                    <textarea
                      className={`${styles.cInput} ${styles.mt} ${
                        errors.message ? styles.invalid : ""
                      }`}
                      name={f.name}
                      placeholder={f.placeholder}
                      // If user jumps to Message, force phone validation now
                      onFocus={() => {
                        setPhoneInteracted(true);
                        touch("phone");
                        validateField("phone", formData.phone || "");
                      }}
                      onInput={(e) => {
                        const v = e.currentTarget.value;
                        setField("message", v);
                        touch("message");
                        validateField("message", v);
                      }}
                      onBlur={(e) => {
                        touch("message");
                        validateField("message", e.currentTarget.value);
                      }}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <div className={styles.errorMessage}>
                        {errors.message}
                      </div>
                    )}
                  </div>
                ))}

              <button className={`btn ${styles.cBtn} ${styles.mt}`} type="submit">
                {form.submit.label}
              </button>
            </form>
          </div>

          <div className={styles.rightCol}>
            {infoCards.map((card, idx) => (
              <div key={idx} className={`${styles.contactCard}`}>
                <h4 className={styles.contactPanelTitle}>{card.title}</h4>
                {card.items && (
                  <ul className={styles.cList}>
                    {card.items.map((it, i) => (
                      <li key={i}>
                        <span className={styles.cIco}>{parse(it.icon)}</span>
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
                  <p className={styles.contactNote}>{card.description}</p>
                )}
                {card.cta && (
                  <a className={`btn ${styles.cBtn}`} href={card.cta.href}>
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
};

export default Contact;
