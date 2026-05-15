# Wedding Media Website — Project Specification
> **For AI Coding Agent** · v2.0 · Self-hosted · Fujitsu Server · Ubuntu 26

---

## 0. Project Overview

| Key | Value |
|-----|-------|
| Purpose | Wedding photography, videography & wedding film service website |
| Server | Fujitsu (self-hosted), Ubuntu Server 26, 4 GB RAM |
| Runtime | Node.js 20 LTS |
| Framework | Next.js 16 (App Router) — **no `src/` directory** |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Database | SQLite via `better-sqlite3` |
| Infrastructure | Nginx · PM2 · Let's Encrypt (Certbot) |

---

## 1. URL Structure (English paths, SEO-friendly)

```
/                               Homepage
/services                       All services overview
/services/videography           Wedding videography
/services/photography           Wedding photography
/services/wedding-film          Wedding film / documentary
/portfolio                      Full gallery with filters
/portfolio/[slug]               Single album detail
/studios                        Studios & outdoor locations
/studios/[slug]                 Single studio detail
/pricing                        Pricing packages
/blog                           Blog & tips
/blog/[slug]                    Single blog post
/contact                        Contact & booking form
/admin                          Admin login (noindex)
/admin/dashboard                Admin dashboard (noindex)
```

**Redirect rules** (add to `next.config.ts`):
```
/gallery          → /portfolio              (301)
/services/video   → /services/videography   (301)
/services/photo   → /services/photography   (301)
/location         → /studios                (301)
/contact-us       → /contact                (301)
```

---

## 2. Directory Structure (no `src/`)

