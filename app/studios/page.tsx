import {
  ArrowRightIcon,
  ClockIcon,
  MapPinIcon,
  SparklesIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/home/cta-banner";
import { buildMetadata } from "@/lib/metadata";
import { getAllStudios } from "@/lib/queries/studios";
import type { Studio } from "@/types";

export const metadata = buildMetadata({
  title: "Hệ thống Studio | Không gian sáng tạo của chúng tôi",
  description:
    "Khám phá các không gian studio hiện đại và đầy cảm hứng của Harmony Studio tại các thành phố lớn.",
  path: "/studios",
});

const typeLabels = {
  studio: "Studio",
  outdoor: "Ngoại cảnh",
  destination: "Điểm đến",
};

const fallbackStudios: Studio[] = [
  {
    id: 1,
    slug: "harmony-studio",
    name: "Harmony Studio",
    type: "studio",
    address: "Không gian chụp trong nhà với ánh sáng được kiểm soát tinh tế",
    city: "TP. Hồ Chí Minh",
    description:
      "Bối cảnh tối giản, thanh lịch và dễ biến hóa cho những album cưới hiện đại, editorial hoặc concept gia đình.",
    highlights: [
      "Ánh sáng studio ổn định",
      "Bối cảnh tối giản cao cấp",
      "Phù hợp chụp album và hình cổng",
    ],
    images: ["/img/prewedding.jpg"],
    map_embed_url: null,
    best_time: "09:00 - 17:00",
    is_active: true,
    sort_order: 1,
  },
  {
    id: 2,
    slug: "garden-concept",
    name: "Garden Concept",
    type: "outdoor",
    address: "Không gian vườn xanh dành cho phong cách tự nhiên",
    city: "Ngoại cảnh",
    description:
      "Ánh sáng tự nhiên, mảng xanh và chất liệu mềm mại giúp bộ ảnh giữ được cảm giác trong trẻo, gần gũi.",
    highlights: [
      "Ánh sáng tự nhiên",
      "Phù hợp váy cưới bay nhẹ",
      "Tông ảnh lãng mạn và trong trẻo",
    ],
    images: ["/img/wedding.jpg"],
    map_embed_url: null,
    best_time: "06:30 - 09:00 hoặc 15:30 - 17:30",
    is_active: true,
    sort_order: 2,
  },
  {
    id: 3,
    slug: "cinematic-location",
    name: "Cinematic Location",
    type: "destination",
    address: "Các tuyến điểm chọn lọc cho bộ ảnh giàu chất điện ảnh",
    city: "Theo lịch trình",
    description:
      "Dành cho các cặp đôi muốn kể câu chuyện qua chuyển động, không gian rộng và những lớp cảnh có chiều sâu.",
    highlights: [
      "Tư vấn tuyến điểm theo concept",
      "Phù hợp ảnh và phim pre-wedding",
      "Kịch bản chụp theo ánh sáng trong ngày",
    ],
    images: ["/img/cinematic.jpg"],
    map_embed_url: null,
    best_time: "Theo mùa và lịch trình",
    is_active: true,
    sort_order: 3,
  },
];

export default function StudiosPage() {
  const studios = getAllStudios();
  const visibleStudios = studios.length > 0 ? studios : fallbackStudios;

  return (
    <div className="min-h-screen bg-luxury">
      <section className="pt-28 pb-24 md:pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-20 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="animate-fade-in-up-luxury space-y-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-obsidian/50" />
                <span className="font-bold text-[10px] text-obsidian uppercase tracking-[0.3em]">
                  Hệ thống cơ sở
                </span>
              </div>
              <h1
                className="font-light font-sans text-obsidian leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.7rem, 6vw, 5.8rem)" }}
              >
                Không gian chụp cưới được tuyển chọn
              </h1>
            </div>

            <div
              className="grid animate-fade-in-up-luxury gap-8 sm:grid-cols-3"
              style={{ "--delay": "90ms" } as React.CSSProperties}
            >
              <div className="border-black/10 border-t pt-5">
                <p className="font-light text-4xl text-obsidian">
                  {visibleStudios.length}
                </p>
                <p className="mt-2 text-[10px] text-smoke uppercase tracking-[0.2em]">
                  Địa điểm
                </p>
              </div>
              <div className="border-black/10 border-t pt-5">
                <p className="font-light text-4xl text-obsidian">3</p>
                <p className="mt-2 text-[10px] text-smoke uppercase tracking-[0.2em]">
                  Nhóm bối cảnh
                </p>
              </div>
              <div className="border-black/10 border-t pt-5">
                <p className="font-light text-4xl text-obsidian">01</p>
                <p className="mt-2 text-[10px] text-smoke uppercase tracking-[0.2em]">
                  Ekip tư vấn
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-28">
            {visibleStudios.map((studio, index) => {
              const image = studio.images[0] || "/img/prewedding.jpg";
              const reversed = index % 2 === 1;

              return (
                <article
                  key={studio.slug}
                  className={`grid gap-10 lg:items-center lg:gap-16 ${
                    reversed
                      ? "lg:grid-cols-[0.95fr_1.05fr]"
                      : "lg:grid-cols-[1.05fr_0.95fr]"
                  }`}
                >
                  <div
                    className={`relative aspect-[4/5] overflow-hidden bg-whisper shadow-luxury ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={studio.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-obsidian/55 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-ivory">
                      <p className="font-bold text-[10px] text-obsidian uppercase tracking-[0.28em]">
                        {typeLabels[studio.type]}
                      </p>
                      <p className="mt-2 font-light text-3xl">{studio.city}</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 font-bold text-[10px] text-obsidian uppercase tracking-[0.25em]">
                        <span>0{index + 1}</span>
                        <span className="h-px w-10 bg-obsidian/40" />
                        <span>{typeLabels[studio.type]}</span>
                      </div>
                      <h2 className="font-light font-sans text-4xl text-obsidian tracking-tight md:text-5xl">
                        {studio.name}
                      </h2>
                      {studio.description && (
                        <p className="max-w-2xl font-light text-lg text-smoke leading-relaxed">
                          {studio.description}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {studio.address && (
                        <div className="flex gap-3 border-black/5 border-t pt-5">
                          <MapPinIcon className="mt-0.5 size-4 shrink-0 text-obsidian" />
                          <p className="font-light text-ash text-sm leading-relaxed">
                            {studio.address}
                          </p>
                        </div>
                      )}
                      {studio.best_time && (
                        <div className="flex gap-3 border-black/5 border-t pt-5">
                          <ClockIcon className="mt-0.5 size-4 shrink-0 text-obsidian" />
                          <p className="font-light text-ash text-sm leading-relaxed">
                            {studio.best_time}
                          </p>
                        </div>
                      )}
                    </div>

                    {studio.highlights.length > 0 && (
                      <ul className="grid gap-3">
                        {studio.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-center gap-3"
                          >
                            <SparklesIcon className="size-4 shrink-0 text-obsidian" />
                            <span className="font-light text-ash text-sm tracking-wide">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-6 pt-2">
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-4 text-obsidian"
                      >
                        <span className="relative font-bold text-[11px] uppercase tracking-[0.25em]">
                          Tư vấn địa điểm
                          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-obsidian transition-transform duration-500 group-hover:scale-x-100" />
                        </span>
                        <span className="flex size-10 items-center justify-center rounded-full border border-obsidian/10 transition-all duration-500 group-hover:border-obsidian group-hover:bg-obsidian group-hover:text-white">
                          <ArrowRightIcon className="size-4" />
                        </span>
                      </Link>

                      {studio.map_embed_url && (
                        <Link
                          href={studio.map_embed_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-[11px] text-obsidian uppercase tracking-[0.25em] transition-colors hover:text-obsidian"
                        >
                          Xem bản đồ
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
