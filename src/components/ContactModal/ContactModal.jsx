import { useState, useEffect } from "react";
import "./ContactModal.css";

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

  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function in case the component unmounts while open
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

  return (
    <div className="contact-modal-overlay" onClick={handleOverlayClick}>
      <div className="contact-modal">
        <button className="contact-modal-close" onClick={handleClose} aria-label="Close">
          &times;
        </button>

        {isSubmitted ? (
          <div className="contact-modal-thankyou">
            <div className="thankyou-icon">
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
            <button className="contact-modal-submit" onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="contact-modal-header">
              <h3>Tell us a bit about yourself</h3>
              <span className="contact-modal-required">
                <span className="required-star">*</span> Required Information
              </span>
            </div>

            <form className="contact-modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  Email<span className="required-star">*</span>
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

              <div className="form-group">
                <label htmlFor="inquiry">
                  Nature of Inquiry<span className="required-star">*</span>
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

              <div className="form-group">
                <label htmlFor="country">
                  Country<span className="required-star">*</span>
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

              <div className="form-group">
                <label htmlFor="employeeCount">
                  Employee Count<span className="required-star">*</span>
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

              {submitError && <div className="errorMessage contact-modal-error">{submitError}</div>}

              <button type="submit" className="contact-modal-submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Continue"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;