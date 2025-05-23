import { useMemo } from 'react';
import type { RaceResult } from '../types/formulaOne';
import { Crown } from 'lucide-react';

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

  if (!results || results.length === 0) {
    return <div className="text-center py-10">No performance data available</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Performance Visualization</h2>
      <p className="text-gray-600 mb-6">Visual comparison of driver performances (time taken to complete the race)</p>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Time Difference from Winner (seconds)</h3>

        <div className="space-y-4">
          {processedResults.map(driver => (
            <div key={driver.driverName} className="relative">
              <div className="flex justify-between mb-1">
                <span className="font-medium relative">
                  {driver.position === '1' && (
                    <Crown className="absolute -top-3.5 -right-3.5 rotate-22 text-yellow-500" />
                  )}
                  {driver.driverName}
                </span>
                <span className="font-medium">{driver.timeDiff.toFixed(3)}s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary-200 h-2.5 rounded-full"
                  style={{ width: `${getBarWidth(driver.timeDiff)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
