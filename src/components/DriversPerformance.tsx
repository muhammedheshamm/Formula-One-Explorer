import { useMemo } from 'react';
import type { RaceResult } from '../types/formulaOne';
import { Clock, Crown, Flag, Trophy, ChartBarStacked } from 'lucide-react';

interface DriversPerformanceProps {
  results: RaceResult[] | undefined;
}

export const DriversPerformance: React.FC<DriversPerformanceProps> = ({ results }) => {
  const processedResults = useMemo(() => {
    if (!results || results.length === 0) return [];

    // find the winner (position 1)
    const winner = results.find(result => result.position === '1');
    if (!winner || !winner.Time) return [];

    // filter only drivers with time (finished the race)
    const driversWithTime = results
      .filter(result => result.Time && result.Time.millis)
      .map(result => {
        const driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
        const time = Number(result.Time?.millis);
        const team = result.Constructor.name;

        // calculate time difference in seconds
        let timeDiff = 0;
        if (result.position === '1') {
          timeDiff = 0; // winner has 0 difference
        } else {
          timeDiff = (time - Number(winner.Time?.millis)) / 1000;
        }

        return {
          driverName,
          position: result.position,
          timeDiff,
          timeString: result.position === '1' ? '0.000s' : timeDiff.toFixed(3) + 's',
          team,
        };
      });

    // sort by position
    return driversWithTime.sort((a, b) => parseInt(a.position) - parseInt(b.position));
  }, [results]);

  // calculate the maximum time difference for scaling the bars
  const maxTimeDiff = useMemo(() => {
    if (processedResults.length === 0) return 0;
    return Math.max(...processedResults.map(result => result.timeDiff));
  }, [processedResults]);

  // calculate bar width as percentage of maximum
  const getBarWidth = (timeDiff: number) => {
    if (maxTimeDiff === 0) return 0;
    return (timeDiff / maxTimeDiff) * 100;
  };

  // get position color
  const getPositionColor = (position: string) => {
    switch (position) {
      case '1':
        return 'bg-yellow-500';
      case '2':
        return 'bg-gray-400';
      case '3':
        return 'bg-amber-700';
      default:
        return 'bg-gray-200';
    }
  };

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl shadow-sm p-8">
        <Flag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-500">No Performance Data</h3>
        <p className="text-gray-400 mt-2">Race results are not available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <ChartBarStacked className="h-6 w-6 stroke-1 text-primary-200 mr-2" />
        <h2 className="text-2xl font-bold">Performance Visualization</h2>
      </div>
      <p className="text-gray-600 mb-8">
        Visual comparison of driver performances based on time differences from the race winner
      </p>

      {/* Performance stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-2">
            <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
            <h3 className="font-semibold text-gray-700">Winner</h3>
          </div>
          <p className="text-xl font-bold">{processedResults[0]?.driverName}</p>
          <p className="text-sm text-gray-500">{processedResults[0]?.team}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-2">
            <Clock className="h-4 w-4 text-primary-200 mr-2" />
            <h3 className="font-semibold text-gray-700">Winning Time</h3>
          </div>
          <p className="text-xl font-bold">{results.find(r => r.position === '1')?.Time?.time || 'N/A'}</p>
          <p className="text-sm text-gray-500">Total race duration</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center mb-2">
            <Flag className="h-4 w-4 text-primary-200 mr-2" />
            <h3 className="font-semibold text-gray-700">Finishers</h3>
          </div>
          <p className="text-xl font-bold">{processedResults.length}</p>
          <p className="text-sm text-gray-500">Out of {results.length} participants</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">Time Gap from Winner (seconds)</h3>

        <div className="space-y-6">
          {processedResults.map(driver => (
            <div key={driver.driverName} className="relative">
              <div className="flex items-center mb-2">
                <div
                  className={`flex items-center justify-center h-6 w-6 rounded-full ${getPositionColor(
                    driver.position
                  )} text-white text-xs font-bold mr-3`}
                >
                  {driver.position}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-bold text-gray-800">
                      {driver.driverName}
                      {driver.position === '1' && <Crown className="inline-block ml-2 h-4 w-4 text-yellow-500" />}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">({driver.team})</span>
                  </div>
                </div>
                <span className="font-medium text-gray-700 ml-4 w-20 text-right">{driver.timeString}</span>
              </div>

              <div className="ml-9 flex-1">
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-primary-200"
                    style={{ width: `${getBarWidth(driver.timeDiff)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
