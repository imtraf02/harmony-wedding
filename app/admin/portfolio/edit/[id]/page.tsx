import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortfolioForm } from '../../components/portfolio-form';
import { getPortfolioBySlug, getPortfolios } from '@/lib/queries/portfolio';

// getPortfolioBySlug is available, but we only have ID in the URL.
// Wait, the link from the portfolio list uses the ID: href={`/admin/portfolio/edit/${item.id}`}
// Let's get the portfolio by ID. We don't have a getPortfolioById query yet.
// I will fetch all and find by ID for simplicity, or we can use the ID directly if we add it.

export default async function EditPortfolioPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id);
  
  if (isNaN(id)) {
    notFound();
  }

  // A quick way to get by ID without adding a new query function
  const allPortfolios = getPortfolios();
  const portfolio = allPortfolios.find(p => p.id === id);

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="space-y-12 font-sans">
      <header className="flex items-center gap-6">
        <Button variant="outline" size="icon" render={<Link href="/admin/portfolio" />} nativeButton={false} className="rounded-full size-10">
          ←
        </Button>
        <div>
          <h1 className="text-4xl font-cormorant text-foreground mb-2">Sửa Portfolio</h1>
          <p className="text-muted-foreground text-sm">Cập nhật thông tin và hình ảnh cho dự án.</p>
        </div>
      </header>

      <Card className="max-w-2xl rounded-[2.5rem] border-zinc-100 shadow-2xl shadow-zinc-200/50">
        <CardHeader className="sr-only">
          <CardTitle>Thông tin Portfolio</CardTitle>
          <CardDescription>Cập nhật thông tin chi tiết</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <PortfolioForm initialData={portfolio} />
        </CardContent>
      </Card>
    </div>
  );
}
