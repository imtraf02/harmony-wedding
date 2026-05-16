import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  service: string;
  weddingDate?: string;
  guestCount?: number;
  message?: string;
}

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendContactNotification(
  data: ContactPayload,
): Promise<void> {
  const transporter = createTransport();
  const studioName = process.env.NEXT_PUBLIC_STUDIO_NAME ?? "Harmony Studio";

  const html = `
    <h2>New Contact Form Submission — ${studioName}</h2>
    <table cellpadding="8" style="border-collapse:collapse;">
      <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
      <tr><td><strong>Email</strong></td><td>${data.email ?? "—"}</td></tr>
      <tr><td><strong>Service</strong></td><td>${data.service}</td></tr>
      <tr><td><strong>Wedding Date</strong></td><td>${data.weddingDate ?? "—"}</td></tr>
      <tr><td><strong>Guest Count</strong></td><td>${data.guestCount ?? "—"}</td></tr>
      <tr><td><strong>Message</strong></td><td>${data.message ?? "—"}</td></tr>
    </table>
  `;

  await transporter.sendMail({
    from: `"${studioName}" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `[${studioName}] New booking inquiry from ${data.name}`,
    html,
  });
}
