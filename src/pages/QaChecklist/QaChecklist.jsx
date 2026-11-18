import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Download } from "lucide-react";
import Layout from "../../layouts/Layout";
import SEO from "../../components/SEO/SEO";
import OptimizedImg from "../../components/OptimizedImg/OptimizedImg";
import seo from "../../data/seoData";
import data from "../../data/qaChecklistData";
import { submitLead } from "../../utils/submitLead";
import { leadSuccess } from "../../gtm";
import styles from "./QaChecklist.module.css";

const { hero, stats, inside, previews, form, success } = data;
const LOC = "QA Checklist";

const QaChecklist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const downloadRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.elements._gotcha?.value) return setStatus("done");
    setStatus("submitting");
    try {
      await submitLead("qa-checklist", { name, email, source: "Free QA Checklist" });
      leadSuccess({ form_name: "qa-checklist", lead_source: "Free QA Checklist" });
      setStatus("done");
      requestAnimationFrame(() => downloadRef.current?.click());
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <SEO {...seo.qaChecklist} />
      <Layout header={1} footer={1}>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.tag}>{hero.tag}</span>
            <h1 className={styles.title}>{hero.title}</h1>
            <p className={styles.subtitle}>{hero.subtitle}</p>
            <ul className={styles.stats}>
              {stats.map((s) => (
                <li key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.body}>
          <div className={`container ${styles.grid}`}>
            <div>
              <h2 className={styles.h2}>{data.insideTitle}</h2>
              <ul className={styles.inside}>
                {inside.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={20} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.previews}>
                {previews.map((p, i) => (
                  <OptimizedImg
                    key={p.src}
                    src={p.src}
                    alt={p.alt}
                    width={800}
                    height={1133}
                    priority={i === 0}
                    className={styles.preview}
                  />
                ))}
              </div>
            </div>

            <div className={styles.card} id="claim">
              {status === "done" ? (
                <div className={styles.success}>
                  <CheckCircle2 size={44} aria-hidden="true" />
                  <h2 className={styles.h2}>{success.title}</h2>
                  <p>{success.text}</p>
                  <a
                    ref={downloadRef}
                    href={data.pdf}
                    download={data.fileName}
                    className={styles.btn}
                    data-cta="qa-checklist-download"
                    data-cta-loc={LOC}
                  >
                    <Download size={18} aria-hidden="true" /> {success.button}
                  </a>
                  <p className={styles.note}>
                    {success.ctaText} <Link to={success.ctaLink.href}>{success.ctaLink.label}</Link>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-gtm-form="qa-checklist" className={styles.form}>
                  <h2 className={styles.h2}>{form.title}</h2>
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className={styles.honeypot}
                  />
                  <label className={styles.field} htmlFor="qa-name">
                    <span>{form.nameLabel}</span>
                    <input
                      id="qa-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={form.namePlaceholder}
                    />
                  </label>
                  <label className={styles.field} htmlFor="qa-email">
                    <span>{form.emailLabel}</span>
                    <input
                      id="qa-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={form.emailPlaceholder}
                    />
                  </label>
                  <button
                    type="submit"
                    className={styles.btn}
                    disabled={status === "submitting"}
                    data-cta="qa-checklist-submit"
                    data-cta-loc={LOC}
                  >
                    <Download size={18} aria-hidden="true" />
                    {status === "submitting" ? form.submitting : form.submit}
                  </button>
                  {status === "error" && (
                    <p className={styles.error} role="alert">
                      {form.error}
                    </p>
                  )}
                  <p className={styles.note}>{form.note}</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default QaChecklist;
