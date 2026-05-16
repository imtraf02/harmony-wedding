import { getDb } from "@/lib/db";
import type { Service } from "@/types";

const defaultServices: Array<
  Omit<Service, "id" | "created_at" | "updated_at">
> = [
  {
    slug: "wedding-film",
    title: "Gói Dịch Vụ Ngày Cưới",
    subtitle: "Trọn gói & Lẻ",
    description:
      "Bao gồm các gói từ trang phục, makeup đến chụp ảnh phóng sự trong ngày trọng đại. Phù hợp cho cả tổ chức 1 ngày hoặc 2 ngày.",
    features: [
      "Trọn gói 1 ngày: Diamond, Ruby, Signature, Super VIP",
      "Trọn gói 2 ngày dành cho lễ ở hai nhà hoặc hai ngày khác nhau",
      "Combo tiết kiệm chủ yếu tập trung vào trang phục & hoa",
      "Dịch vụ thợ chụp/quay lẻ linh hoạt tặng kèm Flycam, USB",
    ],
    hero_image: "/img/wedding.jpg",
    demo_images: [
      "/img/wedding.jpg",
      "/img/cinematic.jpg",
      "/img/prewedding.jpg",
    ],
    detail_href: "/services/wedding-film",
    pricing_href: "/pricing",
    is_active: true,
    sort_order: 0,
  },
  {
    slug: "photography",
    title: "Gói Chụp Ảnh Album",
    subtitle: "Pre-wedding",
    description:
      "Dịch vụ chụp ảnh trước đám cưới để làm album và hình cổng tại Studio, Phim trường hoặc các tour ngoại cảnh đi xa.",
    features: [
      "Chụp tại Studio: Basic, VIP, Concept độc quyền",
      "Chụp tại Phim trường với nhiều bối cảnh hoành tráng",
      "Tour Ngoại cảnh: Vũng Tàu, Đà Lạt, Vĩnh Hy, Đảo Phú Quý",
      "Gói hình cổng lẻ tiết kiệm lấy nhanh",
    ],
    hero_image: "/img/prewedding.jpg",
    demo_images: [
      "/img/prewedding.jpg",
      "/img/wedding.jpg",
      "/img/cinematic.jpg",
    ],
    detail_href: "/services/photography",
    pricing_href: "/pricing",
    is_active: true,
    sort_order: 1,
  },
  {
    slug: "videography",
    title: "Thuê Lẻ & Phát Sinh",
    subtitle: "Linh hoạt theo nhu cầu",
    description:
      "Cung cấp các dịch vụ thuê lẻ trang phục, makeup chuyên nghiệp và các sản phẩm in ấn, rửa ảnh chất lượng cao.",
    features: [
      "Trang phục: Váy cưới, Veston, Áo dài, Hỷ phục cặp",
      "Makeup: Chụp tiệc, Makeup cô dâu tại nhà, Makeup sui gia",
      "In ấn: Rửa ảnh ép gỗ, Album photobook tráng gương",
      "Dịch vụ linh hoạt không cần mua trọn gói",
    ],
    hero_image: "/img/cinematic.jpg",
    demo_images: [
      "/img/cinematic.jpg",
      "/img/prewedding.jpg",
      "/img/wedding.jpg",
    ],
    detail_href: "/services/videography",
    pricing_href: "/pricing",
    is_active: true,
    sort_order: 2,
  },
];

