import { useEffect, useRef, useState, lazy } from "react";
import { useLocation } from "react-router-dom";
import data from "../../data/sitedata";
import styles from "./Hero.module.css";
import { dl } from "../../gtm";
import OptimizedImg from "../OptimizedImg/OptimizedImg";

const CompanyLogos = lazy(() => import("../CompanyLogos/CompanyLogos"));

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;
const REDIRECT_URL = "https://calendly.com/ingversionsdigital/30min?month=2025-10";

const getAutocomplete = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("first") || n.includes("full") || n === "name") return "name";
  if (n.includes("last")) return "family-name";
  if (n.includes("email")) return "email";
  if (n.includes("organization") || n.includes("company")) return "organization";
  if (n.includes("url") || n.includes("website")) return "url";
  if (n.includes("phone") || n.includes("tel")) return "tel";
  if (n.includes("message")) return "off";
  return "on";
};

const Hero = () => {
  const h = data.hero;
  const { form } = data.contact; 
  const sectionRef = useRef(null);
  const viewedRef = useRef(false);

  const [formData, setFormData] = useState({ phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [phoneInteracted, setPhoneInteracted] = useState(false);
  const location = useLocation();

  const setField = (name, value) => setFormData((p) => ({ ...p, [name]: value }));
  const setError = (name, msg) => setErrors((p) => msg ? { ...p, [name]: msg } : (delete p[name], { ...p }));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const lettersRegex = /^[\p{L}\s'-]+$/u;
  const onlyDigits = (s) => /^\d+$/.test(s);

  const validateField = (name, value) => {
    let msg = "";
    if (/name/i.test(name)) {
      if (value.trim() && !lettersRegex.test(value)) msg = "Only letters are accepted.";
      else if (!value.trim()) msg = "This field is required";
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
      ok = validateField(f.name, v) && ok;
    });
    ok = validateField("message", formData.message || "") && ok;
    setPhoneInteracted(true);
    ok = validateField("phone", formData.phone || "") && ok;
    return ok;
  };

  const handleInput = (f) => (e) => {
    const val = e.currentTarget.value;
    setField(f.name, val);
    validateField(f.name, val);
  };

  const handleBlur = (f) => (e) => {
    validateField(f.name, e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");

    const payload = {
      ...formData,
      selected_plan: plan || "No plan selected — Direct form fill",
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) window.location.href = REDIRECT_URL;
      else {
        const err = await res.json().catch(() => ({}));
        alert(err?.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Found some error please try again.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    const service = params.get("service");
    if (!plan && !service) return;
    const defaultMessage = plan
      ? `Hi, could you tell me more about the ${plan} plan?`
      : `Hi, I'd like to learn more about your ${service} service.`;
    setFormData((prev) => ({
      ...prev,
      message: defaultMessage,
      ...(plan ? { selected_plan: plan } : {}),
    }));
    setError("message", "");
  }, [location.search]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || viewedRef.current) return;
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        viewedRef.current = true;
        dl().push({ event: "hero_view", section: "Hero" });
        io.disconnect();
      }
    }, { threshold: [0.5] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.bannerBg} id="hero" aria-labelledby="hero-heading">
      <div className={`container ${styles.heroRow}`}>
        {/* LEFT TEXT */}
        <div className={styles.textHeroArea}>
          <h1 id="hero-heading" className={styles.heroTitle}>
            {h.heading} <span className={styles.heroTitlePill}>{h.pill}</span>
          </h1>
          <p className={styles.heroSubtitle}>{h.sub}</p>

          <div className={styles.heroCtaWrap}>
            <div className={styles.heroSocialProof}>
              <div className={styles.avatarStack}>
                {h.avatars.map((src, i) => (
                  <OptimizedImg 
                    key={i} 
                    src={src} 
                    alt={`Client ${i + 1}`} 
                    width="48"
                    height="48"
                  />
                ))}
              </div>
              <span className={styles.proofText} dangerouslySetInnerHTML={{ __html: h.proof }} />
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL: CONTACT FORM */}
        <div className={`${styles.contactCard} ${styles.formCard}`}>
          <h4 className={styles.contactPanelTitle}>{form.title}</h4>
          <form data-gtm-form="contact" onSubmit={handleSubmit} noValidate>
            <div className={`${styles.grid} ${styles.two}`}>
              {form.fields.filter((f) => f.col === "half").map((f) =>
                f.type === "textarea" ? null : (
                  <div key={f.name}>
                    <label htmlFor={`hero-${f.name}`} className="sr-only">
                      {f.placeholder}
                    </label>
                    <input
                      id={`hero-${f.name}`}
                      className={`${styles.cInput} ${errors[f.name] ? styles.invalid : ""}`}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      autoComplete={getAutocomplete(f.name)}
                      onInput={handleInput(f)}
                      onBlur={handleBlur(f)}
                      inputMode={/name/i.test(f.name) ? "text" : undefined}
                      aria-invalid={!!errors[f.name]}
                    />
                    {errors[f.name] && <div className={styles.errorMessage}>{errors[f.name]}</div>}
                  </div>
                )
              )}
            </div>

            {form.fields.filter((f) => f.col === "full" && !["phone", "message"].includes(f.name)).map((f) =>
              f.type === "textarea" ? null : (
                <div key={f.name} className={styles.mt}>
                  <label htmlFor={`hero-${f.name}`} className="sr-only">
                    {f.placeholder}
                  </label>
                  <input
                    id={`hero-${f.name}`}
                    className={`${styles.cInput} ${errors[f.name] ? styles.invalid : ""}`}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    autoComplete={getAutocomplete(f.name)}
                    onInput={handleInput(f)}
                    onBlur={handleBlur(f)}
                    inputMode={/name/i.test(f.name) ? "text" : undefined}
                    aria-invalid={!!errors[f.name]}
                  />
                  {errors[f.name] && <div className={styles.errorMessage}>{errors[f.name]}</div>}
                </div>
              )
            )}

            {form.fields.some((f) => f.name === "phone") && (
              <div className={styles.mt}>
                <label htmlFor="hero-phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="hero-phone"
                  className={`${styles.cInput} ${errors.phone ? styles.invalid : ""}`}
                  type="tel"
                  name="phone"
                  value={formData.phone || ""}
                  placeholder="Phone Number"
                  autoComplete="tel"
                  inputMode="tel"
                  onFocus={() => {
                    setPhoneInteracted(true);
                    validateField("phone", formData.phone || "");
                  }}
                  onInput={(event) => {
                    const val = event.currentTarget.value;
                    setField("phone", val);
                    if (phoneInteracted) {
                      validateField("phone", val);
                    }
                  }}
                />
                {errors.phone && <div className={styles.errorMessage}>{errors.phone}</div>}
              </div>
            )}

            {form.fields.filter((f) => f.name === "message").map((f) => (
              <div key={f.name} className={styles.mt}>
                <label htmlFor="hero-message" className="sr-only">
                  {f.placeholder}
                </label>
                <textarea
                  id="hero-message"
                  className={`${styles.cInput} ${styles.mt} ${errors.message ? styles.invalid : ""}`}
                  name={f.name}
                  placeholder={f.placeholder}
                  value={formData.message || ""}
                  autoComplete="off"
                  onFocus={() => {
                    setPhoneInteracted(true);
                    validateField("phone", formData.phone || "");
                  }}
                  onInput={(e) => {
                    const v = e.currentTarget.value;
                    setField("message", v);
                    validateField("message", v);
                  }}
                  onBlur={(e) => {
                    validateField("message", e.currentTarget.value);
                  }}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <div className={styles.errorMessage}>{errors.message}</div>}
              </div>
            ))}

            <button className={`btn ${styles.cBtn} ${styles.mt}`} type="submit">
              {form.submit.label}
            </button>
          </form>
        </div>
      </div>
    
    </section>
  );
};

export default Hero;