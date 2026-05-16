'use server';

import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createTestimonial, deleteTestimonial, updateTestimonial } from '@/lib/queries/testimonials';
import type { Testimonial } from '@/types';

type TestimonialPayload = {
  couple_name?: string;
  content?: string;
  rating?: number;
  avatar?: string;
  service?: string;
  wedding_year?: number;
  is_active?: boolean;
  sort_order?: number;
};

async function requireAdmin() {
  const c = await cookies();
  const session = await getIronSession<SessionData>(c, sessionOptions);

  if (!session.isLoggedIn) {
    return false;
  }

  return true;
}

function testimonialFromPayload(data: TestimonialPayload): Omit<Testimonial, 'id'> {
  return {
    couple_name : data.couple_name || '',
    content     : data.content || '',
    rating      : (data.rating || 5) as Testimonial['rating'],
    avatar      : data.avatar || null,
    service     : data.service || 'photography',
    wedding_year: data.wedding_year || new Date().getFullYear(),
    is_active   : data.is_active ?? true,
    sort_order  : data.sort_order || 0,
  };
}

export async function createTestimonialAction(data: TestimonialPayload) {
  if (!(await requireAdmin())) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    if (!data.couple_name || !data.content) {
      return { success: false, message: 'Thiếu thông tin bắt buộc' };
    }

    createTestimonial(testimonialFromPayload(data));
    revalidatePath('/admin/testimonials');
    revalidatePath('/');

    return { success: true };
  } catch (err) {
    console.error('[ADMIN_TESTIMONIALS_POST]', err);
    return { success: false, message: 'Internal server error' };
  }
}

export async function updateTestimonialAction(id: number, data: TestimonialPayload) {
  if (!(await requireAdmin())) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    if (!data.couple_name || !data.content) {
      return { success: false, message: 'Thiếu thông tin bắt buộc' };
    }

    updateTestimonial(id, testimonialFromPayload(data));
    revalidatePath('/admin/testimonials');
    revalidatePath('/');

    return { success: true };
  } catch (err) {
    console.error('[ADMIN_TESTIMONIALS_UPDATE]', err);
    return { success: false, message: 'Internal server error' };
  }
}

export async function deleteTestimonialAction(id: number) {
  if (!(await requireAdmin())) {
    return;
  }

  deleteTestimonial(id);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}

export async function deleteTestimonialAndRedirectAction(id: number) {
  await deleteTestimonialAction(id);
  redirect('/admin/testimonials');
}
