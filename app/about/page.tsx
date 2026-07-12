import type { Metadata } from "next";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { TeamGrid } from "@/components/about/team-grid";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

import { MeshGradient } from "@/components/ui/mesh-gradient";
import { GlassCard } from "@/components/ui/glass-card";
import { getInfoData } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const infoData = await getInfoData();
  return {
    title: infoData.about.seo.title,
    description: infoData.about.seo.description,
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title: infoData.about.seo.title,
      description: infoData.about.seo.description,
      url: "/about",
      images: [
        {
          url: "/images/home/about-us.webp",
          width: 1200,
          height: 630,
          alt: "Đội ngũ Harmony Wedding - Studio cưới cao cấp Đồng Nai",
        },
      ],
    },
  };
}

export async function AboutPage() {
  const infoData = await getInfoData();
  const about = infoData.about;

  return (
    <main className="bg-[#fcfbfc] text-black min-h-screen relative overflow-hidden" id="top">
      <Header variant="solid" />
      <MeshGradient variant="light" className="opacity-75" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Về Chúng Tôi", href: "/about" },
        ]}
      />

      {/* Editorial Hero (Typography-First) */}
      <section className="pt-32 md:pt-44 bg-transparent pb-16 md:pb-24 relative z-10">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-16">
          <p className="mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
            {about.eyebrow}
            <span className="h-px w-16 bg-neutral-300" />
          </p>
          <h1 className="font-serif text-[clamp(3.2rem,10vw,5.5rem)] leading-[1.12] text-black max-w-4xl tracking-tight">
            {about.title}
          </h1>

          <GlassCard
            variant="light"
            intensity="low"
            borderStrength="low"
            className="mt-12 p-8 md:p-12 border border-white/40 shadow-xs rounded-3xl"
          >
            <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] items-center">
              <div>
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-neutral-800 italic">
                  {about.quote}
                </p>
              </div>
              <div>
                <p className="text-sm leading-7 text-neutral-600 font-light border-l border-black/5 pl-6">
                  {about.extendedBio}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Team Profile Grid */}
      <TeamGrid members={about.team} />

      <Footer />
    </main>
  );
}

export default AboutPage;
