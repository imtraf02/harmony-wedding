import { Suspense } from 'react';
import { getPortfolios } from '@/lib/queries/portfolio';
import { buildMetadata } from '@/lib/metadata';
import { Breadcrumb }    from '@/components/shared/Breadcrumb';
import { SectionTitle }  from '@/components/shared/SectionTitle';
import { GalleryFilter } from '@/components/portfolio/GalleryFilter';
import { MasonryGallery } from '@/components/portfolio/MasonryGallery';
import { CtaBanner }     from '@/components/home/CtaBanner';

export const metadata = buildMetadata({
  title      : 'Portfolio | Những câu chuyện tình yêu qua ống kính',
  description: 'Khám phá bộ sưu tập những khoảnh khắc cưới vượt thời gian. Lọc theo phong cách (Cổ điển, Hiện đại, Nghệ thuật) hoặc địa điểm.',
  path       : '/portfolio',
});

interface PortfolioPageProps {
  searchParams: Promise<{
    style?   : string;
    location?: string;
  }>;
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const { style, location } = await searchParams;
  
  // Fetch filtered portfolios
  const items = getPortfolios({ 
    style    : style || undefined, 
    location : location || undefined 
  });

  return (
    <div className="pt-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumb items={[{ name: 'Portfolio', path: '/portfolio' }]} />

        <section className="mt-12">
          <SectionTitle
            eyebrow="Bộ sưu tập"
            title="Những khoảnh khắc được ghi lại"
            subtitle="Mỗi đám cưới là một câu chuyện độc nhất. Hãy duyệt qua portfolio của chúng tôi để tìm thấy phong cách phù hợp nhất với bạn."
          />

          <Suspense fallback={<div className="h-20 animate-pulse bg-muted rounded-full w-full max-w-2xl mx-auto mb-16" />}>
            <GalleryFilter />
          </Suspense>

          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          }>
            <MasonryGallery items={items} />
          </Suspense>
        </section>
      </div>

      <div className="mt-24">
        <CtaBanner />
      </div>
    </div>
  );
}
