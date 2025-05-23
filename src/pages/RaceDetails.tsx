import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRaceResults } from '../hooks/useFormulaOne';
import { ChevronLeft, Search } from 'lucide-react';
import Error from '../components/ui/error';
import { LoadingRaceDetails } from '../components/loading/LoadingRaceDetails';
import type { RaceResult } from '../types/formulaOne';

export default function RaceDetails() {
  const { season, round } = useParams<{ season: string; round: string }>();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError } = useRaceResults({
    season: season || '',
    round: round || '',
  });

  const race = data?.MRData.RaceTable.Races[0];
  const results = race?.Results;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // check if a driver's name matches the search term
  const isDriverHighlighted = (result: RaceResult) => {
    if (!searchTerm) return false;

    const fullName = `${result.Driver.givenName} ${result.Driver.familyName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // highlight the matching text in driver name
  const highlightText = (text: string) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-red-200 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container py-16">
      <Link
        to={`/seasons/${season}`}
        className="flex items-center font-medium text-primary-200 hover:text-primary-300 mb-6 w-fit"
      >
        <ChevronLeft className="inline-block mr-1" />
        Back to Season Races
      </Link>

      {isLoading && <LoadingRaceDetails />}
      {isError && <Error />}

      {!isLoading && !isError && !race && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-500 mt-40">No Race Data Found</h2>
        </div>
      )}

      {!isLoading && !isError && race && (
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">
              {race.raceName} - {race.season}
            </h1>
            <p className="text-gray-600 mt-2">
              {race.Circuit.circuitName}, {race.Circuit.Location.locality}, {race.Circuit.Location.country} |{' '}
              {new Date(race.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Drivers Section */}
          <div className="bg-white rounded-lg shadow-custom p-6">
            <h2 className="text-2xl font-bold mb-4">Participating Drivers</h2>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Type to search and highlight drivers in the list</p>

            <div className="overflow-x-auto mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Position
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Driver
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nationality
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Team
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results?.map((result: RaceResult) => (
                    <tr
                      key={result.Driver.driverId}
                      className={`hover:bg-gray-50 ${
                        isDriverHighlighted(result) ? 'bg-gray-100 hover:bg-gray-100' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{result.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {highlightText(`${result.Driver.givenName} ${result.Driver.familyName}`)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{result.Driver.nationality}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{result.Constructor.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{result.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{result.Time?.time || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
