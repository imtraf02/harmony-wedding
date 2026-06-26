import { albumValues } from "@/constants/data";
import { Icon } from "@/components/home/icon";

export function AlbumValues() {
  return (
    <section className="border-y border-black/10 bg-white">
      <div className="mx-auto grid max-w-[1720px] gap-0 px-5 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-16">
        {albumValues.map((value, index) => (
          <article
            className={`flex items-center gap-6 py-7 px-0 md:px-8 border-black/10 
              ${index === 3 ? "border-b-0" : "border-b"} 
              ${index < 2 ? "md:border-b" : "md:border-b-0"} 
              ${index % 2 === 0 ? "md:border-r" : "md:border-r-0"} 
              ${index < 3 ? "lg:border-r" : "lg:border-r-0"} 
              lg:border-b-0 lg:py-8`}
            key={value.title}
          >
            <Icon className="size-11 shrink-0 text-black lg:size-10" name={value.icon} />
            <div>
              <h2 className="text-sm font-semibold text-black">{value.title}</h2>
              <p className="mt-1 text-sm text-neutral-600">{value.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
