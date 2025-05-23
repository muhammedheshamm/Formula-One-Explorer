import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRaces } from '../hooks/useFormulaOne';
import type { Race } from '../types/formulaOne';
import { Pagination } from '../components/ui/pagination';
import { Rows3, LayoutGrid, ChevronRight, ChevronLeft, Pin, PinOff } from 'lucide-react';
import Error from '../components/ui/error';
import { LoadingRacesList } from '../components/loading/LoadingRacesList';

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

  // combine pinned races with regular races, making pinned races appear at the top
  const getRacesToDisplay = () => {
    if (!data?.MRData.RaceTable.Races) return [];

    const regularRaces = data.MRData.RaceTable.Races.filter(race => !isRacePinned(race));

    return [...pinnedRaces, ...regularRaces];
  };

  const racesToDisplay = getRacesToDisplay();

  return (
    <div id="races-list" className="py-16">
      <div className="container">
        <Link to="/" className="flex items-center font-medium text-primary-200 hover:text-primary-300 mb-4 w-fit">
          <ChevronLeft className="inline-block mr-1" />
          Back to Seasons List
        </Link>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Formula 1 Races - Season {seasonParam}</h2>
          <button className="cursor-pointer" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
            {view === 'list' ? <LayoutGrid className="h-7 w-7" /> : <Rows3 className="h-7 w-7" />}
          </button>
        </div>
        {isLoading && <LoadingRacesList layout={view} count={pageSize} />}
        {isError && <Error />}
        {!isLoading && !isError && (
          <>
            <p className="mt-2 text-gray-600">
              There's {totalItems} Races in the {seasonParam} season
            </p>

            <div className={`mt-5 grid gap-4 ${view === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {racesToDisplay.map((race: Race) => (
                <div
                  key={`${race.season}-${race.round}`}
                  className={`flex flex-col justify-between p-4 rounded-lg bg-white shadow-custom transition-shadow ${
                    isRacePinned(race) ? 'border-2 border-primary-200' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="md:text-xl font-semibold">{race.raceName}</h3>
                      <p className="text-sm text-gray-600">
                        {race.Circuit.circuitName}, {race.Circuit.Location.country}
                      </p>
                      <p className="text-sm text-gray-600">
                        Date:{' '}
                        {new Date(race.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => togglePinRace(race)}
                      className="text-primary-200 hover:text-primary-300"
                      aria-label={isRacePinned(race) ? 'Unpin race' : 'Pin race'}
                    >
                      {isRacePinned(race) ? <PinOff className="h-5 w-5" /> : <Pin className="h-5 w-5" />}
                    </button>
                  </div>
                  <Link
                    to={`/races/${race.season}/${race.round}`}
                    className="text-primary-200 hover:text-primary-300 flex items-center mt-2 w-fit"
                  >
                    View Details
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
}
