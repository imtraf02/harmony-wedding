'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || 'Sai tên đăng nhập hoặc mật khẩu');
      }
    } catch {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-cormorant text-zinc-900 mb-2">Harmony Admin</h1>
          <p className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold">Cổng quản trị nội dung</p>
        </div>

        <Card className="rounded-[2.5rem] border-zinc-100 shadow-2xl shadow-zinc-200/50">
          <CardHeader className="pb-2">
            <CardTitle className="sr-only">Đăng nhập Quản trị</CardTitle>
            <CardDescription className="sr-only">Vui lòng nhập tài khoản để tiếp tục</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username" className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Tên đăng nhập</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 bg-zinc-50 border-zinc-100 rounded-2xl focus:ring-4 focus:ring-gold/10 focus:border-gold"
                    placeholder="admin"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password" className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Mật khẩu</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-zinc-50 border-zinc-100 rounded-2xl focus:ring-4 focus:ring-gold/10 focus:border-gold"
                    placeholder="••••••••"
                  />
                </Field>

                {error && (
                  <p className="text-destructive text-xs font-medium text-center animate-fade-in">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-gold text-white rounded-full font-bold text-sm hover:opacity-90 shadow-xl shadow-gold/20"
                >
                  {loading && <Spinner data-icon="inline-start" />}
                  {loading ? 'Đang xác thực...' : 'Đăng nhập'}
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-zinc-400 text-[10px] tracking-[0.2em] uppercase font-medium">
          &copy; {new Date().getFullYear()} Harmony Studio
        </p>
      </div>
    </div>
  );
}
