import type { Metadata } from "next";

import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { ServicesPageContent } from "@/components/services/services-page-content";
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FAQJsonLd,
} from "@/components/seo/json-ld";

import { getServices, getTimelineSteps, getServicesData } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const servicesData = await getServicesData();
  return {
    title: servicesData.seo.title,
    description: servicesData.seo.description,
    alternates: {
      canonical: "/services",
    },
    openGraph: {
      title: servicesData.seo.title,
      description: servicesData.seo.description,
      url: "/services",
      images: [
        {
          url: "/images/services/services-hero.webp",
          width: 1200,
          height: 630,
          alt: "Dịch vụ cưới trọn gói Harmony Wedding",
        },
      ],
    },
  };
}

export async function ServicesPage() {
  const services = await getServices();
  const timelineSteps = await getTimelineSteps();
  const servicesData = await getServicesData();

  const servicesHeroImage = "/images/services/services-hero.webp";

  return (
    <main className="bg-white text-black" id="top">
      <Header variant="solid" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Dịch Vụ", href: "/services" },
        ]}
      />
      <ServiceJsonLd />
      <FAQJsonLd questions={servicesData.faq} />

      <ServicesPageContent
        serviceDetails={services}
        services={services}
        timelineSteps={timelineSteps}
        servicesHeroImage={servicesHeroImage}
        faqs={servicesData.faq}
      />
      <Footer />
    </main>
  );
}

export default ServicesPage;
