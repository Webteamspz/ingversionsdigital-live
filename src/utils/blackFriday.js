// Black Friday phases on the visitor's own calendar, so the switch happens at local midnight in
// every time zone: counting down before the day, live during it, and gone from the next day on.
export const BLACK_FRIDAY_DAY = [2026, 10, 27]; // year, month (0-based: 10 = November), day

export const blackFridayPhase = (now = new Date(), [y, m, d] = BLACK_FRIDAY_DAY) => {
  const start = new Date(y, m, d); // local midnight
  const end = new Date(y, m, d + 1);
  if (now >= end) return { phase: "over", left: 0 };
  if (now >= start) return { phase: "today", left: 0 };
  return { phase: "before", left: start - now };
};
