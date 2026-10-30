import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./ContactModal.module.css";
import { submitLead } from "../../utils/submitLead";

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
  const navigate = useNavigate();
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

  // Escape closes the modal, like the close button.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setFormData(initialState);
      setSubmitError("");
      onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData(initialState);
    setSubmitError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Honeypot: real visitors never see this field, bots fill it.
    if (e.currentTarget.elements._gotcha?.value) return navigate("/thank-you");
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
      await submitLead("contact", payload);
      navigate("/thank-you");
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
        <button type="button" className={styles.contactModalClose} onClick={handleClose} aria-label="Close">
          &times;
        </button>

          <>
            <div className={styles.contactModalHeader}>
              <h3>Tell us a bit about yourself</h3>
              <span className={styles.contactModalRequired}>
                <span className={styles.requiredStar}>*</span> Required Information
              </span>
            </div>

            <form className={styles.contactModalForm} data-gtm-form="engagement-contact" onSubmit={handleSubmit}>
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
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
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;