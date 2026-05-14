import { buildMetadata } from '@/lib/metadata';
import { Breadcrumb }    from '@/components/shared/breadcrumb';
import { SectionTitle }  from '@/components/shared/section-title';
import { CtaBanner }     from '@/components/home/cta-banner';

export const metadata = buildMetadata({
  title      : 'Báo giá dịch vụ | Gói chụp ảnh & Quay phim cưới',
  description: 'Tham khảo bảng giá chi tiết các gói dịch vụ nhiếp ảnh và quay phim cưới của Harmony Studio.',
  path       : '/pricing',
});

export default function PricingPage() {
  return (
    <div className="pt-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumb items={[{ name: 'Bảng giá', path: '/pricing' }]} />

        <section className="mt-12 mb-24">
          <SectionTitle
            eyebrow="Chi phí & Dịch vụ"
            title="Báo giá chi tiết"
            subtitle="Chúng tôi cung cấp các gói dịch vụ đa dạng, phù hợp với mọi nhu cầu và ngân sách của các cặp đôi."
          />
          
          <div className="text-center py-24 bg-card rounded-3xl border border-border">
            <p className="text-muted-foreground italic">Bảng giá chi tiết đang được cập nhật...</p>
          </div>
        </section>
      </div>

      <CtaBanner />
    </div>
  );
}
