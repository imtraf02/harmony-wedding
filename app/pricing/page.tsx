import type { Metadata } from "next";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { PricingGallery, type PricingImage } from "@/components/pricing/pricing-gallery";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { MeshGradient } from "@/components/ui/mesh-gradient";

import { getPricingData } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const pricingData = await getPricingData();
  return {
    title: pricingData.seo.title,
    description: pricingData.seo.description,
    alternates: {
      canonical: "/pricing",
    },
    openGraph: {
      title: pricingData.seo.title,
      description: pricingData.seo.description,
      url: "/pricing",
      images: [
        {
          url: "/images/bang-gia/1.jpg",
          width: 1200,
          height: 1600,
          alt: "Bảng giá dịch vụ cưới Harmony Wedding",
        },
      ],
    },
  };
}

export async function PricingPage() {
  const pricingData = await getPricingData();
  const resolvedImages: PricingImage[] = pricingData.images;

  return (
    <main className="bg-[#fcfbfc] text-black min-h-screen relative overflow-hidden" id="top">
      <Header variant="solid" />
      <MeshGradient variant="light" className="opacity-75" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Bảng Giá", href: "/pricing" },
        ]}
      />

      <div className="pt-32 md:pt-44 bg-transparent relative z-10">
        <div className="mx-auto max-w-[1500px] px-5 py-12 md:px-10 lg:px-16 text-center">
          <h1 className="font-serif text-[clamp(3.2rem,14vw,6.5rem)] leading-[1.1] text-black tracking-tight">
            {pricingData.title}
          </h1>
          <p className="mt-6 mx-auto max-w-lg text-[0.92rem] leading-7 text-neutral-600 font-light">
            {pricingData.description}
          </p>
        </div>
      </div>
      <PricingGallery images={resolvedImages} />
      <Footer />
    </main>
  );
}

export default PricingPage;
