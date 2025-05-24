import { useState } from 'react';
import { Crown, Search, Car } from 'lucide-react';
import type { RaceResult } from '../types/formulaOne';

interface ParticipatingDriversProps {
  results: RaceResult[] | undefined;
}

export const ParticipatingDrivers = ({ results }: ParticipatingDriversProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // check if a driver's name matches the search term
  const isDriverHighlighted = (result: RaceResult) => {
    if (!searchTerm) return false;

    const fullName = `${result.Driver.givenName} ${result.Driver.familyName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // highlight matching text in driver name
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
    <div>
      <div className="flex items-center mb-4">
        <Car className="h-6 w-6 stroke-1 text-primary-200 mr-2" />
        <h2 className="text-2xl font-bold">Participating Drivers</h2>
      </div>

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

      <div className="overflow-x-auto mt-6 px-0">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Position
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Driver
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Nationality
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Team
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results?.map((result: RaceResult) => (
              <tr
                key={result.Driver.driverId}
                className={`hover:bg-gray-100 ${isDriverHighlighted(result) ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{result.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="relative">
                    {highlightText(`${result.Driver.givenName} ${result.Driver.familyName}`)}
                    {result.position === '1' && (
                      <Crown className="absolute -top-3.5 -right-3 rotate-22 text-yellow-500 w-5 h-5" />
                    )}
                  </span>
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
  );
};
