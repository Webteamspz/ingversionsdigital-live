import { useEffect, useId, useState } from "react";
import articleStyles from "./ArticleDetail.module.css";

// mermaid is large, so it is only downloaded the first time a post actually
// contains a non-linear diagram (linear flows render as a step list below).
let mermaidReady;
const loadMermaid = () => {
  mermaidReady ??= import("mermaid").then(({ default: mermaid }) => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "strict",
      themeVariables: {
        background: "#ffffff",
        primaryColor: "#a78bfa",
        primaryTextColor: "#1e293b",
        primaryBorderColor: "#1e293b",
        lineColor: "#1e293b",
        secondaryColor: "#f472b6",
        tertiaryColor: "#fbbf24",
        fontFamily: "var(--font-plus-jakarta), sans-serif",
      },
    });
    return mermaid;
  });
  return mermaidReady;
};

// A graph/flowchart where no node has more than one edge in or out is drawn as
// a numbered step list. Returns the step labels, or null for anything else.
function parseFlowSteps(src) {
  const lines = src.split(/\r?\n/).map((l) => l.trim());
  if (!/^(graph|flowchart)\s/i.test(lines[0] || "")) return null;

  const labels = new Map();
  const order = [];
  const outDeg = new Map();
  const inDeg = new Map();

  const addNode = (raw) => {
    const token = raw.trim().replace(/^\|[^|]*\|/, "").trim();
    if (!token) return null;
    const shaped = token.match(/^([\w.-]+)\s*[[({]+\s*"?(.*?)"?\s*[\])}]+\s*$/);
    const bare = token.match(/^([\w.-]+)$/);
    const id = shaped ? shaped[1] : bare ? bare[1] : null;
    if (!id) return null;
    const label = shaped ? shaped[2].replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim() : "";
    if (!labels.has(id)) {
      labels.set(id, label || id);
      order.push(id);
    } else if (label && labels.get(id) === id) {
      labels.set(id, label);
    }
    return id;
  };

  for (const line of lines) {
    if (
      !line ||
      line.startsWith("%%") ||
      /^(graph|flowchart|subgraph|end|style|classDef|class|linkStyle|direction)\b/i.test(line)
    )
      continue;
    if (!/--+>?|==+>?|-\.-+>?/.test(line)) continue;
    const parts = line.split(/\s*(?:--+>?|==+>?|-\.-+>?)\s*/).filter(Boolean);
    if (parts.length < 2) continue;
    const ids = parts.map(addNode);
    for (let i = 0; i < ids.length - 1; i++) {
      const from = ids[i];
      const to = ids[i + 1];
      if (!from || !to) continue;
      outDeg.set(from, (outDeg.get(from) ?? 0) + 1);
      inDeg.set(to, (inDeg.get(to) ?? 0) + 1);
    }
  }

  for (const d of outDeg.values()) if (d > 1) return null;
  for (const d of inDeg.values()) if (d > 1) return null;

  const steps = order.map((id) => labels.get(id) || id);
  return steps.length >= 2 ? steps : null;
}

const FlowSteps = ({ steps }) => (
  <ol className={articleStyles["flow-steps"]}>
    {steps.map((label, i) => (
      <li key={i} className={articleStyles["flow-steps-item"]}>
        <div className={articleStyles["flow-steps-card"]}>{label}</div>
      </li>
    ))}
  </ol>
);

const Mermaid = ({ chart }) => {
  const id = `mermaid-${useId().replace(/:/g, "")}`;
  const [svg, setSvg] = useState("");

  const flowSteps = parseFlowSteps(chart);
  const isFlow = flowSteps !== null;

  useEffect(() => {
    if (isFlow || !chart) return;
    let isMounted = true;
    loadMermaid()
      .then((mermaid) => mermaid.render(id, chart))
      .then(({ svg: generatedSvg }) => {
        if (isMounted) setSvg(generatedSvg);
      })
      .catch((error) => console.error("Mermaid parsing failed:", error));
    return () => {
      isMounted = false;
    };
  }, [chart, id, isFlow]);

  if (isFlow) return <FlowSteps steps={flowSteps} />;

  if (!svg) {
    return <div className={articleStyles["mermaid-loading"]}>Rendering diagram...</div>;
  }

  return (
    <div
      className={articleStyles["mermaid-diagram-container"]}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default Mermaid;
