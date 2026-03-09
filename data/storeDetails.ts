import type { TransactionType } from "@/data/transactions";
import { ALL_STORES } from "@/data/stores";

export type StoreTransaction = {
  id: string;
  type: TransactionType;
  amount: number;
  client: string;
  date: string;
};

export type StoreCaissierStatut = "Actif" | "Bloqué";

export type StoreCaissier = {
  id: string;
  utilisateur: string;
  accessKey: string;
  dateAffectation: string;
  statut: StoreCaissierStatut;
};

const MOCK_CLIENTS = [
  "+225 07 63 32 22 32",
  "+225 05 12 34 56 78",
  "+225 01 98 76 54 32",
  "+225 07 08 06 05 04",
  "+225 05 11 22 33 44",
];

const MOCK_CAISSIER_USERNAMES = [
  "OwenJaphet01",
  "MarieKouassi02",
  "JeanAke03",
  "FatouDiallo04",
  "PaulBamba05",
  "AichaToure06",
  "IbrahimSangare07",
];

const MOCK_ACCESS_KEYS = ["1234", "5678", "9012", "3456", "7890", "2345", "6789"];

function formatDate(d: Date): string {
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function seedFromStoreId(storeId: string): number {
  return storeId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

const TRANSACTIONS_CACHE = new Map<string, StoreTransaction[]>();

export function getStoreTransactions(storeId: string): StoreTransaction[] {
  const cached = TRANSACTIONS_CACHE.get(storeId);
  if (cached) return cached;
  const store = ALL_STORES.find((s) => s.id === storeId);
  if (!store) return [];
  const seed = seedFromStoreId(storeId);
  const count = 40 + (seed % 30);
  const transactions: StoreTransaction[] = [];
  const baseId = 10836745000 + (seed % 100000);
  for (let i = 0; i < count; i++) {
    const type: TransactionType = (seed + i) % 3 === 0 ? "Rendu monnaie" : "Paiement course";
    const amount = type === "Paiement course" ? 500 + (seed + i) % 5000 : -200 - ((seed + i) % 500);
    transactions.push({
      id: String(baseId + i),
      type,
      amount,
      client: MOCK_CLIENTS[(seed + i) % MOCK_CLIENTS.length],
      date: formatDate(new Date(2025, 0, 15 + (i % 10), 8 + (i % 12), (i * 7) % 60)),
    });
  }
  TRANSACTIONS_CACHE.set(storeId, transactions);
  return transactions;
}

const CAISSIERS_CACHE = new Map<string, StoreCaissier[]>();

export function getStoreCaissiers(storeId: string): StoreCaissier[] {
  const cached = CAISSIERS_CACHE.get(storeId);
  if (cached) return cached;
  const store = ALL_STORES.find((s) => s.id === storeId);
  if (!store) return [];
  const seed = seedFromStoreId(storeId);
  const count = 5 + (seed % 4);
  const caissiers: StoreCaissier[] = [];
  for (let i = 0; i < count; i++) {
    const statut: StoreCaissierStatut = i === count - 1 && count > 1 ? "Bloqué" : "Actif";
    caissiers.push({
      id: `${storeId}-caissier-${i}`,
      utilisateur: MOCK_CAISSIER_USERNAMES[(seed + i) % MOCK_CAISSIER_USERNAMES.length],
      accessKey: MOCK_ACCESS_KEYS[(seed + i) % MOCK_ACCESS_KEYS.length],
      dateAffectation: formatDate(new Date(2025, 0, 20, 10, 20)),
      statut,
    });
  }
  CAISSIERS_CACHE.set(storeId, caissiers);
  return caissiers;
}

export function clearStoreDetailsCache(): void {
  TRANSACTIONS_CACHE.clear();
  CAISSIERS_CACHE.clear();
}
