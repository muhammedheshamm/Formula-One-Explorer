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

  // Get current year for highlighting recent seasons
  const currentYear = new Date().getFullYear();

  return (
    <div id="seasons-list" className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              <span className="text-primary-200">Formula 1</span> Seasons
            </h2>
            <p className="mt-2 text-gray-600">
              {!isLoading && !isError && `Explore ${totalItems} seasons of racing history`}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-sm text-gray-500">View:</span>
            <div className="flex bg-white rounded-md shadow-sm p-1">
              <button
                className={`p-2 rounded-md transition-colors ${
                  view === 'grid' ? 'bg-primary-200 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                className={`p-2 rounded-md transition-colors ${
                  view === 'list' ? 'bg-primary-200 text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <Rows3 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {isLoading && <LoadingSeasonsList layout={view} count={pageSize} />}
        {isError && <Error />}

        {!isLoading && !isError && (
          <>
            <div
              className={`grid gap-5 ${view === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}
            >
              {data?.MRData.SeasonTable.Seasons.map((season: Season) => {
                const isRecentSeason = parseInt(season.season) >= currentYear - 5;
                return (
                  <Link
                    key={season.season}
                    to={`/seasons/${season.season}`}
                    className={`group p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 ${
                      isRecentSeason ? 'border-2 border-primary-200' : 'border border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs uppercase tracking-wider font-semibold text-primary-200 mb-1 block">
                          Season
                        </span>
                        <h3 className="text-2xl font-bold text-gray-800">{season.season}</h3>
                      </div>
                      <div className="bg-primary-100 group-hover:bg-primary-200 rounded-full p-2 transition-colors">
                        <ChevronRight className="h-5 w-5 text-primary-200 group-hover:text-white" />
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary-200 mr-2"></div>
                        <span className="text-sm text-gray-600">Formula 1</span>
                      </div>
                      {isRecentSeason && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-200 text-white">
                          Recent
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
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
