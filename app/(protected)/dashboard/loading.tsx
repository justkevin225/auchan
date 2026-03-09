import { LastTransactionsTable } from "@/components/ui/LastTransactionsTable";
import { StatisticsCard } from "@/components/ui/StatisticsCard";
import StoreCard from "@/components/ui/StoreCard";
import BalanceCardSkeleton from "@/components/ui/BalanceCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const STORE_CARD_PLACEHOLDER = {
  id: "",
  storeName: "",
  storeId: "",
  location: "",
};

export default function DashboardLoading() {
  return (
    <div className="min-h-dvh py-8">
      <div className="w-[90%] max-w-[1350px] mx-auto">
        <div className="flex flex-col md:flex-row max-lg:items-center gap-8 items-stretch">
          {/* Balance Card skeleton */}
          <BalanceCardSkeleton />

          {/* Stores most transactions skeleton */}
          <div className="w-full min-w-0 min-h-0 flex-1 flex flex-col bg-primary-muted rounded-xl sm:rounded-2xl md:rounded-card gap-5 relative overflow-hidden">
            <div className="flex flex-wrap gap-2 items-center justify-between shrink-0 p-5 md:p-6 md:pr-10">
              <Skeleton className="h-7 w-64 rounded-lg" />
              <Skeleton className="h-10 w-36 rounded-lg" />
            </div>
            <div className="min-w-0 flex gap-4 overflow-x-hidden scrollbar-none pl-5 pr-10 pb-5 md:pb-6">
              {[1, 2, 3, 4].map((i) => (
                <StoreCard
                  key={i}
                  {...STORE_CARD_PLACEHOLDER}
                  id={`skeleton-${i}`}
                  isLoading
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-6 mt-6 sm:mt-8 min-w-0">
          <div className="min-w-0 col-span-full lg:col-span-2 w-full">
            <LastTransactionsTable transactions={[]} isLoading />
          </div>
          <div className="min-w-0 col-span-full lg:col-span-1 w-full">
            <StatisticsCard isLoading />
          </div>
        </div>
      </div>
    </div>
  );
}
