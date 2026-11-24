import { useEffect, useState } from "react";
import { currentOccasion } from "../utils/occasions";

// Id of the running sale occasion, or null on a normal day. Null on the first render so it matches
// the prerendered HTML (default prices), then follows the visitor's clock, re-checked every second.
export default function useOccasion() {
  const [id, setId] = useState(null);
  useEffect(() => {
    const tick = () => setId(currentOccasion()?.id ?? null);
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return id;
}
