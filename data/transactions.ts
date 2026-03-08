export type TransactionType = "Paiement course" | "Rendu monnaie";

export type Transaction = {
  id: string;
  type: TransactionType;
  storeName: string;
  amount: number;
  client: string;
  date: string;
};

export const LAST_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: "Paiement course",
    storeName: "Angré Djibi 1",
    amount: 220,
    client: "+225 07 08 06 05 04",
    date: "20/01/2025, 10:20",
  },
  {
    id: "2",
    type: "Rendu monnaie",
    storeName: "Angré Djibi 1",
    amount: -220,
    client: "+225 07 08 06 05 04",
    date: "20/01/2025, 10:20",
  },
  {
    id: "3",
    type: "Rendu monnaie",
    storeName: "Angré Djibi 1",
    amount: 220,
    client: "+225 07 08 06 05 04",
    date: "20/01/2025, 10:20",
  },
  {
    id: "4",
    type: "Paiement course",
    storeName: "Angré Djibi 1",
    amount: 220,
    client: "+225 07 08 06 05 04",
    date: "20/01/2025, 10:20",
  },
  {
    id: "5",
    type: "Rendu monnaie",
    storeName: "Angré Djibi 1",
    amount: -220,
    client: "+225 07 08 06 05 04",
    date: "20/01/2025, 10:20",
  },
  {
    id: "6",
    type: "Rendu monnaie",
    storeName: "Angré Djibi 1",
    amount: 220,
    client: "+225 07 08 06 05 04",
    date: "20/01/2025, 10:20",
  },
  {
    id: "7",
    type: "Rendu monnaie",
    storeName: "Angré Djibi 1",
    amount: 220,
    client: "+225 07 08 06 05 04",
    date: "20/01/2025, 10:20",
  },
];
