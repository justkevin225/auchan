export type StoreStatic = {
  id: string;
  storeName: string;
  storeId: string;
  location: string;
  commune: string;
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
