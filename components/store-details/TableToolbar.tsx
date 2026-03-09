"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FilterX, RefreshCw, Search } from "lucide-react";
import { MultiSelect } from "./MultiSelect";

export type FilterOption = { value: string; label: string };

type TableToolbarProps = {
  title: string;
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterSelect?: {
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
    label?: string;
  };
  filterMultiSelect?: {
    value: string[];
    options: FilterOption[];
    onChange: (value: string[]) => void;
    label?: string;
  };
  dateRange?: {
    from: string;
    to: string;
    onFromChange: (value: string) => void;
    onToChange: (value: string) => void;
  };
  onRefresh?: () => void;
  onClearFilters?: () => void;
  primaryButton?: { label: string; onClick?: () => void; icon?: React.ReactNode };
  className?: string;
};

export function TableToolbar({
  title,
  searchPlaceholder = "Rechercher...",
  searchValue,
  onSearchChange,
  filterSelect,
  filterMultiSelect,
  dateRange,
  onRefresh,
  onClearFilters,
  primaryButton,
  className,
}: TableToolbarProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:gap-4", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between min-w-0">
        <h2 className="text-lg sm:text-xl font-sana-bold text-foreground shrink-0">
          {title}
        </h2>
        {primaryButton && (
          <Button
            size="lg"
            className="shrink-0 w-full sm:w-auto rounded-lg inline-flex items-center justify-center gap-2 order-last sm:order-0"
            onClick={primaryButton.onClick}
          >
            {primaryButton.icon}
            {primaryButton.label}
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2 min-w-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
        <div className="relative min-w-0 w-full sm:min-w-[180px] sm:max-w-[280px] order-1">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            aria-hidden
          />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 rounded-lg border-input"
            size="lg"
            aria-label="Rechercher"
          />
        </div>
        {filterSelect && (
          <div className="w-full sm:w-auto sm:min-w-[120px] order-2">
            <Select
              value={filterSelect.value}
              onValueChange={filterSelect.onChange}
            >
              <SelectTrigger
                size="lg"
                className="w-full sm:w-[140px] rounded-lg border-input"
                aria-label={filterSelect.label ?? "Filtrer"}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterSelect.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {filterMultiSelect && (
          <div className="w-full sm:w-auto order-3">
            <MultiSelect
              options={filterMultiSelect.options}
              value={filterMultiSelect.value}
              onChange={filterMultiSelect.onChange}
              placeholder="Statut"
              size="lg"
              ariaLabel={filterMultiSelect.label ?? "Filtrer par statut"}
            />
          </div>
        )}
        {dateRange && (
          <div className="flex items-center gap-1.5 min-w-0 w-full sm:w-auto order-4 flex-wrap">
            <Input
              type="date"
              value={dateRange.from}
              onChange={(e) => dateRange.onFromChange(e.target.value)}
              className="flex-1 min-w-[120px] sm:w-[130px] rounded-lg border-input"
              size="lg"
              aria-label="Date de début"
            />
            <span className="text-muted-foreground shrink-0">–</span>
            <Input
              type="date"
              value={dateRange.to}
              onChange={(e) => dateRange.onToChange(e.target.value)}
              className="flex-1 min-w-[120px] sm:w-[130px] rounded-lg border-input"
              size="lg"
              aria-label="Date de fin"
            />
          </div>
        )}
        <div className="flex items-center gap-2 order-5 shrink-0">
          {onRefresh && (
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-lg shrink-0"
              onClick={onRefresh}
              aria-label="Actualiser"
              title="Actualiser"
            >
              <RefreshCw className="size-4" />
            </Button>
          )}
          {onClearFilters && (
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-lg shrink-0"
              onClick={onClearFilters}
              aria-label="Réinitialiser les filtres"
              title="Réinitialiser les filtres"
            >
              <FilterX className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
