import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const projectRoot = path.resolve(".");
const portfolioPath = path.join(projectRoot, "data", "portfolio.json");
const publicDir = path.join(projectRoot, "public");

console.log("=== Portfolio Data & Dimension Update Starting ===");

if (!fs.existsSync(portfolioPath)) {
  console.error(`❌ Portfolio JSON not found: ${portfolioPath}`);
  process.exit(1);
}

// Load current data
const data = JSON.parse(fs.readFileSync(portfolioPath, "utf8"));

// 1. Define moved images details for Vũ Garden 2
const movedNumbers = [2, 3, 8, 10, 12, 16, 20, 22, 26, 27, 29, 31];
const movedNumbersSet = new Set(movedNumbers);

// 2. Find and update An Garden details
const anGardenDetail = data.albumDetails.find(album => album.slug === "an-garden");
if (!anGardenDetail) {
  console.error("❌ An Garden details not found in portfolio.json");
  process.exit(1);
}

const originalAnGardenGallery = anGardenDetail.gallery;
const remainingAnGardenGallery = [];
const movedToVuGarden2Gallery = [];

for (const item of originalAnGardenGallery) {
  const match = item.image.match(/\/(\d+)\.webp$/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (movedNumbersSet.has(num)) {
      const newItem = {
        image: `/images/wedding/vu-garden-2/${num}.webp`,
        alt: `Album ảnh cưới Vũ Garden 2 - Ảnh ${num}`,
        featured: num === 2
      };
      movedToVuGarden2Gallery.push(newItem);
      continue;
    }
  }
  remainingAnGardenGallery.push(item);
}

remainingAnGardenGallery.forEach((item, index) => {
  item.featured = (index === 0);
});

anGardenDetail.gallery = remainingAnGardenGallery;
anGardenDetail.imageCount = `${remainingAnGardenGallery.length} ảnh`;
console.log(`Updated An Garden album. Remaining images: ${remainingAnGardenGallery.length}`);

// 3. Create Vũ Garden 2 detail block
const vuGardenDetail = data.albumDetails.find(album => album.slug === "vu-garden");
if (!vuGardenDetail) {
  console.error("❌ Vũ Garden details not found in portfolio.json");
  process.exit(1);
}

movedToVuGarden2Gallery.sort((a, b) => {
  const numA = parseInt(a.image.match(/\/(\d+)\.webp$/)[1], 10);
  const numB = parseInt(b.image.match(/\/(\d+)\.webp$/)[1], 10);
  return numA - numB;
});

const vuGarden2Detail = {
  slug: "vu-garden-2",
  eyebrow: "Vũ Garden",
  title: "Vũ Garden - Bộ 2",
  scriptTitle: "Tình Yêu",
  description: "Bộ ảnh cưới Vũ Garden - Bộ 2 được thực hiện bởi đội ngũ Harmony Wedding, lưu giữ trọn vẹn những cảm xúc tự nhiên của dâu rể.",
  imageCount: `${movedToVuGarden2Gallery.length} ảnh`,
  location: "Vũ Garden",
  heroImage: "/images/wedding/vu-garden-2/2.webp",
  heroAlt: "Album ảnh cưới Vũ Garden 2 - Harmony Wedding",
  gallery: movedToVuGarden2Gallery,
  info: [
    {
      title: "Địa điểm",
      description: "Vũ Garden",
      icon: "location"
    },
    {
      title: "Phong cách",
      description: "Vũ Garden",
      icon: "heart"
    }
  ]
};

const vuGardenIndex = data.albumDetails.findIndex(album => album.slug === "vu-garden");
if (data.albumDetails.some(album => album.slug === "vu-garden-2")) {
  console.log("Vũ Garden 2 detail already exists.");
} else {
  data.albumDetails.splice(vuGardenIndex + 1, 0, vuGarden2Detail);
  console.log("Inserted Vũ Garden 2 details.");
}

const vuGardenItem = data.albumItems.find(item => item.slug === "vu-garden");
const vuGarden2Item = {
  slug: "vu-garden-2",
  title: "Vũ Garden - Bộ 2",
  category: "Vũ Garden",
  location: "Vũ Garden",
  image: "/images/wedding/vu-garden-2/2.webp",
  alt: "Album ảnh cưới Vũ Garden 2 - Harmony Wedding"
};

const vuGardenItemIndex = data.albumItems.findIndex(item => item.slug === "vu-garden");
if (data.albumItems.some(item => item.slug === "vu-garden-2")) {
  console.log("Vũ Garden 2 item already exists in albumItems.");
} else {
  data.albumItems.splice(vuGardenItemIndex + 1, 0, vuGarden2Item);
  console.log("Inserted Vũ Garden 2 item.");
}

// 4. Create structure for "Ngày Cưới" Album
console.log("Processing Ngày Cưới album structure...");

