import { cn } from "@/lib/utils";
import type { StoreCaissierStatut } from "@/data/storeDetails";

type StatusBadgeProps = {
  statut: StoreCaissierStatut;
};

export function StatusBadge({ statut }: StatusBadgeProps) {
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
