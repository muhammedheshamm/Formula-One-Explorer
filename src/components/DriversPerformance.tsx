import type { RaceResult } from '../types/formulaOne';

interface DriversPerformanceProps {
  results: RaceResult[] | undefined;
}

export const DriversPerformance = ({ results }: DriversPerformanceProps) => {
  return (
    <div className="bg-white rounded-lg shadow-custom p-6">
      <h2 className="text-2xl font-bold mb-4">Drivers Performance</h2>
      <p className="text-gray-600">This is drivers performance visualization</p>
    </div>
  );
};