```
wedding-website/
│
├── app/                                   # Next.js App Router root
│   ├── layout.tsx                         # Root layout: fonts, metadata, scripts
│   ├── page.tsx                           # Homepage
│   ├── globals.css
│   ├── sitemap.ts                         # Auto-generated sitemap.xml
│   ├── robots.ts                          # robots.txt
│   │
│   ├── services/
│   │   ├── page.tsx                       # /services
│   │   ├── videography/page.tsx           # /services/videography
│   │   ├── photography/page.tsx           # /services/photography
│   │   └── wedding-film/page.tsx          # /services/wedding-film
│   │
│   ├── portfolio/
│   │   ├── page.tsx                       # /portfolio — masonry gallery + filters
│   │   └── [slug]/page.tsx               # /portfolio/[slug]
│   │
│   ├── studios/
│   │   ├── page.tsx                       # /studios
│   │   └── [slug]/page.tsx               # /studios/[slug]
│   │
│   ├── pricing/page.tsx                   # /pricing
│   │
│   ├── blog/
│   │   ├── page.tsx                       # /blog
│   │   └── [slug]/page.tsx               # /blog/[slug]
│   │
│   ├── contact/page.tsx                   # /contact
│   │
│   ├── admin/
│   │   ├── layout.tsx                     # Admin layout (auth guard)
│   │   ├── page.tsx                       # /admin — login page
│   │   ├── dashboard/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── studios/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── contacts/page.tsx
│   │   └── testimonials/page.tsx
│   │
│   └── api/
│       ├── contact/route.ts               # POST — save form + send email
│       ├── upload/route.ts                # POST — Sharp optimize + save local
│       ├── admin/
│       │   ├── login/route.ts
│       │   ├── logout/route.ts
│       │   ├── portfolio/route.ts         # GET POST PUT DELETE
│       │   ├── studios/route.ts
│       │   ├── blog/route.ts
│       │   └── contacts/route.ts
│       └── revalidate/route.ts
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── FloatingContact.tsx            # Sticky Zalo/Messenger button
│   │
│   ├── home/
│   │   ├── HeroVideo.tsx                  # Autoplay muted video hero
│   │   ├── ServiceCards.tsx
│   │   ├── FeaturedPortfolio.tsx          # 6 featured photos masonry
│   │   ├── Testimonials.tsx               # CSS scroll-snap slider
│   │   └── CtaBanner.tsx
│   │
│   ├── portfolio/
│   │   ├── MasonryGallery.tsx             # CSS columns — no JS lib
│   │   ├── GalleryFilter.tsx              # URL searchParams based filter
│   │   └── Lightbox.tsx                   # Keyboard + touch swipe
│   │
│   ├── studio/
│   │   ├── StudioCard.tsx
│   │   └── StudioMap.tsx                  # Google Maps iframe embed
│   │
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   └── MarkdownContent.tsx
│   │
│   ├── shared/
│   │   ├── OptimizedImage.tsx             # next/image wrapper + blur placeholder
│   │   ├── VideoEmbed.tsx                 # Lazy iframe: thumbnail first, load on click
│   │   ├── ContactForm.tsx
│   │   ├── JsonLd.tsx                     # Schema.org JSON-LD injector
│   │   ├── Breadcrumb.tsx                 # Visible nav + BreadcrumbList schema
│   │   └── SectionTitle.tsx
│   │
│   └── admin/
│       ├── ImageUploader.tsx
│       ├── DataTable.tsx
│       └── MarkdownEditor.tsx
│
├── lib/
│   ├── db.ts                              # SQLite singleton (WAL mode)
│   ├── queries/
│   │   ├── portfolio.ts
│   │   ├── studios.ts
│   │   ├── blog.ts
│   │   ├── contacts.ts
│   │   └── testimonials.ts
│   ├── email.ts                           # Nodemailer + HTML templates
│   ├── image.ts                           # Sharp helpers: resize, webp, blur
│   ├── auth.ts                            # iron-session config
│   ├── rate-limit.ts                      # In-memory IP rate limiter
│   ├── metadata.ts                        # SEO metadata factory
│   └── constants.ts
│
├── data/
│   ├── services.ts                        # Static service content
│   ├── pricing.ts                         # Pricing packages (static)
│   └── navigation.ts                      # Nav links
│
├── types/
│   └── index.ts                           # All shared TypeScript interfaces
│
├── public/
│   ├── uploads/                           # All uploads (served by Nginx directly)
│   │   ├── portfolio/
│   │   ├── studios/
│   │   └── blog/
│   ├── videos/
│   │   └── hero-bg.mp4                    # Compressed ≤ 15 MB (1080p CRF 28)
│   ├── fonts/
│   │   ├── CormorantGaramond-Light.woff2
│   │   ├── CormorantGaramond-LightItalic.woff2
│   │   └── DMSans-Variable.woff2
│   ├── og-default.jpg                     # 1200×630 Open Graph fallback
│   └── favicon.ico
│
├── database/
│   ├── wedding.db                         # SQLite file
│   └── schema.sql                         # Source-of-truth schema
│
├── scripts/
│   ├── init-db.ts                         # Create tables from schema.sql
│   ├── backup.sh                          # Daily: DB + uploads
│   ├── deploy.sh                          # git pull → build → pm2 reload
│   └── optimize-images.sh                 # Batch Sharp for existing files
│
├── middleware.ts                           # Protect /admin/* routes
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json                           # strict: true, paths: {} (no aliases)
├── postcss.config.js
├── ecosystem.config.js                     # PM2 config
├── .env.local                              # Never commit
├── .env.example
└── WEDDING_WEBSITE_SPEC.md
```

> **tsconfig paths**: Do NOT use `@/` path alias since there is no `src/` directory.
> Import with relative paths: `import { getDb } from '../../lib/db'`
> or configure `baseUrl: "."` so bare imports resolve from root:
> `import { getDb } from 'lib/db'`

---

## 3. Server Configuration (4 GB RAM · Ubuntu 26)

### 3.1 Hardware profile
```
RAM  : 4 GB total
       ~1.2 GB — Ubuntu + system services
       ~0.9 GB — Node.js (Next.js, hard-capped via --max-old-space-size)
       ~0.3 GB — Nginx worker processes
       ~1.6 GB — free for disk cache (SQLite pages, static file buffer)
CPU  : 2–4 cores (older generation)
Disk : SSD preferred — SQLite WAL performs best on SSD
OS   : Ubuntu Server 26
```

### 3.2 PM2 (`ecosystem.config.js`)
```js
module.exports = {
  apps: [{
    name               : 'wedding',
    script             : 'node_modules/.bin/next',
    args               : 'start',
    cwd                : '/var/www/wedding',
    instances          : 1,
    exec_mode          : 'fork',
    node_args          : '--max-old-space-size=900',
    max_memory_restart : '950M',
    env: {
      NODE_ENV : 'production',
      PORT     : 3000,
    },
    error_file      : '/var/log/pm2/wedding-error.log',
    out_file        : '/var/log/pm2/wedding-out.log',
    log_date_format : 'YYYY-MM-DD HH:mm:ss',
    merge_logs      : true,
  }]
};
```

