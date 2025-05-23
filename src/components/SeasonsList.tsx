import { useState } from 'react';
import { useSeasons } from '../hooks/useFormulaOne';
import type { Season } from '../types/formulaOne';
import { Pagination } from './ui/pagination';
import { Link } from 'react-router-dom';
import { Rows3, LayoutGrid, ChevronRight } from 'lucide-react';
import Error from './ui/Error';
import { LoadingSeasonsList } from './loading/LoadingSeasonsList';

const pageSize = 12;

export const SeasonsList = () => {
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { data, isLoading, isError } = useSeasons({
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  const totalItems = parseInt(data?.MRData.total || '0');

  return (
    <div id="seasons-list" className="py-16">
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Formula 1 Seasons</h2>
          <button className="cursor-pointer" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
            {view === 'list' ? <LayoutGrid className="h-7 w-7" /> : <Rows3 className="h-7 w-7" />}
          </button>
        </div>
        {isLoading && <LoadingSeasonsList layout={view} count={pageSize} />}
        {isError && <Error />}
        {!isLoading && !isError && (
          <>
            <p className="mt-2 text-gray-600">There's {totalItems} Seasons in the list</p>

            <div className={`mt-5 grid gap-4 ${view === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {data?.MRData.SeasonTable.Seasons.map((season: Season) => (
                <div key={season.season} className="p-4 rounded-lg bg-white shadow-custom transition-shadow">
                  <h3 className="text-xl font-semibold">Season {season.season}</h3>
                  <Link
                    to={`/seasons/${season.season}`}
                    className="text-primary-200 hover:text-primary-300 flex items-center mt-2 w-fit"
                  >
                    Show Races
                    <ChevronRight className="inline-block ml-1" />
                  </Link>
                </div>
              ))}
            </div>

            <Pagination
              className="mt-10"
              totalItems={totalItems}
              itemsPerPage={pageSize}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};
