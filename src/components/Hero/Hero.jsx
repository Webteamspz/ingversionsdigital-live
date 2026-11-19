import { useEffect, useRef, useState } from "react";
import data from "../../data/siteData";
import CompanyLogos from "../CompanyLogos/CompanyLogos";
import HeroA from "./HeroA";
import HeroCopy from "./HeroCopy";
import styles from "./Hero.module.css";

const { compare } = data.hero;

const START = 3;
const START_PX = 18;
const PEEK_TO = 70;
const STEP = 5;
const GAP = 3;
const limit = (v) => Math.min(100 - GAP, Math.max(GAP, v));

const Hero = () => {
  const [pos, setPos] = useState(START);
  const [ready, setReady] = useState(false);
  const [moved, setMoved] = useState(false);
  const stageRef = useRef(null);
  const dragging = useRef(false);
  const touched = useRef(false);

  useEffect(() => {
    const width = stageRef.current.getBoundingClientRect().width;
    const start = limit((Math.max(START_PX, (width * START) / 100) / width) * 100);
    setPos(start);
    setReady(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame;
    const begin = performance.now() + 900;
    const duration = 2400;
    const tick = (now) => {
      if (touched.current) return;
      const t = (now - begin) / duration;
      if (t >= 1) {
        setPos(start);
        return;
      }
      if (t > 0) setPos(start + (PEEK_TO - start) * Math.sin(Math.PI * t));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const moveTo = (clientX) => {
    const rect = stageRef.current.getBoundingClientRect();
    setPos(limit(((clientX - rect.left) / rect.width) * 100));
  };

  const onPointerDown = (e) => {
    touched.current = true;
    setMoved(true);
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e) => {
    if (dragging.current) moveTo(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const onKeyDown = (e) => {
    const next = {
      ArrowLeft: (p) => p - STEP,
      ArrowDown: (p) => p - STEP,
      ArrowRight: (p) => p + STEP,
      ArrowUp: (p) => p + STEP,
      Home: () => GAP,
      End: () => 100 - GAP,
    }[e.key];
    if (!next) return;
    e.preventDefault();
    touched.current = true;
    setMoved(true);
    setPos((p) => limit(next(p)));
  };

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-heading">
      <div
        ref={stageRef}
        className={`${styles.stage} ${ready ? styles.compare : ""}`}
        style={{ "--pos": `${pos}%` }}
      >
        {ready && <HeroA />}

        <div className={styles.layerB}>
          <div className="container">
            <div className={styles.inner}>
              <HeroCopy />
            </div>
          </div>
        </div>

        {ready && (
          <>
            <span className={`${styles.ver} ${styles.verA}`} aria-hidden="true">
              {compare.labelA}
            </span>
            <span className={`${styles.ver} ${styles.verB}`} aria-hidden="true">
              {compare.labelB}
            </span>
            <div className={styles.divider}>
              <div
                className={`${styles.handle} ${moved ? "" : styles.pulse}`}
                role="slider"
                tabIndex={0}
                aria-label={compare.handleLabel}
                aria-valuemin={GAP}
                aria-valuemax={100 - GAP}
                aria-valuenow={Math.round(pos)}
                aria-valuetext={`${Math.round(pos)}% of version A shown`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onKeyDown={onKeyDown}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 6l-6 6 6 6M15 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.logoArea}>
        <CompanyLogos />
      </div>
    </section>
  );
};

export default Hero;
