// Formatage montant FCFA avec signe
export function formatAmountFCFA(amount: number, locale = "fr-FR"): string {
  const sign = amount >= 0 ? "+" : "";
  return `${sign}${Math.abs(amount).toLocaleString(locale)} FCFA`;
}

// Parse "DD/MM/YYYY, HH:MM" vers "YYYY-MM-DD"
export function parseDateToISO(dateStr: string): string {
  const [dPart] = dateStr.split(",");
  if (!dPart) return "";
  const [day, month, year] = dPart.trim().split("/");
  if (!year || !month || !day) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

// Format période historique caissier
export function formatStoreHistoryPeriod(
  dateFrom: string,
  dateTo: string | null
): string {
  if (dateTo === null) return `Depuis le ${dateFrom}`;
  return `Du ${dateFrom} au ${dateTo}`;
}
