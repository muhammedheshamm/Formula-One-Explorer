interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

interface UsePaginationReturn {
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  getVisiblePages: () => number[];
  canNextPage: boolean;
  canPrevPage: boolean;
  currentPage: number;
}

export const usePagination = (
  { totalItems, itemsPerPage, currentPage }: UsePaginationProps,
  onChange: (page: number) => void
): UsePaginationReturn => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onChange(currentPage - 1);
    }
  };

  const setPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onChange(page);
    }
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let startPage = currentPage - half;
    let endPage = currentPage + half;

    // Clamp boundaries
    if (startPage < 1) {
      startPage = 1;
      endPage = maxVisiblePages;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - maxVisiblePages + 1;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return {
    totalPages,
    nextPage,
    prevPage,
    setPage,
    getVisiblePages,
    canNextPage: currentPage < totalPages,
    canPrevPage: currentPage > 1,
    currentPage,
  };
};
