"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UPLOAD_DIR, VIDEO_UPLOAD_MAX_MB } from "@/lib/constants";
import {
  createPortfolio,
  deletePortfolio,
  getPortfolios,
  reorderPortfolios,
  updatePortfolio,
} from "@/lib/queries/portfolio";
import type { Portfolio } from "@/types";

// Resolve upload dir: use UPLOAD_DIR env (absolute) or fall back to process.cwd()/public/uploads
const UPLOAD_BASE = path.isAbsolute(UPLOAD_DIR)
  ? UPLOAD_DIR
  : path.join(process.cwd(), UPLOAD_DIR);

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".ogg", ".mov", ".m4v"]);

async function saveFile(file: File, prefix = "portfolio"): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${prefix}-${uniqueSuffix}${ext}`;

  await fs.mkdir(UPLOAD_BASE, { recursive: true });

  const filepath = path.join(UPLOAD_BASE, filename);
  await fs.writeFile(filepath, buffer);

  return `/uploads/${filename}`;
}

async function saveVideoFile(
  file: File,
  prefix = "portfolio",
): Promise<string> {
  const ext = path.extname(file.name).toLowerCase();
  if (!file.type.startsWith("video/") || !VIDEO_EXTENSIONS.has(ext)) {
    throw new Error("Chỉ hỗ trợ video MP4, WebM, OGG, MOV hoặc M4V");
  }

  if (file.size > VIDEO_UPLOAD_MAX_MB * 1024 * 1024) {
    throw new Error(`Video tối đa ${VIDEO_UPLOAD_MAX_MB}MB`);
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${prefix}-video-${uniqueSuffix}${ext}`;

  await fs.mkdir(path.join(UPLOAD_BASE, "portfolio", "videos"), {
    recursive: true,
  });

  const filepath = path.join(UPLOAD_BASE, "portfolio", "videos", filename);
  await fs.writeFile(filepath, buffer);

  return `/uploads/portfolio/videos/${filename}`;
}

async function deleteFileIfUploaded(url: string | null | undefined) {
  if (!url?.startsWith("/uploads/")) return;
  try {
    const relative = url.replace(/^\/uploads\//, "");
    const filepath = path.join(UPLOAD_BASE, relative);
    await fs.unlink(filepath);
  } catch (error) {
    const code =
      error instanceof Error && "code" in error ? error.code : undefined;
    if (code !== "ENOENT") console.error("Failed to delete file:", url, error);
  }
}

export async function createPortfolioAction(formData: FormData) {
  let cover_image = formData.get("cover_image") as string;
  const coverImageFile = formData.get("cover_image_file") as File | null;
  if (coverImageFile && coverImageFile.size > 0) {
    cover_image = await saveFile(coverImageFile);
  }

  const imagesStr = formData.get("images") as string;
  const existingImages = imagesStr
    ? imagesStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const imagesFiles = formData.getAll("images_files") as File[];
  const uploadedImages = [];
  for (const file of imagesFiles) {
    if (file && file.size > 0) {
      uploadedImages.push(await saveFile(file));
    }
  }
  const images = [...existingImages, ...uploadedImages];

  let video_url = (formData.get("video_url") as string) || null;
  const videoFile = formData.get("video_file") as File | null;
  if (videoFile && videoFile.size > 0) {
    video_url = await saveVideoFile(videoFile);
  }

  const data = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    style: formData.get("style") as
      | "vintage"
      | "modern"
      | "fineart"
      | "romantic",
    location_type: formData.get("location_type") as
      | "studio"
      | "outdoor"
      | "destination",
    studio_slug: (formData.get("studio_slug") as string) || null,
    cover_image,
    images,
    video_url,
    is_featured: formData.get("is_featured") === "on",
    orientation:
      (formData.get("orientation") as Portfolio["orientation"]) || "portrait",
    sort_order: Number(formData.get("sort_order") || 0),
  };

  createPortfolio(data);
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function updatePortfolioAction(id: number, formData: FormData) {
  const oldPortfolio = getPortfolios().find((p) => p.id === id);

  let cover_image = formData.get("cover_image") as string;
  const coverImageFile = formData.get("cover_image_file") as File | null;
  if (coverImageFile && coverImageFile.size > 0) {
    cover_image = await saveFile(coverImageFile);
  }

  const imagesStr = formData.get("images") as string;
  const existingImages = imagesStr
    ? imagesStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const imagesFiles = formData.getAll("images_files") as File[];
  const uploadedImages = [];
  for (const file of imagesFiles) {
    if (file && file.size > 0) {
      uploadedImages.push(await saveFile(file));
    }
  }
  const images = [...existingImages, ...uploadedImages];

  let video_url = (formData.get("video_url") as string) || null;
  const videoFile = formData.get("video_file") as File | null;
  if (videoFile && videoFile.size > 0) {
    video_url = await saveVideoFile(videoFile);
  }

  // Cleanup old files
  if (oldPortfolio) {
    if (oldPortfolio.cover_image !== cover_image) {
      await deleteFileIfUploaded(oldPortfolio.cover_image);
    }
    const deletedImages = oldPortfolio.images.filter(
      (img) => !images.includes(img),
    );
    for (const img of deletedImages) {
      await deleteFileIfUploaded(img);
    }
    if (oldPortfolio.video_url !== video_url) {
      await deleteFileIfUploaded(oldPortfolio.video_url);
    }
  }

  const data = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    style: formData.get("style") as
      | "vintage"
      | "modern"
      | "fineart"
      | "romantic",
    location_type: formData.get("location_type") as
      | "studio"
      | "outdoor"
      | "destination",
    studio_slug: (formData.get("studio_slug") as string) || null,
    cover_image,
    images,
    video_url,
    is_featured: formData.get("is_featured") === "on",
    orientation:
      (formData.get("orientation") as Portfolio["orientation"]) || "portrait",
    sort_order: Number(formData.get("sort_order") || 0),
  };

  updatePortfolio(id, data);
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${data.slug}`);
  redirect("/admin/portfolio");
}

export async function deletePortfolioAction(id: number) {
  const oldPortfolio = getPortfolios().find((p) => p.id === id);

  deletePortfolio(id);

  if (oldPortfolio) {
    await deleteFileIfUploaded(oldPortfolio.cover_image);
    await deleteFileIfUploaded(oldPortfolio.video_url);
    for (const img of oldPortfolio.images) {
      await deleteFileIfUploaded(img);
    }
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
}

export async function reorderPortfoliosAction(orderedIds: number[]) {
  reorderPortfolios(orderedIds);
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
}
