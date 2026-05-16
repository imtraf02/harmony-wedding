"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .regex(/^(\+84|0)[0-9]{8,9}$/, "Invalid Vietnamese phone number"),
  email: z.string().email().optional().or(z.literal("")),
  service: z.enum(["photography", "videography", "wedding-film", "combo"]),
  weddingDate: z.string().optional(),
  guestCount: z.number().int().positive().optional(),
  message: z.string().max(1000).optional(),
});

export async function submitContact(formData: z.infer<typeof schema>) {
  const headersList = await headers();
  const ip =
    headersList.get("x-real-ip") ??
    headersList.get("x-forwarded-for") ??
    "unknown";

  if (!rateLimit(ip, 5, 60 * 60 * 1000)) {
    return {
      success: false,
      message: "Too many requests. Please try again later.",
    };
  }

  const parsed = schema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ",
      errors: parsed.error.flatten(),
    };
  }

  try {
    const db = getDb();
    db.prepare(`
      INSERT INTO contacts (name, phone, email, service, wedding_date, guest_count, message, ip_address)
      VALUES (@name, @phone, @email, @service, @weddingDate, @guestCount, @message, @ip)
    `).run({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      service: parsed.data.service,
      weddingDate: parsed.data.weddingDate || null,
      guestCount: parsed.data.guestCount || null,
      message: parsed.data.message || null,
      ip: ip,
    });

    try {
      await sendContactNotification(parsed.data);
    } catch (emailError) {
      console.error("[EMAIL_ERROR]", emailError);
    }

    return { success: true };
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return { success: false, message: "Internal server error" };
  }
}
