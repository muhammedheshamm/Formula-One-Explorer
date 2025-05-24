import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRaceResults } from '../hooks/useFormulaOne';
import { ChevronLeft, Crown } from 'lucide-react';
import Error from '../components/ui/Error';
import { LoadingRaceDetails } from '../components/loading/LoadingRaceDetails';
import { ParticipatingDrivers } from '../components/ParticipatingDrivers';
import { DriversPerformance } from '../components/DriversPerformance';

type TabType = 'drivers' | 'performance';

export default function RaceDetails() {
  const { season, round } = useParams<{ season: string; round: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('drivers');
  const navigate = useNavigate();

  const { data, isLoading, isError } = useRaceResults({
    season: season || '',
    round: round || '',
  });

  const race = data?.MRData.RaceTable.Races[0];
  const results = race?.Results;

  return (
    <div className="container py-16">
      <button
        onClick={() => navigate(-1)}
        className="flex cursor-pointer items-center font-medium text-primary-200 hover:text-primary-300 mb-6 w-fit group"
      >
        <ChevronLeft className="inline-block mr-1 group-hover:-translate-x-1 transition-transform stroke-1" />
        Back to Season Races
      </button>

      {isLoading && <LoadingRaceDetails />}
      {isError && <Error />}

      {!isLoading && !isError && !race && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-500 mt-40">No Race Data Found</h2>
        </div>
      )}

      {!isLoading && !isError && race && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 md:gap-4">
              <h1 className="text-3xl font-bold">
                {race.raceName} - {race.season}
              </h1>
              <span className="bg-primary-200 text-white text-sm font-medium px-2.5 py-0.5 rounded whitespace-nowrap">
                Round {race.round}
              </span>
            </div>
            <p className="text-gray-600 mt-2">
              {race.Circuit.circuitName}, {race.Circuit.Location.locality}, {race.Circuit.Location.country} |{' '}
              {new Date(race.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>

            {/* Winner information */}
            {results && results.length > 0 && (
              <div
                data-testid="winner-card"
                className="mt-4 flex items-center bg-white rounded-lg p-4 border border-gray-100"
              >
                <div className="mr-3">
                  <Crown className="h-8 w-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {results.find(r => r.position === '1')?.Driver.givenName}{' '}
                    {results.find(r => r.position === '1')?.Driver.familyName}
                  </h3>
                  <p className="text-gray-600">
                    Winner | {results.find(r => r.position === '1')?.Constructor.name} | {''}
                    {results.find(r => r.position === '1')?.Time?.time || 'No time recorded'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto scrollbar-hidden" role="tablist">
              <button
                onClick={() => setActiveTab('drivers')}
                role="tab"
                aria-selected={activeTab === 'drivers'}
                className={`${
                  activeTab === 'drivers'
                    ? 'border-primary-200 text-primary-200'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
              >
                Participating Drivers
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                role="tab"
                aria-selected={activeTab === 'performance'}
                className={`${
                  activeTab === 'performance'
                    ? 'border-primary-200 text-primary-200'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm`}
              >
                Performance Visualization
              </button>
            </nav>
          </div>

          {activeTab === 'drivers' ? (
            <ParticipatingDrivers results={results} />
          ) : (
            <DriversPerformance results={results} />
          )}
        </div>
      )}
    </div>
  );
}
