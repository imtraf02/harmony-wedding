import { CtaBanner } from "@/components/home/cta-banner";
import { PostProductionGrid } from "@/components/post-production/post-production-grid";
import { buildMetadata } from "@/lib/metadata";
import { getPostProductions } from "@/lib/queries/post-production";

export const metadata = buildMetadata({
  title: "Hậu kỳ quay chụp | Video, reels và cinematic edit",
  description:
    "Khám phá các sản phẩm hậu kỳ của Harmony Studio: reels dọc, highlight film, blend màu, retouch và dựng cinematic cho ảnh cưới, phim cưới.",
  path: "/post-production",
});

export const dynamic = "force-dynamic";

export default async function PostProductionPage() {
  const items = getPostProductions({ activeOnly: true });

  return (
    <div className="min-h-screen bg-luxury">
      <section className="pt-24 pb-0 md:pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div
            aria-hidden="true"
            className="mb-6 flex animate-fade-in-up-luxury items-center gap-6 md:mb-16"
          >
            <span className="h-px flex-1 bg-linear-to-r from-transparent to-luxury-border" />
            <span className="block h-1.5 w-1.5 shrink-0 rotate-45 border border-obsidian-400" />
            <span className="shrink-0 font-bold text-[8px] text-mist uppercase tracking-[0.32em]">
              Post Production
            </span>
            <span className="block h-1.5 w-1.5 shrink-0 rotate-45 border border-obsidian-400" />
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-luxury-border" />
          </div>

          <div className="mx-auto mb-12 max-w-3xl animate-fade-in-up-luxury text-center md:mb-20">
            <p className="mb-5 text-label-luxury text-obsidian">Hậu kỳ</p>

            <h1
              className="mb-8 font-light font-sans text-obsidian leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)" }}
            >
              Video, reels và{" "}
              <em className="text-obsidian-600 not-italic">cinematic edit</em>
            </h1>

            <p
              className="mx-auto max-w-xl font-light text-smoke leading-relaxed"
              style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)" }}
            >
              Không gian riêng cho các sản phẩm hậu kỳ quay chụp: dựng teaser,
              xử lý màu, retouch và các format video dọc tối ưu cho mạng xã hội.
            </p>
          </div>

          <PostProductionGrid items={items} />
        </div>
      </section>

      <div className="mt-40">
        <CtaBanner />
      </div>
    </div>
  );
}
