import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/service-detail";
import { buildMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/lib/queries/services";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Phóng sự cưới (Wedding Journal) | Harmony Studio",
  description:
    "Dịch vụ quay phim và chụp ảnh phóng sự cưới, ghi lại những cảm xúc chân thực nhất.",
  path: "/services/wedding-film",
});

export default function WeddingFilmPage() {
  const service = getServiceBySlug("wedding-film");

  if (!service?.is_active) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
