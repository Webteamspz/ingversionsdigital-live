export const SCREEN_W = 980;
export const SCREEN_H = 2048;

const images = {};

export const loadScreens = (srcs) =>
  Promise.all(
    Object.entries(srcs).map(
      ([variant, src]) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            images[variant] = img;
            resolve();
          };
          img.onerror = resolve;
          img.src = src;
        }),
    ),
  );

export const drawScreen = (ctx, variant, region) => {
  ctx.fillStyle = variant === "b" ? "#1e293b" : "#fffdf5";
  ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);
  const img = images[variant];
  if (img) ctx.drawImage(img, 0, 0, SCREEN_W, (img.height * SCREEN_W) / img.width);

  if (!region) return;
  const [x, y, w, h] = region;
  ctx.fillStyle = "rgba(11,15,28,0.6)";
  ctx.beginPath();
  ctx.rect(0, 0, SCREEN_W, SCREEN_H);
  ctx.roundRect(x, y, w, h, 28);
  ctx.fill("evenodd");
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 28);
  ctx.strokeStyle = "#facc15";
  ctx.lineWidth = 10;
  ctx.setLineDash([28, 16]);
  ctx.stroke();
  ctx.setLineDash([]);
};
