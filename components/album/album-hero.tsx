import Image from "next/image";
import Link from "next/link";

import { albumHero, albumStats } from "@/constants/data";
import { Icon } from "@/components/home/icon";

export function AlbumHero() {
  return (
    <section className="border-b border-black/10 bg-white pt-[5.5rem] lg:pt-24">
      <div className="lg:hidden">
        <div className="relative min-h-[70vh] overflow-hidden bg-neutral-900">
          <Image
            alt={albumHero.alt}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={albumHero.image}
            unoptimized
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_18%,rgba(0,0,0,0.82)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-white">
            <p className="mb-5 flex items-center gap-4 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-white/82">
              Album cưới
              <span className="h-px w-12 bg-white/70" />
            </p>
            <h1 className="max-w-xs font-serif text-[clamp(3.2rem,16vw,5rem)] leading-[0.92]">
              Những Câu Chuyện Tình Yêu
            </h1>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/82">
              Mỗi bộ ảnh là một hành trình cảm xúc, được kể bằng ánh sáng,
              khoảnh khắc và tình yêu chân thật.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white"
              href="#album-grid"
            >
              <span className="grid size-12 place-items-center rounded-full bg-black text-white">
                <span className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-white" />
              </span>
              Xem video giới thiệu
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 border-b border-black/10 bg-white px-3 py-8">
          {albumStats.map((stat, index) => (
            <article
              className={`px-2 text-center ${
                index % 2 === 0 ? "border-r border-black/10" : ""
              } sm:border-r sm:border-black/10 sm:last:border-r-0`}
              key={stat.description}
            >
              <Icon className="mx-auto size-7 text-black" name={stat.icon} />
              <h2 className="mt-3 text-lg font-semibold text-black">{stat.title}</h2>
              <p className="mt-1 text-[0.62rem] leading-4 text-neutral-600">
                {stat.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto hidden max-w-[1720px] min-h-[430px] grid-cols-1 items-center gap-12 px-5 py-16 md:px-10 lg:grid lg:grid-cols-[0.45fr_0.55fr] lg:px-16 lg:py-0">
        <div className="relative z-10">
          <p className="mb-8 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-700">
            Album cưới
            <span className="h-px w-16 bg-black" />
          </p>
          <h1 className="max-w-2xl font-serif text-[clamp(3rem,7vw,6.7rem)] leading-[0.96] text-black">
            Những Câu Chuyện Tình Yêu
          </h1>
          <p className="mt-8 max-w-md text-base leading-8 text-neutral-600">
            Mỗi bộ ảnh là một hành trình cảm xúc, được kể bằng ánh sáng,
            khoảnh khắc và tình yêu chân thật.
          </p>
          <Link
            className="mt-10 inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-black"
            href="#album-grid"
          >
            Xem video giới thiệu
            <span className="grid size-6 place-items-center rounded-full border border-black">
              <span className="ml-0.5 h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-black" />
            </span>
          </Link>
        </div>

        <div className="relative h-[430px] overflow-hidden bg-neutral-100">
          <Image
            alt={albumHero.alt}
            className="object-cover"
            fill
            priority
            sizes="55vw"
            src={albumHero.image}
            unoptimized
          />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
