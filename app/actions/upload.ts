"use server";

import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { UPLOAD_DIR, VIDEO_UPLOAD_MAX_MB } from "@/lib/constants";
import { processImage } from "@/lib/image";

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".ogg", ".mov", ".m4v"]);

function resolveUploadDir(category: string) {
  return path.isAbsolute(UPLOAD_DIR)
    ? path.join(UPLOAD_DIR, category)
    : path.join(process.cwd(), UPLOAD_DIR, category);
}

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
  } catch (err) {
    console.error("Upload error:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Upload failed",
    };
  }
}

export async function uploadVideoAction(
  formData: FormData,
  category: string = "portfolio",
) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, message: "No file found" };

    const ext = path.extname(file.name).toLowerCase();
    if (!file.type.startsWith("video/") || !VIDEO_EXTENSIONS.has(ext)) {
      return {
        success: false,
        message: "Chỉ hỗ trợ video MP4, WebM, OGG, MOV hoặc M4V",
      };
    }

    const maxSize = VIDEO_UPLOAD_MAX_MB * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        message: `Video tối đa ${VIDEO_UPLOAD_MAX_MB}MB`,
      };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dir = resolveUploadDir(path.join(category, "videos"));
    const filename = `${crypto.randomBytes(8).toString("hex")}${ext}`;
    const filepath = path.join(dir, filename);

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filepath, buffer);

    return { success: true, url: `/uploads/${category}/videos/${filename}` };
  } catch (err) {
    console.error("Video upload error:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Upload failed",
    };
  }
}
