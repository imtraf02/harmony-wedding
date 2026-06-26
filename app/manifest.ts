import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harmony Wedding - Studio Cưới Cao Cấp",
    short_name: "Harmony Wedding",
    description:
      "Studio cưới cao cấp tại Đồng Nai. Chụp ảnh cưới, quay phim cưới, trang điểm cô dâu, thuê vest & váy cưới và tổ chức tiệc cưới.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
