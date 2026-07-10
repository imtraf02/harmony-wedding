import { siteConfig } from "@/lib/config";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: "+84357256845",
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "45 Đường Cuối Chợ Đông Hoà",
      addressLocality: "Trảng Bom",
      addressRegion: "Đồng Nai",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.9533,
      longitude: 106.9719,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "21:00",
    },
    image: `${siteConfig.url}/images/home/hero-banner.webp`,
    logo: `${siteConfig.url}/logo.png`,
    priceRange: "$$",
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.tiktok,
      siteConfig.links.youtube,
    ],
  };

  return <JsonLd data={data} />;
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "vi-VN",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };

  return <JsonLd data={data} />;
}

export function ServiceJsonLd() {
  const services = [
    {
      name: "Chụp Ảnh Cưới",
      description:
        "Dịch vụ chụp ảnh cưới chuyên nghiệp tại studio và ngoại cảnh với phong cách nghệ thuật, tự nhiên.",
    },
    {
      name: "Quay Phim Cưới",
      description:
        "Quay phim cưới highlight điện ảnh, ghi lại trọn vẹn cảm xúc ngày cưới.",
    },
    {
      name: "Trang Điểm Cô Dâu",
      description:
        "Makeup cô dâu tự nhiên, thanh lịch, bền màu phù hợp từng gương mặt và phong cách.",
    },
    {
      name: "Thuê Vest & Váy Cưới",
      description:
        "Cho thuê vest chú rể và váy cưới thiết kế cao cấp, tôn vinh vóc dáng và phong cách riêng.",
    },
    {
      name: "Tổ Chức Tiệc Cưới",
      description:
        "Dịch vụ tổ chức tiệc cưới trọn gói, điều phối timeline và concept trang trí.",
    },
    {
      name: "Chụp Beauty",
      description:
        "Dịch vụ chụp ảnh chân dung nghệ thuật Beauty, làm nổi bật nét đẹp cá nhân tinh tế.",
    },
    {
      name: "Chụp Baby",
      description:
        "Dịch vụ chụp ảnh cho bé yêu nghệ thuật, ghi lại nét hồn nhiên đáng yêu tuổi thơ.",
    },
    {
      name: "Chụp Sinh Nhật",
      description:
        "Dịch vụ chụp ảnh sinh nhật sự kiện, lưu giữ nụ cười hạnh phúc bên người thân bạn bè.",
    },
    {
      name: "Đào Tạo Quay Chụp",
      description:
        "Khóa học đào tạo kỹ năng quay phim, chụp ảnh thực chiến từ cơ bản đến nâng cao.",
    },
    {
      name: "Đào Tạo Makeup",
      description:
        "Khóa học đào tạo trang điểm cá nhân và chuyên nghiệp theo xu hướng makeup mới nhất.",
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Wedding Photography & Planning",
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Vietnam",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dịch Vụ Cưới Harmony Wedding",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };

  return <JsonLd data={data} />;
}

export function ImageGalleryJsonLd({
  name,
  description,
  images,
}: {
  name: string;
  description: string;
  images: { url: string; caption: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    description,
    image: images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.url.startsWith("http")
        ? img.url
        : `${siteConfig.url}${img.url}`,
      caption: img.caption,
    })),
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
    },
  };

  return <JsonLd data={data} />;
}

export function FAQJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
