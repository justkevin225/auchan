import { Skeleton } from "@/components/ui/skeleton";

export default function BalanceCardSkeleton() {
  return (
    <div className="relative max-h-[330px] w-full max-w-[350px] mx-auto rounded-xl sm:rounded-2xl md:rounded-card overflow-hidden bg-primary/80">
      <div className="absolute inset-0 flex flex-col p-[8vw] xs:p-[10%]">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-32 bg-white/30 rounded-lg" />
          <Skeleton className="h-4 w-48 max-w-[85%] bg-white/20 rounded" />
        </div>
        <div className="mt-auto flex flex-col gap-1">
          <Skeleton className="h-8 w-28 bg-white/30 rounded-lg" />
          <Skeleton className="h-8 w-16 bg-white/20 rounded" />
        </div>
      </div>
    </div>
  );
}
