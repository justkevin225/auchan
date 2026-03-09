"use client";

import type { TransactionStatType } from "@/data/stats";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

const LABEL_BY_TYPE: Record<TransactionStatType, string> = {
  "Rendu monnaie": "Rendu monnaie",
  "Paiement course": "Paiement course",
};

const TYPE_ORDER: TransactionStatType[] = [
  "Rendu monnaie",
  "Paiement course",
];

type StorePieChartProps = {
  transactionByType: Record<TransactionStatType, number>;
  className?: string;
};

export function StorePieChart({ transactionByType, className }: StorePieChartProps) {
  const total = transactionByType["Rendu monnaie"] + transactionByType["Paiement course"];
  const renduPercent = total > 0 ? (transactionByType["Rendu monnaie"] / total) * 100 : 0;
  const paiementPercent = total > 0 ? (transactionByType["Paiement course"] / total) * 100 : 0;

  const strokeWidth = 10;
  const radius = 40;
  const circumference = useMemo(() => 2 * Math.PI * radius, []);
  const renduLength = (renduPercent / 100) * circumference;
  const paiementLength = (paiementPercent / 100) * circumference;

  const [display, setDisplay] = useState({ renduLength: 0, paiementLength: 0 });

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setDisplay({ renduLength, paiementLength });
    });
    return () => cancelAnimationFrame(id);
  }, [renduLength, paiementLength]);

  return (
    <div className={cn("flex items-center gap-3 sm:gap-4", className)}>
      <div className="relative flex shrink-0 items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
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
      </div>
      <div className="flex flex-col gap-2 shrink-0">
        {TYPE_ORDER.map((type) => (
          <div key={type} className="flex items-center gap-2">
            <span
              className="size-2.5 sm:size-3 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  type === "Rendu monnaie" ? "var(--primary)" : "var(--success)",
              }}
              aria-hidden
            />
            <span className="text-xs sm:text-sm font-sana-regular text-foreground whitespace-nowrap">
              {LABEL_BY_TYPE[type]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
