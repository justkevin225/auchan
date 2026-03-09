import { useMemo, useState } from "react";

export function usePagination<T>(items: T[], pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const [pageState, setPageState] = useState(1);
  const currentPage = Math.min(pageState, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const setPage = (page: number) => {
    setPageState(Math.max(1, Math.min(page, totalPages)));
  };

  return {
    paginatedItems,
    totalPages,
    currentPage,
    setCurrentPage: setPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}
