import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/service-detail";
import { buildMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/lib/queries/services";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Quay phim Cinematic | Harmony Studio",
  description:
    "Dịch vụ quay phim điện ảnh cưới chuyên nghiệp, kể câu chuyện tình yêu qua từng thước phim.",
  path: "/services/videography",
});

export default function VideographyPage() {
  const service = getServiceBySlug("videography");

  if (!service?.is_active) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
