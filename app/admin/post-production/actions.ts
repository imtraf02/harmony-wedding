"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UPLOAD_DIR } from "@/lib/constants";
import {
  createPostProduction,
  deletePostProduction,
  getPostProductionById,
  reorderPostProductions,
  updatePostProduction,
} from "@/lib/queries/post-production";
import type { PostProduction } from "@/types";

const UPLOAD_BASE = path.isAbsolute(UPLOAD_DIR)
  ? UPLOAD_DIR
  : path.join(process.cwd(), UPLOAD_DIR);

async function deleteFileIfUploaded(url: string | null | undefined) {
  if (!url?.startsWith("/uploads/")) return;

  try {
    const relative = url.replace(/^\/uploads\//, "");
    await fs.unlink(path.join(UPLOAD_BASE, relative));
  } catch (error) {
    const code =
      error instanceof Error && "code" in error ? error.code : undefined;
    if (code !== "ENOENT") {
      console.error("Failed to delete file:", url, error);
    }
  }
}

function readPostProductionData(formData: FormData) {
  return {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    category:
      (formData.get("category") as PostProduction["category"]) || "reels",
    video_url: formData.get("video_url") as string,
    poster_image: (formData.get("poster_image") as string) || null,
    orientation:
      (formData.get("orientation") as PostProduction["orientation"]) ||
      "vertical",
    is_featured: formData.get("is_featured") === "on",
    is_active: formData.get("is_active") === "on",
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

export async function createPostProductionAction(formData: FormData) {
  const data = readPostProductionData(formData);

  if (!data.video_url) {
    throw new Error("Cần có video hậu kỳ");
  }

  createPostProduction(data);
  revalidatePath("/admin/post-production");
  revalidatePath("/post-production");
  redirect("/admin/post-production");
}

export async function updatePostProductionAction(
  id: number,
  formData: FormData,
) {
  const oldItem = getPostProductionById(id);
  const data = readPostProductionData(formData);

  if (!data.video_url) {
    throw new Error("Cần có video hậu kỳ");
  }

  if (oldItem) {
    if (oldItem.video_url !== data.video_url) {
      await deleteFileIfUploaded(oldItem.video_url);
    }
    if (oldItem.poster_image !== data.poster_image) {
      await deleteFileIfUploaded(oldItem.poster_image);
    }
  }

  updatePostProduction(id, data);
  revalidatePath("/admin/post-production");
  revalidatePath("/post-production");
  redirect("/admin/post-production");
}

export async function deletePostProductionAction(id: number) {
  const oldItem = getPostProductionById(id);

  deletePostProduction(id);

  if (oldItem) {
    await deleteFileIfUploaded(oldItem.video_url);
    await deleteFileIfUploaded(oldItem.poster_image);
  }

  revalidatePath("/admin/post-production");
  revalidatePath("/post-production");
}

export async function reorderPostProductionsAction(orderedIds: number[]) {
  reorderPostProductions(orderedIds);
  revalidatePath("/admin/post-production");
  revalidatePath("/post-production");
}
