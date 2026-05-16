"use server";

import { revalidatePath } from "next/cache";
import { createPost, deletePost, updatePost } from "@/lib/queries/blog";

function toSlug(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createBlogPostAction(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = (formData.get("slug") as string) || toSlug(title);
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const cover_image = formData.get("cover_image") as string;
    const is_published = formData.get("is_published") === "on";

    // Parse tags safely
    let tags: string[] = [];
    const tagsStr = formData.get("tags") as string;
    if (tagsStr) {
      tags = tagsStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    createPost({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      cover_image: cover_image || null,
      tags,
      is_published,
      published_at: is_published ? new Date().toISOString() : null,
    });

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateBlogPostAction(id: number, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = (formData.get("slug") as string) || toSlug(title);
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const cover_image = formData.get("cover_image") as string;
    const is_published = formData.get("is_published") === "on";

    // Parse tags safely
    let tags: string[] = [];
    const tagsStr = formData.get("tags") as string;
    if (tagsStr) {
      tags = tagsStr
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const updateData: any = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      cover_image: cover_image || null,
      tags,
      is_published,
    };

    if (is_published) {
      // We only set published_at if it's not already set, but we might not know here easily.
      // Usually, it's better to manage it strictly. Let's just set it to now if published.
      // Actually, standard behavior: don't override published_at if it was already published.
      // For simplicity, we just won't update published_at here unless we want to refresh it.
      // We will skip updating published_at.
    }

    updatePost(id, updateData);

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${slug}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteBlogPostAction(id: number) {
  try {
    deletePost(id);
    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: (error as Error).message };
  }
}
