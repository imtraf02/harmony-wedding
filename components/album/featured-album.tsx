import Image from "next/image";
import Link from "next/link";

import { featuredAlbumImages } from "@/constants/data";

export function FeaturedAlbum() {
  return (
    <section className="bg-white py-[4.5rem] md:bg-neutral-50 md:py-20" id="featured-album">
      <div className="mx-auto grid max-w-[1720px] gap-12 px-5 md:px-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-center lg:px-16">
        <div>
          <p className="mb-8 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-700">
            Album nổi bật
            <span className="h-px w-16 bg-black" />
          </p>
          <h2 className="font-serif text-[clamp(2.6rem,4vw,4.8rem)] leading-[1.02] text-black">
            Đà Lạt - Bản Tình Ca Mùa Đông
          </h2>
          <p className="mt-8 max-w-sm text-base leading-8 text-neutral-600">
            Giữa sương mờ và rừng thông, chúng tôi lưu giữ những cảm xúc trong
            trẻo nhất của tình yêu.
          </p>
          <Link
            className="mt-10 inline-flex h-[3.25rem] items-center justify-center border border-black px-7 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-white"
            href="#album-grid"
          >
            Xem toàn bộ album
            <span className="ml-4">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:hidden">
          {featuredAlbumImages.map((item, index) => (
            <div
              className={`relative overflow-hidden rounded-md bg-neutral-100 ${
                index === 0
                  ? "col-span-2 h-[42vh] min-h-[330px]"
                  : index === 3
                    ? "col-span-2 h-52"
                    : "h-36"
              }`}
              key={item.image}
            >
              <Image
                alt={item.alt}
                className="object-cover"
                fill
                sizes="100vw"
                src={item.image}
              />
            </div>
          ))}
        </div>

        <div className="hidden gap-3 md:grid md:grid-cols-[1.2fr_1fr]">
          {featuredAlbumImages.map((item) => (
            <div
              className={`relative overflow-hidden bg-neutral-100 ${
                item.featured
                  ? "h-[52vh] min-h-[380px] md:row-span-2 md:h-auto"
                  : "h-56 md:h-64"
              }`}
              key={item.image}
            >
              <Image
                alt={item.alt}
                className="object-cover"
                fill
                sizes={item.featured ? "(min-width: 1024px) 42vw, 100vw" : "30vw"}
                src={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
