import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, AlertTriangle, MinusCircle } from "lucide-react";
import tools, { toolShared } from "../../data/toolsData";
import { revenueImpact, profitMargin, discountImpact, lifetimeValue } from "../../utils/storeTools";
import styles from "../AbTestCalculator/AbTestCalculator.module.css";
import own from "./ToolCalculator.module.css";

// Each returns the values named in the tool's `outputs` (plus an optional `verdict`), or null.
const CALC = {
  "shopify-profit-margin-calculator": profitMargin,
  "shopify-discount-calculator": discountImpact,
  "customer-lifetime-value-calculator": lifetimeValue,
  "cro-revenue-calculator": revenueImpact,
};

const money = (digits) => (x) =>
  x.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
const FORMAT = {
  int: (x) => Math.round(x).toLocaleString("en-US"),
  pct: (x) => `${(x * 100).toFixed(1)}%`,
  pct0: (x) => `+${Math.round(x * 100)}%`,
  ratio: (x) => `${x.toFixed(2)}x`,
  months: (x) => x.toFixed(1),
  money: money(0),
  money2: money(2),
};
const show = (format, x) => (x === null || x === undefined ? "–" : FORMAT[format](x));
const VERDICT_ICON = { winner: CheckCircle2, loser: AlertTriangle, flat: MinusCircle };

const parse = (field, raw) => {
  const n = raw === "" ? NaN : Number(raw);
  return field.percent ? n / 100 : n;
};

const Field = ({ id, field, value, onChange }) => (
  <label className={styles.field} htmlFor={id}>
    <span className={styles.label}>{field.label}</span>
    <input
      id={id}
      className={styles.input}
      type="number"
      inputMode="decimal"
      min="0"
      step="any"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

const ToolCalculator = ({ slug }) => {
  const tool = tools[slug];
  const fields = tool.rows.flat();
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.default])),
  );
  const r = CALC[slug](Object.fromEntries(fields.map((f) => [f.key, parse(f, values[f.key])])));
  const VerdictIcon = r?.verdict && VERDICT_ICON[r.verdict];
  const more = [
    ...toolShared.more,
    ...Object.entries(tools)
      .filter(([s]) => s !== slug)
      .map(([s, t]) => ({ name: t.name, href: `/${s}` })),
  ];

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.tag}>{toolShared.tag}</span>
          <h1 className={styles.title}>{tool.hero.title}</h1>
          <p className={styles.subtitle}>{tool.hero.subtitle}</p>
        </div>
      </section>

      <section className={styles.calcSection}>
        <div className="container">
          <div className={styles.card}>
            <div className={styles.panelGrid}>
              <div className={styles.inputs}>
                <p className={styles.intro}>{tool.intro}</p>
                {tool.rows.map((row) => (
                  <div className={styles.row} key={row[0].key}>
                    {row.map((f) => (
                      <Field
                        key={f.key}
                        id={`${slug}-${f.key}`}
                        field={f}
                        value={values[f.key]}
                        onChange={(v) => setValues((prev) => ({ ...prev, [f.key]: v }))}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className={styles.output} aria-live="polite">
                {r ? (
                  <>
                    {VerdictIcon && (
                      <div className={`${styles.verdict} ${styles[r.verdict]}`}>
                        <VerdictIcon size={22} aria-hidden="true" />
                        <span>{tool.verdicts[r.verdict]}</span>
                      </div>
                    )}
                    <div className={styles.stats}>
                      {tool.outputs.map((o) => (
                        <div
                          key={o.key}
                          className={`${styles.stat} ${o.highlight ? styles.statYellow : ""}`}
                        >
                          <span className={styles.statLabel}>{o.label}</span>
                          <span className={styles.statValue}>{show(o.format, r[o.key])}</span>
                        </div>
                      ))}
                    </div>
                    {tool.note && <p className={styles.note}>{tool.note}</p>}
                  </>
                ) : (
                  <p className={styles.invalid}>{tool.invalid}</p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.cta}>
            <div>
              <p className={styles.ctaTitle}>{toolShared.cta.title}</p>
              <p className={styles.ctaText}>{toolShared.cta.text}</p>
            </div>
            <a
              href={toolShared.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-book"
              data-cta={toolShared.cta.label}
              data-cta-loc={tool.name}
            >
              {toolShared.cta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <nav className={own.more} aria-label={toolShared.moreTitle}>
            <p className={own.moreTitle}>{toolShared.moreTitle}</p>
            <ul className={own.moreList}>
              {more.map((m) => (
                <li key={m.href}>
                  <Link to={m.href} className={own.moreLink}>
                    {m.name}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className={styles.faq}>
        <div className="container">
          <h2 className="section-title">{toolShared.faqTitle}</h2>
          <div className={styles.faqList}>
            {tool.faq.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary>
                  <span>{item.q}</span>
                  <span className={styles.faqIcon} aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ToolCalculator;
