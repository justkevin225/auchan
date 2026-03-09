"use client";

import { useClickOutside } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { useRef, useState } from "react";

export type MultiSelectOption = { value: string; label: string };

type MultiSelectProps = {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  size?: "sm" | "lg";
  ariaLabel?: string;
};

const sizeClasses = {
  sm: "h-8 py-2 pr-2 pl-2.5 text-sm",
  lg: "h-10 py-2.5 pr-2.5 pl-3 text-sm",
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Sélectionner...",
  className,
  size = "lg",
  ariaLabel = "Filtrer",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false), open);

  const toggle = (optValue: string) => {
    const next = value.includes(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    onChange(next);
  };

  const label =
    value.length === 0
      ? placeholder
      : value.length === options.length
        ? "Tous"
        : options
            .filter((o) => value.includes(o.value))
            .map((o) => o.label)
            .join(", ");

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className={cn(
          "flex w-full min-w-0 items-center justify-between gap-1.5 rounded-lg border border-input bg-white whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 hover:bg-white text-left",
          sizeClasses[size],
          "w-full sm:w-[160px]",
          value.length === 0 && "text-muted-foreground"
        )}
      >
        <span className="truncate">{label}</span>
        <ChevronDownIcon
          className={cn(
            "size-4 text-muted-foreground shrink-0 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div
          className="absolute z-50 mt-1 min-w-[160px] rounded-lg border border-border bg-popover text-popover-foreground shadow-md py-1"
          role="listbox"
        >
          {options.map((opt) => {
            const checked = value.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={checked}
                onClick={() => toggle(opt.value)}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 focus:bg-muted/50 outline-none"
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded border border-input",
                    checked ? "bg-primary text-primary-foreground border-primary" : "bg-background"
                  )}
                >
                  {checked ? <CheckIcon className="size-3" /> : null}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
