import type { Metadata } from "next";

import { BlogListing } from "@/components/blog/blog-listing";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { MeshGradient } from "@/components/ui/mesh-gradient";

import { getBlogCategories, getBlogPosts } from "@/lib/content";
import blogData from "@/data/blog.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: blogData.seo.title,
    description: blogData.seo.description,
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: "Cẩm Nang Cưới | Harmony Wedding",
      description: "Chia sẻ bí quyết chụp ảnh cưới, xu hướng trang điểm cô dâu, tư vấn phục trang và địa điểm cưới đẹp.",
      url: "/blog",
      images: [
        {
          url: "/images/home/hero-banner.webp",
          width: 1200,
          height: 630,
          alt: "Cẩm nang cưới Harmony Wedding - Lưu giữ khoảnh khắc trọn đời",
        },
      ],
    },
  };
}

export async function BlogPage() {
  const posts = await getBlogPosts();
  const categories = await getBlogCategories();

  return (
    <main className="bg-[#fcfbfc] text-black min-h-screen relative overflow-hidden" id="top">
      <Header variant="solid" />
      <MeshGradient variant="light" className="opacity-75" />

      {/* Hero banner section */}
      <section className="relative overflow-hidden bg-neutral-950 pt-[10.5rem] pb-20 text-center text-white md:pt-[13rem] md:pb-28">
        <MeshGradient variant="dark" className="opacity-40" />
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-neutral-800 to-black" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 z-10">
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-neutral-400">
            Harmony Journal
          </span>
          <h1 className="mt-3 font-serif text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.1] text-white tracking-tight">
            Cẩm Nang Cưới
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-xs leading-relaxed tracking-wider text-neutral-300 uppercase md:text-sm font-light">
            Những câu chuyện tình yêu, kinh nghiệm chuẩn bị ngày cưới và bí quyết
            giữ trọn khoảnh khắc tự nhiên.
          </p>
        </div>
      </section>

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Cẩm Nang Cưới", href: "/blog" },
        ]}
      />

      <BlogListing posts={posts} categories={categories} />

      <Footer />
    </main>
  );
}

export default BlogPage;
