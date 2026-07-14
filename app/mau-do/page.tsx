import type { Metadata } from "next";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { MauDoGallery, type MauDoItem } from "@/components/mau-do/mau-do-gallery";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { MeshGradient } from "@/components/ui/mesh-gradient";

import { getWardrobeData } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const wardrobe = await getWardrobeData();
  return {
    title: wardrobe.seo.title,
    description: wardrobe.seo.description,
    alternates: {
      canonical: "/mau-do",
    },
    openGraph: {
      title: wardrobe.seo.title,
      description: wardrobe.seo.description,
      url: "/mau-do",
      images: [
        {
          url: "/images/mau-do/vay-cuoi-001.webp",
          width: 1200,
          height: 1600,
          alt: "Bộ sưu tập trang phục cưới Harmony Soiree & Veston",
        },
      ],
    },
  };
}

export async function MauDoPage() {
  const wardrobe = await getWardrobeData();
  const resolvedItems: MauDoItem[] = wardrobe.images;

  return (
    <main className="bg-[#fcfbfc] text-black min-h-screen relative overflow-hidden" id="top">
      <Header variant="solid" />
      <MeshGradient variant="light" className="opacity-75" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Mẫu Đồ Thiết Kế", href: "/mau-do" },
        ]}
      />

      {/* Hero Header */}
      <div className="pt-32 md:pt-44 bg-transparent relative z-10">
        <div className="mx-auto max-w-[1500px] px-5 py-12 md:px-10 lg:px-16 text-center">
          <p className="mb-4 flex items-center justify-center gap-4 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
            {wardrobe.subtitle}
          </p>
          <h1 className="font-serif text-[clamp(2.8rem,10vw,5.5rem)] leading-[1.18] text-black tracking-tight">
            {wardrobe.title}
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-[0.92rem] leading-7 text-neutral-600 font-light">
            {wardrobe.description}
          </p>
        </div>
      </div>

      <MauDoGallery items={resolvedItems} />
      <Footer />
    </main>
  );
}

export default MauDoPage;
