"use client";

import { Button } from "@/components/ui/button";
import {
  getCaissierRecentTransactions,
  getCaissierStoreHistory,
  type CaissierRecentTransaction,
  type CaissierStoreHistoryItem,
  type StoreCaissier,
} from "@/data/storeDetails";
import { X } from "lucide-react";

type CaissierDetailsPanelProps = {
  caissier: StoreCaissier;
  onClose: () => void;
};

function formatPeriod(item: CaissierStoreHistoryItem): string {
  if (item.dateTo === null) {
    return `Depuis le ${item.dateFrom}`;
  }
  return `Du ${item.dateFrom} au ${item.dateTo}`;
}

function formatAmount(amount: number): string {
  const sign = amount >= 0 ? "+" : "";
  return `${sign}${amount.toLocaleString("fr-FR")} FCFA`;
}

export function CaissierDetailsPanel({ caissier, onClose }: CaissierDetailsPanelProps) {
  const storeHistory = getCaissierStoreHistory(caissier.id);
  const recentTransactions = getCaissierRecentTransactions(caissier.id);

  return (
    <div className="flex flex-col w-full max-w-[360px] min-w-[320px] h-fit bg-white rounded-xl sm:rounded-2xl shadow-sm border border-border/50 overflow-hidden">
      {/* En-tête */}
      <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border/50">
        <h3 className="text-lg sm:text-xl font-sana-bold text-foreground truncate pr-2">
          {caissier.utilisateur}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full shrink-0 text-muted-foreground hover:text-foreground"
          onClick={onClose}
          aria-label="Fermer"
        >
          <X className="size-5" />
        </Button>
      </div>

      <div className="flex flex-col p-4 sm:p-5 gap-6">
        {/* Historique magasin */}
        <section>
          <h4 className="text-sm font-sana-bold text-foreground mb-4">
            Historique magasin
          </h4>
          <div className="relative pl-4">
            {/* Ligne verticale de la timeline */}
            <div
              className="absolute left-[5px] top-2 bottom-2 w-px bg-border"
              aria-hidden
            />
            <ul className="flex flex-col gap-4">
              {storeHistory.map((item) => (
                <li key={item.id} className="relative flex flex-col gap-1.5">
                  {/* Point rouge sur la timeline */}
                  <div
                    className="absolute -left-4 top-1.5 size-2.5 rounded-full bg-primary"
                    aria-hidden
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-sana-bold text-foreground text-sm">
                      {item.location
                        ? `${item.storeName}, ${item.location}`
                        : item.storeName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatPeriod(item)}
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-fit mt-1 rounded-lg font-sana-medium text-foreground bg-muted/50 hover:bg-muted"
                  >
                    Voir l&apos;activité
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Séparateur */}
        <hr className="border-t border-border/50 -mx-1" />

        {/* Dernières transactions */}
        <section>
          <h4 className="text-sm font-sana-bold text-foreground mb-4">
            Dernières transactions
          </h4>
          <ul className="flex flex-col gap-3 mb-4">
            {recentTransactions.map((tx: CaissierRecentTransaction) => (
              <li
                key={tx.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-foreground">{tx.type}</span>
                <span className="font-sana-medium text-foreground">
                  {formatAmount(tx.amount)}
                </span>
              </li>
            ))}
          </ul>
          <Button
            variant="secondary"
            className="w-full rounded-lg font-sana-medium text-foreground bg-muted/50 hover:bg-muted"
          >
            Toutes les transactions
          </Button>
        </section>
      </div>
    </div>
  );
}
