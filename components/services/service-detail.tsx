import Image from "next/image";
import { CtaBanner } from "@/components/home/cta-banner";
import { JsonLd, serviceSchema } from "@/components/shared/json-ld";
import { SectionTitle } from "@/components/shared/section-title";
import type { Service } from "@/types";

export function ServiceDetail({ service }: { service: Service }) {
  const demoImages =
    service.demo_images.length > 0 ? service.demo_images : [service.hero_image];

  return (
    <div className="min-h-screen bg-luxury">
      <JsonLd
        data={serviceSchema({
          name: service.title,
          description: service.description,
          path: service.detail_href,
        })}
      />
      <section className="pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionTitle
            eyebrow={service.subtitle || "Service"}
            title={service.title}
            subtitle={service.description}
            centered
          />

          <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-luxury">
              <Image
                src={service.hero_image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-10">
              <div className="flex flex-col gap-6">
                <h3 className="font-light font-sans text-2xl text-obsidian tracking-tight">
                  Về dịch vụ
                </h3>
                <p className="font-light text-smoke leading-relaxed">
                  {service.description}
                </p>
              </div>

              {service.features.length > 0 && (
                <div className="flex flex-col gap-6">
                  <h3 className="font-light font-sans text-2xl text-obsidian tracking-tight">
                    Gói dịch vụ bao gồm
                  </h3>
                  <ul className="grid grid-cols-1 gap-4">
                    {service.features.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-4 font-light text-ash"
                      >
                        <span className="size-1 rounded-full bg-obsidian" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-28">
            <div className="mb-10 flex flex-col gap-3">
              <span className="font-bold text-[10px] text-obsidian uppercase tracking-[0.3em]">
                Demo Gallery
              </span>
              <h2 className="font-light font-sans text-3xl text-obsidian tracking-tight md:text-5xl">
                Ảnh demo dịch vụ
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {demoImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-whisper shadow-sm"
                >
                  <Image
                    src={image}
                    alt={`${service.title} demo ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </div>
  );
}
