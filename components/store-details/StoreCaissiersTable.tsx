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
  getStoreCaissiers,
  type StoreCaissier,
  type StoreCaissierStatut,
} from "@/data/storeDetails";
import { usePagination } from "@/lib/usePagination";
import { cn } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCw,
  UserX,
} from "lucide-react";
import { useMemo, useState } from "react";
import { TableToolbar } from "./TableToolbar";

const PAGE_SIZE = 10;
const STATUT_OPTIONS: { value: string; label: string }[] = [
  { value: "Actif", label: "Actif" },
  { value: "Bloqué", label: "Bloqué" },
];

function parseAffectationDate(dateStr: string): string {
  const [dPart] = dateStr.split(",");
  if (!dPart) return "";
  const [day, month, year] = dPart.trim().split("/");
  if (!year || !month || !day) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function filterCaissiers(
  list: StoreCaissier[],
  search: string,
  selectedStatuts: string[],
  dateFrom: string,
  dateTo: string
): StoreCaissier[] {
  let out = list;
  if (selectedStatuts.length > 0 && selectedStatuts.length < STATUT_OPTIONS.length) {
    out = out.filter((c) => selectedStatuts.includes(c.statut));
  }
  if (dateFrom) {
    out = out.filter((c) => parseAffectationDate(c.dateAffectation) >= dateFrom);
  }
  if (dateTo) {
    out = out.filter((c) => parseAffectationDate(c.dateAffectation) <= dateTo);
  }
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    out = out.filter(
      (c) =>
        c.utilisateur.toLowerCase().includes(q) ||
        c.accessKey.includes(q)
    );
  }
  return out;
}

function StatusBadge({ statut }: { statut: StoreCaissierStatut }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-sana-medium text-white",
        statut === "Actif" ? "bg-green-600" : "bg-muted-foreground/80"
      )}
    >
      {statut}
    </span>
  );
}

type StoreCaissiersTableProps = {
  storeId: string;
  selectedCaissier: StoreCaissier | null;
  onCaissierSelect: (caissier: StoreCaissier | null) => void;
};

export function StoreCaissiersTable({
  storeId,
  selectedCaissier,
  onCaissierSelect,
}: StoreCaissiersTableProps) {
  const [search, setSearch] = useState("");
  const [selectedStatuts, setSelectedStatuts] = useState<string[]>(() =>
    STATUT_OPTIONS.map((o) => o.value)
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const clearFilters = () => {
    setSearch("");
    setSelectedStatuts(STATUT_OPTIONS.map((o) => o.value));
    setDateFrom("");
    setDateTo("");
  };

  const handleRefresh = () => {
    clearStoreDetailsCache();
    setRefreshKey((k) => k + 1);
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allCaissiers = useMemo(
    () => getStoreCaissiers(storeId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storeId, refreshKey]
  );
  const filtered = useMemo(
    () =>
      filterCaissiers(
        allCaissiers,
        search,
        selectedStatuts,
        dateFrom,
        dateTo
      ),
    [allCaissiers, search, selectedStatuts, dateFrom, dateTo]
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
          title="Caissiers"
          searchPlaceholder="Rechercher un caissier..."
          searchValue={search}
          onSearchChange={setSearch}
          filterMultiSelect={{
            value: selectedStatuts,
            options: STATUT_OPTIONS,
            onChange: setSelectedStatuts,
          }}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onFromChange: setDateFrom,
            onToChange: setDateTo,
          }}
          onRefresh={handleRefresh}
          onClearFilters={clearFilters}
          primaryButton={{
            label: "Ajouter un caissier",
            onClick: () => { },
            icon: <Plus className="size-4" aria-hidden />,
          }}
        />
      </div>
      <div className="px-4 pb-4 md:hidden space-y-3">
        {paginatedItems.map((c) => (
          <div
            key={c.id}
            role="button"
            tabIndex={0}
            className={cn(
              "flex flex-col gap-2 p-3 rounded-lg border bg-muted/5 cursor-pointer hover:bg-muted/10 transition-colors",
              selectedCaissier?.id === c.id && "ring-2 ring-primary/30"
            )}
            onClick={() => onCaissierSelect(c)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onCaissierSelect(c);
              }
            }}
          >
            <div className="flex justify-between items-center">
              <span className="font-sana-medium text-sm">{c.utilisateur}</span>
              <StatusBadge statut={c.statut} />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Clé d&apos;accès</span>
              <span className="font-mono">
                {visibleKeys.has(c.id) ? c.accessKey : "••••"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                onClick={() => toggleKeyVisibility(c.id)}
                aria-label={visibleKeys.has(c.id) ? "Masquer" : "Afficher"}
              >
                {visibleKeys.has(c.id) ? (
                  <EyeOff className="size-3.5" />
                ) : (
                  <Eye className="size-3.5" />
                )}
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">
              Affecté le {c.dateAffectation}
            </span>
          </div>
        ))}
      </div>

      <div className="hidden md:block pb-4 lg:pb-6 min-w-0 overflow-x-auto">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-sana-medium">Utilisateur</TableHead>
              <TableHead className="font-sana-medium">Clé d&apos;accès</TableHead>
              <TableHead className="font-sana-medium">Date d&apos;affectation</TableHead>
              <TableHead className="font-sana-medium">Statut</TableHead>
              <TableHead className="font-sana-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((c) => (
              <TableRow
                key={c.id}
                className={cn(
                  "hover:bg-muted/10 cursor-pointer",
                  selectedCaissier?.id === c.id && "bg-primary/5"
                )}
                onClick={() => onCaissierSelect(c)}
              >
                <TableCell className="font-medium">{c.utilisateur}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="font-mono">
                      {visibleKeys.has(c.id) ? c.accessKey : "••••"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                      onClick={() => toggleKeyVisibility(c.id)}
                      aria-label={visibleKeys.has(c.id) ? "Masquer la clé" : "Afficher la clé"}
                    >
                      {visibleKeys.has(c.id) ? (
                        <EyeOff className="size-3.5" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                    </Button>
                  </span>
                </TableCell>
                <TableCell>{c.dateAffectation}</TableCell>
                <TableCell>
                  <StatusBadge statut={c.statut} />
                </TableCell>
                <TableCell className="text-right p-1" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      aria-label="Modifier"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      aria-label="Actualiser"
                    >
                      <RefreshCw className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      aria-label="Menu"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                    {paginatedItems.indexOf(c) !== 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-destructive"
                        aria-label="Retirer le caissier"
                      >
                        <UserX className="size-4" />
                      </Button>
                    )}
                  </div>
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
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let page: number;
                if (totalPages <= 7) page = i + 1;
                else if (currentPage <= 4) page = i + 1;
                else if (currentPage >= totalPages - 3)
                  page = totalPages - 6 + i;
                else page = currentPage - 3 + i;
                return (
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
                );
              })}
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
