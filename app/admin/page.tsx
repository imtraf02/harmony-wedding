'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';

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
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 font-jost overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-md flex flex-col gap-12 relative z-10 animate-fade-in-up-luxury">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-px bg-gold/30" />
            <span className="text-gold text-lg animate-gold-pulse">◆</span>
            <span className="w-8 h-px bg-gold/30" />
          </div>
          <h1 className="text-5xl font-cormorant font-light text-ivory tracking-tight">Harmony Studio</h1>
          <p className="text-gold-muted text-[10px] tracking-[0.3em] uppercase font-medium">Cổng quản trị nội dung</p>
        </div>

        <div className="glass border-white/10 rounded-none p-10 shadow-luxury">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-8">
              <Field>
                <FieldLabel htmlFor="username" className="text-[9px] tracking-[0.2em] uppercase font-bold text-gold-dim mb-3 block">Tên đăng nhập</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-ivory placeholder:text-white/10 focus:ring-0 focus:border-gold transition-all"
                  placeholder="admin"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password" className="text-[9px] tracking-[0.2em] uppercase font-bold text-gold-dim mb-3 block">Mật khẩu</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-transparent border-0 border-b border-white/10 rounded-none px-0 text-ivory placeholder:text-white/10 focus:ring-0 focus:border-gold transition-all"
                  placeholder="••••••••"
                />
              </Field>

              {error && (
                <p className="text-red-400 text-[11px] font-medium text-center animate-fade-in bg-red-400/10 py-2 rounded-none border border-red-400/20">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-7 border border-gold/40 text-gold bg-transparent hover:bg-gold hover:text-obsidian rounded-none font-medium text-[11px] uppercase tracking-[0.2em] transition-all duration-500 mt-4"
              >
                {loading && <Spinner className="mr-2" />}
                {loading ? 'Đang xác thực...' : 'Đăng nhập'}
              </Button>
            </FieldGroup>
          </form>
        </div>

        <p className="text-center text-white/20 text-[9px] tracking-[0.2em] uppercase font-medium">
          &copy; {new Date().getFullYear()} Harmony Studio &bull; Private Access
        </p>
      </div>
    </div>
  );
}

