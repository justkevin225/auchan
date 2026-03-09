import type { TransactionStatType } from "@/data/stats";

export type StoreStatic = {
  id: string;
  storeName: string;
  storeId: string;
  location: string;
  commune: string;
};

export type StoreDetails = StoreStatic & {
  manager: string;
  responsableCaisse: string;
  nombreCaissiers: number;
  nombreTransactions: number;
  transactionByType: Record<TransactionStatType, number>;
};

export const COMMUNES = [
  "Toutes",
  "Abobo",
  "Abatta",
  "Angré",
  "Attécoubé",
  "Cocody",
  "Koumassi",
  "Marcory",
  "Plateau",
  "Riviera",
  "Treichville",
  "Yopougon",
] as const;

export type CommuneKey = (typeof COMMUNES)[number];

export const TOP_STORES: StoreStatic[] = [
  { id: "M0001", storeName: "Angré Djibi 1", storeId: "M0001", location: "Abidjan, Cocody", commune: "Cocody" },
  { id: "M0002", storeName: "Auchan Abatta", storeId: "M0002", location: "Abidjan, Abatta", commune: "Abatta" },
  { id: "M0003", storeName: "Auchan Attoban", storeId: "M0003", location: "Abidjan, Riviera", commune: "Riviera" },
  { id: "M0004", storeName: "Auchan Treichville", storeId: "M0004", location: "Abidjan, Treichville", commune: "Treichville" },
  { id: "M0005", storeName: "Auchan Koumassi Soleil", storeId: "M0005", location: "Abidjan, Koumassi", commune: "Koumassi" },
  { id: "M0006", storeName: "Auchan Samake", storeId: "M0006", location: "Abidjan, Abobo", commune: "Abobo" },
];

const EXTRA_STORES: Omit<StoreStatic, "id">[] = [
  { storeName: "Angré Djibi 2", storeId: "M0007", location: "Abidjan, Cocody", commune: "Cocody" },
  { storeName: "Auchan Marcory Centre", storeId: "M0008", location: "Abidjan, Marcory", commune: "Marcory" },
  { storeName: "Auchan Plateau", storeId: "M0009", location: "Abidjan, Plateau", commune: "Plateau" },
  { storeName: "Yopougon Nord", storeId: "M0010", location: "Abidjan, Yopougon", commune: "Yopougon" },
  { storeName: "Attécoubé Marché", storeId: "M0011", location: "Abidjan, Attécoubé", commune: "Attécoubé" },
  { storeName: "Riviera Palmeraie", storeId: "M0012", location: "Abidjan, Riviera", commune: "Riviera" },
  { storeName: "Cocody Angré 3", storeId: "M0013", location: "Abidjan, Cocody", commune: "Cocody" },
  { storeName: "Abobo Nord", storeId: "M0014", location: "Abidjan, Abobo", commune: "Abobo" },
  { storeName: "Koumassi Remblai", storeId: "M0015", location: "Abidjan, Koumassi", commune: "Koumassi" },
  { storeName: "Treichville Gare", storeId: "M0016", location: "Abidjan, Treichville", commune: "Treichville" },
  { storeName: "Marcory Zone 4", storeId: "M0017", location: "Abidjan, Marcory", commune: "Marcory" },
  { storeName: "Plateau Commerce", storeId: "M0018", location: "Abidjan, Plateau", commune: "Plateau" },
  { storeName: "Yopougon Andokoi", storeId: "M0019", location: "Abidjan, Yopougon", commune: "Yopougon" },
  { storeName: "Angré 4", storeId: "M0020", location: "Abidjan, Cocody", commune: "Cocody" },
];

export const ALL_STORES: StoreStatic[] = [
  ...TOP_STORES,
  ...EXTRA_STORES.map((s) => ({ ...s, id: s.storeId })),
];

const MOCK_MANAGERS = [
  "Emmanuel GUIEBI",
  "Marie KOUASSI",
  "Jean AKÉ",
  "Fatou DIALLO",
  "Paul BAMBA",
  "Aïcha TOURE",
  "Ibrahim SANGARÉ",
  "Sophie KONE",
  "Oumar FOFANA",
  "Adama TRAORÉ",
  "Aminata COULIBALY",
  "Moussa KEITA",
  "Nadia OUATTARA",
  "Bakary DIALLO",
  "Kadiatou SOW",
  "Lamine BERTÉ",
  "Mariam SIDIBÉ",
  "Seydou KANÉ",
  "Ramatoulaye BA",
  "Ibrahima BARRY",
];

const MOCK_RESPONSABLES_CAISSE = [
  "Ismael DIOMANDE",
  "Yves KOFFI",
  "Clément ADOU",
  "Ruth BONI",
  "Serge YAPO",
  "Esther KOUAME",
  "David N'GUESSAN",
  "Rachel AKA",
  "Laurent BAMBA",
  "Sarah KONE",
  "Pierre OUATTARA",
  "Julie TRAORÉ",
  "Marc SANGARÉ",
  "Anne DIALLO",
  "Luc KOUASSI",
  "Marie TOURE",
  "Jean-Marc FOFANA",
  "Claire KEITA",
  "Philippe COULIBALY",
  "Sandra BERTÉ",
];

function mockTransactionByType(storeId: string): Record<TransactionStatType, number> {
  const seed = storeId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const total = 800 + (seed % 800);
  const rendu = Math.floor(total * (0.4 + (seed % 30) / 100));
  return {
    "Rendu monnaie": rendu,
    "Paiement course": total - rendu,
  };
}

function mockDetails(store: StoreStatic): StoreDetails {
  const indexInList = ALL_STORES.findIndex((s) => s.id === store.id);
  const index = indexInList >= 0 ? indexInList : parseInt(store.id.replace(/\D/g, ""), 10) || 0;
  let byType = mockTransactionByType(store.id);
  let total = byType["Rendu monnaie"] + byType["Paiement course"];
  let nombreCaissiers = 5 + (index % 8);

  // Maquette Angré Djibi 1
  if (store.id === "M0001") {
    total = 1253;
    nombreCaissiers = 7;
    byType = {
      "Rendu monnaie": 878,
      "Paiement course": 375,
    };
  }

  return {
    ...store,
    manager: MOCK_MANAGERS[index % MOCK_MANAGERS.length],
    responsableCaisse: MOCK_RESPONSABLES_CAISSE[index % MOCK_RESPONSABLES_CAISSE.length],
    nombreCaissiers,
    nombreTransactions: total,
    transactionByType: byType,
  };
}

const STORE_DETAILS_CACHE = new Map<string, StoreDetails>();

export function getStoreDetails(id: string): StoreDetails | null {
  const cached = STORE_DETAILS_CACHE.get(id);
  if (cached) return cached;
  const store = ALL_STORES.find((s) => s.id === id);
  if (!store) return null;
  const details = mockDetails(store);
  STORE_DETAILS_CACHE.set(id, details);
  return details;
}
