import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { getDatabasePath } from "../lib/db-path";
import { UPLOAD_DIR } from "../lib/constants";

async function cleanupUploads() {
  const dbPath = getDatabasePath();
  const db = new Database(dbPath);

  const referencedPaths = new Set<string>();

  // Helper to safely add strings
  const addPath = (val: string | null | undefined) => {
    if (val && typeof val === "string") {
      referencedPaths.add(val);
    }
  };

  // Helper to safely parse JSON arrays of strings
  const addJsonPaths = (jsonStr: string | null | undefined) => {
    if (!jsonStr) return;
    try {
      const arr = JSON.parse(jsonStr);
      if (Array.isArray(arr)) {
        for (const item of arr) {
          if (typeof item === "string") {
            referencedPaths.add(item);
          }
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  };

  // 1. portfolios
  const portfolios = db
    .prepare("SELECT cover_image, images FROM portfolios")
    .all() as any[];
  for (const p of portfolios) {
    addPath(p.cover_image);
    addJsonPaths(p.images);
  }

  // 2. post_productions
  const postProductions = db
    .prepare("SELECT poster_image FROM post_productions")
    .all() as any[];
  for (const p of postProductions) {
    addPath(p.poster_image);
  }

  // 3. gallery_items
  const galleryItems = db
    .prepare("SELECT src FROM gallery_items")
    .all() as any[];
  for (const g of galleryItems) {
    addPath(g.src);
  }

  // 4. studios
  const studios = db.prepare("SELECT images FROM studios").all() as any[];
  for (const s of studios) {
    addJsonPaths(s.images);
  }

  // 5. services
  const services = db
    .prepare("SELECT hero_image, demo_images FROM services")
    .all() as any[];
  for (const s of services) {
    addPath(s.hero_image);
    addJsonPaths(s.demo_images);
  }

  // 6. posts
  const posts = db.prepare("SELECT cover_image FROM posts").all() as any[];
  for (const p of posts) {
    addPath(p.cover_image);
  }

  // 7. testimonials
  const testimonials = db
    .prepare("SELECT avatar FROM testimonials")
    .all() as any[];
  for (const t of testimonials) {
    addPath(t.avatar);
  }

  // 8. hero_slides
  const heroSlides = db.prepare("SELECT src FROM hero_slides").all() as any[];
  for (const h of heroSlides) {
    addPath(h.src);
  }

  console.log(
    `Found ${referencedPaths.size} unique file references in database.`,
  );

  const absUploadDir = path.isAbsolute(UPLOAD_DIR)
    ? UPLOAD_DIR
    : path.join(process.cwd(), UPLOAD_DIR);

  if (!existsSync(absUploadDir)) {
    console.log(
      `Upload directory ${absUploadDir} does not exist. Nothing to clean.`,
    );
    return;
  }

  // Recursively read all files in the upload directory
  async function getFiles(dir: string): Promise<string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : [res];
      }),
    );
    return files.flat();
  }

  console.log(`Scanning directory: ${absUploadDir}`);
  const allFiles = await getFiles(absUploadDir);
  console.log(`Found ${allFiles.length} files in upload directory.`);

  let deletedCount = 0;
  let skippedCount = 0;

  for (const fileAbsPath of allFiles) {
    // Determine the path as it would appear in the database
    // e.g., /var/lib/wedding/uploads/portfolio/123.webp -> /uploads/portfolio/123.webp
    const relativeToUploads = path.relative(absUploadDir, fileAbsPath);
    // Convert to forward slashes just in case we are on Windows (though the app runs on Linux)
    const normalizedRelative = relativeToUploads.split(path.sep).join("/");
    const dbPathFormat = `/uploads/${normalizedRelative}`;

    if (!referencedPaths.has(dbPathFormat)) {
      console.log(`Deleting unreferenced file: ${dbPathFormat}`);
      try {
        await fs.unlink(fileAbsPath);
        deletedCount++;
      } catch (err) {
        console.error(`Failed to delete ${fileAbsPath}:`, err);
      }
    } else {
      skippedCount++;
    }
  }

  // Remove empty directories
  async function removeEmptyDirectories(dir: string) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
      if (dirent.isDirectory()) {
        const fullPath = path.join(dir, dirent.name);
        await removeEmptyDirectories(fullPath);
        const filesAfter = await fs.readdir(fullPath);
        if (filesAfter.length === 0) {
          await fs.rmdir(fullPath);
          console.log(`Removed empty directory: ${fullPath}`);
        }
      }
    }
  }

  await removeEmptyDirectories(absUploadDir);

  console.log(`\nCleanup complete!`);
  console.log(`- Kept files: ${skippedCount}`);
  console.log(`- Deleted files: ${deletedCount}`);
}

cleanupUploads().catch((err) => {
  console.error("Error during cleanup:", err);
  process.exit(1);
});