### 3.3 Nginx (`/etc/nginx/sites-available/wedding`)
```nginx
limit_req_zone $binary_remote_addr zone=contact:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=admin:10m   rate=20r/m;

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://yourdomain.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_session_cache   shared:SSL:10m;

    add_header X-Content-Type-Options  "nosniff"                         always;
    add_header X-Frame-Options         "SAMEORIGIN"                      always;
    add_header Referrer-Policy         "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy      "camera=(), microphone=()"        always;

    gzip on;
    gzip_comp_level 5;
    gzip_min_length 1024;
    gzip_proxied    any;
    gzip_vary       on;
    gzip_types
        text/plain text/css text/javascript
        application/json application/javascript application/xml
        image/svg+xml font/woff2;

    # Next.js static — immutable 1 year
    location /_next/static/ {
        alias  /var/www/wedding/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Uploaded media — served by Nginx, no Node.js involved
    location /uploads/ {
        alias  /var/lib/wedding/uploads/;
        expires 7d;
        add_header Cache-Control "public, must-revalidate";
        location ~* \.(php|sh|py|rb|exe)$ { deny all; }
        access_log off;
    }

    # Video — byte range support for scrubbing
    location /videos/ {
        alias  /var/www/wedding/public/videos/;
        add_header Accept-Ranges bytes;
        expires 30d;
        access_log off;
    }

    location /api/contact {
        limit_req zone=contact burst=3 nodelay;
        proxy_pass http://127.0.0.1:3000;
        include /etc/nginx/proxy_params;
    }

    location /admin {
        limit_req zone=admin burst=10 nodelay;
        proxy_pass http://127.0.0.1:3000;
        include /etc/nginx/proxy_params;
    }

    location / {
        proxy_pass         http://127.0.0.1:3000;
        include            /etc/nginx/proxy_params;
        proxy_read_timeout 30s;
    }
}
```

`/etc/nginx/proxy_params`:
```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade           $http_upgrade;
proxy_set_header Connection        'upgrade';
proxy_set_header Host              $host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_cache_bypass                 $http_upgrade;
```

---

## 4. Database Schema (`database/schema.sql`)

> SQLite chosen over PostgreSQL: no separate process, WAL handles concurrent reads,
> zero configuration. Sufficient for < 1,000 req/min.

```sql
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA synchronous  = NORMAL;

CREATE TABLE IF NOT EXISTS portfolios (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT    UNIQUE NOT NULL,
  title         TEXT    NOT NULL,
  style         TEXT    NOT NULL CHECK(style IN ('vintage','modern','fineart','romantic')),
  location_type TEXT    NOT NULL DEFAULT 'studio'
                        CHECK(location_type IN ('studio','outdoor','destination')),
  studio_slug   TEXT    REFERENCES studios(slug) ON DELETE SET NULL,
  cover_image   TEXT    NOT NULL,        -- /uploads/portfolio/xxx.webp
  images        TEXT    NOT NULL DEFAULT '[]',   -- JSON array of paths
  video_url     TEXT,
  is_featured   INTEGER NOT NULL DEFAULT 0,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now','localtime')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
);
CREATE INDEX IF NOT EXISTS idx_portfolios_style    ON portfolios(style);
CREATE INDEX IF NOT EXISTS idx_portfolios_featured ON portfolios(is_featured);

CREATE TABLE IF NOT EXISTS studios (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT    UNIQUE NOT NULL,
  name          TEXT    NOT NULL,
  type          TEXT    NOT NULL DEFAULT 'studio'
                        CHECK(type IN ('studio','outdoor','destination')),
  address       TEXT,
  city          TEXT    NOT NULL,
  description   TEXT,
  highlights    TEXT    NOT NULL DEFAULT '[]',   -- JSON array of strings
  images        TEXT    NOT NULL DEFAULT '[]',
  map_embed_url TEXT,
  best_time     TEXT,
  is_active     INTEGER NOT NULL DEFAULT 1,
  sort_order    INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT    UNIQUE NOT NULL,
  title        TEXT    NOT NULL,
  excerpt      TEXT,                             -- 150–160 chars for meta description
  content      TEXT    NOT NULL DEFAULT '',      -- Markdown
  cover_image  TEXT,
  tags         TEXT    NOT NULL DEFAULT '[]',    -- JSON array
  is_published INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published, published_at DESC);

CREATE TABLE IF NOT EXISTS contacts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT    NOT NULL,
  phone        TEXT    NOT NULL,
  email        TEXT,
  service      TEXT    NOT NULL DEFAULT 'photography'
                       CHECK(service IN ('photography','videography','wedding-film','combo')),
  wedding_date TEXT,
  guest_count  INTEGER,
  message      TEXT,
  status       TEXT    NOT NULL DEFAULT 'new'
                       CHECK(status IN ('new','contacted','booked','completed','cancelled')),
  ip_address   TEXT,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status, created_at DESC);

CREATE TABLE IF NOT EXISTS testimonials (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  couple_name  TEXT    NOT NULL,
  content      TEXT    NOT NULL,
  rating       INTEGER NOT NULL DEFAULT 5 CHECK(rating BETWEEN 1 AND 5),
  avatar       TEXT,
  service      TEXT,
  wedding_year INTEGER,
  is_active    INTEGER NOT NULL DEFAULT 1,
  sort_order   INTEGER NOT NULL DEFAULT 0
);
```

