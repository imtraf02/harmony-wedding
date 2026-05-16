import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/home/cta-banner";
import { PortfolioAlbum } from "@/components/portfolio/portfolio-album";
import { AutoScrollAnchor } from "@/components/shared/auto-scroll-anchor";
import {
  breadcrumbSchema,
  JsonLd,
  portfolioSchema,
} from "@/components/shared/json-ld";
import { SectionTitle } from "@/components/shared/section-title";
import { VideoEmbed } from "@/components/shared/video-embed";
import { buildMetadata } from "@/lib/metadata";
import { getPortfolioBySlug } from "@/lib/queries/portfolio";

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

const STYLE_MAP: Record<string, string> = {
  vintage: "Cổ điển",
  modern: "Hiện đại",
  fineart: "Nghệ thuật",
  romantic: "Lãng mạn",
};

const LOCATION_MAP: Record<string, string> = {
  studio: "Phòng Studio",
  outdoor: "Ngoại cảnh",
  destination: "Điểm du lịch",
};

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const portfolio = getPortfolioBySlug(slug);

  if (!portfolio) return {};

  return buildMetadata({
    title: `${portfolio.title} | Portfolio`,
    description: `Xem câu chuyện đám cưới phong cách ${STYLE_MAP[portfolio.style] || portfolio.style} của ${portfolio.title}. Được ghi lại bởi Harmony Studio.`,
    path: `/portfolio/${slug}`,
    image: portfolio.cover_image,
  });
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const portfolio = getPortfolioBySlug(slug);

  if (!portfolio) notFound();

  const portfolioStyle = STYLE_MAP[portfolio.style] || portfolio.style;
  const portfolioLocation = portfolio.location_type
    ? LOCATION_MAP[portfolio.location_type] || portfolio.location_type
    : undefined;

  return (
    <div className="bg-background pt-32">
      <JsonLd data={portfolioSchema(portfolio)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: portfolio.title, path: `/portfolio/${portfolio.slug}` },
        ])}
      />

      {portfolio.video_url ? (
        <>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <section className="mt-12">
              <SectionTitle
                eyebrow={portfolioStyle}
                title={portfolio.title}
                subtitle={
                  portfolioLocation
                    ? `Địa điểm: ${portfolioLocation}`
                    : undefined
                }
              />
            </section>
          </div>

          <section className="mx-auto mt-4 max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="mb-20 overflow-hidden bg-whisper shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portfolio.cover_image}
                alt={`${portfolio.title} cover`}
                className="h-auto max-h-[82vh] w-full object-cover"
              />
            </div>
          </section>

          <AutoScrollAnchor targetId="portfolio-video" />
          <section
            id="portfolio-video"
            className="relative scroll-mt-28 overflow-hidden bg-obsidian text-ivory"
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(1_0_0/0.12),transparent_42%),linear-gradient(180deg,oklch(0_0_0/0.88),oklch(0_0_0/0.98))]"
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 md:py-20 lg:px-12">
              <div className="mb-8 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-white/45" aria-hidden="true" />
                    <p className="font-medium text-[10px] text-white/70 uppercase tracking-[0.24em]">
                      Teaser Film
                    </p>
                  </div>
                  <h2 className="font-light text-[clamp(2rem,4vw,3.8rem)] leading-[1.05] tracking-[-0.01em]">
                    Khoảnh khắc mở đầu
                  </h2>
                </div>

                <div className="border-white/15 border-t pt-4 md:w-80">
                  <p className="text-[10px] text-white/50 uppercase tracking-[0.24em]">
                    Couple Preview
                  </p>
                  <p className="mt-2 font-light text-sm text-white/85 leading-7">
                    Một lát cắt điện ảnh riêng cho cặp đôi, độc lập với album
                    hình ảnh bên dưới.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden border border-white/10 bg-black shadow-2xl">
                <div className="aspect-video w-full lg:aspect-[21/9]">
                  <VideoEmbed url={portfolio.video_url} title="Teaser Film" />
                </div>
              </div>

              <div className="mt-6 flex flex-col justify-between gap-4 border-white/10 border-t pt-6 text-white/50 text-xs uppercase tracking-[0.22em] sm:flex-row">
                <span>Wedding Film</span>
                <span>Harmony Studio</span>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <section className="mt-20">
              <PortfolioAlbum
                images={portfolio.images}
                title={portfolio.title}
              />
            </section>
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <section className="mt-12">
            <SectionTitle
              eyebrow={portfolioStyle}
              title={portfolio.title}
              subtitle={
                portfolioLocation ? `Địa điểm: ${portfolioLocation}` : undefined
              }
            />

            <div className="mb-16 flex w-full justify-center">
              <div className="overflow-hidden rounded-3xl bg-whisper shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portfolio.cover_image}
                  alt={portfolio.title}
                  className="h-auto max-h-[85vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>

            <PortfolioAlbum images={portfolio.images} title={portfolio.title} />
          </section>
        </div>
      )}
      <div className="mt-24">
        <CtaBanner />
      </div>
    </div>
  );
}
