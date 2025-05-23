import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { usePagination } from '@/hooks/usePagination';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange, className }: PaginationProps) {
  const { totalPages, nextPage, prevPage, setPage, getVisiblePages, canNextPage, canPrevPage } = usePagination(
    {
      totalItems,
      itemsPerPage,
      currentPage,
    },
    onPageChange
  );

  const pages = getVisiblePages();
  const showStartEllipsis = pages[0] > 4;
  const showEndEllipsis = pages[pages.length - 1] < totalPages - 1;

  return (
    <nav role="navigation" aria-label="Pagination" className={cn('mx-auto flex w-full justify-center', className)}>
      <ul className="flex items-center gap-1">
        <li>
          <button
            className={`flex items-center gap-1 mr-2 ${
              !canPrevPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={!canPrevPage}
            onClick={() => prevPage()}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
        </li>

        {showStartEllipsis && (
          <>
            <li>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(1)}>
                1
              </Button>
            </li>
            <li>
              <MoreHorizontal className="h-4 w-4" />
            </li>
          </>
        )}

        {pages.map((page: number) => (
          <li key={page}>
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage(page)}
            >
              {page}
            </Button>
          </li>
        ))}

        {showEndEllipsis && (
          <>
            <li>
              <MoreHorizontal className="h-4 w-4" />
            </li>
            <li>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPage(totalPages)}>
                {totalPages}
              </Button>
            </li>
          </>
        )}

        <li>
          <button
            className={`flex items-center gap-1 ml-2 ${
              !canNextPage ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={!canNextPage}
            onClick={() => nextPage()}
            aria-label="Go to next page"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
