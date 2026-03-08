export type StatsPeriodKey = "today" | "7days" | "30days" | "year";

export type TransactionStatType = "Rendu monnaie" | "Paiement course";

export type PeriodStats = {
  total: number;
  byType: Record<TransactionStatType, number>;
};

export const STATS_PERIOD_LABELS: Record<StatsPeriodKey, string> = {
  today: "Aujourd'hui",
  "7days": "7 derniers jours",
  "30days": "30 derniers jours",
  year: "Cette année",
};

export const STATS_BY_PERIOD: Record<StatsPeriodKey, PeriodStats> = {
  today: {
    total: 312,
    byType: {
      "Rendu monnaie": 156,
      "Paiement course": 156,
    },
  },
  "7days": {
    total: 3000,
    byType: {
      "Rendu monnaie": 200,
      "Paiement course": 2800,
    },
  },
  "30days": {
    total: 9364,
    byType: {
      "Rendu monnaie": 6555,
      "Paiement course": 2809,
    },
  },
  year: {
    total: 112368,
    byType: {
      "Rendu monnaie": 44947,
      "Paiement course": 67421,
    },
  },
};
