'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
  getHeroSlideById
} from '@/lib/queries/hero';
import { promises as fs } from 'fs';
import path from 'path';
import { UPLOAD_DIR } from '@/lib/constants';

// Resolve upload dir: use UPLOAD_DIR env (absolute) or fall back to process.cwd()
const UPLOAD_BASE = path.isAbsolute(UPLOAD_DIR)
  ? UPLOAD_DIR
  : path.join(process.cwd(), UPLOAD_DIR);

async function saveFile(file: File, prefix = 'hero'): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const ext = path.extname(file.name) || '.jpg';
  const filename = `${prefix}-${uniqueSuffix}${ext}`;

  await fs.mkdir(UPLOAD_BASE, { recursive: true });

  const filepath = path.join(UPLOAD_BASE, filename);
  await fs.writeFile(filepath, buffer);

  return `/uploads/${filename}`;
}

async function deleteFileIfUploaded(url: string | null | undefined) {
  if (!url || !url.startsWith('/uploads/')) return;
  try {
    const relative = url.replace(/^\/uploads\//, '');
    const filepath = path.join(UPLOAD_BASE, relative);
    await fs.unlink(filepath);
  } catch (error: any) {
    if (error.code !== 'ENOENT') console.error('Failed to delete file:', url, error);
  }
}

export async function createHeroSlideAction(formData: FormData) {
  let src = formData.get('src') as string;
  const file = formData.get('src_file') as File | null;

  if (file && file.size > 0) {
    src = await saveFile(file);
  }

  if (!src) throw new Error('Cần có ảnh hoặc URL ảnh');

  createHeroSlide({
    src,
    title: formData.get('title') as string || null,
    subtitle: formData.get('subtitle') as string || null,
    description: formData.get('description') as string || null,
    cta_label: formData.get('cta_label') as string || null,
    cta_href: formData.get('cta_href') as string || null,
    sort_order: Number(formData.get('sort_order') || 0),
    is_active: formData.get('is_active') === 'on',
  });

  revalidatePath('/admin/hero');
  revalidatePath('/');
  redirect('/admin/hero');
}

export async function updateHeroSlideAction(id: number, formData: FormData) {
  const oldItem = getHeroSlideById(id);
  let src = formData.get('src') as string;
  const file = formData.get('src_file') as File | null;

  if (file && file.size > 0) {
    src = await saveFile(file);
  }

  if (oldItem && oldItem.src !== src) {
    await deleteFileIfUploaded(oldItem.src);
  }

  updateHeroSlide(id, {
    src,
    title: formData.get('title') as string || null,
    subtitle: formData.get('subtitle') as string || null,
    description: formData.get('description') as string || null,
    cta_label: formData.get('cta_label') as string || null,
    cta_href: formData.get('cta_href') as string || null,
    sort_order: Number(formData.get('sort_order') || 0),
    is_active: formData.get('is_active') === 'on',
  });

  revalidatePath('/admin/hero');
  revalidatePath('/');
  redirect('/admin/hero');
}

export async function deleteHeroSlideAction(id: number) {
  const oldItem = getHeroSlideById(id);
  deleteHeroSlide(id);

  if (oldItem) {
    await deleteFileIfUploaded(oldItem.src);
  }

  revalidatePath('/admin/hero');
  revalidatePath('/');
}
