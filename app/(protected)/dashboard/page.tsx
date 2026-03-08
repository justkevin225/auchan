import BalanceCard from "@/components/ui/BalanceCard";
import { Button } from "@/components/ui/button";
import { LastTransactionsTable } from "@/components/ui/LastTransactionsTable";
import { StatisticsCard } from "@/components/ui/StatisticsCard";
import StoreCard from "@/components/ui/StoreCard";
import { TOP_STORES } from "@/data/stores";
import { LAST_TRANSACTIONS } from "@/data/transactions";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Auchan | Dashboard",
};

export default async function Dashboard() {
  return (
    <div className="min-h-dvh py-8">
      <div className="w-[90%] max-w-[1350px] mx-auto">
        <div className="flex flex-col md:flex-row max-lg:items-center gap-8 items-stretch">
          {/* Balance Card */}
          <BalanceCard />

          {/* Stores most transactions */}
          <div className="w-full min-w-0 min-h-0 flex-1 flex flex-col bg-primary-muted rounded-xl sm:rounded-2xl md:rounded-card gap-5 relative overflow-hidden">
            <div className="flex flex-wrap gap-2 items-center justify-between shrink-0 p-5 md:p-6 md:pr-10">
              <h2 className="text-lg lg:text-2xl font-sana-bold">
                Les magasins qui transactent le plus
              </h2>
              <Button variant="outline" size="lg" className="text-base" asChild>
                <Link href="/stores">
                  <span>Tous les magasins</span>
                  <ChevronRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>

            <div className="min-w-0 flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-none pl-5 pr-10 pb-5 md:pb-6">
              {TOP_STORES.map((store) => (
                <StoreCard
                  key={store.id}
                  id={store.id}
                  storeName={store.storeName}
                  storeId={store.storeId}
                  location={store.location}
                />
              ))}
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-10 bg-linear-to-l from-red-200 to-transparent z-10 rounded-tr-xl rounded-br-xl md:rounded-tr-card md:rounded-br-card sm:rounded-tr-2xl sm:rounded-br-2xl pointer-events-none" />
          </div>

        </div>

        {/* Last transactions and stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-6 mt-6 sm:mt-8 min-w-0">

          {/* Last transactions — 2/3 en lg, pleine largeur en dessous */}
          <div className="min-w-0 col-span-full lg:col-span-2 w-full">
            <LastTransactionsTable transactions={LAST_TRANSACTIONS} />
          </div>

          {/* Stats — 1/3 en lg, pleine largeur en dessous */}
          <div className="min-w-0 col-span-full lg:col-span-1 w-full">
            <StatisticsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