---

## 5. Environment Variables (`.env.example`)

```env
# ── App ────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_STUDIO_NAME=Your Studio Name
NEXT_PUBLIC_PHONE=+84901234567
NEXT_PUBLIC_ZALO_ID=0901234567
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yourstudio
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yourstudio

# ── Admin ──────────────────────────────────────────────────────
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=        # bcrypt hash, rounds=12
SESSION_SECRET=             # openssl rand -base64 32

# ── Email (Nodemailer) ─────────────────────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=youremail@gmail.com
SMTP_PASS=                  # Gmail App Password (16 chars, no spaces)
NOTIFY_EMAIL=youremail@gmail.com

# ── Maps ───────────────────────────────────────────────────────
NEXT_PUBLIC_GOOGLE_MAPS_KEY=

# ── Upload ─────────────────────────────────────────────────────
UPLOAD_MAX_MB=10
UPLOAD_DIR=/var/lib/wedding/uploads

# ── Analytics (optional) ───────────────────────────────────────
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

---

## 6. `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const config: NextConfig = {
  compress        : true,
  poweredByHeader : false,
  reactStrictMode : true,

  async redirects() {
    return [
      { source: '/gallery',        destination: '/portfolio',            permanent: true },
      { source: '/services/video', destination: '/services/videography', permanent: true },
      { source: '/services/photo', destination: '/services/photography', permanent: true },
      { source: '/location',       destination: '/studios',              permanent: true },
      { source: '/contact-us',     destination: '/contact',              permanent: true },
    ];
  },

  images: {
    formats          : ['image/webp'],
    deviceSizes      : [640, 750, 1080, 1920],
    imageSizes       : [64, 128, 256, 384],
    minimumCacheTTL  : 86400,
  },

  experimental: {
    optimizeCss            : true,
    optimizePackageImports : ['lucide-react'],
  },

  webpack(cfg) {
    cfg.resolve.alias = { ...cfg.resolve.alias, moment: false };
    return cfg;
  },
};

export default config;
```

---

## 7. SEO — Full Implementation

### 7.1 Metadata factory (`lib/metadata.ts`)

```typescript
import type { Metadata } from 'next';

const BASE_URL  = process.env.NEXT_PUBLIC_SITE_URL!;
const SITE_NAME = process.env.NEXT_PUBLIC_STUDIO_NAME ?? 'Studio';

interface SeoInput {
  title       : string;
  description : string;
  path        : string;     // e.g. '/portfolio'
  image?      : string;     // absolute URL; falls back to og-default.jpg
  noIndex?    : boolean;
}

