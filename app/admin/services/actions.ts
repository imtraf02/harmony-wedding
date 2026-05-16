"use server";

import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type SessionData, sessionOptions } from "@/lib/auth";
import {
  createService,
  deleteService,
  updateService,
} from "@/lib/queries/services";
import type { Service } from "@/types";

async function requireAdmin() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );
  if (!session.isLoggedIn) throw new Error("Unauthorized");
}

function parseList(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];

  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function requiredString(formData: FormData, key: string): string {
  return String(formData.get(key) || "").trim();
}

function serviceFromFormData(
  formData: FormData,
): Omit<Service, "id" | "created_at" | "updated_at"> {
  const slug = requiredString(formData, "slug");

  return {
    slug,
    title: requiredString(formData, "title"),
    subtitle: requiredString(formData, "subtitle"),
    description: requiredString(formData, "description"),
    features: parseList(formData.get("features")),
    hero_image: requiredString(formData, "hero_image"),
    demo_images: parseList(formData.get("demo_images")),
    detail_href: requiredString(formData, "detail_href") || `/services/${slug}`,
    pricing_href: requiredString(formData, "pricing_href") || "/pricing",
    is_active: formData.get("is_active") === "on",
    sort_order: Number(formData.get("sort_order") || 0),
  };
}

function validateService(
  data: Omit<Service, "id" | "created_at" | "updated_at">,
) {
  if (!data.slug) throw new Error("Slug là bắt buộc");
  if (!data.title) throw new Error("Tên dịch vụ là bắt buộc");
  if (!data.description) throw new Error("Mô tả dịch vụ là bắt buộc");
  if (!data.hero_image) throw new Error("Ảnh đại diện là bắt buộc");
}

function revalidateServicePaths(
  data: Omit<Service, "id" | "created_at" | "updated_at">,
) {
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(data.detail_href);
  revalidatePath(`/services/${data.slug}`);
}

export async function createServiceAction(formData: FormData) {
  await requireAdmin();
  const data = serviceFromFormData(formData);
  validateService(data);

  createService(data);
  revalidateServicePaths(data);
  redirect("/admin/services");
}

export async function updateServiceAction(id: number, formData: FormData) {
  await requireAdmin();
  const data = serviceFromFormData(formData);
  validateService(data);

  updateService(id, data);
  revalidateServicePaths(data);
  redirect("/admin/services");
}

export async function deleteServiceAction(id: number) {
  await requireAdmin();
  deleteService(id);

  revalidatePath("/admin/services");
  revalidatePath("/services");
}
