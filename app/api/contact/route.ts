import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDb } from '@/lib/db';
import { sendContactNotification } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

const schema = z.object({
  name        : z.string().min(2).max(100),
  phone       : z.string().regex(/^(\+84|0)[0-9]{8,9}$/, 'Invalid Vietnamese phone number'),
  email       : z.string().email().optional().or(z.literal('')),
  service     : z.enum(['photography', 'videography', 'wedding-film', 'combo']),
  weddingDate : z.string().optional(),
  guestCount  : z.number().int().positive().optional(),
  message     : z.string().max(1000).optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for') ?? 'unknown';
  
  // Rate limit: 5 requests per hour per IP
  if (!rateLimit(ip, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const db = getDb();
    db.prepare(`
      INSERT INTO contacts (name, phone, email, service, wedding_date, guest_count, message, ip_address)
      VALUES (@name, @phone, @email, @service, @weddingDate, @guestCount, @message, @ip)
    `).run({
      name       : parsed.data.name,
      phone      : parsed.data.phone,
      email      : parsed.data.email || null,
      service    : parsed.data.service,
      weddingDate: parsed.data.weddingDate || null,
      guestCount : parsed.data.guestCount || null,
      message    : parsed.data.message || null,
      ip         : ip
    });

    // Send email notification asynchronously
    try {
      await sendContactNotification(parsed.data);
    } catch (emailError) {
      console.error('[EMAIL_ERROR]', emailError);
      // We still return success: true because the contact is saved in the DB
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[POST /api/contact]', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
