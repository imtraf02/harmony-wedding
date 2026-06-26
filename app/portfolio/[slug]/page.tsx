import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readdirSync, readFileSync } from "fs";
import path from "path";

import { AlbumDetailView } from "@/components/album/album-detail-view";
import { Header } from "@/components/home/header";
import {
  BreadcrumbJsonLd,
  ImageGalleryJsonLd,
} from "@/components/seo/json-ld";
import {
  albumDetails,
  albumItems,
} from "@/constants/data";
import type { AlbumDetail } from "@/types/home";

interface AlbumDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function readWebpDimensions(filePath: string) {
  try {
    const buffer = readFileSync(filePath);

    if (
      buffer.toString("ascii", 0, 4) !== "RIFF" ||
      buffer.toString("ascii", 8, 12) !== "WEBP"
    ) {
      return undefined;
    }

    let offset = 12;

    while (offset + 8 <= buffer.length) {
      const chunkType = buffer.toString("ascii", offset, offset + 4);
      const chunkSize = buffer.readUInt32LE(offset + 4);
      const dataOffset = offset + 8;

      if (chunkType === "VP8 " && dataOffset + 10 <= buffer.length) {
        return {
          width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
          height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
        };
      }

      if (chunkType === "VP8L" && dataOffset + 5 <= buffer.length) {
        const byte1 = buffer[dataOffset + 1];
        const byte2 = buffer[dataOffset + 2];
        const byte3 = buffer[dataOffset + 3];
        const byte4 = buffer[dataOffset + 4];

        return {
          width: 1 + (((byte2 & 0x3f) << 8) | byte1),
          height: 1 + (((byte4 & 0x0f) << 10) | (byte3 << 2) | ((byte2 & 0xc0) >> 6)),
        };
      }

      if (chunkType === "VP8X" && dataOffset + 10 <= buffer.length) {
        return {
          width:
            1 +
            buffer[dataOffset + 4] +
            (buffer[dataOffset + 5] << 8) +
            (buffer[dataOffset + 6] << 16),
          height:
            1 +
            buffer[dataOffset + 7] +
            (buffer[dataOffset + 8] << 8) +
            (buffer[dataOffset + 9] << 16),
        };
      }

      offset = dataOffset + chunkSize + (chunkSize % 2);
    }
  } catch {}

  return undefined;
}

function getWeddingImageFolder(imagePath: string) {
  const prefix = "/images/wedding/";
  const relativePath = imagePath.startsWith(prefix)
    ? imagePath.slice(prefix.length)
    : "";

  return relativePath.includes("/") ? relativePath.split("/")[0] : "";
}

function listAlbumGallery(folder: string, baseAlt: string) {
  const prefix = "/images/wedding/";

  try {
    const dir = path.join(process.cwd(), "public/images/wedding", folder);
    const files = readdirSync(dir)
      .filter((file) => file.endsWith(".webp"))
      .sort((a, b) => {
        const aNumber = Number.parseInt(a, 10);
        const bNumber = Number.parseInt(b, 10);

        if (Number.isNaN(aNumber) || Number.isNaN(bNumber)) {
          return a.localeCompare(b);
        }

        return aNumber - bNumber;
      });

    return files.map((file, index) => {
      const image = `${prefix}${folder}/${file}`;
      const dimensions = readWebpDimensions(path.join(dir, file));
      const imageNumber = index + 1;

      return {
        image,
        alt: baseAlt.replace(" - Harmony Wedding", ` - Ảnh ${imageNumber}`),
        featured: index === 0,
        width: dimensions?.width,
        height: dimensions?.height,
      };
    });
  } catch {}

  return [];
}

function getAlbumDetail(slug: string): AlbumDetail | undefined {
  const detail = albumDetails.find((album) => album.slug === slug);

  if (detail) {
    const folder = getWeddingImageFolder(detail.heroImage);
    const gallery = listAlbumGallery(folder, detail.heroAlt);

    return {
      ...detail,
      gallery: gallery.length > 0 ? gallery : detail.gallery,
      imageCount: gallery.length > 0 ? `${gallery.length} ảnh` : detail.imageCount,
    };
  }

  const item = albumItems.find((album) => album.slug === slug);

  if (!item) {
    return undefined;
  }

  const folder = getWeddingImageFolder(item.image);
  const galleryImages = listAlbumGallery(folder, item.alt);

  return {
    slug: item.slug,
    eyebrow: item.category,
    title: item.title,
    scriptTitle: "Tình Yêu",
    description:
      "Một bộ ảnh được xây dựng bằng cảm xúc tự nhiên, ánh sáng tinh tế và những khoảnh khắc chỉ thuộc về hai bạn.",
    imageCount: `${galleryImages.length} ảnh`,
    location: item.location,
    heroImage: item.image,
    heroAlt: item.alt,
    gallery: galleryImages,
    info: [
      {
        title: "Địa điểm",
        description: item.location,
        icon: "location",
      },
      {
        title: "Phong cách",
        description: "Tự nhiên, Lãng mạn",
        icon: "heart",
      },
    ],
  };
}

export function generateStaticParams() {
  const slugs = new Set([
    ...albumItems.map((album) => album.slug),
    ...albumDetails.map((album) => album.slug),
  ]);

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AlbumDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const album = getAlbumDetail(slug);

  if (!album) {
    return {
      title: "Album không tồn tại | Harmony Wedding",
    };
  }

  return {
    title: `Album Ảnh Cưới ${album.title} - ${album.scriptTitle}`,
    description: album.description,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    openGraph: {
      title: `Album Ảnh Cưới ${album.title} | Harmony Wedding`,
      description: album.description,
      url: `/portfolio/${slug}`,
      images: [
        {
          url: album.heroImage,
          width: 1200,
          height: 630,
          alt: album.heroAlt,
        },
      ],
    },
  };
}

export async function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  const { slug } = await params;
  const album = getAlbumDetail(slug);

  if (!album) {
    notFound();
  }

  return (
    <main className="bg-white text-black">
      <Header variant="solid" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Album Cưới", href: "/portfolio" },
          { name: album.title, href: `/portfolio/${album.slug}` },
        ]}
      />
      <ImageGalleryJsonLd
        name={`Album Ảnh Cưới ${album.title} - Harmony Wedding`}
        description={album.description}
        images={album.gallery.slice(0, 10).map((img) => ({
          url: img.image,
          caption: img.alt,
        }))}
      />

      <AlbumDetailView album={album} />
    </main>
  );
}

export default AlbumDetailPage;
