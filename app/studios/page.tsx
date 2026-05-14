import { buildMetadata } from '@/lib/metadata';
import { Breadcrumb }    from '@/components/shared/Breadcrumb';
import { SectionTitle }  from '@/components/shared/SectionTitle';
import { CtaBanner }     from '@/components/home/CtaBanner';

export const metadata = buildMetadata({
  title      : 'Hệ thống Studio | Không gian sáng tạo của chúng tôi',
  description: 'Khám phá các không gian studio hiện đại và đầy cảm hứng của Harmony Studio tại các thành phố lớn.',
  path       : '/studios',
});

export default function StudiosPage() {
  return (
    <div className="pt-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <Breadcrumb items={[{ name: 'Studio', path: '/studios' }]} />

        <section className="mt-12 mb-24">
          <SectionTitle
            eyebrow="Hệ thống cơ sở"
            title="Không gian sáng tạo"
            subtitle="Chúng tôi sở hữu hệ thống phòng studio hiện đại, được thiết kế để mang lại trải nghiệm thoải mái và những khung hình đẹp nhất cho khách hàng."
          />
          
          <div className="text-center py-24 bg-card rounded-3xl border border-border">
            <p className="text-muted-foreground italic">Nội dung chi tiết về các cơ sở đang được cập nhật...</p>
          </div>
        </section>
      </div>

      <CtaBanner />
    </div>
  );
}
