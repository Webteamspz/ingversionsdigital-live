// src/components/contact/contact.jsx
import { useState } from "react";
import data from "../../data/siteData";
import styles from "./contact.module.css";
import planeIcon from "/assets/contact/vector.png";
import PhoneField from "../contact/phone-field";
import mailIcon from "/assets/contact/email.svg";
import phoneIcon from "/assets/contact/phone.svg";
import mapIcon from "/assets/contact/location.svg";


const Icon = ({ name }) => {
  const icons = {
    mail: mailIcon,
    phone: phoneIcon,
    map: mapIcon,
  };

  const src = icons[name];
  if (!src) return null;

  return <img src={src} alt={`${name} icon`} width={20} height={20} />;
};


export default function Contact() {
  const { heading, form, infoCards } = data.contact;

  // -------------------------------
  // Form state
  // -------------------------------
  const [formData, setFormData] = useState({
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});   // { field: "message" }
  const [touched, setTouched] = useState({}); // { field: true } -> show errors only after user interacted

  const setField = (name, value) => {
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const touch = (name) => setTouched((p) => ({ ...p, [name]: true }));
  const setError = (name, msg) =>
    setErrors((p) => (msg ? { ...p, [name]: msg } : (delete p[name], { ...p })));

  // -------------------------------
  // Validation rules
  // -------------------------------
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const lettersRegex = /^[\p{L}\s'-]+$/u; // letters, spaces, apostrophes, dashes
  const onlyDigits = (s) => /^\d+$/.test(s);

  const validateField = (name, value) => {
    let msg = "";

    if (/name/i.test(name)) {
      // allow typing anything, but flag when numbers appear
      if (value.trim() && !lettersRegex.test(value)) {
        msg = "Only letters are accepted.";
      } else if (!value.trim()) {
        // optional: you can require it; or leave empty as valid
        msg = "This field is required";
      }
    }

    if (name === "email") {
      if (!value.trim()) msg = "Email is required";
      else if (!emailRegex.test(value)) msg = "Please enter a valid email address";
    }

    if (name === "company") {
      if (!value.trim()) msg = "Company is required";
    }

    if (name === "message") {
      if (!value.trim()) msg = "Message is required";
      else if (value.length < 5) msg = "Message must be at least 5 characters";
    }

    if (name === "phone") {
      // ✨ No default alert. Only validate after the user typed something (touched.phone)
      if (!touched.phone) {
        msg = ""; // do not show anything before interaction
      } else if (!value) {
        // If you do NOT want to show an error when it's empty even after touch,
        // keep this empty string. If you want to require it, set a message here.
        msg = "";
      } else {
        const digits = value.replace(/\D/g, "");
        if (!onlyDigits(digits)) msg = "Only numbers are accepted";
        else if (digits.length < 6) msg = "Please enter a valid phone number";
      }
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
    return ok;
  };

  const handleInput = (f) => (e) => {
    const val = e.currentTarget.value;
    setField(f.name, val);
    touch(f.name); // mark as interacted
    validateField(f.name, val);
  };

  const handleBlur = (f) => (e) => {
    touch(f.name);
    validateField(f.name, e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    console.log("✅ Contact form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <h3 className={`section-title ${styles.contactHeading}`}>{heading}</h3>

        <div className={styles.contactGrid}>
          {/* LEFT (form) */}
          <div className={`${styles.contactCard} ${styles.formCard}`}>
            <h4 className={styles.contactPanelTitle}>{form.title}</h4>

            <form onSubmit={handleSubmit} noValidate>
              {/* half cols */}
              <div className={`${styles.grid} ${styles.two}`}>
                {form.fields
                  .filter((f) => f.col === "half")
                  .map((f) =>
                    f.type === "textarea" ? null : (
                      <div key={f.name}>
                        <input
                          className={`${styles.cInput} ${errors[f.name] ? styles.invalid : ""}`}
                          type={f.type}
                          name={f.name}
                          placeholder={f.placeholder}
                          onInput={handleInput(f)}
                          onBlur={handleBlur(f)}
                          inputMode={/name/i.test(f.name) ? "text" : undefined}
                        />
                        {errors[f.name] && (
                          <div className={styles.errorMessage}>{errors[f.name]}</div>
                        )}
                      </div>
                    )
                  )}
              </div>

              {/* full width (except phone/message) */}
              {form.fields
                .filter((f) => f.col === "full" && !["phone", "message"].includes(f.name))
                .map((f) =>
                  f.type === "textarea" ? null : (
                    <div key={f.name} className={styles.mt}>
                      <input
                        className={`${styles.cInput} ${errors[f.name] ? styles.invalid : ""}`}
                        type={f.type}
                        name={f.name}
                        placeholder={f.placeholder}
                        onInput={handleInput(f)}
                        onBlur={handleBlur(f)}
                        inputMode={/name/i.test(f.name) ? "text" : undefined}
                      />
                      {errors[f.name] && (
                        <div className={styles.errorMessage}>{errors[f.name]}</div>
                      )}
                    </div>
                  )
                )}

              {/* phone */}
              {form.fields.some((f) => f.name === "phone") && (
                <div className={styles.mt}>
                  <PhoneField
                    defaultCountry="in"
                    onChange={(val) => {
                      setField("phone", val);
                      touch("phone"); // mark interacted when user changes phone
                      validateField("phone", val);
                    }}
                  />
                  {errors.phone && (
                    <div className={styles.errorMessage}>{errors.phone}</div>
                  )}
                </div>
              )}

              {/* message */}
              {form.fields
                .filter((f) => f.name === "message")
                .map((f) => (
                  <div key={f.name} className={styles.mt}>
                    <textarea
                      className={`${styles.cInput} ${styles.mt} ${errors.message ? styles.invalid : ""}`}
                      name={f.name}
                      placeholder={f.placeholder}
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
                    />
                    {errors.message && (
                      <div className={styles.errorMessage}>{errors.message}</div>
                    )}
                  </div>
                ))}

              {/* submit */}
              <button className={`btn ${styles.cBtn} ${styles.mt}`} type="submit">
                {form.submit.label}
                <img src={planeIcon} alt="Send" className={styles.plane} />
              </button>
            </form>
          </div>

          {/* RIGHT (info cards) */}
          <div className={styles.rightCol}>
            {infoCards.map((card, idx) => (
              <div key={idx} className={`${styles.contactCard} ${styles.infoCard}`}>
                <h4 className={styles.contactPanelTitle}>{card.title}</h4>
                {card.items && (
                  <ul className={styles.cList}>
                    {card.items.map((it, i) => (
                      <li key={i}>
                        <span className={styles.cIco}>
                          <Icon name={it.icon} />
                        </span>
                        {String(it.text)
                          .split("\n")
                          .map((line, li) => (
                            <span key={li}>
                              {line}
                              {li < String(it.text).split("\n").length - 1 && <br />}
                            </span>
                          ))}
                      </li>
                    ))}
                  </ul>
                )}
                {card.description && <p className={styles.contactNote}>{card.description}</p>}
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
}
