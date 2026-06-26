"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { albumFilters, albumItems } from "@/constants/data";

export function AlbumGrid() {
  const [selectedFilter, setSelectedFilter] = useState("Tất cả album");

  const filteredItems = selectedFilter === "Tất cả album"
    ? albumItems
    : albumItems.filter((item) => item.category === selectedFilter);

  return (
    <section className="bg-white py-14 lg:py-16" id="album-grid">
      <div className="mx-auto max-w-[1720px] px-5 md:px-10 lg:px-16">
        
        {/* Mobile / Tablet Filter Nav */}
        <div className="mb-8 lg:hidden">
          <p className="mb-4 flex items-center gap-5 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-neutral-800">
            Danh mục album
            <span className="h-px flex-1 bg-black/15" />
          </p>
          <nav className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-5 px-5 md:-mx-10 md:px-10">
            {albumFilters.map((filter) => {
              const isActive = filter === selectedFilter;
              return (
                <button
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-neutral-800 hover:border-black/25"
                  }`}
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  type="button"
                >
                  {filter}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop Filter Nav */}
        <div className="mb-9 hidden flex-col gap-6 lg:flex lg:flex-row lg:items-center lg:justify-between">
          <nav className="flex gap-8 overflow-x-auto border-b border-black/10 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-neutral-500">
            {albumFilters.map((filter) => {
              const isActive = filter === selectedFilter;
              return (
                <button
                  className={`shrink-0 pb-4 transition-colors hover:text-black ${
                    isActive ? "border-b border-black text-black" : ""
                  }`}
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  type="button"
                >
                  {filter}
                </button>
              );
            })}
          </nav>
          <div className="inline-flex items-center gap-3 self-start text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-black">
            Số lượng: {filteredItems.length}
          </div>
        </div>

        {/* Album Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-3">
          {filteredItems.map((album) => (
            <article
              className="group relative h-[48vh] min-h-[340px] md:h-[58vh] md:min-h-[410px] lg:h-[54vh] lg:min-h-[380px] overflow-hidden rounded-md bg-neutral-100 lg:rounded-none"
              key={album.title}
            >
              <Image
                alt={album.alt}
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"
                src={album.image}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_42%,rgba(0,0,0,0.78)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl">{album.title}</h2>
                <p className="mt-4 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/72">
                  {album.location}
                </p>
                <Link
                  className="mt-5 inline-flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.22em]"
                  href={`/portfolio/${album.slug}`}
                >
                  Xem chi tiết
                  <span className="h-px w-8 bg-white" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
