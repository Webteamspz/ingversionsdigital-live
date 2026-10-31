import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, MinusCircle } from "lucide-react";
import data from "../../data/abTestData";
import { significance, mdeByWeek, srm } from "../../utils/abtest";
import styles from "./AbTestCalculator.module.css";

const { hero, tabs, plan, results, confidenceOptions, powerOptions, cta, faq } = data;

const pct = (x, digits = 2) => `${(x * 100).toFixed(digits)}%`;
const int = (x) => Math.round(x).toLocaleString("en-US");
const num = (v) => (v === "" ? NaN : Number(v));

const NumberField = ({ id, label, value, onChange }) => (
  <label className={styles.field} htmlFor={id}>
    <span className={styles.label}>{label}</span>
    <input
      id={id}
      className={styles.input}
      type="number"
      inputMode="numeric"
      min="0"
      step="1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

const SelectField = ({ id, label, value, options, onChange }) => (
  <label className={styles.field} htmlFor={id}>
    <span className={styles.label}>{label}</span>
    <select id={id} className={styles.input} value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {options.map(([v, text]) => (
        <option key={v} value={v}>
          {text}
        </option>
      ))}
    </select>
  </label>
);

const confidenceChoices = confidenceOptions.map((c) => [c, pct(c, 0)]);

const PlanTab = () => {
  const [visitors, setVisitors] = useState("10000");
  const [conversions, setConversions] = useState("300");
  const [variants, setVariants] = useState(2);
  const [confidence, setConfidence] = useState(0.95);
  const [power, setPower] = useState(0.8);

  const weeks = mdeByWeek({
    weeklyVisitors: num(visitors),
    weeklyConversions: num(conversions),
    variants,
    confidence,
    power,
  });

  return (
    <div className={styles.panelGrid}>
      <div className={styles.inputs}>
        <p className={styles.intro}>{plan.intro}</p>
        <NumberField id="plan-visitors" label={plan.fields.weeklyVisitors} value={visitors} onChange={setVisitors} />
        <NumberField id="plan-conversions" label={plan.fields.weeklyConversions} value={conversions} onChange={setConversions} />
        <div className={styles.row}>
          <SelectField
            id="plan-variants"
            label={plan.fields.variants}
            value={variants}
            options={[2, 3, 4, 5].map((v) => [v, v])}
            onChange={setVariants}
          />
          <SelectField id="plan-confidence" label={plan.fields.confidence} value={confidence} options={confidenceChoices} onChange={setConfidence} />
          <SelectField
            id="plan-power"
            label={plan.fields.power}
            value={power}
            options={powerOptions.map((p) => [p, pct(p, 0)])}
            onChange={setPower}
          />
        </div>
      </div>

      <div className={styles.output} aria-live="polite">
        {weeks ? (
          <>
            <div className={`${styles.stat} ${styles.statYellow}`}>
              <span className={styles.statLabel}>{plan.baseline}</span>
              <span className={styles.statValue}>{pct(num(conversions) / num(visitors))}</span>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">{plan.table.week}</th>
                  <th scope="col">{plan.table.visitors}</th>
                  <th scope="col">{plan.table.mde}</th>
                </tr>
              </thead>
              <tbody>
                {weeks.map((w) => (
                  <tr key={w.week}>
                    <td>{w.week}</td>
                    <td>{int(w.visitorsPerVariant)}</td>
                    <td className={styles.mde}>{pct(w.relative, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.note}>{plan.note}</p>
          </>
        ) : (
          <p className={styles.invalid}>{plan.invalid}</p>
        )}
      </div>
    </div>
  );
};

const ResultsTab = () => {
  const [visitorsA, setVisitorsA] = useState("10000");
  const [convA, setConvA] = useState("500");
  const [visitorsB, setVisitorsB] = useState("10000");
  const [convB, setConvB] = useState("580");
  const [confidence, setConfidence] = useState(0.95);
  const [tails, setTails] = useState(2);

  const r = significance({
    visitorsA: num(visitorsA),
    convA: num(convA),
    visitorsB: num(visitorsB),
    convB: num(convB),
    confidence,
    tails,
  });
  const ratio = r && srm(num(visitorsA), num(visitorsB));

  const verdict = !r ? null : !r.significant ? "flat" : r.rateB > r.rateA ? "winner" : "loser";
  const VerdictIcon = { winner: CheckCircle2, loser: AlertTriangle, flat: MinusCircle }[verdict];

  return (
    <div className={styles.panelGrid}>
      <div className={styles.inputs}>
        <fieldset className={styles.group}>
          <legend className={styles.legend}>{results.control}</legend>
          <div className={styles.row}>
            <NumberField id="res-visitors-a" label={results.fields.visitors} value={visitorsA} onChange={setVisitorsA} />
            <NumberField id="res-conv-a" label={results.fields.conversions} value={convA} onChange={setConvA} />
          </div>
        </fieldset>
        <fieldset className={styles.group}>
          <legend className={styles.legend}>{results.variant}</legend>
          <div className={styles.row}>
            <NumberField id="res-visitors-b" label={results.fields.visitors} value={visitorsB} onChange={setVisitorsB} />
            <NumberField id="res-conv-b" label={results.fields.conversions} value={convB} onChange={setConvB} />
          </div>
        </fieldset>
        <div className={styles.row}>
          <SelectField id="res-confidence" label={results.fields.confidence} value={confidence} options={confidenceChoices} onChange={setConfidence} />
          <SelectField
            id="res-tails"
            label={results.fields.tails}
            value={tails}
            options={[2, 1].map((t) => [t, results.tailOptions[t]])}
            onChange={setTails}
          />
        </div>
      </div>

      <div className={styles.output} aria-live="polite">
        {r ? (
          <>
            <div className={`${styles.verdict} ${styles[verdict]}`}>
              <VerdictIcon size={22} aria-hidden="true" />
              <span>{results.verdicts[verdict]}</span>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>{results.stats.rateA}</span>
                <span className={styles.statValue}>{pct(r.rateA)}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>{results.stats.rateB}</span>
                <span className={styles.statValue}>{pct(r.rateB)}</span>
              </div>
              <div className={`${styles.stat} ${styles.statYellow}`}>
                <span className={styles.statLabel}>{results.stats.uplift}</span>
                <span className={styles.statValue}>{r.uplift === null ? "–" : `${r.uplift > 0 ? "+" : ""}${pct(r.uplift)}`}</span>
              </div>
              <div className={`${styles.stat} ${styles.statYellow}`}>
                <span className={styles.statLabel}>{results.stats.pValue}</span>
                <span className={styles.statValue}>{r.pValue < 0.0001 ? "< 0.0001" : r.pValue.toFixed(4)}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>{results.stats.zScore}</span>
                <span className={styles.statValue}>{r.z.toFixed(4)}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>{results.stats.ci}</span>
                <span className={styles.statValue}>{`[${pct(r.ci[0])}, ${pct(r.ci[1])}]`}</span>
              </div>
            </div>
            {ratio?.mismatch && (
              <p className={styles.srm} role="alert">
                <AlertTriangle size={18} aria-hidden="true" />
                {results.srm}
              </p>
            )}
          </>
        ) : (
          <p className={styles.invalid}>{results.invalid}</p>
        )}
      </div>
    </div>
  );
};

const TAB_KEYS = ["plan", "results"];

const AbTestCalculator = () => {
  const [tab, setTab] = useState("plan");

  const onTabKey = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = TAB_KEYS[(TAB_KEYS.indexOf(tab) + 1) % TAB_KEYS.length];
    setTab(next);
    document.getElementById(`abtab-${next}`)?.focus();
  };

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.tag}>{hero.tag}</span>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
        </div>
      </section>

      <section className={styles.calcSection}>
        <div className="container">
          <div className={styles.card}>
            <div className={styles.tabs} role="tablist" aria-label={hero.title} onKeyDown={onTabKey}>
              {TAB_KEYS.map((key) => (
                <button
                  key={key}
                  id={`abtab-${key}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  aria-controls={`abpanel-${key}`}
                  tabIndex={tab === key ? 0 : -1}
                  className={`${styles.tab} ${tab === key ? styles.tabActive : ""}`}
                  onClick={() => setTab(key)}
                >
                  {tabs[key]}
                </button>
              ))}
            </div>
            <div id={`abpanel-${tab}`} role="tabpanel" aria-labelledby={`abtab-${tab}`}>
              {tab === "plan" ? <PlanTab /> : <ResultsTab />}
            </div>
          </div>

          <div className={styles.cta}>
            <div>
              <p className={styles.ctaTitle}>{cta.title}</p>
              <p className={styles.ctaText}>{cta.text}</p>
            </div>
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-book"
              data-cta={cta.label}
              data-cta-loc="AB Test Calculator"
            >
              {cta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className="container">
          <h2 className="section-title">{faq.title}</h2>
          <div className={styles.faqList}>
            {faq.items.map((item) => (
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

export default AbTestCalculator;
