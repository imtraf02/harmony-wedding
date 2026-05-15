'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  reorderGalleryItems,
  getGalleryItemById,
} from '@/lib/queries/gallery';
import { promises as fs } from 'fs';
import path from 'path';

async function saveFile(file: File): Promise<string> {
  const bytes  = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const ext    = path.extname(file.name) || '.jpg';
  const name   = `gallery-${suffix}${ext}`;
  const dir    = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), buffer);
  return `/uploads/${name}`;
}

async function deleteFileIfUploaded(url: string | null | undefined) {
  if (!url || !url.startsWith('/uploads/')) return;
  try {
    const filename = path.basename(url);
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
    await fs.unlink(filepath);
  } catch (error) {
    console.error('Failed to delete file:', url, error);
  }
}

export async function createGalleryItemAction(formData: FormData) {
  let src = (formData.get('src') as string) || '';

  const file = formData.get('src_file') as File | null;
  if (file && file.size > 0) {
    src = await saveFile(file);
  }

  if (!src) throw new Error('Cần có ảnh hoặc URL ảnh');

  createGalleryItem({
    src,
    alt       : (formData.get('alt') as string) || '',
    label     : (formData.get('label') as string) || null,
    sort_order: Number(formData.get('sort_order') || 0),
    is_active : formData.get('is_active') === 'on',
  });

  revalidatePath('/admin/gallery');
  revalidatePath('/');
  redirect('/admin/gallery');
}

export async function updateGalleryItemAction(id: number, formData: FormData) {
  const oldItem = getGalleryItemById(id);
  
  let src = (formData.get('src') as string) || '';

  const file = formData.get('src_file') as File | null;
  if (file && file.size > 0) {
    src = await saveFile(file);
  }

  // Delete the old file if it was replaced or removed
  if (oldItem && oldItem.src !== src) {
    await deleteFileIfUploaded(oldItem.src);
  }

  updateGalleryItem(id, {
    ...(src ? { src } : {}),
    alt       : (formData.get('alt') as string) || '',
    label     : (formData.get('label') as string) || null,
    sort_order: Number(formData.get('sort_order') || 0),
    is_active : formData.get('is_active') === 'on',
  });

  revalidatePath('/admin/gallery');
  revalidatePath('/');
  redirect('/admin/gallery');
}

export async function deleteGalleryItemAction(id: number) {
  const oldItem = getGalleryItemById(id);
  
  deleteGalleryItem(id);
  
  if (oldItem) {
    await deleteFileIfUploaded(oldItem.src);
  }
  
  revalidatePath('/admin/gallery');
  revalidatePath('/');
}

export async function reorderGalleryItemsAction(orderedIds: number[]) {
  reorderGalleryItems(orderedIds);
  revalidatePath('/admin/gallery');
  revalidatePath('/');
}
