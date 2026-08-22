import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./ContactModal.module.css";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const initialState = {
  email: "",
  inquiry: "Sales",
  country: "",
  employeeCount: "",
};

const countryOptions = ["United States", "United Kingdom", "India", "Canada", "Australia", "Other"];
const employeeOptions = ["1-10", "11-50", "51-200", "201-500", "500+"];

const ContactModal = ({ isOpen, onClose, source }) => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData(initialState);
    setIsSubmitted(false);
    setSubmitError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const payload = {
      email: formData.email,
      inquiry: formData.inquiry,
      country: formData.country,
      employee_count: formData.employeeCount,
      source: source || "General Inquiry",
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData(initialState);
      } else {
        const err = await res.json().catch(() => ({}));
        setSubmitError(err?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return createPortal(
    <div className={styles.contactModalOverlay} onClick={handleOverlayClick}>
      <div className={styles.contactModal}>
        <button className={styles.contactModalClose} onClick={handleClose} aria-label="Close">
          &times;
        </button>

        {isSubmitted ? (
          <div className={styles.contactModalThankyou}>
            <div className={styles.thankyouIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="#1d4ed8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Thank you for sharing your details!</h3>
            <p>We'll get in touch with you shortly.</p>
            <button className={styles.contactModalSubmit} onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.contactModalHeader}>
              <h3>Tell us a bit about yourself</h3>
              <span className={styles.contactModalRequired}>
                <span className={styles.requiredStar}>*</span> Required Information
              </span>
            </div>

            <form className={styles.contactModalForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="email">
                  Email<span className={styles.requiredStar}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="inquiry">
                  Nature of Inquiry<span className={styles.requiredStar}>*</span>
                </label>
                <select
                  id="inquiry"
                  required
                  value={formData.inquiry}
                  onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                >
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="Partnership">Partnership</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="country">
                  Country<span className={styles.requiredStar}>*</span>
                </label>
                <select
                  id="country"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="">-- Select an option --</option>
                  {countryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="employeeCount">
                  Employee Count<span className={styles.requiredStar}>*</span>
                </label>
                <select
                  id="employeeCount"
                  required
                  value={formData.employeeCount}
                  onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                >
                  <option value="">-- Select an option --</option>
                  {employeeOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {submitError && <div className={`errorMessage ${styles.contactModalError}`}>{submitError}</div>}

              <button type="submit" className={styles.contactModalSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Continue"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;