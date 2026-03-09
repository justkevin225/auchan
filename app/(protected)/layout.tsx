import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Header } from "@/components/layout/Header";

export const dynamic = "force-dynamic";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex flex-col pt-22">
        <BreadcrumbBar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
