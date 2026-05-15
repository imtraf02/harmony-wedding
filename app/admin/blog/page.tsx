import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminBlogPage() {
  return (
    <div className="space-y-12 font-sans">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-sans text-foreground mb-2">Quản lý Blog</h1>
          <p className="text-muted-foreground text-sm">Viết và chia sẻ cẩm nang, mẹo chuẩn bị đám cưới.</p>
        </div>
        <Button 
          render={<Link href="/admin/blog/new" />}
          nativeButton={false} 
          className="bg-gold text-white px-8 py-6 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-gold/20"
        >
          + Thêm bài viết mới
        </Button>
      </header>

      <div className="col-span-full py-32 text-center bg-card border border-dashed border-border rounded-[3rem]">
        <p className="text-muted-foreground  mb-6 text-lg">Chưa có dữ liệu. Tính năng đang được phát triển.</p>
      </div>
    </div>
  );
}
