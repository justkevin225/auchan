"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StoreCard from "@/components/ui/StoreCard";
import { ALL_STORES, COMMUNES, type CommuneKey, type StoreStatic } from "@/data/stores";
import { Plus, Search, SearchX } from "lucide-react";
import Link from 'next/link';
import { useMemo, useState } from "react";

const PAGE_SIZE = 12;

function filterStores(
  stores: StoreStatic[],
  search: string,
  commune: CommuneKey
): StoreStatic[] {
  const q = search.trim().toLowerCase();
  return stores.filter((s) => {
    const matchCommune = commune === "Toutes" || s.commune === commune;
    if (!matchCommune) return false;
    if (!q) return true;
    return (
      s.storeName.toLowerCase().includes(q) ||
      s.storeId.toLowerCase().includes(q) ||
      s.commune.toLowerCase().includes(q) ||
      s.location.toLowerCase().includes(q)
    );
  });
}

export function StoresContent() {
  const [search, setSearch] = useState("");
  const [commune, setCommune] = useState<CommuneKey>("Toutes");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterStores(ALL_STORES, search, commune),
    [search, commune]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageStores = useMemo(
    () => filtered.slice(start, start + PAGE_SIZE),
    [filtered, start]
  );

  const handlePageChange = (next: number) => {
    setPage(Math.max(1, Math.min(next, totalPages)));
  };

  return (
    <div className="min-h-dvh py-8">
      <div className="w-[90%] max-w-[1350px] mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
            <h1 className="text-xl sm:text-2xl font-sana-bold text-foreground shrink-0">
              Magasins
            </h1>
            <div className="relative min-w-0 w-full sm:w-[240px] sm:max-w-[280px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Nom du magasin, code magasin, Commune"
                value={search}
                size="lg"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-8"
                aria-label="Rechercher un magasin"
              />
            </div>
            <Select value={commune} onValueChange={(v) => { setCommune(v as CommuneKey); setPage(1); }}>
              <SelectTrigger size="lg" className="w-full sm:w-[160px]" aria-label="Filtrer par commune">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COMMUNES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button size="lg" className="shrink-0 w-full sm:w-auto" asChild>
            <Link href="#">
              <Plus className="size-4" aria-hidden />
              Ajouter un magasin
            </Link>
          </Button>
        </div>

        {pageStores.length > 0 ? (
          <div className="grid grid-cols-1 min-w-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {pageStores.map((store) => (
              <div key={store.id} className="min-h-[200px] min-w-0">
                <StoreCard
                  id={store.id}
                  storeName={store.storeName}
                  storeId={store.storeId}
                  location={store.location}
                  className="w-full min-w-0 h-full min-h-[200px]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <SearchX className="size-10 text-muted-foreground" />
            <p className="text-muted-foreground text-center font-sana-regular">
              Aucun magasin ne correspond à votre recherche.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(p);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
