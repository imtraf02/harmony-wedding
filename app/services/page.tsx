import { CtaBanner } from "@/components/home/cta-banner";
import { ServiceShowcase } from "@/components/services/service-showcase";
import { buildMetadata } from "@/lib/metadata";
import { getActiveServices } from "@/lib/queries/services";

export const metadata = buildMetadata({
  title: "Dịch vụ & Báo giá | Harmony Studio",
  description:
    "Khám phá các nhóm dịch vụ chính tại Harmony Wedding: Gói ngày cưới, Chụp ảnh Album Pre-wedding và các dịch vụ thuê lẻ.",
  path: "/services",
});

export const dynamic = "force-dynamic";

export default function ServicesPage() {
  const services = getActiveServices();

  return (
    <div className="min-h-screen bg-luxury">
      <section className="pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="mx-auto mb-24 max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-obsidian/50" />
              <span className="font-bold text-[10px] text-obsidian uppercase tracking-[0.3em]">
                Harmony Wedding
              </span>
              <span className="h-px w-8 bg-obsidian/50" />
            </div>
            <h1 className="mb-8 font-light font-sans text-4xl text-obsidian leading-tight tracking-tight md:text-6xl">
              Hệ thống <em className="text-obsidian-600 not-italic">Dịch vụ</em>{" "}
              của chúng tôi
            </h1>
            <p className="font-light text-lg text-smoke leading-relaxed">
              Mỗi nhóm dịch vụ được thiết kế để đáp ứng chính xác nhu cầu và
              ngân sách của bạn, đảm bảo sự trọn vẹn trong ngày cưới.
            </p>
          </div>

          <ServiceShowcase services={services} />
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
