import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@tanstack/react-router';

export function BreadCrumb({ active }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link className={active === 'checkout' && 'text-[#7126B5] font-bold'}>isi Data Diri</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link className={active === 'payment' && 'text-[#7126B5] font-bold'}>Bayar</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link className={active === 'done' && 'text-[#7126B5] font-bold'}>Selesai</Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
