'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createStudio, deleteStudio, updateStudio } from '@/lib/queries/studios';
import type { Studio } from '@/types';

function parseList(value: FormDataEntryValue | null): string[] {
  if (typeof value !== 'string') return [];

  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function optionalString(value: FormDataEntryValue | null): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function studioFromFormData(formData: FormData): Omit<Studio, 'id'> {
  return {
    slug: String(formData.get('slug') || '').trim(),
    name: String(formData.get('name') || '').trim(),
    type: (formData.get('type') || 'studio') as Studio['type'],
    address: optionalString(formData.get('address')),
    city: String(formData.get('city') || '').trim(),
    description: optionalString(formData.get('description')),
    highlights: parseList(formData.get('highlights')),
    images: parseList(formData.get('images')),
    map_embed_url: optionalString(formData.get('map_embed_url')),
    best_time: optionalString(formData.get('best_time')),
    is_active: formData.get('is_active') === 'on',
    sort_order: Number(formData.get('sort_order') || 0),
  };
}

function validateStudio(data: Omit<Studio, 'id'>) {
  if (!data.name) throw new Error('Tên studio là bắt buộc');
  if (!data.slug) throw new Error('Slug là bắt buộc');
  if (!data.city) throw new Error('Thành phố là bắt buộc');
}

export async function createStudioAction(formData: FormData) {
  const data = studioFromFormData(formData);
  validateStudio(data);

  createStudio(data);

  revalidatePath('/admin/studios');
  revalidatePath('/studios');
  redirect('/admin/studios');
}

export async function updateStudioAction(id: number, formData: FormData) {
  const data = studioFromFormData(formData);
  validateStudio(data);

  updateStudio(id, data);

  revalidatePath('/admin/studios');
  revalidatePath('/studios');
  redirect('/admin/studios');
}

export async function deleteStudioAction(id: number) {
  deleteStudio(id);

  revalidatePath('/admin/studios');
  revalidatePath('/studios');
}
