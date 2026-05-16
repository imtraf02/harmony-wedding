"use server";

import { processImage } from "@/lib/image";

export async function uploadImageAction(
  formData: FormData,
  category: string = "portfolio",
) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, message: "No file found" };

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await processImage(buffer, category);
    return { success: true, url: result.url };
  } catch (err: any) {
    console.error("Upload error:", err);
    return { success: false, message: err.message || "Upload failed" };
  }
}
