"use client";

import { ChevronDown, CircleUserIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/stores", label: "Magasins" },
  { href: "/transactions", label: "Transactions" },
  { href: "/clients", label: "Clients" },
  { href: "/management", label: "Gestions" },
  { href: "/statistics", label: "Statistiques" },
] as const;

const OVERFLOW_LINKS = [
  { href: "/statistics", label: "Statistiques", showClass: "flex" },
  { href: "/management", label: "Gestions", showClass: "flex" },
  { href: "/clients", label: "Clients", showClass: "hidden max-[1000px]:flex" },
  { href: "/transactions", label: "Transactions", showClass: "hidden max-[800px]:flex" },
] as const;

function NavLink({
  href,
  label,
  isActive,
  className = "",
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={
        isActive
          ? `rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground whitespace-nowrap ${className}`
          : `rounded-lg px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted/60 whitespace-nowrap ${className}`
      }
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [dropdownOpen]);

  return (
    <header className="fixed top-0 w-[90%] max-w-[1350px] left-1/2 -translate-x-1/2 z-50 bg-white rounded-2xl px-4 py-2 mt-4 font-sana-bold">
      <div className="flex h-14 items-center justify-between gap-6 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo.png"
            alt="Auchan"
            width={80}
            height={32}
            className="h-6 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          {NAV_LINKS.slice(0, 2).map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              isActive={isActive(href)}
            />
          ))}
          <span className="max-[800px]:hidden">
            <NavLink
              href={NAV_LINKS[2].href}
              label={NAV_LINKS[2].label}
              isActive={isActive(NAV_LINKS[2].href)}
            />
          </span>
          <span className="max-[1000px]:hidden">
            <NavLink
              href={NAV_LINKS[3].href}
              label={NAV_LINKS[3].label}
              isActive={isActive(NAV_LINKS[3].href)}
            />
          </span>
          <span className="max-[1200px]:hidden">
            <NavLink
              href={NAV_LINKS[4].href}
              label={NAV_LINKS[4].label}
              isActive={isActive(NAV_LINKS[4].href)}
            />
          </span>
          <span className="max-[1200px]:hidden">
            <NavLink
              href={NAV_LINKS[5].href}
              label={NAV_LINKS[5].label}
              isActive={isActive(NAV_LINKS[5].href)}
            />
          </span>

          <div ref={dropdownRef} className="relative hidden max-[1200px]:block">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen((o) => !o);
              }}
              className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm whitespace-nowrap transition-colors ${OVERFLOW_LINKS.some((l) => isActive(l.href))
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted/60"
                }`}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              aria-label="Plus de liens"
            >
              Plus
              <ChevronDown
                className={`size-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute right-0 top-full pt-1 transition-all duration-150 ${dropdownOpen
                ? "opacity-100 visible pointer-events-auto"
                : "opacity-0 invisible pointer-events-none"
                }`}
            >
              <div className="rounded-lg border border-border bg-popover shadow-md p-1 min-w-[180px]">
                {OVERFLOW_LINKS.map(({ href, label, showClass }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDropdownOpen(false)}
                    className={`flex items-center px-4 py-2 text-sm ${showClass} ${isActive(href)
                      ? "bg-primary text-primary-foreground rounded-lg"
                      : "text-foreground hover:bg-muted/60"
                      }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden md:block">
          <button
            type="button"
            className="size-9 shrink-0 rounded-full bg-gray-300 flex items-center justify-center text-muted-foreground hover:bg-gray-400 transition-colors"
            aria-label="Profil utilisateur"
          >
            <CircleUserIcon className="size-5 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="size-9 shrink-0 rounded-lg flex items-center justify-center text-foreground hover:bg-muted/60 transition-colors"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out md:grid-rows-[0fr] ${mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
      >
        <div className="overflow-hidden min-h-0 md:hidden">
          <nav
            className="flex flex-col gap-1 pb-4 pt-2 border-t border-border mt-2"
            aria-hidden={!mobileOpen}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                isActive={isActive(href)}
                className="block"
                onClick={() => setMobileOpen(false)}
              />
            ))}
            <Link
              href="#"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-foreground mt-2 font-sana-regular hover:bg-muted/60 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
              }}
            >
              <span className="size-9 shrink-0 rounded-full bg-gray-300 flex items-center justify-center">
                <CircleUserIcon className="size-5 text-white" />
              </span>
              <span className="min-w-0 max-w-[180px] line-clamp-1">Kevin Kouakou</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
