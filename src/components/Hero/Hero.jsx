import { useEffect, useRef, useState, lazy } from "react";
import { useLocation } from "react-router-dom";
import data from "../../data/sitedata";
import styles from "./Hero.module.css";
import { ctaClick, dl } from "../../gtm";
import PhoneField from "../Contact/PhoneField";


// CompanyLogos ko lazy load kar rahe hain taaki main thread block na ho
const CompanyLogos = lazy(() => import("../CompanyLogos/CompanyLogos"));

const FORMSPREE_ENDPOINT = "https://formspree.io/f/manppeoz";
const REDIRECT_URL = "https://calendly.com/ingversionsdigital/30min?month=2025-10";

const OptimizedImg = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  ...rest
}) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
    decoding="async"
    className={className}
    {...rest}
  />
);

const Hero = () => {
  const h = data.hero;
  const { form } = data.contact; // Contact data se form fetch kar rahe hain
  const sectionRef = useRef(null);
  const viewedRef = useRef(false);

  // --- FORM STATE & LOGIC START ---
  const [formData, setFormData] = useState({ phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [phoneInteracted, setPhoneInteracted] = useState(false);
  const [formError, setFormError] = useState("");
  const location = useLocation();

  const setField = (name, value) => setFormData((p) => ({ ...p, [name]: value }));
  const touch = (name) => setTouched((p) => ({ ...p, [name]: true }));
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
      touch(f.name);
      ok = validateField(f.name, v) && ok;
    });
    touch("message");
    ok = validateField("message", formData.message || "") && ok;
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
    setFormError("");
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
        setFormError(err?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    if (!plan) return;
    const defaultMessage = `Hi, could you tell me more about the ${plan} plan?`;
    setFormData((prev) => ({
      ...prev,
      message: defaultMessage,
      selected_plan: plan,
    }));
    setTouched((prev) => ({ ...prev, message: true }));
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

  const handleCta = () => {
    ctaClick({ label: h.cta.label, location: "Hero", href: h.cta.href });
  };

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
            <a className={styles.btnHero} href={h.cta.href} onClick={handleCta} data-cta={h.cta.label} data-cta-loc="Hero">
              {h.cta.label}
            </a>

            <div className={styles.heroSocialProof}>
              <div className={styles.avatarStack}>
                {h.avatars.map((src, i) => (
                  <OptimizedImg 
                    key={i} 
                    src={src} 
                    alt={`Client ${i + 1}`} 
                    width="48"
                    height="48"
                    priority={true}
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
                    <label htmlFor={`hero-${f.name}`} className={styles.srOnly}>{f.placeholder}</label>
                    <input
                      id={`hero-${f.name}`}
                      className={`${styles.cInput} ${errors[f.name] ? styles.invalid : ""}`}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      onInput={handleInput(f)}
                      onBlur={handleBlur(f)}
                      inputMode={/name/i.test(f.name) ? "text" : undefined}
                      aria-invalid={!!errors[f.name]}
                      aria-describedby={errors[f.name] ? `hero-${f.name}-error` : undefined}
                    />
                    {errors[f.name] && (
                      <div id={`hero-${f.name}-error`} role="alert" className={styles.errorMessage}>
                        {errors[f.name]}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            {form.fields.filter((f) => f.col === "full" && !["phone", "message"].includes(f.name)).map((f) =>
              f.type === "textarea" ? null : (
                <div key={f.name} className={styles.mt}>
                  <label htmlFor={`hero-${f.name}`} className={styles.srOnly}>{f.placeholder}</label>
                  <input
                    id={`hero-${f.name}`}
                    className={`${styles.cInput} ${errors[f.name] ? styles.invalid : ""}`}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    onInput={handleInput(f)}
                    onBlur={handleBlur(f)}
                    inputMode={/name/i.test(f.name) ? "text" : undefined}
                    aria-invalid={!!errors[f.name]}
                    aria-describedby={errors[f.name] ? `hero-${f.name}-error` : undefined}
                  />
                  {errors[f.name] && (
                    <div id={`hero-${f.name}-error`} role="alert" className={styles.errorMessage}>
                      {errors[f.name]}
                    </div>
                  )}
                </div>
              )
            )}

            {form.fields.some((f) => f.name === "phone") && (
              <div className={styles.mt}>
                <label htmlFor="hero-phone" className={styles.srOnly}>Phone Number</label>
                <PhoneField
                  id="hero-phone"
                  invalid={!!errors.phone}
                  ariaInvalid={!!errors.phone}
                  ariaDescribedby={errors.phone ? "hero-phone-error" : undefined}
                  onFocus={() => {
                    setPhoneInteracted(true);
                    touch("phone");
                    validateField("phone", formData.phone || "");
                  }}
                  onChange={(val) => {
                    setField("phone", val);
                    if (phoneInteracted) {
                      touch("phone");
                      validateField("phone", val);
                    }
                  }}
                />
                {errors.phone && (
                  <div id="hero-phone-error" role="alert" className={styles.errorMessage}>
                    {errors.phone}
                  </div>
                )}
              </div>
            )}

            {form.fields.filter((f) => f.name === "message").map((f) => (
              <div key={f.name} className={styles.mt}>
                <label htmlFor="hero-message" className={styles.srOnly}>{f.placeholder}</label>
                <textarea
                  id="hero-message"
                  className={`${styles.cInput} ${styles.mt} ${errors.message ? styles.invalid : ""}`}
                  name={f.name}
                  placeholder={f.placeholder}
                  value={formData.message || ""}
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
                  aria-describedby={errors.message ? "hero-message-error" : undefined}
                />
                {errors.message && (
                  <div id="hero-message-error" role="alert" className={styles.errorMessage}>
                    {errors.message}
                  </div>
                )}
              </div>
            ))}

            {formError && (
              <div id="hero-form-error" role="alert" className={`${styles.errorMessage} ${styles.mt}`}>
                {formError}
              </div>
            )}

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
