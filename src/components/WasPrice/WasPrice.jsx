import { Tag } from "lucide-react";
import { saleTag } from "../../data/occasionsData";
import styles from "./WasPrice.module.css";

// The struck default price and the percent-off tag shown next to a sale price (see planPrice).
const WasPrice = ({ was, percent, className }) =>
  was ? (
    <>
      <s className={`${styles.was} ${className}`} aria-label={`Was ${was}`}>
        {was}
      </s>
      <span className={styles.tag}>
        <Tag size={12} strokeWidth={2.75} aria-hidden="true" />
        {saleTag(percent)}
      </span>
    </>
  ) : null;

export default WasPrice;
