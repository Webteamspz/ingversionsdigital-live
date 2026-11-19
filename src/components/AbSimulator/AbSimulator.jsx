import { useEffect, useRef, useState } from "react";
import { ArrowRight, Minus, Pause, Play, Plus, Rotate3d, X } from "lucide-react";
import sim from "../../data/simulatorData";
import { simAt, MIN_DAYS } from "../../utils/abSimulator";
import styles from "./AbSimulator.module.css";

const { days, loopSeconds } = sim.model;
const HOLD_DAYS = 2.5; // pause on the final result before the loop restarts
const TICK_MS = 100;
const CHART_W = 240;
const CHART_H = 64;

const pct = (x, d = 1) => (x === null || x === undefined ? "–" : `${(x * 100).toFixed(d)}%`);
const int = (x) => Math.round(x).toLocaleString("en-US");
const money = (x) =>
  x.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  });
const compact = (x) => x.toLocaleString("en-US", { notation: "compact" });

// Confidence from day 0 to `day`, as an SVG polyline on a 0–100% scale.
const chartPoints = (day, traffic) => {
  const points = [];
  for (let d = Math.min(1, day); d <= day; d += 0.25) {
    const c = simAt({ day: d, dailyVisitors: traffic, ...sim.model }).confidence ?? 0;
    points.push(`${((d / days) * CHART_W).toFixed(1)},${((1 - c) * CHART_H).toFixed(1)}`);
  }
  return points.join(" ");
};