export function buildMetadata({ title, description, path, image, noIndex }: SeoInput): Metadata {
  const url     = `${BASE_URL}${path}`;
  const ogImage = image ?? `${BASE_URL}/og-default.jpg`;

  return {
    title,
    description,
    alternates : { canonical: url },
    openGraph  : {
      title, description, url,
      siteName : SITE_NAME,
      locale   : 'vi_VN',
      type     : 'website',
      images   : [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card   : 'summary_large_image',
      title, description,
      images : [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  };
}
```

Usage in every `page.tsx`:
```typescript
// app/services/videography/page.tsx
export const metadata = buildMetadata({
  title       : 'Wedding Videography | Your Studio Name',
  description : 'Cinematic 4K wedding films in [City]. Full-day coverage, same-day highlights, drone footage available.',
  path        : '/services/videography',
  image       : `${process.env.NEXT_PUBLIC_SITE_URL}/og-videography.jpg`,
});
```

### 7.2 Root layout metadata (`app/layout.tsx`)
```typescript
export const metadata: Metadata = {
  metadataBase : new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default  : 'Your Studio Name | Wedding Photography & Videography in [City]',
    template : '%s | Your Studio Name',
  },
  description : 'Professional wedding photography and videography in [City]. Natural light, cinematic films, fine art albums.',
  keywords    : ['wedding photography [city]', 'wedding videography [city]', 'pre-wedding photography', 'fine art wedding'],
  openGraph   : { type: 'website', locale: 'vi_VN', siteName: 'Your Studio Name' },
  robots      : {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};
```

### 7.3 Sitemap (`app/sitemap.ts`)
```typescript
import type { MetadataRoute } from 'next';
import { getDb } from 'lib/db';

export default function sitemap(): MetadataRoute.Sitemap {
  const db   = getDb();
  const base = process.env.NEXT_PUBLIC_SITE_URL!;

  const portfolios = db.prepare(
    `SELECT slug, updated_at FROM portfolios ORDER BY updated_at DESC`
  ).all() as { slug: string; updated_at: string }[];

  const posts = db.prepare(
    `SELECT slug, published_at FROM posts WHERE is_published = 1`
  ).all() as { slug: string; published_at: string }[];

  const studios = db.prepare(
    `SELECT slug FROM studios WHERE is_active = 1`
  ).all() as { slug: string }[];

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                             priority: 1.0,  changeFrequency: 'weekly'  },
    { url: `${base}/services`,               priority: 0.9,  changeFrequency: 'monthly' },
    { url: `${base}/services/videography`,   priority: 0.85, changeFrequency: 'monthly' },
    { url: `${base}/services/photography`,   priority: 0.85, changeFrequency: 'monthly' },
    { url: `${base}/services/wedding-film`,  priority: 0.85, changeFrequency: 'monthly' },
    { url: `${base}/portfolio`,              priority: 0.9,  changeFrequency: 'weekly'  },
    { url: `${base}/studios`,               priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${base}/pricing`,               priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${base}/blog`,                  priority: 0.7,  changeFrequency: 'weekly'  },
    { url: `${base}/contact`,               priority: 0.75, changeFrequency: 'yearly'  },
  ];

  return [
    ...staticPages,
    ...portfolios.map(p => ({
      url: `${base}/portfolio/${p.slug}`, lastModified: new Date(p.updated_at),
      priority: 0.6, changeFrequency: 'monthly' as const,
    })),
    ...posts.map(p => ({
      url: `${base}/blog/${p.slug}`, lastModified: new Date(p.published_at),
      priority: 0.65, changeFrequency: 'monthly' as const,
    })),
    ...studios.map(s => ({
      url: `${base}/studios/${s.slug}`,
      priority: 0.7, changeFrequency: 'monthly' as const,
    })),
  ];
}
```

### 7.4 `robots.ts`
```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] }],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
```

### 7.5 Schema.org JSON-LD (`components/shared/JsonLd.tsx`)
```typescript
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Schemas ──────────────────────────────────────────────────

// Homepage: LocalBusiness + PhotographyBusiness
export const localBusinessSchema = {
  '@context' : 'https://schema.org',
  '@type'    : ['LocalBusiness', 'PhotographyBusiness'],
  name       : 'Your Studio Name',
  url        : process.env.NEXT_PUBLIC_SITE_URL,
  telephone  : '+84901234567',
  image      : `${process.env.NEXT_PUBLIC_SITE_URL}/og-default.jpg`,
  priceRange : '₫₫₫',
  openingHours : ['Mo-Sa 08:00-18:00'],
  address: {
    '@type'         : 'PostalAddress',
    streetAddress   : '123 Your Street',
    addressLocality : 'Your City',
    addressCountry  : 'VN',
  },
  sameAs: ['https://facebook.com/yourstudio', 'https://instagram.com/yourstudio'],
};

