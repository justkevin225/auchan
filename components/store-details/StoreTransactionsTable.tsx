"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  clearStoreDetailsCache,
  getStoreTransactions,
} from "@/data/storeDetails";
import { filterTransactions } from "@/lib/filters";
import { formatAmountFCFA } from "@/lib/format";
import { usePagination } from "@/lib/hooks";
import { getPaginationPages } from "@/lib/pagination";
import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { TableToolbar } from "./TableToolbar";

const PAGE_SIZE = 10;
const FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "Rendu monnaie", label: "Rendu monnaie" },
  { value: "Paiement course", label: "Paiement course" },
];

type StoreTransactionsTableProps = {
  storeId: string;
};

export function StoreTransactionsTable({ storeId }: StoreTransactionsTableProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("tous");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("tous");
    setDateFrom("");
    setDateTo("");
  };

  const handleRefresh = () => {
    clearStoreDetailsCache();
    setRefreshKey((k) => k + 1);
  };

  const allTransactions = useMemo(
    () => getStoreTransactions(storeId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storeId, refreshKey]
  );
  const filtered = useMemo(
    () =>
      filterTransactions(
        allTransactions,
        search,
        typeFilter,
        dateFrom,
        dateTo
      ),
    [allTransactions, search, typeFilter, dateFrom, dateTo]
  );
  const {
    paginatedItems,
    totalPages,
    currentPage,
    setCurrentPage,
    hasNext,
    hasPrev,
  } = usePagination(filtered, PAGE_SIZE);

  return (
    <div className="flex flex-col bg-white rounded-xl sm:rounded-2xl md:rounded-card overflow-hidden min-w-0">
      <div className="shrink-0 p-4 sm:p-5 md:p-6 md:px-0">
        <TableToolbar
          title="Transactions"
          searchPlaceholder="Type, point de vente, n° client, n° d'avoir..."
          searchValue={search}
          onSearchChange={setSearch}
          filterSelect={{
            value: typeFilter,
            options: FILTER_OPTIONS,
            onChange: setTypeFilter,
          }}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo,
          }}
          onRefresh={handleRefresh}
          onClearFilters={clearFilters}
          primaryButton={{ label: "Exporter", onClick: () => { } }}
        />
      </div>
        <div className="px-4 pb-4 md:hidden space-y-3">
        {paginatedItems.map((tx) => (
          <div
            key={tx.id}
            className="flex flex-col gap-2 p-3 rounded-lg border bg-muted/5"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs text-muted-foreground">ID</span>
              <span className="font-sana-medium text-sm">{tx.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{tx.type}</span>
              <span
                className={
                  tx.amount >= 0
                    ? "text-green-600 font-sana-medium"
                    : "text-red-600 font-sana-medium"
                }
              >
                {formatAmountFCFA(tx.amount)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className="truncate">{tx.client}</span>
              <span className="shrink-0">{tx.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block pb-4 lg:pb-6 min-w-0">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-sana-medium">ID Transaction</TableHead>
              <TableHead className="font-sana-medium">Type de transaction</TableHead>
              <TableHead className="font-sana-medium">Montant</TableHead>
              <TableHead className="font-sana-medium hidden lg:table-cell">Client</TableHead>
              <TableHead className="font-sana-medium">Date</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-muted/10">
                <TableCell className="font-medium">{tx.id}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>
                  <span
                    className={
                      tx.amount >= 0
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

      {totalPages > 1 && (
        <div className="p-4 flex justify-center border-t border-border/50">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasPrev) setCurrentPage(currentPage - 1);
                  }}
                  className={!hasPrev ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {getPaginationPages(currentPage, totalPages).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasNext) setCurrentPage(currentPage + 1);
                  }}
                  className={!hasNext ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
