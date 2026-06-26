import { readFileSync, writeFileSync } from "fs";
import { readdir, stat, rename } from "fs/promises";
import { join, extname, resolve } from "path";
import sharp from "sharp";

const WEDDING_DIR = resolve("public/images/wedding");
const QUALITY = 90;

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function main() {
  let converted = 0;
  let skipped = 0;
  let errors = 0;
  const dirs = new Set();

  for await (const filePath of walk(WEDDING_DIR)) {
    const ext = extname(filePath).toLowerCase();
    if (![".jpg", ".jpeg"].includes(ext)) continue;

    const webpPath = filePath.replace(/\.jpe?g$/i, ".webp");

    try {
      await stat(webpPath);
      skipped++;
      continue;
    } catch {
      // .webp doesn't exist yet, proceed
    }

    try {
      const { size: fileSize } = await stat(filePath);
      const buffer = readFileSync(filePath);
      const webpBuffer = await sharp(buffer).webp({ quality: QUALITY }).toBuffer();

      writeFileSync(webpPath, webpBuffer);

      const savedPercent = ((1 - webpBuffer.length / fileSize) * 100).toFixed(1);
      console.log(
        `[${++converted}] ${QUALITY}% ${filePath.replace(WEDDING_DIR, "")}  (${(fileSize / 1024 / 1024).toFixed(1)}MB → ${(webpBuffer.length / 1024 / 1024).toFixed(1)}MB, -${savedPercent}%)`,
      );
      dirs.add(filePath);
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err.message);
      errors++;
    }
  }

  console.log(`\nDone. Converted: ${converted}, Skipped: ${skipped}, Errors: ${errors}`);
}

main();
