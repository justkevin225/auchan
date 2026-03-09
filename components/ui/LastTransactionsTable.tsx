"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Transaction } from "@/data/transactions";
import { formatAmountFCFA } from "@/lib/format";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

type LastTransactionsTableProps = {
  transactions: Transaction[];
  isLoading?: boolean;
};

const TABLE_SKELETON_ROWS = 6;

export function LastTransactionsTable({
  transactions,
  isLoading = false,
}: LastTransactionsTableProps) {
  if (isLoading) {
    return (
      <div className="p-5 flex flex-col bg-white rounded-xl sm:rounded-2xl md:rounded-card overflow-hidden min-w-0">
        <div className="flex flex-wrap gap-2 items-center justify-between shrink-0 p-4 sm:p-5 md:p-6 md:px-0">
          <h2 className="text-lg lg:text-2xl font-sana-bold">
            Dernières transactions
          </h2>
          <Button variant="outline" size="lg" className="shrink-0" asChild>
            <Link href="/transactions">
              <span className="hidden sm:inline">Toutes les transactions</span>
              <span className="sm:hidden">Voir tout</span>
              <ChevronRight className="size-4 shrink-0" aria-hidden />
            </Link>
          </Button>
        </div>
        <div className="pb-4 md:hidden space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 p-3 rounded-lg border bg-muted/5">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
              <div className="flex justify-between gap-2">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
              <div className="flex justify-between gap-2">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-14 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block pb-4 lg:pb-6 min-w-0">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="font-sana-medium">Type de transaction</TableHead>
                <TableHead className="font-sana-medium">Magasin</TableHead>
                <TableHead className="font-sana-medium">Montant</TableHead>
                <TableHead className="font-sana-medium hidden lg:table-cell">Client</TableHead>
                <TableHead className="font-sana-medium">Date</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: TABLE_SKELETON_ROWS }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-28 rounded" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24 rounded" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20 rounded" /></TableCell>
                  <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-20 rounded" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24 rounded" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 rounded" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 flex flex-col bg-white rounded-xl sm:rounded-2xl md:rounded-card overflow-hidden min-w-0">
      <div className="flex flex-wrap gap-2 items-center justify-between shrink-0 p-4 sm:p-5 md:p-6">
        <h2 className="text-lg lg:text-2xl font-sana-bold">
          Dernières transactions
        </h2>
        <Button variant="outline" size="lg" className="shrink-0" asChild>
          <Link href="/transactions">
            <span className="hidden sm:inline">Toutes les transactions</span>
            <span className="sm:hidden">Voir tout</span>
            <ChevronRight className="size-4 shrink-0" aria-hidden />
          </Link>
        </Button>
      </div>

      {/* Vue cards — md and below */}
      <div className="px-4 pb-4 md:hidden space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="relative flex flex-wrap items-center gap-x-3 gap-y-2 p-3 rounded-lg border bg-muted/5 hover:bg-muted/10 transition-colors"
          >
            <div className="flex items-center justify-between min-w-0 pr-10 w-full">
              <p className="font-sana-medium text-foreground truncate">{tx.type}</p>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 absolute top-2 right-2"
                aria-label="Plus d'options"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </div>


            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between min-w-0 w-full">
                <p className="text-sm text-muted-foreground truncate">{tx.storeName}</p>
                <span
                  className={
                    tx.amount > 0
                      ? "text-green-600 font-sana-medium shrink-0"
                      : "text-red-600 font-sana-medium shrink-0"
                  }
                >
                  {formatAmountFCFA(tx.amount)}
                </span>
              </div>

              <div className="w-full flex items-center justify-between gap-2 text-sm text-muted-foreground">
                <span className="truncate">{tx.client}</span>
                <span className="shrink-0">{tx.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vue table — lg and above */}
      <div className="hidden md:block pb-4 lg:pb-6 min-w-0">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-sana-medium text-foreground">
                Type de transaction
              </TableHead>
              <TableHead className="font-sana-medium text-foreground">
                Magasin
              </TableHead>
              <TableHead className="font-sana-medium text-foreground">
                Montant
              </TableHead>
              <TableHead className="font-sana-medium text-foreground hidden lg:table-cell">
                Client
              </TableHead>
              <TableHead className="font-sana-medium text-foreground">
                Date
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-muted/10">
                <TableCell className="font-medium">{tx.type}</TableCell>
                <TableCell>{tx.storeName}</TableCell>
                <TableCell>
                  <span
                    className={
                      tx.amount > 0
                        ? "text-green-600 font-sana-medium"
                        : "text-red-600 font-sana-medium"
                    }
                  >
                    {formatAmountFCFA(tx.amount)}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{tx.client}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell className="p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    aria-label="Plus d’options"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
