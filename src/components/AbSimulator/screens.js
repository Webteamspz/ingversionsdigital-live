// Draws the two product pages shown on the phones. Control is a plain page; the variant adds
// the four tested changes. drawScreen() returns the variant's change regions so the scene can
// light one up when the reader hovers it in the "What changed" list.
export const SCREEN_W = 980;
export const SCREEN_H = 2048;

const FONT = '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif';
const C = {
  ink: "#151824",
  muted: "#6b7280",
  line: "#e5e7eb",
  soft: "#f4f4f5",
  violet: "#7c3aed",
  pink: "#ec4899",
  amber: "#f59e0b",
  green: "#10b981",
};

const rr = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};
const text = (ctx, s, x, y, size, weight = 600, color = C.ink, align = "left") => {
  ctx.font = `${weight} ${size}px ${FONT}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(s, x, y);
};

const bottle = (ctx, cx, top, warm) => {
  // cap
  const cap = ctx.createLinearGradient(cx - 70, 0, cx + 70, 0);
  cap.addColorStop(0, "#2a2a2e");
  cap.addColorStop(0.5, "#55555c");
  cap.addColorStop(1, "#1d1d20");
  ctx.fillStyle = cap;
  rr(ctx, cx - 62, top, 124, 150, 18);
  ctx.fill();
  // dropper neck
  ctx.fillStyle = "#c9c9cf";
  rr(ctx, cx - 40, top + 140, 80, 40, 8);
  ctx.fill();
  // glass body
  const glass = ctx.createLinearGradient(cx - 150, 0, cx + 150, 0);
  glass.addColorStop(0, warm ? "#b45309" : "#7c7c84");
  glass.addColorStop(0.35, warm ? "#f59e0b" : "#b8b8c0");
  glass.addColorStop(0.65, warm ? "#fbbf24" : "#d0d0d6");
  glass.addColorStop(1, warm ? "#92400e" : "#6f6f78");
  ctx.fillStyle = glass;
  rr(ctx, cx - 150, top + 175, 300, 430, 60);
  ctx.fill();
  // label
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  rr(ctx, cx - 110, top + 300, 220, 200, 16);
  ctx.fill();
  text(ctx, "LUMÉ", cx, top + 380, 48, 800, C.ink, "center");
  text(ctx, "GLOW SERUM", cx, top + 430, 22, 700, C.muted, "center");
  text(ctx, "30 ml", cx, top + 470, 20, 600, C.muted, "center");
  // highlight
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  rr(ctx, cx - 120, top + 200, 26, 360, 13);
  ctx.fill();
};

const icon = (ctx, kind, x, y) => {
  ctx.strokeStyle = C.green;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  if (kind === 0) {
    ctx.rect(x - 22, y - 16, 30, 26);
    ctx.moveTo(x + 8, y - 6);
    ctx.lineTo(x + 22, y - 6);
    ctx.lineTo(x + 26, y + 10);
    ctx.lineTo(x + 8, y + 10);
  } else if (kind === 1) {
    ctx.arc(x, y, 20, Math.PI * 0.2, Math.PI * 1.8);
    ctx.moveTo(x + 18, y - 22);
    ctx.lineTo(x + 18, y - 8);
    ctx.lineTo(x + 4, y - 8);
  } else {
    ctx.rect(x - 18, y - 4, 36, 26);
    ctx.moveTo(x - 11, y - 4);
    ctx.arc(x, y - 6, 11, Math.PI, 0);
  }
  ctx.stroke();
};

export const drawScreen = (ctx, variant, t, highlight) => {
  const W = SCREEN_W;
  const isB = variant === "b";
  const regions = {};
  ctx.clearRect(0, 0, W, SCREEN_H);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, SCREEN_H);

  // status bar + header
  text(ctx, "9:41", 60, 58, 30, 700);
  ctx.fillStyle = C.ink;
  rr(ctx, W - 120, 36, 60, 26, 7);
  ctx.fill();
  let y = 90;
  if (isB) {
    ctx.fillStyle = C.ink;
    ctx.fillRect(0, y, W, 64);
    text(ctx, t.announce, W / 2, y + 42, 24, 700, "#ffffff", "center");
    y += 64;
  }
  ctx.fillStyle = C.ink;
  [0, 14, 28].forEach((d) => ctx.fillRect(56, y + 42 + d, 44, 6));
  text(ctx, t.store, W / 2, y + 70, 46, 800, C.ink, "center");
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 5;
  rr(ctx, W - 104, y + 36, 46, 44, 8);
  ctx.stroke();
  y += 120;
  ctx.fillStyle = C.line;
  ctx.fillRect(0, y, W, 3);
  y += 30;

  // product image
  const imgH = 760;
  if (isB) {
    const g = ctx.createLinearGradient(0, y, W, y + imgH);
    g.addColorStop(0, "#fff1e6");
    g.addColorStop(1, "#fde2f3");
    ctx.fillStyle = g;
  } else ctx.fillStyle = C.soft;
  rr(ctx, 40, y, W - 80, imgH, 36);
  ctx.fill();
  bottle(ctx, W / 2, y + 70, isB);
  if (isB) {
    ctx.fillStyle = C.ink;
    rr(ctx, 76, y + 36, 250, 60, 30);
    ctx.fill();
    text(ctx, t.bestseller, 201, y + 76, 24, 800, "#ffffff", "center");
  }
  // gallery dots
  [0, 1, 2, 3].forEach((i) => {
    ctx.fillStyle = i === 0 ? C.ink : "#d4d4d8";
    ctx.beginPath();
    ctx.arc(W / 2 - 45 + i * 30, y + imgH + 34, 8, 0, Math.PI * 2);
    ctx.fill();
  });
  y += imgH + 90;

  // title, reviews, price
  text(ctx, t.product, 60, y + 10, 62, 800);
  y += 40;
  if (isB) {
    const top = y;
    text(ctx, "★★★★★", 60, y + 52, 44, 400, C.amber);
    text(ctx, t.reviews, 300, y + 48, 30, 600, C.muted);
    y += 76;
    regions.reviews = [40, top, W - 80, y - top];
  }
  text(ctx, t.price, 60, y + 70, 56, 800);
  if (isB) text(ctx, t.installments, 330, y + 66, 28, 600, C.muted);
  y += 110;

  if (isB) {
    // bundle selector
    const top = y;
    t.bundle.forEach(([name, price], i) => {
      const x = 60 + i * ((W - 140) / 2 + 20);
      const w = (W - 140) / 2;
      ctx.fillStyle = i === 1 ? "#f5f0ff" : "#ffffff";
      rr(ctx, x, y, w, 150, 22);
      ctx.fill();
      ctx.strokeStyle = i === 1 ? C.violet : C.line;
      ctx.lineWidth = i === 1 ? 6 : 3;
      ctx.stroke();
      text(ctx, name, x + 30, y + 62, 32, 700);
      text(ctx, price, x + 30, y + 112, 26, 700, i === 1 ? C.violet : C.muted);
    });
    y += 180;
    regions.bundle = [40, top - 20, W - 80, y - top + 10];

    // the big CTA
    const ctaTop = y;
    const g = ctx.createLinearGradient(60, 0, W - 60, 0);
    g.addColorStop(0, C.violet);
    g.addColorStop(1, C.pink);
    ctx.shadowColor = "rgba(124,58,237,0.45)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 14;
    ctx.fillStyle = g;
    rr(ctx, 60, y, W - 120, 140, 70);
    ctx.fill();
    ctx.shadowColor = "transparent";
    text(ctx, t.ctaB, W / 2, y + 86, 40, 800, "#ffffff", "center");
    y += 180;
    regions.cta = [40, ctaTop - 20, W - 80, 180];

    // trust badges
    const trustTop = y;
    const colW = (W - 120) / 3;
    t.trust.forEach((label, i) => {
      const cx = 60 + colW * i + colW / 2;
      ctx.fillStyle = "#ecfdf5";
      ctx.beginPath();
      ctx.arc(cx, y + 50, 46, 0, Math.PI * 2);
      ctx.fill();
      icon(ctx, i, cx, y + 50);
      text(ctx, label, cx, y + 140, 24, 700, C.ink, "center");
    });
    y += 170;
    regions.trust = [40, trustTop - 10, W - 80, y - trustTop + 10];
  } else {
    // control: a small outline button lost in a wall of text
    ctx.fillStyle = "#e4e4e7";
    [0, 1, 2, 3, 4, 5].forEach((i) => {
      rr(ctx, 60, y + i * 44, W - 120 - (i % 3) * 120, 20, 10);
      ctx.fill();
    });
    y += 300;
    ctx.strokeStyle = "#a1a1aa";
    ctx.lineWidth = 4;
    rr(ctx, 60, y, W - 120, 104, 14);
    ctx.stroke();
    text(ctx, t.ctaA, W / 2, y + 66, 36, 600, "#71717a", "center");
    y += 150;
    [0, 1, 2, 3].forEach((i) => {
      rr(ctx, 60, y + i * 44, W - 120 - (i % 2) * 200, 20, 10);
      ctx.fill();
    });
  }

  if (isB && highlight && regions[highlight]) {
    const [x, ry, w, h] = regions[highlight];
    // dim everything except the highlighted change
    ctx.fillStyle = "rgba(11,15,28,0.55)";
    ctx.beginPath();
    ctx.rect(0, 0, W, SCREEN_H);
    ctx.roundRect(x, ry, w, h, 28);
    ctx.fill("evenodd");
    rr(ctx, x, ry, w, h, 28);
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 10;
    ctx.setLineDash([28, 16]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  return regions;
};
