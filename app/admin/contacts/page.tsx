import { CalendarIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDb } from "@/lib/db";
import type { Contact } from "@/types";

export const dynamic = "force-dynamic";

async function updateContactStatus(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const status = formData.get("status") as string;
  const db = getDb();
  db.prepare("UPDATE contacts SET status = ? WHERE id = ?").run(status, id);
  revalidatePath("/admin/contacts");
}

export default async function AdminContactsPage() {
  const db = getDb();
  const contacts = db
    .prepare("SELECT * FROM contacts ORDER BY created_at DESC")
    .all() as Contact[];

  return (
    <div className="space-y-16 font-sans">
      <header className="space-y-2">
        <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
          Yêu cầu liên hệ
        </h1>
        <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
          Theo dõi và quản lý các yêu cầu tư vấn từ khách hàng
        </p>
      </header>

      <div className="grid gap-4 md:hidden">
        {contacts.map((c) => (
          <article
            key={c.id}
            className="flex flex-col gap-5 rounded-none border border-black/5 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-none border border-black/5 bg-luxury-surface text-ash">
                <UserIcon className="size-4 stroke-[1.2px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-obsidian">{c.name}</p>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-smoke">
                    <MailIcon className="size-3 shrink-0 text-mist" />
                    <span className="truncate font-light text-[11px]">
                      {c.email || "Không có email"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-smoke">
                    <PhoneIcon className="size-3 shrink-0 text-mist" />
                    <span className="font-light text-[11px]">{c.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Badge
                variant="outline"
                className="rounded-none border-obsidian-dim bg-obsidian-dim font-bold text-[9px] text-obsidian uppercase tracking-widest"
              >
                {c.service}
              </Badge>
              <p className="line-clamp-4 font-light text-[12px] text-smoke leading-relaxed">
                {c.message ? `“${c.message}”` : "Không có tin nhắn"}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-black/5 border-t pt-4">
              <form
                action={updateContactStatus}
                className="flex items-center gap-3"
              >
                <input type="hidden" name="id" value={c.id} />
                <select
                  name="status"
                  defaultValue={c.status}
                  className="h-10 flex-1 cursor-pointer rounded-none border border-black/5 bg-luxury-surface px-3 font-bold text-[10px] uppercase tracking-widest focus:ring-1 focus:ring-obsidian"
                >
                  <option value="new">Mới</option>
                  <option value="contacted">Đã liên hệ</option>
                  <option value="booked">Đã đặt lịch</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Hủy</option>
                </select>
                <Button
                  type="submit"
                  variant="outline"
                  className="h-10 rounded-none text-[10px] uppercase tracking-[0.15em]"
                >
                  Cập nhật
                </Button>
              </form>
              <div className="flex items-center gap-2 text-smoke">
                <CalendarIcon className="size-3 text-mist" />
                <span className="font-light text-[11px]">
                  {new Date(c.created_at).toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-none border border-black/5 bg-white shadow-luxury md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-black/5 border-b bg-whisper">
                <th className="px-8 py-6 font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                  Khách hàng
                </th>
                <th className="px-8 py-6 font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                  Dịch vụ & Tin nhắn
                </th>
                <th className="px-8 py-6 font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                  Trạng thái
                </th>
                <th className="px-8 py-6 text-right font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                  Ngày nhận
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  className="group animate-fade-in-up-luxury transition-colors hover:bg-whisper"
                >
                  <td className="px-8 py-8 align-top">
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-none border border-black/5 bg-luxury-surface text-ash">
                        <UserIcon className="size-4 stroke-[1.2px]" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-obsidian transition-colors group-hover:text-obsidian">
                          {c.name}
                        </p>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-smoke">
                            <MailIcon className="size-3 text-mist" />
                            <span className="font-light text-[11px]">
                              {c.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-smoke">
                            <PhoneIcon className="size-3 text-mist" />
                            <span className="font-light text-[11px]">
                              {c.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-sm px-8 py-8 align-top">
                    <div className="space-y-2">
                      <Badge
                        variant="outline"
                        className="rounded-none border-obsidian-dim bg-obsidian-dim font-bold text-[9px] text-obsidian uppercase tracking-widest"
                      >
                        {c.service}
                      </Badge>
                      <p className="line-clamp-3 font-light text-[12px] text-smoke leading-relaxed">
                        {c.message ? `“${c.message}”` : "Không có tin nhắn"}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-8 align-top">
                    <form
                      action={updateContactStatus}
                      className="flex flex-col gap-2"
                    >
                      <input type="hidden" name="id" value={c.id} />
                      <select
                        name="status"
                        defaultValue={c.status}
                        className="w-full max-w-[140px] cursor-pointer appearance-none rounded-none border-black/5 bg-luxury-surface px-3 py-2 font-bold text-[10px] uppercase tracking-widest focus:ring-1 focus:ring-obsidian"
                      >
                        <option value="new">Mới</option>
                        <option value="contacted">Đã liên hệ</option>
                        <option value="booked">Đã đặt lịch</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Hủy</option>
                      </select>
                      <Button
                        type="submit"
                        variant="link"
                        className="h-auto w-fit justify-start p-0 font-bold text-[9px] text-mist uppercase tracking-[0.2em] hover:text-obsidian"
                      >
                        Cập nhật
                      </Button>
                    </form>
                  </td>
                  <td className="px-8 py-8 text-right align-top">
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-smoke">
                        <CalendarIcon className="size-3 text-mist" />
                        <span className="font-light text-[11px]">
                          {new Date(c.created_at).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <span className="font-bold text-[9px] text-mist uppercase tracking-widest">
                        {new Date(c.created_at).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-8 py-32 text-center font-light text-smoke tracking-wide"
                  >
                    Hệ thống chưa ghi nhận yêu cầu liên hệ nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {contacts.length === 0 && (
        <div className="border border-black/10 border-dashed px-8 py-24 text-center font-light text-smoke tracking-wide md:hidden">
          Hệ thống chưa ghi nhận yêu cầu liên hệ nào.
        </div>
      )}
    </div>
  );
}
