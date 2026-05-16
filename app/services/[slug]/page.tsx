import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/service-detail";
import { buildMetadata } from "@/lib/metadata";
import { getServiceBySlug } from "@/lib/queries/services";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return buildMetadata({
      title: "Dịch vụ | Harmony Studio",
      description: "Dịch vụ cưới tại Harmony Studio",
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: `${service.title} | Harmony Studio`,
    description: service.description,
    path: service.detail_href,
  });
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service?.is_active) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