// Add "Ngày Cưới" filter
if (!data.albumFilters.includes("Ngày Cưới")) {
  // Let's insert in alphabetical-like order (e.g. after Studio)
  const studioIdx = data.albumFilters.indexOf("Studio");
  if (studioIdx !== -1) {
    data.albumFilters.splice(studioIdx + 1, 0, "Ngày Cưới");
  } else {
    data.albumFilters.push("Ngày Cưới");
  }
  console.log("Added 'Ngày Cưới' to albumFilters.");
} else {
  console.log("'Ngày Cưới' already in albumFilters.");
}

// Add "Ngày Cưới" item in albumItems
const existingNgayCuoiItem = data.albumItems.find(item => item.slug === "ngay-cuoi");
if (!existingNgayCuoiItem) {
  const ngayCuoiItem = {
    slug: "ngay-cuoi",
    title: "Ngày Cưới",
    category: "Ngày Cưới",
    location: "Ngày Cưới",
    image: "/images/wedding/ngay-cuoi/1.webp",
    alt: "Album ảnh phóng sự ngày cưới - Harmony Wedding"
  };
  // Append to the end or insert at appropriate place
  data.albumItems.push(ngayCuoiItem);
  console.log("Added 'ngay-cuoi' to albumItems.");
} else {
  console.log("'ngay-cuoi' item already in albumItems.");
}

// Add "Ngày Cưới" detail block
const existingNgayCuoiDetail = data.albumDetails.find(album => album.slug === "ngay-cuoi");
if (!existingNgayCuoiDetail) {
  const ngayCuoiGallery = [];
  for (let i = 1; i <= 10; i++) {
    ngayCuoiGallery.push({
      image: `/images/wedding/ngay-cuoi/${i}.webp`,
      alt: `Album ảnh phóng sự ngày cưới - Ảnh ${i}`,
      featured: i === 1
    });
  }

  const ngayCuoiDetail = {
    slug: "ngay-cuoi",
    eyebrow: "Phóng Sự Cưới",
    title: "Ngày Cưới",
    scriptTitle: "Khoảnh Khắc Vàng",
    description: "Bộ ảnh phóng sự ngày cưới trọn vẹn cảm xúc tự nhiên, ghi lại những nụ cười, giọt nước mắt hạnh phúc của dâu rể và hai bên gia đình.",
    imageCount: "10 ảnh",
    location: "Đồng Nai",
    heroImage: "/images/wedding/ngay-cuoi/1.webp",
    heroAlt: "Album ảnh phóng sự ngày cưới - Harmony Wedding",
    gallery: ngayCuoiGallery,
    info: [
      {
        title: "Địa điểm",
        description: "Đồng Nai",
        icon: "location"
      },
      {
        title: "Phong cách",
        description: "Phóng sự tự nhiên",
        icon: "heart"
      }
    ]
  };

  data.albumDetails.push(ngayCuoiDetail);
  console.log("Added 'ngay-cuoi' details to albumDetails.");
} else {
  console.log("'ngay-cuoi' detail already in albumDetails.");
}

// 5. Helper function to read image dimensions
function getImageDimensions(imagePath) {
  const cleanPath = imagePath.split("?")[0];
  const diskPath = path.join(publicDir, cleanPath);
  if (!fs.existsSync(diskPath)) {
    console.warn(`⚠️ Warning: image file not found on disk: ${diskPath}`);
    return null;
  }
  try {
    const output = execSync(`file "${diskPath}"`, { encoding: "utf8" });
    const match = output.match(/(\d+)\s*x\s*(\d+)/);
    if (match) {
      return {
        width: parseInt(match[1], 10),
        height: parseInt(match[2], 10)
      };
    }
  } catch (e) {
    console.error(`❌ Error parsing dimensions for ${diskPath}:`, e.message);
  }
  return null;
}

// 6. Update dimensions for all image fields in JSON data
console.log("Updating dimensions...");

for (const item of data.albumItems) {
  const dims = getImageDimensions(item.image);
  if (dims) {
    item.width = dims.width;
    item.height = dims.height;
  }
}

if (data.featuredAlbum && data.featuredAlbum.images) {
  for (const img of data.featuredAlbum.images) {
    const dims = getImageDimensions(img.image);
    if (dims) {
      img.width = dims.width;
      img.height = dims.height;
    }
  }
}

for (const album of data.albumDetails) {
  console.log(`Processing dimensions for album: ${album.slug}`);
  if (album.gallery) {
    for (const item of album.gallery) {
      const dims = getImageDimensions(item.image);
      if (dims) {
        item.width = dims.width;
        item.height = dims.height;
      }
    }
  }
}

// Write updated data back to portfolio.json
fs.writeFileSync(portfolioPath, JSON.stringify(data, null, 2), "utf8");
console.log("✅ Successfully updated portfolio.json structure and image dimensions!");
