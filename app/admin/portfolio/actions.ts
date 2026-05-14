'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createPortfolio, updatePortfolio, deletePortfolio } from '@/lib/queries/portfolio';
import { promises as fs } from 'fs';
import path from 'path';

async function saveFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const ext = path.extname(file.name) || '.jpg';
  const filename = `portfolio-${uniqueSuffix}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  await fs.mkdir(uploadDir, { recursive: true });
  
  const filepath = path.join(uploadDir, filename);
  await fs.writeFile(filepath, buffer);
  
  return `/uploads/${filename}`;
}

export async function createPortfolioAction(formData: FormData) {
  let cover_image = formData.get('cover_image') as string;
  const coverImageFile = formData.get('cover_image_file') as File | null;
  if (coverImageFile && coverImageFile.size > 0) {
    cover_image = await saveFile(coverImageFile);
  }

  const imagesStr = formData.get('images') as string;
  const existingImages = imagesStr ? imagesStr.split(',').map(s => s.trim()).filter(Boolean) : [];
  
  const imagesFiles = formData.getAll('images_files') as File[];
  const uploadedImages = [];
  for (const file of imagesFiles) {
    if (file && file.size > 0) {
      uploadedImages.push(await saveFile(file));
    }
  }
  const images = [...existingImages, ...uploadedImages];

  const data = {
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    style: formData.get('style') as 'vintage' | 'modern' | 'fineart' | 'romantic',
    location_type: formData.get('location_type') as 'studio' | 'outdoor' | 'destination',
    studio_slug: formData.get('studio_slug') as string || null,
    cover_image,
    images,
    video_url: formData.get('video_url') as string || null,
    is_featured: formData.get('is_featured') === 'on',
    sort_order: Number(formData.get('sort_order') || 0),
  };

  createPortfolio(data);
  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  redirect('/admin/portfolio');
}

export async function updatePortfolioAction(id: number, formData: FormData) {
  let cover_image = formData.get('cover_image') as string;
  const coverImageFile = formData.get('cover_image_file') as File | null;
  if (coverImageFile && coverImageFile.size > 0) {
    cover_image = await saveFile(coverImageFile);
  }

  const imagesStr = formData.get('images') as string;
  const existingImages = imagesStr ? imagesStr.split(',').map(s => s.trim()).filter(Boolean) : [];
  
  const imagesFiles = formData.getAll('images_files') as File[];
  const uploadedImages = [];
  for (const file of imagesFiles) {
    if (file && file.size > 0) {
      uploadedImages.push(await saveFile(file));
    }
  }
  const images = [...existingImages, ...uploadedImages];

  const data = {
    slug: formData.get('slug') as string,
    title: formData.get('title') as string,
    style: formData.get('style') as 'vintage' | 'modern' | 'fineart' | 'romantic',
    location_type: formData.get('location_type') as 'studio' | 'outdoor' | 'destination',
    studio_slug: formData.get('studio_slug') as string || null,
    cover_image,
    images,
    video_url: formData.get('video_url') as string || null,
    is_featured: formData.get('is_featured') === 'on',
    sort_order: Number(formData.get('sort_order') || 0),
  };

  updatePortfolio(id, data);
  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
  revalidatePath(`/portfolio/${data.slug}`);
  redirect('/admin/portfolio');
}

export async function deletePortfolioAction(id: number) {
  deletePortfolio(id);
  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
}
