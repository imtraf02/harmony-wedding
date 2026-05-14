import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/auth';
import { createTestimonial, getAllTestimonials } from '@/lib/queries/testimonials';

export async function GET(req: NextRequest) {
  const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions);
  if (!session.isLoggedIn) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const items = getAllTestimonials();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await getIronSession<SessionData>(req, new NextResponse(), sessionOptions);
  if (!session.isLoggedIn) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    // Basic validation
    if (!data.couple_name || !data.content) {
      return NextResponse.json({ message: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    createTestimonial({
      couple_name : data.couple_name,
      content     : data.content,
      rating      : data.rating || 5,
      avatar      : data.avatar || null,
      service     : data.service || 'photography',
      wedding_year: data.wedding_year || new Date().getFullYear(),
      is_active   : true,
      sort_order  : 0,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[ADMIN_TESTIMONIALS_POST]', err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