// Blog post: Article
export function articleSchema(post: {
  title: string; excerpt: string; published_at: string;
  cover_image: string; slug: string;
}) {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    '@context'    : 'https://schema.org',
    '@type'       : 'Article',
    headline      : post.title,
    description   : post.excerpt,
    datePublished : post.published_at,
    image         : `${base}${post.cover_image}`,
    url           : `${base}/blog/${post.slug}`,
    author        : { '@type': 'Organization', name: 'Your Studio Name' },
    publisher     : {
      '@type' : 'Organization',
      name    : 'Your Studio Name',
      logo    : { '@type': 'ImageObject', url: `${base}/logo.png` },
    },
  };
}

// Breadcrumb: add to all inner pages
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context'      : 'https://schema.org',
    '@type'         : 'BreadcrumbList',
    itemListElement : items.map((item, i) => ({
      '@type'  : 'ListItem',
      position : i + 1,
      name     : item.name,
      item     : `${process.env.NEXT_PUBLIC_SITE_URL}${item.path}`,
    })),
  };
}

// FAQ: add to /pricing and /services/* for rich results
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context'  : 'https://schema.org',
    '@type'     : 'FAQPage',
    mainEntity  : faqs.map(f => ({
      '@type'        : 'Question',
      name           : f.question,
      acceptedAnswer : { '@type': 'Answer', text: f.answer },
    })),
  };
}
```

### 7.6 Open Graph images (1200 × 630 px)
```
/public/og-default.jpg
/public/og-videography.jpg
/public/og-photography.jpg
/public/og-wedding-film.jpg
/public/og-portfolio.jpg
/public/og-studios.jpg
/public/og-pricing.jpg
/public/og-contact.jpg
```

### 7.7 Core Web Vitals checklist
```
LCP  ─ priority={true} on above-fold <Image> (hero poster)
     ─ Self-host fonts in /public/fonts — no Google Fonts network round-trip
     ─ <link rel="preload" as="font" crossOrigin="anonymous"> for each woff2 in layout.tsx
     ─ Hero video: preload="metadata", poster= as LCP fallback

CLS  ─ Every <Image> has explicit width + height or fill + aspect-ratio container
     ─ Font loading: font-display: swap in @font-face (no layout shift)
     ─ Reserve video container height with aspect-video Tailwind class

INP  ─ 'use client' only where genuinely needed (ContactForm, Lightbox, MobileNav)
     ─ Gallery filter: URL searchParams — no client state, no hydration mismatch
     ─ Avoid large event handler bundles on Server Components

Other ─ Defer GA4: <Script strategy="afterInteractive" />
      ─ VideoEmbed: replace thumbnail with iframe only on user click
      ─ Run next build --debug to check bundle sizes
      ─ Audit with Lighthouse CI after each deploy
```

---

## 8. Key API Routes

### `app/api/contact/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from 'lib/db';
import { sendContactNotification } from 'lib/email';
import { rateLimit } from 'lib/rate-limit';

const schema = z.object({
  name        : z.string().min(2).max(100),
  phone       : z.string().regex(/^(\+84|0)[0-9]{8,9}$/),
  email       : z.string().email().optional().or(z.literal('')),
  service     : z.enum(['photography', 'videography', 'wedding-film', 'combo']),
  weddingDate : z.string().optional(),
  guestCount  : z.number().int().positive().optional(),
  message     : z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!rateLimit(ip, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ success: false, message: 'Too many requests.' }, { status: 429 });
  }

  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    getDb().prepare(`
      INSERT INTO contacts (name, phone, email, service, wedding_date, guest_count, message, ip_address)
      VALUES (@name, @phone, @email, @service, @weddingDate, @guestCount, @message, @ip)
    `).run({ ...parsed.data, ip });

    await sendContactNotification(parsed.data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/contact]', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
