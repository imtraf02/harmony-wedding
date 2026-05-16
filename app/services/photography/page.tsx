import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/service-detail";
import { buildMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/lib/queries/services";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Chụp ảnh cưới (Pre-Wedding) | Harmony Studio",
  description:
    "Dịch vụ chụp ảnh cưới chuyên nghiệp, lưu giữ những khoảnh khắc hạnh phúc nhất của cặp đôi.",
  path: "/services/photography",
});

export default function PhotographyPage() {
  const service = getServiceBySlug("photography");

  if (!service?.is_active) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
