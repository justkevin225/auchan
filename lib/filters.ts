import type { CommuneKey, StoreStatic } from "@/data/stores";
import type { StoreCaissier, StoreTransaction } from "@/data/storeDetails";
import type { TransactionType } from "@/data/transactions";
import { parseDateToISO } from "./format";

export function filterStores(
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

export function filterTransactions(
  list: StoreTransaction[],
  search: string,
  typeFilter: string,
  dateFrom: string,
  dateTo: string
): StoreTransaction[] {
  let out = list;
  if (typeFilter !== "tous") {
    out = out.filter((t) => t.type === (typeFilter as TransactionType));
  }
  if (dateFrom) {
    out = out.filter((t) => parseDateToISO(t.date) >= dateFrom);
  }
  if (dateTo) {
    out = out.filter((t) => parseDateToISO(t.date) <= dateTo);
  }
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    out = out.filter(
      (t) =>
        t.id.includes(q) ||
        t.type.toLowerCase().includes(q) ||
        t.client.includes(q)
    );
  }
  return out;
}

export function filterCaissiers(
  list: StoreCaissier[],
  search: string,
  selectedStatuts: string[],
  statutOptionsCount: number,
  dateFrom: string,
  dateTo: string,
  getDate: (c: StoreCaissier) => string
): StoreCaissier[] {
  let out = list;
  if (selectedStatuts.length > 0 && selectedStatuts.length < statutOptionsCount) {
    out = out.filter((c) => selectedStatuts.includes(c.statut));
  }
  if (dateFrom) {
    out = out.filter((c) => parseDateToISO(getDate(c)) >= dateFrom);
  }
  if (dateTo) {
    out = out.filter((c) => parseDateToISO(getDate(c)) <= dateTo);
  }
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    out = out.filter(
      (c) =>
        c.utilisateur.toLowerCase().includes(q) || c.accessKey.includes(q)
    );
  }
  return out;
}
