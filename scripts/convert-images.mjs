import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import path from "path";

const ROOT = "d:/Desktop/ingversionsdigital-live/public/assets";
const EXCLUDE_DIRS = new Set(["logos"]);
const TEAM_MAX_WIDTH = 800;
const DEFAULT_MAX_WIDTH = 1600;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    if (e.isDirectory()) {
      if (EXCLUDE_DIRS.has(e.name)) continue;
      files = files.concat(await walk(path.join(dir, e.name)));
    } else if (/\.(png|jpe?g)$/i.test(e.name)) {
      files.push(path.join(dir, e.name));
    }
  }
  return files;
}

const files = await walk(ROOT);
let totalBefore = 0;
let totalAfter = 0;
const report = [];

for (const file of files) {
  const before = (await stat(file)).size;
  const isTeam = file.replace(/\\/g, "/").includes("/team/");
  const maxWidth = isTeam ? TEAM_MAX_WIDTH : DEFAULT_MAX_WIDTH;
  const outFile = file.replace(/\.(png|jpe?g)$/i, ".webp");

  const img = sharp(file);
  const meta = await img.metadata();
  let pipeline = img;
  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth });
  }
  await pipeline.webp({ quality: 82 }).toFile(outFile);

  const after = (await stat(outFile)).size;
  totalBefore += before;
  totalAfter += after;
  report.push({
    file: path.relative(ROOT, file).replace(/\\/g, "/"),
    beforeKB: Math.round(before / 1024),
    afterKB: Math.round(after / 1024),
    resized: meta.width && meta.width > maxWidth,
  });

  await unlink(file);
}

report.sort((a, b) => b.beforeKB - a.beforeKB);
for (const r of report) {
  console.log(`${r.file}\t${r.beforeKB}KB -> ${r.afterKB}KB${r.resized ? " (resized)" : ""}`);
}
console.log("----");
console.log(`TOTAL: ${Math.round(totalBefore / 1024)}KB -> ${Math.round(totalAfter / 1024)}KB (${files.length} files)`);