```

### `lib/rate-limit.ts`
```typescript
const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now    = Date.now();
  const record = store.get(key);
  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= limit) return false;
  record.count++;
  return true;
}
```

### `lib/db.ts`
```typescript
import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'database', 'wedding.db');
let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.pragma('synchronous = NORMAL');
  }
  return db;
}
```

### `middleware.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import type { SessionData } from 'lib/auth';

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/admin')) return NextResponse.next();
  if (req.nextUrl.pathname === '/admin') return NextResponse.next();

  const res     = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, {
    cookieName   : 'wedding_session',
    password     : process.env.SESSION_SECRET!,
    cookieOptions: { secure: process.env.NODE_ENV === 'production' },
  });

  if (!session.isLoggedIn) return NextResponse.redirect(new URL('/admin', req.url));
  return res;
}

export const config = { matcher: ['/admin/:path*'] };
```

---

## 9. TypeScript Types (`types/index.ts`)

```typescript
export interface Portfolio {
  id            : number;
  slug          : string;
  title         : string;
  style         : 'vintage' | 'modern' | 'fineart' | 'romantic';
  location_type : 'studio' | 'outdoor' | 'destination';
  studio_slug   : string | null;
  cover_image   : string;
  images        : string[];      // parsed from JSON column
  video_url     : string | null;
  is_featured   : boolean;
  sort_order    : number;
  created_at    : string;
  updated_at    : string;
}

export interface Studio {
  id            : number;
  slug          : string;
  name          : string;
  type          : 'studio' | 'outdoor' | 'destination';
  address       : string | null;
  city          : string;
  description   : string | null;
  highlights    : string[];
  images        : string[];
  map_embed_url : string | null;
  best_time     : string | null;
  is_active     : boolean;
  sort_order    : number;
}

export interface Post {
  id           : number;
  slug         : string;
  title        : string;
  excerpt      : string | null;
  content      : string;           // Markdown
  cover_image  : string | null;
  tags         : string[];
  is_published : boolean;
  published_at : string | null;
  created_at   : string;
}

export interface Contact {
  id           : number;
  name         : string;
  phone        : string;
  email        : string | null;
  service      : 'photography' | 'videography' | 'wedding-film' | 'combo';
  wedding_date : string | null;
  guest_count  : number | null;
  message      : string | null;
  status       : 'new' | 'contacted' | 'booked' | 'completed' | 'cancelled';
  ip_address   : string | null;
  created_at   : string;
}

export interface Testimonial {
  id           : number;
  couple_name  : string;
  content      : string;
  rating       : 1 | 2 | 3 | 4 | 5;
  avatar       : string | null;
  service      : string | null;
  wedding_year : number | null;
  is_active    : boolean;
  sort_order   : number;
}

export interface UploadResult {
  url         : string;       // /uploads/portfolio/abc123.webp
  blurDataUrl : string;       // base64 8×8 blur placeholder
  width       : number;
  height      : number;
}
```

---

## 10. Allowed Dependencies

```jsonc
// No new dependencies without justification in PR description
{
  "dependencies": {
    "next"           : "14.x",
    "react"          : "18.x",
    "react-dom"      : "18.x",
    "better-sqlite3" : "^9.x",
    "sharp"          : "^0.33.x",
    "nodemailer"     : "^6.x",
    "zod"            : "^3.x",
    "iron-session"   : "^8.x",
    "bcryptjs"       : "^2.x"
  },
  "devDependencies": {
    "typescript"             : "^5.x",
    "@types/react"           : "^18.x",
    "@types/node"            : "^20.x",
    "@types/better-sqlite3"  : "^7.x",
    "@types/nodemailer"      : "^6.x",
    "@types/bcryptjs"        : "^2.x",
    "tailwindcss"            : "^3.x",
    "autoprefixer"           : "^10.x",
    "postcss"                : "^8.x"
  }
}
```

**Do NOT install:**
| Banned | Reason | Use instead |
|--------|--------|-------------|
| `prisma` | Heavy, needs migration engine | `better-sqlite3` direct |
| `framer-motion` | Large JS bundle | CSS `transition` + `@keyframes` |
| `axios` | Unnecessary wrapper | Native `fetch` |
| `react-hook-form` | Overkill for 6 fields | `useState` per field |
| `moment.js` | 70 KB minified | `Intl.DateTimeFormat` |
| `react-slick` / `swiper` | Heavy JS slider | CSS `scroll-snap` |
| `cloudinary` SDK | Paid, external | `sharp` local |
| `next-auth` | Heavy, multi-provider | `iron-session` |

---

## 11. Component Contracts

### `HeroVideo`
```
Props  : { src: string; poster: string; title: string; ctaLabel: string; ctaHref: string }
Rules  : native <video autoPlay muted loop playsInline>
         pause video if window.matchMedia('(prefers-reduced-motion: reduce)').matches
         encode command: ffmpeg -i input.mp4 -vf scale=1920:-2 -crf 28 -c:v libx264 -an
                          -movflags +faststart public/videos/hero-bg.mp4
