import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import sharp from "sharp";

const DIR = "public/assets/blog/covers";
const OUT = `${DIR}/thumbs`;

await mkdir(OUT, { recursive: true });
let made = 0;
for (const name of await readdir(DIR)) {
  if (!name.endsWith(".webp") || existsSync(`${OUT}/${name}`)) continue;
  const buf = await sharp(await readFile(`${DIR}/${name}`))
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toBuffer();
  await writeFile(`${OUT}/${name}`, buf);
  made++;
}
console.log(`blog thumbnails: ${made} created`);
