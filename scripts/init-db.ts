#!/usr/bin/env tsx
/**
 * Initialize, migrate, and seed the SQLite database.
 * Safe to run on every deploy.
 *
 * Usage: pnpm tsx scripts/init-db.ts
 */
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { getDatabasePath } from '../lib/db-path';
import { processImage } from '../lib/image';

const DB_PATH = getDatabasePath();
const SCHEMA_PATH = path.join(process.cwd(), 'database', 'schema.sql');
const WEDDING_DIR = path.join(process.cwd(), 'wedding');

type PortfolioStyle = 'vintage' | 'modern' | 'fineart' | 'romantic';
type LocationType = 'studio' | 'outdoor' | 'destination';
type Orientation = 'portrait' | 'landscape' | 'square';

interface PortfolioSeedRow {
  slug: string;
  title: string;
  images: string;
}

interface TestimonialSeed {
  couple_name: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar: string | null;
  service: string;
  wedding_year: number;
  is_active: boolean;
  sort_order: number;
}

const sampleTestimonials: TestimonialSeed[] = [
  {
    couple_name: 'Minh & Hằng',
    content: 'Đội ngũ vô cùng nhiệt tình và chuyên nghiệp. Ảnh chụp rất tự nhiên, chúng mình cực kì ưng ý với bộ ảnh cưới này. Cảm ơn Harmony Studio rất nhiều!',
    rating: 5,
    avatar: null,
    service: 'Chụp ảnh cưới (Studio & Ngoại cảnh)',
    wedding_year: 2025,
    is_active: true,
    sort_order: 1,
  },
  {
    couple_name: 'Tuấn & Lan',
    content: 'Dịch vụ quá tuyệt vời! Cả ekip đã tạo cho hai đứa một không gian rất thoải mái trong suốt buổi chụp. Mình đặc biệt thích phong cách blend màu phim của studio.',
    rating: 5,
    avatar: null,
    service: 'Combo Chụp & Quay Pre-Wedding',
    wedding_year: 2024,
    is_active: true,
    sort_order: 2,
  },
  {
    couple_name: 'Hải & Yến',
    content: 'Vợ chồng mình chọn Harmony sau khi xem qua rất nhiều portfolio của các bên. Và quả thực là một quyết định đúng đắn. Hình ảnh đẹp ngoài mong đợi và video cưới cực kì xịn xò.',
    rating: 5,
    avatar: null,
    service: 'Quay phim phóng sự cưới',
    wedding_year: 2025,
    is_active: true,
    sort_order: 3,
  },
  {
    couple_name: 'Thành & Phương',
    content: 'Concept chụp của team rất đa dạng và hợp gu. Bạn makeup cũng làm tóc và trang điểm cực kì tự nhiên, tôn lên những đường nét đẹp nhất. Highly recommend nhé!',
    rating: 5,
    avatar: null,
    service: 'Chụp ảnh cưới Studio',
    wedding_year: 2023,
    is_active: true,
    sort_order: 4,
  },
  {
    couple_name: 'Phong & Thảo',
    content: 'Tụi mình chụp ở phim trường Vũ Garden, nắng hôm đó rất gắt nhưng ekip hỗ trợ nhiệt tình từ lúc sáng sớm tới chiều tối. Kết quả là những bức hình lưu giữ kỉ niệm không thể tuyệt hơn.',
    rating: 5,
    avatar: null,
    service: 'Chụp Ngoại cảnh & Phim trường',
    wedding_year: 2025,
    is_active: true,
    sort_order: 5,
  },
];

function toSlug(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function titleFromFolder(folderName: string) {
  return folderName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function inferStyle(folderName: string): PortfolioStyle {
  if (folderName.includes('vũ garden')) return 'vintage';
  if (folderName.includes('studio')) return 'fineart';
  return 'modern';
}

function inferLocationType(folderName: string): LocationType {
  if (folderName.includes('đường phố') || folderName.includes('outdoor')) return 'outdoor';
  return 'studio';
}

function inferOrientation(width: number, height: number): Orientation {
  if (width === height) return 'square';
  return width > height ? 'landscape' : 'portrait';
}

function tableCount(db: Database.Database, table: string) {
  return (db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number }).count;
}

function runSchema(db: Database.Database) {
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  const statements = schema
    .split(';')
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0 && !statement.startsWith('--') && !statement.toUpperCase().startsWith('PRAGMA'));

  console.log(`🎬 Running ${statements.length} schema statements...`);

  const tx = db.transaction(() => {
    for (const statement of statements) {
      db.prepare(statement).run();
    }
  });

  tx();
}

