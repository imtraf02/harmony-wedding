"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(username, password);

      if (res.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(res.message || "Sai tên đăng nhập hoặc mật khẩu");
      }
    } catch {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ivory p-6 font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-obsidian/5 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-obsidian/5 blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-md animate-fade-in-up-luxury flex-col gap-12">
        <div className="space-y-3 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-obsidian/20" />
            <span className="animate-obsidian-pulse text-lg text-obsidian">
              ◆
            </span>
            <span className="h-px w-8 bg-obsidian/20" />
          </div>
          <h1 className="font-light font-sans text-5xl text-obsidian tracking-tight">
            Harmony Studio
          </h1>
          <p className="font-medium text-[10px] text-obsidian uppercase tracking-[0.3em]">
            Cổng quản trị nội dung
          </p>
        </div>

        <div className="rounded-none border border-black/5 bg-white p-10 shadow-luxury">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-8">
              <Field>
                <FieldLabel
                  htmlFor="username"
                  className="mb-3 block font-bold text-[9px] text-ash uppercase tracking-[0.2em]"
                >
                  Tên đăng nhập
                </FieldLabel>
                <Input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
                  placeholder="admin"
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="password"
                  className="mb-3 block font-bold text-[9px] text-ash uppercase tracking-[0.2em]"
                >
                  Mật khẩu
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
                  placeholder="••••••••"
                />
              </Field>

              {error && (
                <p className="animate-fade-in rounded-none border border-red-100 bg-red-50 py-2 text-center font-medium text-[11px] text-red-500">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-none border border-black/10 bg-transparent py-7 font-medium text-[11px] text-obsidian uppercase tracking-[0.2em] transition-all duration-500 hover:border-obsidian hover:bg-obsidian hover:text-white"
              >
                {loading && <Spinner className="mr-2" />}
                {loading ? "Đang xác thực..." : "Đăng nhập"}
              </Button>
            </FieldGroup>
          </form>
        </div>

        <p className="text-center font-medium text-[9px] text-black/20 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Harmony Studio &bull; Private Access
        </p>
      </div>
    </div>
  );
}
