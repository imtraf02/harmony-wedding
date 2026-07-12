import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AlbumDetailView } from "@/components/album/album-detail-view";
import { Header } from "@/components/home/header";
import {
  BreadcrumbJsonLd,
  ImageGalleryJsonLd,
} from "@/components/seo/json-ld";
import { getAlbumDetail, getAlbums } from "@/lib/content";

interface AlbumDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const albums = await getAlbums();
  return albums.map((album) => ({
    slug: album.slug,
  }));
}

export async function generateMetadata({
  params,
}: AlbumDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbumDetail(slug);

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
  const album = await getAlbumDetail(slug);

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
