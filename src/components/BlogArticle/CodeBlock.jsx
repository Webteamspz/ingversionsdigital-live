import { useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./ArticleDetail.module.css";

function getText(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (node && typeof node === "object" && "props" in node) return getText(node.props?.children);
  return "";
}

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getText(children));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      return;
    }
  };

  return (
    <pre>
      <button
        type="button"
        className={styles["code-copy-btn"]}
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={3} />}
      </button>
      {children}
    </pre>
  );
};

export default CodeBlock;
