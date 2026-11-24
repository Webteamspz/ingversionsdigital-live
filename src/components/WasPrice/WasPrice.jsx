import { useEffect, useState } from "react";
import { blackFridayDeal } from "../../data/pricingData";
import { blackFridayPhase } from "../../utils/blackFriday";

// Black Friday "was" price: shown through 27 Nov, hidden from 28 Nov (visitor's local date).
// Starts visible so it matches the prerendered HTML, then hides after mount once the day is over.
const WasPrice = ({ was, className, tagClassName }) => {
  const [live, setLive] = useState(true);
  useEffect(() => setLive(blackFridayPhase().phase !== "over"), []);
  if (!was || !live) return null;
  return (
    <>
      <s className={className} aria-label={`Was ${was}`}>
        {was}
      </s>
      <span className={tagClassName}>{blackFridayDeal.tag}</span>
    </>
  );
};

export default WasPrice;
