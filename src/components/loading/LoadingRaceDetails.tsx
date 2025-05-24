import { Skeleton } from '../ui/skeleton';

export const LoadingRaceDetails = () => {
  return (
    <div className="space-y-4">
      {/* Race title and info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-3/4 max-w-md bg-gray-200" />
          <Skeleton className="h-6 w-20 rounded-md bg-gray-200" />
        </div>
        <Skeleton className="h-6 w-1/2 max-w-sm bg-gray-200" />
      </div>

      {/* Winner card */}
      <div className="mt-4">
        <Skeleton className="h-24 w-full rounded-lg bg-gray-200" />
      </div>

      {/* Tabs */}
      <div className="mt-2">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <Skeleton className="h-10 w-40 bg-gray-200" />
            <Skeleton className="h-10 w-48 bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Tab content - Results list */}
      <Skeleton className="h-8 w-full max-w-[300px] bg-gray-200" />

      {/* Tab content - Drivers list */}
      <div>
        {/* Search bar */}
        <Skeleton className="h-10 w-full mb-2 bg-gray-200" />
        <Skeleton className="h-5 w-64 mb-6 bg-gray-200" />

        {/* Table */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-full bg-gray-200" />
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
};
