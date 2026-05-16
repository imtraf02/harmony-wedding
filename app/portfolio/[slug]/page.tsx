import { notFound } from 'next/navigation';
import { getPortfolioBySlug } from '@/lib/queries/portfolio';
import { buildMetadata }      from '@/lib/metadata';
import { SectionTitle }       from '@/components/shared/section-title';
import { VideoEmbed }         from '@/components/shared/video-embed';
import { CtaBanner }          from '@/components/home/cta-banner';
import { PortfolioAlbum }     from '@/components/portfolio/portfolio-album';
import { JsonLd, breadcrumbSchema, portfolioSchema } from '@/components/shared/json-ld';

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

const STYLE_MAP: Record<string, string> = {
  vintage : 'Cổ điển',
  modern  : 'Hiện đại',
  fineart : 'Nghệ thuật',
  romantic: 'Lãng mạn',
};

const LOCATION_MAP: Record<string, string> = {
  studio     : 'Phòng Studio',
  outdoor    : 'Ngoại cảnh',
  destination: 'Điểm du lịch',
};

export async function generateMetadata({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const portfolio = getPortfolioBySlug(slug);

  if (!portfolio) return {};

  return buildMetadata({
    title      : `${portfolio.title} | Portfolio`,
    description: `Xem câu chuyện đám cưới phong cách ${STYLE_MAP[portfolio.style] || portfolio.style} của ${portfolio.title}. Được ghi lại bởi Harmony Studio.`,
    path       : `/portfolio/${slug}`,
    image      : portfolio.cover_image,
  });
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const portfolio = getPortfolioBySlug(slug);

  if (!portfolio) notFound();

  return (
    <div className="pt-32 bg-background">
      <JsonLd data={portfolioSchema(portfolio)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Trang chủ', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: portfolio.title, path: `/portfolio/${portfolio.slug}` },
        ])}
      />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">


        <section className="mt-12">
          <SectionTitle
            eyebrow={STYLE_MAP[portfolio.style] || portfolio.style}
            title={portfolio.title}
            subtitle={portfolio.location_type ? `Địa điểm: ${LOCATION_MAP[portfolio.location_type] || portfolio.location_type}` : undefined}
          />

          {/* Hero Image / Video */}
          <div className="flex justify-center w-full mb-16">
            {portfolio.video_url ? (
              <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
                <VideoEmbed 
                  url={portfolio.video_url} 
                  thumbnail={portfolio.cover_image} 
                  title={portfolio.title} 
                />
              </div>
            ) : (
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-whisper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portfolio.cover_image}
                  alt={portfolio.title}
                  className="w-auto max-w-full h-auto max-h-[85vh] object-contain"
                />
              </div>
            )}
          </div>

          {/* Album Grid */}
          <PortfolioAlbum images={portfolio.images} title={portfolio.title} />
        </section>
      </div>

      <div className="mt-24">
        <CtaBanner />
      </div>
    </div>
  );
}
