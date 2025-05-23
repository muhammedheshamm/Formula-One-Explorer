import { Skeleton } from '../ui/skeleton';

export const LoadingRaceDetails = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4 max-w-md bg-gray-200" />
        <Skeleton className="h-6 w-1/2 max-w-sm bg-gray-200" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-48 bg-gray-200" />
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full bg-gray-200" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-64 bg-gray-200" />
        <Skeleton className="h-80 w-full bg-gray-200" />
      </div>
    </div>
  );
};
