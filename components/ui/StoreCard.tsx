'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ArrowUpRight, MapPin, Store } from 'lucide-react';
import Link from 'next/link';

export type StoreCardProps = {
  id: string;
  storeName: string;
  storeId: string;
  location: string;
  isLoading?: boolean;
  className?: string;
};

function StoreCard({ id, storeName, storeId, location, isLoading = false, className }: StoreCardProps) {
  return (
    <Link
      href={isLoading ? '#' : `/stores/${id}`}
      className={cn(
        'group relative flex shrink-0 flex-col justify-between w-[250px] min-w-[250px] h-[200px] min-h-[200px] p-8 rounded-xl sm:rounded-2xl md:rounded-card bg-card text-card-foreground text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-primary hover:text-primary-foreground',
        isLoading && 'pointer-events-none',
        className
      )}
      aria-busy={isLoading}
    >
      {/* Top left light effect */}
      <div className="absolute inset-0 overflow-hidden rounded-card pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-hidden
        >
          <div
            className="absolute -top-8 -left-8 w-40 h-40 rounded-full opacity-90"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.15) 40%, transparent 70%)',
            }}
          />
        </div>
      </div>

      <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-white/20 group-hover:text-white transition-colors duration-200">
          {isLoading ? (
            <Skeleton className="size-5 sm:size-6 rounded" />
          ) : (
            <Store className="size-6 text-white" aria-hidden />
          )}
        </div>
        <ArrowUpRight className="size-8 text-primary group-hover:text-white transition-colors duration-200" aria-hidden />
      </div>

      <div className="relative z-10 min-w-0 flex flex-col min-h-0">
        {isLoading ? (
          <>
            <Skeleton className="h-5 sm:h-6 w-2/3 sm:w-3/4 mb-2 rounded" />
            <div className="flex items-center gap-x-2 min-w-0">
              <Skeleton className="h-3 w-10 sm:w-12 shrink-0 rounded" />
              <Skeleton className="h-3 w-16 sm:w-20 md:w-24 rounded min-w-0" />
            </div>
          </>
        ) : (
          <>
            <h3 className="text-fluid-xl font-sana-bold mb-1 min-w-0">
              <div className="relative w-full min-w-0">
                <span
                  className="block w-full min-w-0 truncate"
                  title={storeName}
                >
                  {storeName}
                </span>
              </div>
            </h3>

            <div className="flex items-center gap-x-2 min-w-0 shrink-0 text-xs text-muted-foreground group-hover:text-white/90 transition-colors duration-200 overflow-hidden">
              <span className="shrink-0">{storeId}</span>
              <span className="flex items-center gap-1 min-w-0 overflow-hidden">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                <span className="truncate min-w-0" title={location}>{location}</span>
              </span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default StoreCard;
