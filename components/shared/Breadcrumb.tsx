import Link from 'next/link';
import { JsonLd, breadcrumbSchema } from '@/components/shared/JsonLd';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ name: 'Trang chủ', path: '/' }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(allItems)} />
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol className="breadcrumb-list">
          {allItems.map((item, i) => (
            <li key={item.path} className="breadcrumb-item">
              {i < allItems.length - 1 ? (
                <>
                  <Link href={item.path} className="breadcrumb-link">
                    {item.name}
                  </Link>
                  <span className="breadcrumb-sep" aria-hidden="true">/</span>
                </>
              ) : (
                <span aria-current="page" className="breadcrumb-current">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
