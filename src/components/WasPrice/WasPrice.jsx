import { useEffect, useState } from "react";
import { blackFridayDeal } from "../../data/pricingData";
import { blackFridayPhase } from "../../utils/blackFriday";
import styles from "./WasPrice.module.css";

const amount = (v) => Number(String(v).replace(/[^0-9.]/g, ""));

// Black Friday "was" price: shown through 27 Nov, hidden from 28 Nov (visitor's local date).
// Starts visible so it matches the prerendered HTML, then hides after mount once the day is over.
const WasPrice = ({ was, price, className, compact }) => {
  const [live, setLive] = useState(true);
  useEffect(() => setLive(blackFridayPhase().phase !== "over"), []);
  if (!was || !live) return null;
  const save = amount(was) - amount(price);
  return (
    <>
      <s className={`${styles.was} ${className}`} aria-label={`Was ${was}`}>
        {was}
      </s>
      <span className={styles.tag}>
        <span className={styles.off}>
          {compact ? blackFridayDeal.offShort : blackFridayDeal.off}
        </span>
        {save > 0 && (
          <span className={styles.save}>
            {blackFridayDeal.save} ${save.toLocaleString("en-US")}
          </span>
        )}
      </span>
    </>
  );
};

export default WasPrice;
