"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/stores": "Magasins",
  "/transactions": "Transactions",
  "/clients": "Clients",
  "/management": "Gestions",
  "/statistics": "Statistiques",
};

export function BreadcrumbBar() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 2) return null;

  const items: { href: string; label: string; isLast: boolean }[] = [];
  let href = "";
  for (let i = 0; i < segments.length; i++) {
    href += `/${segments[i]}`;
    const isLast = i === segments.length - 1;
    const label =
      isLast && !ROUTES[href] ? "Détails" : ROUTES[href] ?? segments[i];
    items.push({ href, label, isLast });
  }

  if (items.length === 0) return null;

  return (
    <>
      <div className="fixed top-18 pt-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[1350px] z-40 bg-primary-muted rounded-b-lg px-4 py-1.5 flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <span key={item.href} className="contents">
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {item.isLast ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="h-11 shrink-0" aria-hidden />
    </>
  );
}
