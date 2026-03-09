"use client";

import { CaissierDetailsPanel } from "@/components/store-details/CaissierDetailsPanel";
import { StoreCaissiersTable } from "@/components/store-details/StoreCaissiersTable";
import { StoreTransactionsTable } from "@/components/store-details/StoreTransactionsTable";
import { Button } from "@/components/ui/button";
import { StorePieChart } from "@/components/ui/StorePieChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StoreCaissier } from "@/data/storeDetails";
import type { StoreDetails } from "@/data/stores";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const COLUMN_1: { key: keyof StoreDetails; label: string }[] = [
  { key: "storeName", label: "Nom du magasin" },
  { key: "location", label: "Localisation" },
];
const COLUMN_2: { key: keyof StoreDetails; label: string }[] = [
  { key: "manager", label: "Manager" },
  { key: "responsableCaisse", label: "Responsable Caisse" },
];
const COLUMN_3: { key: keyof StoreDetails; label: string }[] = [
  { key: "nombreCaissiers", label: "Nombre de Caissiers" },
  { key: "nombreTransactions", label: "Nombre de Transaction" },
];

function formatDetailValue(store: StoreDetails, key: keyof StoreDetails): string {
  const v = store[key];
  if (key === "nombreCaissiers" && typeof v === "number")
    return String(v).padStart(2, "0");
  if (key === "nombreTransactions" && typeof v === "number")
    return v.toLocaleString("fr-FR");
  return String(v);
}

export function StoreDetailsContent({ store }: { store: StoreDetails }) {
  const [activeTab, setActiveTab] = useState("transactions");
  const [selectedCaissier, setSelectedCaissier] = useState<StoreCaissier | null>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "transactions") setSelectedCaissier(null);
  };

  return (
    <div className="w-[90%] max-w-[1350px] mx-auto">
      <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 items-stretch xl:items-start min-w-0">
        <div className="flex flex-col gap-4 sm:gap-6 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-full border-2 border-muted text-foreground"
              aria-label="Retour à la liste des magasins"
              asChild
            >
              <Link href="/stores">
                <ArrowLeft className="size-5" />
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl font-sana-bold text-foreground shrink-0">
              Détails Magasin
            </h1>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-white overflow-hidden">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-8">
                {/* Colonne 1 : Nom du magasin, Localisation */}
                <div className="flex flex-col gap-4 sm:gap-5 min-w-0 lg:flex-1">
                  {COLUMN_1.map(({ key, label }) => (
                    <div key={key} className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm font-sana-regular text-muted-foreground">
                        {label}
                      </span>
                      <span className="text-base sm:text-lg font-sana-bold text-foreground truncate">
                        {formatDetailValue(store, key)}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Colonne 2 : Manager, Responsable Caisse */}
                <div className="flex flex-col gap-4 sm:gap-5 min-w-0 lg:flex-1">
                  {COLUMN_2.map(({ key, label }) => (
                    <div key={key} className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm font-sana-regular text-muted-foreground">
                        {label}
                      </span>
                      <span className="text-base sm:text-lg font-sana-bold text-foreground truncate">
                        {formatDetailValue(store, key)}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Colonne 3 : Nombre de Caissiers, Nombre de Transaction */}
                <div className="flex flex-col gap-4 sm:gap-5 min-w-0 lg:flex-1">
                  {COLUMN_3.map(({ key, label }) => (
                    <div key={key} className="flex flex-col gap-1 min-w-0">
                      <span className="text-sm font-sana-regular text-muted-foreground">
                        {label}
                      </span>
                      <span className="text-base sm:text-lg font-sana-bold text-foreground truncate">
                        {formatDetailValue(store, key)}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Graphique + légende à droite */}
                <div className="flex items-center justify-center lg:justify-end border-t border-border pt-6 lg:pt-0 lg:border-t-0 lg:border-l lg:border-border lg:pl-8 lg:shrink-0">
                  <StorePieChart transactionByType={store.transactionByType} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-white overflow-hidden p-4 sm:p-6 md:p-8">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList variant="pill" className="w-full max-w-[280px] sm:max-w-[320px]">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="caissiers">Caissiers</TabsTrigger>
              </TabsList>
              <TabsContent value="transactions" className="mt-4 outline-none">
                <StoreTransactionsTable storeId={store.id} />
              </TabsContent>
              <TabsContent value="caissiers" className="mt-4 outline-none">
                <StoreCaissiersTable
                  storeId={store.id}
                  selectedCaissier={selectedCaissier}
                  onCaissierSelect={setSelectedCaissier}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {activeTab === "caissiers" && selectedCaissier && (
          <div className="shrink-0 xl:sticky xl:top-32">
            <CaissierDetailsPanel
              caissier={selectedCaissier}
              onClose={() => setSelectedCaissier(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
