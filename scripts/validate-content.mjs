import fs from "fs";
import path from "path";

const projectRoot = path.resolve(".");
const dataDir = path.join(projectRoot, "data");
const publicDir = path.join(projectRoot, "public");

const jsonFiles = [
  "site.json",
  "home.json",
  "portfolio.json",
  "wardrobe.json",
  "services.json",
  "pricing.json",
  "blog.json",
  "info.json"
];

console.log("=== Content Validation Starting ===");

let hasError = false;
function logError(msg) {
  console.error("❌ " + msg);
  hasError = true;
}

// 1. Load files
const contents = {};
for (const file of jsonFiles) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    logError(`File not found: ${file}`);
    continue;
  }
  try {
    contents[file] = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    logError(`Failed to parse ${file}: ${e.message}`);
  }
}

if (hasError) {
  process.exit(1);
}

// 2. Validate Slugs Unique & Gallery completeness
const blogSlugs = new Set();
const albumSlugs = new Set();

const posts = contents["blog.json"].posts || [];
for (const post of posts) {
  if (!post.slug) {
    logError("Blog post is missing slug");
  } else if (blogSlugs.has(post.slug)) {
    logError(`Duplicate blog slug: ${post.slug}`);
  } else {
    blogSlugs.add(post.slug);
  }
}

const albums = contents["portfolio.json"].albumDetails || [];
const albumItems = contents["portfolio.json"].albumItems || [];

for (const item of albumItems) {
  if (!item.slug) {
    logError("Album item is missing slug");
  } else if (albumSlugs.has(item.slug)) {
    logError(`Duplicate album slug in items: ${item.slug}`);
  } else {
    albumSlugs.add(item.slug);
  }
}

for (const album of albums) {
  if (!album.slug) {
    logError("Album detail is missing slug");
  } else if (!albumSlugs.has(album.slug)) {
    logError(`Album detail slug ${album.slug} is not present in albumItems`);
  }
  if (!album.gallery || album.gallery.length === 0) {
    logError(`Album gallery for ${album.slug} is empty or missing`);
  }
}

// 3. Scan JSON values recursively to find image paths & internal urls
const imagePaths = [];
const internalLinks = [];

function findValues(obj) {
  if (typeof obj === "string") {
    if (obj.startsWith("/images/")) {
      imagePaths.push(obj);
    } else if (obj.startsWith("/") && !obj.startsWith("//")) {
      internalLinks.push(obj);
    }
    // Check for markdown style links [text](url)
    const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    while ((match = mdLinkRegex.exec(obj)) !== null) {
      const url = match[2];
      if (url.startsWith("/images/")) {
        imagePaths.push(url);
      } else if (url.startsWith("/") && !url.startsWith("//")) {
        internalLinks.push(url);
      }
    }
  } else if (Array.isArray(obj)) {
    for (const val of obj) {
      findValues(val);
    }
  } else if (obj && typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      findValues(obj[key]);
    }
  }
}

findValues(contents);

// 4. Validate image file existence
console.log(`Verifying ${imagePaths.length} image references...`);
const uniqueImagePaths = [...new Set(imagePaths)];
let missingImagesCount = 0;
for (const img of uniqueImagePaths) {
  const cleanPath = img.split("?")[0];
  const diskPath = path.join(publicDir, cleanPath);
  if (!fs.existsSync(diskPath)) {
    logError(`Image referenced in JSON does not exist on disk: ${img}`);
    missingImagesCount++;
  }
}

// 5. Validate internal urls are valid targets
console.log(`Verifying ${internalLinks.length} internal links...`);
const validFixedRoutes = new Set([
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/pricing",
  "/blog",
  "/mau-do",
  "/contact",
  "/chinh-sach-bao-mat",
  "/uu-dai/tang-standee-anh-cuoi"
]);

for (const link of internalLinks) {
  const cleanLink = link.split("?")[0].split("#")[0];
  if (!cleanLink) continue;

  if (validFixedRoutes.has(cleanLink)) {
    continue;
  }
  // check portfolio dynamic slugs
  if (cleanLink.startsWith("/portfolio/")) {
    const slug = cleanLink.substring("/portfolio/".length);
    if (!albumSlugs.has(slug)) {
      logError(`Broken link to album: ${link}`);
    }
  }
  // check blog dynamic slugs
  else if (cleanLink.startsWith("/blog/")) {
    const slug = cleanLink.substring("/blog/".length);
    if (!blogSlugs.has(slug)) {
      logError(`Broken link to blog post: ${link}`);
    }
  } else {
    logError(`Invalid or unrecognized internal link: ${link}`);
  }
}

if (hasError) {
  console.error("❌ Content validation FAILED.");
  process.exit(1);
} else {
  console.log("✅ All JSON schemas, unique slugs, image assets, and internal links verified successfully!");
}
