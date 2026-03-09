// Calcule les numéros de page à afficher (fenêtre glissante)
export function getPaginationPages(
  currentPage: number,
  totalPages: number,
  maxVisible = 7
): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return Array.from({ length: maxVisible }, (_, i) => i + 1);
  }
  if (currentPage >= totalPages - 3) {
    return Array.from({ length: maxVisible }, (_, i) => totalPages - 6 + i);
  }
  return Array.from({ length: maxVisible }, (_, i) => currentPage - 3 + i);
}