```

### `MasonryGallery`
```
Props  : { items: Portfolio[]; }
Rules  : CSS columns-1 sm:columns-2 lg:columns-3 gap-3
         break-inside-avoid on each item
         first 6 images: priority={true} loading="eager"
         rest: loading="lazy"
         no JS masonry library
```

### `Lightbox`
```
Props  : { images: string[]; initialIndex: number; onClose: () => void }
Rules  : React createPortal into document.body
         keyboard: ArrowLeft ArrowRight Escape
         touch: swipe detection via onTouchStart/onTouchEnd (deltaX > 50px threshold)
         body overflow hidden while open
         role="dialog" aria-modal="true" with focus trap
```

### `VideoEmbed`
```
Props  : { url: string; thumbnail: string; title: string }
Rules  : render <Image> thumbnail + play button overlay initially
         on click: replace with <iframe src="{url}?autoplay=1">
         never load YouTube/Vimeo JS on page load
```

### `GalleryFilter`
```
Props  : none (reads searchParams from URL)
Rules  : filter changes update URL via router.push
         Server Component renders filtered results
         no useState for filter — URL is the source of truth
         valid style values: vintage | modern | fineart | romantic
         valid location values: studio | outdoor | destination
```

---

## 12. Backup & Deploy

### `scripts/backup.sh`
```bash
#!/bin/bash
# Cron: 0 2 * * * /var/www/wedding/scripts/backup.sh >> /var/log/wedding-backup.log 2>&1
set -e
BACKUP_DIR="/var/backups/wedding"
DATE=$(date +%Y-%m-%d_%H%M%S)
mkdir -p "$BACKUP_DIR"

sqlite3 /var/www/wedding/database/wedding.db ".backup '$BACKUP_DIR/wedding_$DATE.db'"
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" -C /var/lib/wedding uploads/

ls -t "$BACKUP_DIR"/*.db     | tail -n +31 | xargs -r rm --
ls -t "$BACKUP_DIR"/*.tar.gz | tail -n +31 | xargs -r rm --
echo "[$DATE] Backup OK"
```

### `scripts/deploy.sh`
```bash
#!/bin/bash
set -e
cd /var/www/wedding
git pull origin main
npm ci --prefer-offline
npm run build
pm2 reload wedding --update-env
echo "Deploy complete: $(date)"
```

---

## 13. First-deploy Checklist

```
[ ] apt update && apt upgrade -y
[ ] curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt install nodejs -y
[ ] npm i -g pm2
[ ] apt install nginx certbot python3-certbot-nginx sqlite3 fail2ban -y
[ ] useradd -m -s /bin/bash deploy
[ ] git clone <repo> /var/www/wedding && chown -R deploy /var/www/wedding
[ ] cp .env.example .env.local  &&  fill all values
[ ] npm ci
[ ] npx tsx scripts/init-db.ts          # create SQLite tables
[ ] npm run build
[ ] pm2 start ecosystem.config.js
[ ] pm2 save && pm2 startup
[ ] cp nginx config → /etc/nginx/sites-available/wedding
[ ] ln -s /etc/nginx/sites-available/wedding /etc/nginx/sites-enabled/
[ ] nginx -t && systemctl reload nginx
[ ] certbot --nginx -d yourdomain.com -d www.yourdomain.com
[ ] ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable
[ ] crontab -e  →  add backup cron line
[ ] curl -I https://yourdomain.com      # expect 200
[ ] Submit sitemap: search.google.com/search-console
[ ] Run Lighthouse: pagespeed.web.dev
```

---

*Self-hosted · Fujitsu · Ubuntu 26 · 4 GB RAM · No src/ · English paths · v2.0*