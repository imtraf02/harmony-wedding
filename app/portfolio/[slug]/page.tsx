import { notFound } from 'next/navigation';
import { getPortfolioBySlug } from '@/lib/queries/portfolio';
import { buildMetadata }      from '@/lib/metadata';
import { Breadcrumb }         from '@/components/shared/Breadcrumb';
import { SectionTitle }       from '@/components/shared/SectionTitle';
import { OptimizedImage }     from '@/components/shared/OptimizedImage';
import { VideoEmbed }         from '@/components/shared/VideoEmbed';
import { CtaBanner }          from '@/components/home/CtaBanner';
import { PortfolioAlbum }     from '@/components/portfolio/PortfolioAlbum';

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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumb 
          items={[
            { name: 'Portfolio', path: '/portfolio' },
            { name: portfolio.title, path: `/portfolio/${slug}` }
          ]} 
        />

        <section className="mt-12">
          <SectionTitle
            eyebrow={STYLE_MAP[portfolio.style] || portfolio.style}
            title={portfolio.title}
            subtitle={portfolio.location_type ? `Địa điểm: ${LOCATION_MAP[portfolio.location_type] || portfolio.location_type}` : undefined}
          />

          {/* Hero Image / Video */}
          <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden mb-16 shadow-2xl">
            {portfolio.video_url ? (
              <VideoEmbed 
                url={portfolio.video_url} 
                thumbnail={portfolio.cover_image} 
                title={portfolio.title} 
              />
            ) : (
              <OptimizedImage
                src={portfolio.cover_image}
                alt={portfolio.title}
                fill
                priority
              />
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