function runMigrations(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      src        TEXT    NOT NULL,
      alt        TEXT    NOT NULL DEFAULT '',
      label      TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_active  INTEGER NOT NULL DEFAULT 1,
      created_at TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE INDEX IF NOT EXISTS idx_gallery_items_active ON gallery_items(is_active, sort_order);
  `);

  const portfolioColumns = db.pragma('table_info(portfolios)') as { name: string }[];
  const hasOrientation = portfolioColumns.some((column) => column.name === 'orientation');

  if (!hasOrientation) {
    db.exec(`
      ALTER TABLE portfolios ADD COLUMN orientation TEXT NOT NULL DEFAULT 'portrait'
        CHECK(orientation IN ('portrait','landscape','square'));
    `);
    console.log('✓ Added column portfolios.orientation');
  } else {
    console.log('· portfolios.orientation already exists — skipped');
  }
}

async function collectWeddingImages(folderPath: string) {
  const subitems = await fsp.readdir(folderPath, { withFileTypes: true });
  const images: string[] = [];

  for (const subitem of subitems) {
    if (subitem.isDirectory()) {
      const files = await fsp.readdir(path.join(folderPath, subitem.name));
      for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
          images.push(path.join(folderPath, subitem.name, file));
        }
      }
    } else if (subitem.isFile() && subitem.name.match(/\.(jpg|jpeg|png)$/i)) {
      images.push(path.join(folderPath, subitem.name));
    }
  }

  return images;
}

async function seedPortfoliosFromWedding(db: Database.Database) {
  if (!fs.existsSync(WEDDING_DIR)) {
    console.log('· wedding/ directory not found — skipped portfolio image seeding');
    return;
  }

  const dirs = await fsp.readdir(WEDDING_DIR, { withFileTypes: true });
  let sortOrder = tableCount(db, 'portfolios') + 1;
  let created = 0;

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;

    const folderName = dir.name;
    const slug = toSlug(folderName);
    const existing = db.prepare('SELECT id FROM portfolios WHERE slug = ?').get(slug);
    if (existing) continue;

    const folderPath = path.join(WEDDING_DIR, folderName);
    const sourceImages = await collectWeddingImages(folderPath);
    if (sourceImages.length === 0) continue;

    console.log(`Processing portfolio seed folder: ${folderName} (${sourceImages.length} images)`);

    const processedUrls: string[] = [];
    let orientation: Orientation = 'portrait';

    for (const imagePath of sourceImages) {
      try {
        const buffer = await fsp.readFile(imagePath);
        const result = await processImage(buffer, 'portfolio');
        if (processedUrls.length === 0) {
          orientation = inferOrientation(result.width, result.height);
        }
        processedUrls.push(result.url);
      } catch (error) {
        console.error(`  Failed to process ${imagePath}:`, error);
      }
    }

    if (processedUrls.length === 0) continue;

    db.prepare(`
      INSERT INTO portfolios
        (slug, title, style, location_type, studio_slug, cover_image, images, video_url, is_featured, orientation, sort_order)
      VALUES
        (@slug, @title, @style, @location_type, @studio_slug, @cover_image, @images, @video_url, @is_featured, @orientation, @sort_order)
    `).run({
      slug,
      title: titleFromFolder(folderName),
      style: inferStyle(folderName),
      location_type: inferLocationType(folderName),
      studio_slug: null,
      cover_image: processedUrls[0],
      images: JSON.stringify(processedUrls),
      video_url: null,
      is_featured: 1,
      orientation,
      sort_order: sortOrder++,
    });

    created++;
  }

  console.log(created > 0 ? `✓ Seeded ${created} portfolio(s)` : '· portfolios already seeded — skipped');
}

function seedTestimonials(db: Database.Database) {
  if (tableCount(db, 'testimonials') > 0) {
    console.log('· testimonials already seeded — skipped');
    return;
  }

  const stmt = db.prepare(`
    INSERT INTO testimonials (couple_name, content, rating, avatar, service, wedding_year, is_active, sort_order)
    VALUES (@couple_name, @content, @rating, @avatar, @service, @wedding_year, @is_active, @sort_order)
  `);

  const tx = db.transaction((items: TestimonialSeed[]) => {
    for (const item of items) {
      stmt.run({ ...item, is_active: item.is_active ? 1 : 0 });
    }
  });

  tx(sampleTestimonials);
  console.log(`✓ Seeded ${sampleTestimonials.length} testimonials`);
}

function getPortfolioRows(db: Database.Database): PortfolioSeedRow[] {
  return db.prepare('SELECT slug, title, images FROM portfolios ORDER BY sort_order ASC, created_at DESC').all() as PortfolioSeedRow[];
}

function parseImages(images: string | null | undefined): string[] {
  try {
    return JSON.parse(images || '[]') as string[];
  } catch {
    return [];
  }
}

function seedStudios(db: Database.Database) {
  if (tableCount(db, 'studios') > 0) {
    console.log('· studios already seeded — skipped');
    return;
  }

  const portfolios = getPortfolioRows(db);
  const studioPortfolio = portfolios.find((portfolio) => portfolio.slug.includes('studio'));
  const insertStudio = db.prepare(`
    INSERT INTO studios (slug, name, type, address, city, description, highlights, images, map_embed_url, best_time, is_active, sort_order)
    VALUES (@slug, @name, @type, @address, @city, @description, @highlights, @images, @map_embed_url, @best_time, @is_active, @sort_order)
  `);

  const locations: Array<{
    name: string;
    slug: string;
    type: LocationType;
    address: string;
  }> = [
    { name: 'Phim Trường An Garden', slug: 'phim-truong-an-garden', type: 'studio', address: 'Quận 9, TP. HCM' },
    { name: 'Phim Trường Sunny Garden', slug: 'phim-truong-sunny-garden', type: 'studio', address: 'Quận 9, TP. HCM' },
    { name: 'Phim Trường Vũ Garden', slug: 'phim-truong-vu-garden', type: 'studio', address: 'Lái Thiêu, Bình Dương' },
    { name: 'Đường Phố Hồ Chí Minh', slug: 'duong-pho-ho-chi-minh', type: 'outdoor', address: 'Trung tâm Quận 1 & Quận 3, TP. HCM' },
  ];

  insertStudio.run({
    slug: 'harmony-studio-trang-bom',
    name: 'Harmony Studio Trảng Bom',
    type: 'studio',
    address: '45 Đường Cuối Chợ Đông Hoà, Trảng Bom, Đồng Nai',
    city: 'Đồng Nai',
    description: 'Studio chính của Harmony tại Đồng Nai, với không gian rộng rãi và nhiều góc chụp concept đa dạng.',
    highlights: JSON.stringify(['Trang thiết bị hiện đại', 'Makeup chuyên nghiệp', 'Phòng thay đồ riêng tư', 'Bối cảnh đa dạng']),
    images: JSON.stringify(parseImages(studioPortfolio?.images).slice(0, 5)),
    map_embed_url: 'https://maps.app.goo.gl/Ny9QSqj9tk5o5C7Z7',
    best_time: 'Cả ngày',
    is_active: 1,
    sort_order: 1,
  });

  locations.forEach((location, index) => {
    const portfolio = portfolios.find((item) => item.slug === location.slug);
    insertStudio.run({
      slug: location.slug,
      name: location.name,
      type: location.type,
      address: location.address,
      city: location.address.split(', ').pop() || 'Việt Nam',
      description: `Địa điểm chụp ảnh cưới lý tưởng tại ${location.name}. Không gian mang phong cách hiện đại kết hợp thiên nhiên, mang lại những khung hình lãng mạn cho các cặp đôi.`,
      highlights: JSON.stringify(['Không gian rộng rãi', 'Kiến trúc độc đáo', 'Nhiều góc chụp đẹp', 'Ánh sáng tự nhiên tốt']),
      images: JSON.stringify(parseImages(portfolio?.images).slice(0, 5)),
      map_embed_url: null,
      best_time: location.type === 'outdoor' ? 'Sáng sớm hoặc chiều tà' : 'Cả ngày',
      is_active: 1,
      sort_order: index + 2,
    });
  });

  console.log(`✓ Seeded ${locations.length + 1} studios`);
}

function seedHeroAndGallery(db: Database.Database) {
  const portfolios = getPortfolioRows(db);

  if (portfolios.length === 0) {
    console.log('· no portfolios found — skipped hero/gallery seeding');
    return;
  }

  if (tableCount(db, 'hero_slides') === 0) {
    const insertHero = db.prepare(`
      INSERT INTO hero_slides (src, title, subtitle, description, cta_label, cta_href, sort_order, is_active)
      VALUES (@src, @title, @subtitle, @description, @cta_label, @cta_href, @sort_order, @is_active)
    `);

    portfolios.slice(0, 5).forEach((portfolio, index) => {
      const images = parseImages(portfolio.images);
      const src = images[0];
      if (!src) return;

      insertHero.run({
        src,
        title: portfolio.title,
        subtitle: 'Đẳng cấp & Tinh tế',
        description: `Trải nghiệm dịch vụ chụp ảnh cưới chuyên nghiệp tại ${portfolio.title}`,
        cta_label: 'Xem Chi Tiết',
        cta_href: `/portfolio/${portfolio.slug}`,
        sort_order: index + 1,
        is_active: 1,
      });
    });
    console.log('✓ Seeded hero slides');
  } else {
    console.log('· hero slides already seeded — skipped');
  }

  if (tableCount(db, 'gallery_items') === 0) {
    const insertGallery = db.prepare(`
      INSERT INTO gallery_items (src, alt, label, sort_order, is_active)
      VALUES (@src, @alt, @label, @sort_order, @is_active)
    `);

    let sortOrder = 1;
    for (const portfolio of portfolios) {
      for (const [index, src] of parseImages(portfolio.images).slice(0, 4).entries()) {
        insertGallery.run({
          src,
          alt: `${portfolio.title} - Image ${index + 1}`,
          label: portfolio.title,
          sort_order: sortOrder++,
          is_active: 1,
        });
      }
    }
    console.log('✓ Seeded gallery items');
  } else {
    console.log('· gallery items already seeded — skipped');
  }
}

async function init() {
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const db = new Database(DB_PATH);

  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  try {
    runSchema(db);
    runMigrations(db);
    await seedPortfoliosFromWedding(db);
    seedTestimonials(db);
    seedStudios(db);
    seedHeroAndGallery(db);
  } finally {
    db.close();
  }

  console.log(`✅ Database initialized at ${DB_PATH}`);
}

init().catch((error) => {
  console.error('❌ Failed to initialize database:', error);
  process.exit(1);
});