function parseJsonList(value: unknown): string[] {
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function parseService(row: Record<string, unknown>): Service {
  return {
    ...(row as Omit<Service, "features" | "demo_images" | "is_active">),
    features: parseJsonList(row.features),
    demo_images: parseJsonList(row.demo_images),
    is_active: Boolean(row.is_active),
  };
}

function ensureServicesTable() {
  const db = getDb();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS services (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      slug         TEXT    UNIQUE NOT NULL,
      title        TEXT    NOT NULL,
      subtitle     TEXT    NOT NULL DEFAULT '',
      description  TEXT    NOT NULL DEFAULT '',
      features     TEXT    NOT NULL DEFAULT '[]',
      hero_image   TEXT    NOT NULL DEFAULT '',
      demo_images  TEXT    NOT NULL DEFAULT '[]',
      detail_href  TEXT    NOT NULL DEFAULT '',
      pricing_href TEXT    NOT NULL DEFAULT '/pricing',
      is_active    INTEGER NOT NULL DEFAULT 1,
      sort_order   INTEGER NOT NULL DEFAULT 0,
      created_at   TEXT    NOT NULL DEFAULT (datetime('now','localtime')),
      updated_at   TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
    )
  `).run();

  const count = db.prepare("SELECT COUNT(*) AS count FROM services").get() as {
    count: number;
  };
  if (count.count > 0) return;

  const insert = db.prepare(`
    INSERT INTO services (
      slug, title, subtitle, description, features, hero_image, demo_images,
      detail_href, pricing_href, is_active, sort_order
    )
    VALUES (
      @slug, @title, @subtitle, @description, @features, @hero_image, @demo_images,
      @detail_href, @pricing_href, @is_active, @sort_order
    )
  `);

  const tx = db.transaction(() => {
    defaultServices.forEach((service) => {
      insert.run({
        ...service,
        features: JSON.stringify(service.features),
        demo_images: JSON.stringify(service.demo_images),
        is_active: service.is_active ? 1 : 0,
      });
    });
  });

  tx();
}

export function getActiveServices(): Service[] {
  ensureServicesTable();
  return (
    getDb()
      .prepare(
        "SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC",
      )
      .all() as Record<string, unknown>[]
  ).map(parseService);
}

export function getAllServicesAdmin(): Service[] {
  ensureServicesTable();
  return (
    getDb()
      .prepare("SELECT * FROM services ORDER BY sort_order ASC, id ASC")
      .all() as Record<string, unknown>[]
  ).map(parseService);
}

export function getServiceById(id: number): Service | null {
  ensureServicesTable();
  const row = getDb().prepare("SELECT * FROM services WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;
  return row ? parseService(row) : null;
}

export function getServiceBySlug(slug: string): Service | null {
  ensureServicesTable();
  const row = getDb()
    .prepare("SELECT * FROM services WHERE slug = ?")
    .get(slug) as Record<string, unknown> | undefined;
  return row ? parseService(row) : null;
}

export function createService(
  data: Omit<Service, "id" | "created_at" | "updated_at">,
): void {
  ensureServicesTable();
  getDb()
    .prepare(`
      INSERT INTO services (
        slug, title, subtitle, description, features, hero_image, demo_images,
        detail_href, pricing_href, is_active, sort_order
      )
      VALUES (
        @slug, @title, @subtitle, @description, @features, @hero_image, @demo_images,
        @detail_href, @pricing_href, @is_active, @sort_order
      )
    `)
    .run({
      ...data,
      features: JSON.stringify(data.features),
      demo_images: JSON.stringify(data.demo_images),
      is_active: data.is_active ? 1 : 0,
    });
}

export function updateService(
  id: number,
  data: Omit<Service, "id" | "created_at" | "updated_at">,
): void {
  ensureServicesTable();
  getDb()
    .prepare(`
      UPDATE services SET
        slug = @slug,
        title = @title,
        subtitle = @subtitle,
        description = @description,
        features = @features,
        hero_image = @hero_image,
        demo_images = @demo_images,
        detail_href = @detail_href,
        pricing_href = @pricing_href,
        is_active = @is_active,
        sort_order = @sort_order,
        updated_at = datetime('now','localtime')
      WHERE id = @id
    `)
    .run({
      id,
      ...data,
      features: JSON.stringify(data.features),
      demo_images: JSON.stringify(data.demo_images),
      is_active: data.is_active ? 1 : 0,
    });
}

export function deleteService(id: number): void {
  ensureServicesTable();
  getDb().prepare("DELETE FROM services WHERE id = ?").run(id);
}

export function reorderServices(orderedIds: number[]): void {
  ensureServicesTable();
  const db = getDb();
  const stmt = db.prepare(
    "UPDATE services SET sort_order = @order WHERE id = @id",
  );
  const tx = db.transaction((ids: number[]) => {
    ids.forEach((id, index) => {
      stmt.run({ id, order: index });
    });
  });
  tx(orderedIds);
}