const AbSimulator = () => {
  const stageRef = useRef(null);
  const sceneRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [clock, setClock] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [traffic, setTraffic] = useState(sim.trafficOptions[1]);
  const [view, setView] = useState("overview");
  const [change, setChange] = useState(null);
  const [wants3d, setWants3d] = useState(false);
  const [lite, setLite] = useState(false);
  const [explore, setExplore] = useState(false);

  const day = Math.min(clock, days);
  const r = simAt({ day, dailyVisitors: traffic, ...sim.model });
  const finalConversions = simAt({ day: days, dailyVisitors: traffic, ...sim.model }).convB;

  useEffect(() => {
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPlaying(false);
      setClock(days);
    }
    const conn = navigator.connection;
    if (!wants3d && (conn?.saveData || /2g/.test(conn?.effectiveType || ""))) {
      setLite(true);
      return;
    }
    const scene = import("./scene.js");
    const load = () =>
      scene
        .then(({ createAbScene }) => {
          if (cancelled || !stageRef.current) return;
          sceneRef.current = createAbScene(stageRef.current, {
            labels: sim.scene,
            traffic: sim.trafficOptions[1],
            playing: !reduce,
            coarse: window.matchMedia("(pointer: coarse)").matches,
            onSelect: setView,
          });
          setReady(true);
        })
        .catch(() => {}); // no WebGL: the readout and controls still work without the 3D view
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    const id = idle(load);
    return () => {
      cancelled = true;
      (window.cancelIdleCallback || clearTimeout)(id);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [wants3d]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setClock((t) => {
        const next = t + (days / loopSeconds) * (TICK_MS / 1000);
        if (next < days + HOLD_DAYS) return next;
        sceneRef.current?.reset();
        return 0;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    sceneRef.current?.setPlaying(playing && clock < days);
  }, [playing, clock, ready]);
  useEffect(() => {
    sceneRef.current?.setTraffic(traffic);
  }, [traffic, ready]);
  useEffect(() => {
    sceneRef.current?.setWinner(r.status === "winner");
  }, [r.status, ready]);
  useEffect(() => {
    sceneRef.current?.setTotals({ a: r.convA, b: r.convB, max: finalConversions });
  }, [r.convA, r.convB, finalConversions, ready]);
  useEffect(() => {
    sceneRef.current?.highlight(change);
  }, [change, ready]);
  useEffect(() => {
    sceneRef.current?.setExplore(explore);
    if (!explore) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setView("overview");
      setExplore(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [explore, ready]);

  // 360° mode: the model spins and only the results board stays; exiting restores the overview.
  const toggleExplore = () => {
    setView("overview");
    setExplore((x) => !x);
  };
  const changeTraffic = (t) => {
    setTraffic(t);
    setClock(0);
    sceneRef.current?.reset();
  };
  const changeView = (id) => {
    setView(id);
    sceneRef.current?.setView(id);
  };
  const scrub = (value) => {
    setPlaying(false);
    setClock(Number(value));
  };
  const showChange = (id) => {
    setChange(id);
    if (id && view !== "b") changeView("b");
  };

  const rows = [
    [sim.stats.visitors, int(r.visitors)],
    [sim.stats.rates, r.rateA === undefined ? "–" : `${pct(r.rateA, 2)} → ${pct(r.rateB, 2)}`],
    [sim.stats.uplift, r.uplift === null ? "–" : `${r.uplift > 0 ? "+" : ""}${pct(r.uplift)}`],
    [sim.stats.revenue, money(r.extraYearly)],
  ];

  return (
    <>
      <section
        className={`${styles.stage} ${explore ? styles.explore : ""}`}
        aria-labelledby="simulator-title"
      >
        <div ref={stageRef} className={`${styles.canvas} ${ready ? styles.canvasReady : ""}`}>
          {lite && !wants3d && (
            <button type="button" className={styles.load3d} onClick={() => setWants3d(true)}>
              {sim.load3d}
            </button>
          )}
          {ready && (
            <button
              type="button"
              className={styles.explore360}
              onClick={toggleExplore}
              aria-pressed={explore}
              data-cta={explore ? "Exit 360 view" : "360 view"}
              data-cta-loc="AB Simulator"
            >
              {explore ? <X size={18} /> : <Rotate3d size={18} />}
              {explore ? sim.exploreExit : sim.explore}
            </button>
          )}
        </div>

        <div className={styles.left}>
          <header>
            <span className={styles.tag}>{sim.tag}</span>
            <h1 id="simulator-title" className={styles.title}>
              {sim.title}
            </h1>
            <p className={styles.subtitle}>{sim.subtitle}</p>
          </header>

          <div className={`${styles.glass} ${styles.hud}`} aria-hidden="true">
            <span>
              <small>{sim.day}</small>
              <b>
                {Math.max(1, Math.ceil(day))}/{days}
              </b>
            </span>
            <span>
              <small>{sim.stats.confidence}</small>
              <b>{pct(r.confidence)}</b>
            </span>
            <span>
              <small>{sim.stats.uplift}</small>
              <b>{r.uplift === null ? "–" : `${r.uplift > 0 ? "+" : ""}${pct(r.uplift)}`}</b>
            </span>
          </div>

          <div className={`${styles.glass} ${styles.changes}`}>
            <p className={styles.label}>{sim.changesTitle}</p>
            <ol className={styles.changeList} onMouseLeave={() => setChange(null)}>
              {sim.changes.map((c, i) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={styles.change}
                    aria-pressed={change === c.id}
                    onMouseEnter={() => showChange(c.id)}
                    onFocus={() => showChange(c.id)}
                    onClick={() => showChange(change === c.id ? null : c.id)}
                  >
                    <span className={styles.changeNo}>{i + 1}</span>
                    {c.label}
                  </button>
                </li>
              ))}
            </ol>
            <p className={styles.note}>{sim.changesHint}</p>
          </div>
        </div>

        <aside className={`${styles.glass} ${styles.readout}`}>
          <p className={styles.day}>
            <span className={styles.live} aria-hidden="true" />
            {sim.day} <strong>{Math.max(1, Math.ceil(day))}</strong> {sim.of} {days}
          </p>
          <p className={`${styles.status} ${styles[r.status]}`}>{sim.status[r.status]}</p>

          <div className={styles.confidence}>
            <span className={styles.label}>{sim.stats.confidence}</span>
            <span className={styles.big}>{pct(r.confidence)}</span>
          </div>
          <svg
            className={styles.chart}
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            role="img"
            aria-label={`${sim.chart}: ${pct(r.confidence)}`}
          >
            <line
              x1="0"
              x2={CHART_W}
              y1={CHART_H * 0.05}
              y2={CHART_H * 0.05}
              className={styles.target}
            />
            <line
              x1={(MIN_DAYS / days) * CHART_W}
              x2={(MIN_DAYS / days) * CHART_W}
              y1="0"
              y2={CHART_H}
              className={styles.weekLine}
            />
            <polyline points={chartPoints(day, traffic)} className={styles.line} />
          </svg>
          <p className={styles.note}>{sim.stats.confidenceNote}</p>

          <dl className={styles.rows}>
            {rows.map(([label, value]) => (
              <div key={label} className={styles.row}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className={`${styles.glass} ${styles.controls}`}>
          <div className={styles.timeline}>
            <button
              type="button"
              className={styles.play}
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? sim.pause : sim.play}
              data-cta={playing ? "Pause simulation" : "Play simulation"}
              data-cta-loc="AB Simulator"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className={styles.track}>
              <span className={styles.label}>{sim.timeline}</span>
              <input
                type="range"
                min="0"
                max={days}
                step="0.1"
                value={day}
                onChange={(e) => scrub(e.target.value)}
                aria-label={sim.timeline}
                aria-valuetext={`${sim.day} ${Math.max(1, Math.ceil(day))} ${sim.of} ${days}`}
                className={styles.range}
                style={{ "--progress": `${(day / days) * 100}%` }}
              />
              <span className={styles.week} style={{ left: `${(MIN_DAYS / days) * 100}%` }}>
                {sim.week}
              </span>
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.label}>{sim.traffic}</span>
            <div className={styles.chips}>
              {sim.trafficOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={styles.chip}
                  aria-pressed={traffic === t}
                  onClick={() => changeTraffic(t)}
                >
                  {compact(t)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.label}>{sim.camera}</span>
            <div className={styles.chips}>
              {sim.views.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={styles.chip}
                  aria-pressed={view === v.id}
                  disabled={!ready}
                  onClick={() => changeView(v.id)}
                >
                  {v.label}
                </button>
              ))}
              <button
                type="button"
                className={styles.chip}
                aria-label={sim.zoomIn}
                disabled={!ready}
                onClick={() => sceneRef.current?.zoom(0.85)}
              >
                <Plus size={14} />
              </button>
              <button
                type="button"
                className={styles.chip}
                aria-label={sim.zoomOut}
                disabled={!ready}
                onClick={() => sceneRef.current?.zoom(1.18)}
              >
                <Minus size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={`container ${styles.footer}`}>
        <p className={styles.disclaimer}>{sim.disclaimer}</p>
        <div className={styles.ctaBox}>
          <div>
            <h2 className={styles.ctaTitle}>{sim.ctaTitle}</h2>
            <p className={styles.ctaText}>{sim.ctaText}</p>
          </div>
          <a
            className={styles.cta}
            href={sim.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={sim.cta.label}
            data-cta-loc="AB Simulator"
          >
            {sim.cta.label}
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  );
};

export default AbSimulator;
