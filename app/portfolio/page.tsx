import type { Metadata } from "next";

import { Footer } from "@/components/home/footer";
import { AlbumGrid } from "@/components/album/album-grid";
import { AlbumHero } from "@/components/album/album-hero";
import { AlbumValues } from "@/components/album/album-values";
import { FeaturedAlbum } from "@/components/album/featured-album";
import { Header } from "@/components/home/header";
import { BreadcrumbJsonLd, ImageGalleryJsonLd } from "@/components/seo/json-ld";
import { albumItems } from "@/constants/data";

import { MeshGradient } from "@/components/ui/mesh-gradient";

export const metadata: Metadata = {
  title: "Album Ảnh Cưới Đẹp - Tác Phẩm Ngoại Cảnh & Studio",
  description:
    "Bộ sưu tập album ảnh cưới đẹp của Harmony Wedding: ảnh cưới ngoại cảnh Đà Lạt, Sunny Garden, An Garden, studio concept và đường phố Hồ Chí Minh.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Album Ảnh Cưới Đẹp | Harmony Wedding",
    description:
      "Bộ sưu tập album ảnh cưới cao cấp: ngoại cảnh Đà Lạt, Sunny Garden, studio concept và đường phố Sài Gòn.",
    url: "/portfolio",
    images: [
      {
        url: "/images/home/album-1.webp",
        width: 1200,
        height: 630,
        alt: "Album ảnh cưới Harmony Wedding - Bộ sưu tập tác phẩm",
      },
    ],
  },
};

export function AlbumPage() {
  return (
    <main className="bg-[#fcfbfc] text-black min-h-screen relative overflow-hidden" id="top">
      <Header variant="solid" />
      {/* Light moving mesh gradient background */}
      <MeshGradient variant="light" className="opacity-75" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Album Cưới", href: "/portfolio" },
        ]}
      />
      <ImageGalleryJsonLd
        name="Album Ảnh Cưới Harmony Wedding"
        description="Bộ sưu tập album ảnh cưới nghệ thuật từ Harmony Wedding"
        images={albumItems.map((item) => ({
          url: item.image,
          caption: item.alt,
        }))}
      />

      <AlbumHero />
      <AlbumGrid />
      <FeaturedAlbum />
      <AlbumValues />
      <Footer />
    </main>
  );
}

export default AlbumPage;
