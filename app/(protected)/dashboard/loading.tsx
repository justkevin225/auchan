import { LastTransactionsTable } from "@/components/ui/LastTransactionsTable";
import { StatisticsCard } from "@/components/ui/StatisticsCard";

export default function DashboardLoading() {
  return (
    <div className="min-h-dvh py-8">
      <div className="w-[90%] max-w-[1350px] mx-auto">
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
