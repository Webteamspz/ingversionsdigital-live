import { ArrowRight } from "lucide-react";
import data from "../../data/sitedata";
import styles from "./Contact.module.css";
import Reveal from "../Reveal/Reveal";

const Contact = () => {
  const { heading, form, infoCards } = data.contact;
  const email = infoCards[0]?.items?.find((item) => item.icon === "email")?.text;

  return (
    <section className={styles.contactSection} id="contact">
      <div className="container">
        <Reveal className={styles.contactPanel}>
          <p className={styles.eyebrow}>{heading}</p>
          <h3 className={styles.contactHeading}>{form.title}</h3>
          <p className={styles.contactCopy}>
            Tell us where you want to grow. We&apos;ll help you find the clearest path to better conversions.
          </p>

          <div className={styles.contactActions}>
            <a className={styles.primaryAction} href={email ? `mailto:${email}` : "mailto:"}>
              Start the conversation
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
