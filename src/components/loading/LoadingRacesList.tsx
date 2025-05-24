import { Skeleton } from '../ui/skeleton';

type LayoutType = 'grid' | 'list';

export const LoadingRacesList = ({ layout = 'grid', count = 12 }: { layout?: LayoutType; count?: number }) => {
  return (
    <>
      <Skeleton className="mt-2 h-[24px] w-[250px] bg-gray-200"></Skeleton>
      <div
        className={`mt-5 grid gap-4 ${layout === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}
      >
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className="w-full h-[212px] bg-gray-200" />
        ))}
      </div>
    </>
  );
};
