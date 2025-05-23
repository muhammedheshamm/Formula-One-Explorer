import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRaces } from '../hooks/useFormulaOne';
import type { Race } from '../types/formulaOne';
import { Pagination } from '../components/ui/pagination';
import { Rows3, LayoutGrid, ChevronLeft, Pin } from 'lucide-react';
import Error from '../components/ui/Error';
import { LoadingRacesList } from '../components/loading/LoadingRacesList';
import { RaceCard } from '../components/RaceCard';

const pageSize = 12;
const pinnedRacesKey = 'pinnedRaces';



export default function Races() {
  const { season: seasonParam } = useParams<{ season: string }>();

  const [page, setPage] = useState(1);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [pinnedRaces, setPinnedRaces] = useState<Race[]>([]);

  const { data, isLoading, isError } = useRaces({
    season: seasonParam || '',
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  const totalItems = parseInt(data?.MRData.total || '0');

  // load pinned races from localStorage on mount
  useEffect(() => {
    const storedPinnedRaces = localStorage.getItem(pinnedRacesKey);
    if (storedPinnedRaces) {
      const parsedPinnedRaces = JSON.parse(storedPinnedRaces);
      // filter to only include races from the current season
      const seasonPinnedRaces = parsedPinnedRaces.filter((race: Race) => race.season === seasonParam);
      setPinnedRaces(seasonPinnedRaces);
    }
  }, [seasonParam]);

  const togglePinRace = (race: Race) => {
    const isRacePinned = pinnedRaces.some(
      pinnedRace => pinnedRace.round === race.round && pinnedRace.season === race.season
    );

    let updatedPinnedRaces: Race[];

    if (isRacePinned) {
      // remove race from pinned races
      updatedPinnedRaces = pinnedRaces.filter(
        pinnedRace => !(pinnedRace.round === race.round && pinnedRace.season === race.season)
      );
    } else {
      // add race to pinned races
      updatedPinnedRaces = [...pinnedRaces, race];
    }

    setPinnedRaces(updatedPinnedRaces);

    // get all pinned races from localStorage to maintain races from other seasons
    const storedPinnedRaces = localStorage.getItem(pinnedRacesKey);
    let allPinnedRaces: Race[] = [];

    if (storedPinnedRaces) {
      const parsedPinnedRaces = JSON.parse(storedPinnedRaces);
      // filter out races from the current season to avoid duplicates
      allPinnedRaces = parsedPinnedRaces.filter((race: Race) => race.season !== seasonParam);
    }

    // combine with updated pinned races from current season
    const combinedPinnedRaces = [...allPinnedRaces, ...updatedPinnedRaces];
    localStorage.setItem(pinnedRacesKey, JSON.stringify(combinedPinnedRaces));
  };

  // check if a race is pinned
  const isRacePinned = (race: Race) => {
    return pinnedRaces.some(pinnedRace => pinnedRace.round === race.round && pinnedRace.season === race.season);
  };

  // Get regular races (not pinned)
  const getRegularRaces = () => {
    if (!data?.MRData.RaceTable.Races) return [];
    return data.MRData.RaceTable.Races.filter(race => !isRacePinned(race));
  };

  const regularRaces = getRegularRaces();

  return (
    <div id="races-list" className="py-16 bg-gray-50">
      <div className="container">
        <Link to="/" className="flex items-center font-medium text-primary-200 hover:text-primary-300 mb-6 w-fit group">
          <ChevronLeft className="inline-block mr-1 group-hover:-translate-x-1 transition-transform stroke-1" />
          Back to Seasons List
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              <span className="text-primary-200">Season {seasonParam}</span> Races
            </h2>
            <p className="mt-2 text-gray-600">
              {!isLoading &&
                !isError &&
                (pinnedRaces.length > 0 || regularRaces.length > 0) &&
                `Explore ${pinnedRaces.length + regularRaces.length} races from the ${seasonParam} championship`}
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

        {isLoading && <LoadingRacesList layout={view} count={pageSize} />}
        {isError && <Error />}
        {!isLoading && !isError && !regularRaces.length && pinnedRaces.length === 0 && (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-500">No Races Found</h2>
            <p className="mt-2 text-gray-400">There are no races available for this season.</p>
          </div>
        )}

        {!isLoading && !isError && (pinnedRaces.length > 0 || regularRaces.length > 0) && (
          <>
            {/* Pinned Races Section */}
            {pinnedRaces.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Pin className="h-5 w-5 text-primary-200 mr-2" />
                  Pinned Races
                </h3>
                <div
                  className={`grid gap-3 md:gap-5 ${
                    view === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'
                  }`}
                >
                  {pinnedRaces.map((race: Race) => (
                    <RaceCard key={`${race.season}-${race.round}`} race={race} togglePinRace={togglePinRace} isRacePinned={isRacePinned} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Regular Races Section */}
            {regularRaces.length > 0 && (
              <div>
                {pinnedRaces.length > 0 && (
                  <h3 className="text-xl font-bold mb-4">All Races</h3>
                )}
                <div
                  className={`grid gap-3 md:gap-5 ${
                    view === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'
                  }`}
                >
                  {regularRaces.map((race: Race) => (
                    <RaceCard key={`${race.season}-${race.round}`} race={race} togglePinRace={togglePinRace} isRacePinned={isRacePinned} />
                  ))}
                </div>
              </div>
            )}

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
}
