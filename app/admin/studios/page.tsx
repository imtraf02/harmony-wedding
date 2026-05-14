import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminStudiosPage() {
  return (
    <div className="space-y-12 font-sans">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-cormorant text-foreground mb-2">Quản lý Studio & Phim trường</h1>
          <p className="text-muted-foreground text-sm">Cập nhật thông tin các địa điểm chụp ảnh cưới.</p>
        </div>
        <Button 
          render={<Link href="/admin/studios/new" />}
          nativeButton={false} 
          className="bg-gold text-white px-8 py-6 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-gold/20"
        >
          + Thêm mới
        </Button>
      </header>

      <div className="col-span-full py-32 text-center bg-card border border-dashed border-border rounded-[3rem]">
        <p className="text-muted-foreground italic mb-6 text-lg">Chưa có dữ liệu. Tính năng đang được phát triển.</p>
      </div>
    </div>
  );
}
