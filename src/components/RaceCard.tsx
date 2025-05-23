import { Link } from 'react-router-dom';
import { ChevronRight, Pin, PinOff } from 'lucide-react';
import type { Race } from '../types/formulaOne';

interface RaceCardProps {
  race: Race;
  togglePinRace: (race: Race) => void;
  isRacePinned: (race: Race) => boolean;
}

export const RaceCard = ({ race, togglePinRace, isRacePinned }: RaceCardProps) => {
  return (
    <div
      className={`group relative rounded-xl bg-white shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-shadow transition-transform ${
        isRacePinned(race) ? 'border border-primary-200' : 'border border-gray-200'
      }`}
    >
      {/* round badge */}
      <div className="absolute -top-3 -right-3 bg-primary-200 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center shadow-sm">
        {race.round}
      </div>

      <div className="p-3 md:p-5 h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between gap-3 mb-3">
              <Link
                to={`/races/${race.season}/${race.round}`}
                className="md:text-xl font-bold text-gray-800 hover:text-primary-200 transition-colors"
              >
                {race.raceName}
              </Link>

              <button
                onClick={() => togglePinRace(race)}
                className={`p-2 cursor-pointer rounded-full flex-shrink-0 w-8 h-8 flex items-center justify-center ${
                  isRacePinned(race)
                    ? 'bg-primary-200 text-white hover:bg-primary-300'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
                aria-label={isRacePinned(race) ? 'Unpin race' : 'Pin race'}
              >
                {isRacePinned(race) ? <PinOff className="h-5 w-5" /> : <Pin className="h-5 w-5" />}
              </button>
            </div>

            <div className="mt-3 flex items-start space-x-2">
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-primary-200"></div>
              </div>
              <p className="text-sm text-gray-600">
                {race.Circuit.circuitName}, {race.Circuit.Location.country}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {new Date(race.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <Link
              to={`/races/${race.season}/${race.round}`}
              className="bg-gray-100 p-2 hover:bg-primary-200 hover:*:text-white rounded-full transition-colors"
              aria-label={`View details for ${race.raceName}`}
            >
              <ChevronRight className="h-4 w-4 text-primary-200" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
