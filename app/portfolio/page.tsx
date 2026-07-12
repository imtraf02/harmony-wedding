import type { Metadata } from "next";

import { Footer } from "@/components/home/footer";
import { AlbumGrid } from "@/components/album/album-grid";
import { AlbumHero } from "@/components/album/album-hero";
import { AlbumValues } from "@/components/album/album-values";
import { FeaturedAlbum } from "@/components/album/featured-album";
import { Header } from "@/components/home/header";
import { BreadcrumbJsonLd, ImageGalleryJsonLd } from "@/components/seo/json-ld";

import { getAlbums, getShowcaseItems } from "@/lib/content";
import { MeshGradient } from "@/components/ui/mesh-gradient";
import portfolioData from "@/data/portfolio.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
    alternates: {
      canonical: "/portfolio",
    },
    openGraph: {
      title: "Album Ảnh Cưới Đẹp | Harmony Wedding",
      description: "Bộ sưu tập album ảnh cưới cao cấp: ngoại cảnh Đà Lạt, Sunny Garden, An Garden, studio concept và đường phố Sài Gòn.",
      url: "/portfolio",
      images: [
        {
          url: portfolioData.hero.image,
          width: 1200,
          height: 630,
          alt: portfolioData.hero.alt,
        },
      ],
    },
  };
}

export async function AlbumPage() {
  const resolvedAlbums = await getAlbums();
  const resolvedFeaturedImages = await getShowcaseItems("featured_album_image");

  const heroImage = portfolioData.hero.image;
  const leftImage = portfolioData.hero.leftImage;
  const rightImage = portfolioData.hero.rightImage;

  return (
    <main className="bg-[#fcfbfc] text-black min-h-screen relative overflow-hidden" id="top">
      <Header variant="solid" />
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
        images={resolvedAlbums.map((item) => ({
          url: item.image,
          caption: item.alt,
        }))}
      />

      <AlbumHero
        heroImage={heroImage}
        heroAlt={portfolioData.hero.alt}
        leftImage={leftImage}
        rightImage={rightImage}
      />
      <AlbumGrid items={resolvedAlbums} />
      <FeaturedAlbum images={resolvedFeaturedImages} />
      <AlbumValues />
      <Footer />
    </main>
  );
}

export default AlbumPage;
