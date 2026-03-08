"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  STATS_BY_PERIOD,
  STATS_PERIOD_LABELS,
  type StatsPeriodKey,
  type TransactionStatType,
} from "@/data/stats";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const LABEL_BY_TYPE: Record<TransactionStatType, string> = {
  "Rendu monnaie": "Rendu monnaie",
  "Paiement course": "Paiement course",
};

const TYPE_ORDER: TransactionStatType[] = [
  "Rendu monnaie",
  "Paiement course",
];

type StatisticsCardProps = {
  isLoading?: boolean;
};

export function StatisticsCard({ isLoading = false }: StatisticsCardProps) {
  const [period, setPeriod] = useState<StatsPeriodKey>("30days");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const stats = STATS_BY_PERIOD[period];
  const total = stats.total;
  const renduCount = stats.byType["Rendu monnaie"];
  const paiementCount = stats.byType["Paiement course"];
  const renduPercent = total > 0 ? (renduCount / total) * 100 : 0;
  const paiementPercent = total > 0 ? (paiementCount / total) * 100 : 0;

  const strokeWidth = 10;
  const radius = 40;
  const circumference = useMemo(() => 2 * Math.PI * radius, []); // circumference = 2 * π * radius
  const renduLength = (renduPercent / 100) * circumference;
  const paiementLength = (paiementPercent / 100) * circumference;

  const [display, setDisplay] = useState({ renduLength: 0, paiementLength: 0 });

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDisplay({ renduLength, paiementLength });
    });
    return () => cancelAnimationFrame(id);
  }, [renduLength, paiementLength]);

  if (isLoading) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    return (
      <div className="flex h-full min-h-[320px] sm:min-h-[380px] flex-col rounded-xl bg-card p-4 sm:rounded-2xl sm:p-5 md:rounded-card md:p-6 w-full">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg lg:text-2xl font-sana-bold text-foreground">
            Statistiques
          </h2>
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-sana-regular text-foreground"
              aria-label="Choisir la période"
            >
              <span>{STATS_PERIOD_LABELS[period]}</span>
              <ChevronDown className="size-4" aria-hidden />
            </button>
          </div>
        </div>
        <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-4 py-4 sm:gap-5 sm:py-6">
          <div className="relative flex shrink-0 items-center justify-center size-60 animate-pulse">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="var(--muted)"
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={`${circumference} 0`}
                strokeDashoffset={0}
                className="opacity-60"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <Skeleton className="h-5 w-16 lg:h-6 lg:w-20 rounded" />
              <span className="text-sm font-sana-regular text-muted-foreground sm:text-base">
                Transactions
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {TYPE_ORDER.map((type) => (
              <div key={type} className="flex items-center gap-2">
                <span
                  className="size-3 shrink-0 rounded-full sm:size-3.5"
                  style={{
                    backgroundColor:
                      type === "Rendu monnaie"
                        ? "var(--primary)"
                        : "var(--success)",
                  }}
                  aria-hidden
                />
                <span className="text-sm font-sana-regular text-foreground sm:text-base">
                  {LABEL_BY_TYPE[type]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[320px] sm:min-h-[380px] flex-col rounded-xl bg-card p-4 sm:rounded-2xl sm:p-5 md:rounded-card md:p-6 w-full">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg lg:text-2xl font-sana-bold text-foreground">
          Statistiques
        </h2>
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-sana-regular text-foreground transition-colors hover:bg-secondary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            aria-label="Choisir la période"
          >
            <span>{STATS_PERIOD_LABELS[period]}</span>
            <ChevronDown
              className={cn("size-4 transition-transform", dropdownOpen && "rotate-180")}
              aria-hidden
            />
          </button>
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                aria-hidden
                onClick={() => setDropdownOpen(false)}
              />
              <ul
                role="listbox"
                className="absolute right-0 top-full z-20 mt-1 min-w-[180px] rounded-lg border border-border bg-popover py-1 shadow-md"
              >
                {(Object.keys(STATS_PERIOD_LABELS) as StatsPeriodKey[]).map(
                  (key) => (
                    <li key={key} role="option" aria-selected={period === key}>
                      <button
                        type="button"
                        onClick={() => {
                          setPeriod(key);
                          setDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                          period === key
                            ? "font-sana-bold text-foreground"
                            : "font-sana-regular text-foreground"
                        )}
                      >
                        {STATS_PERIOD_LABELS[key]}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-4 py-4 sm:gap-5 sm:py-6">
        <div
          className="relative flex shrink-0 items-center justify-center size-60 lg:size-50 xl:size-60"
        >
          <svg
            viewBox="0 0 100 100"
            className="size-full -rotate-90"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="var(--success)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                strokeDasharray: `${display.paiementLength} ${circumference - display.paiementLength}`,
                strokeDashoffset: 0,
                transition: "stroke-dasharray 0.3s ease-out, stroke-dashoffset 0.3s ease-out",
              }}
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              style={{
                strokeDasharray: `${display.renduLength} ${circumference - display.renduLength}`,
                strokeDashoffset: -display.paiementLength,
                transition: "stroke-dasharray 0.3s ease-out, stroke-dashoffset 0.3s ease-out",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-sana-heavy tabular-nums text-foreground sm:text-3xl md:text-4xl">
              {total.toLocaleString("fr-FR")}
            </span>
            <span className="text-sm font-sana-regular text-muted-foreground sm:text-base">
              Transactions
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-8">
          {TYPE_ORDER.map((type) => (
            <div
              key={type}
              className="flex items-center gap-2"
            >
              <span
                className="size-3 shrink-0 rounded-full sm:size-3.5"
                style={{
                  backgroundColor:
                    type === "Rendu monnaie"
                      ? "var(--primary)"
                      : "var(--success)",
                }}
                aria-hidden
              />
              <span className="text-sm font-sana-regular text-foreground">
                {LABEL_BY_TYPE[type]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
