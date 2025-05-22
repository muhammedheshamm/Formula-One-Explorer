import { useQuery } from '@tanstack/react-query';
import { getSeasons } from '../services/formulaOneApi';
import type { PaginationParams } from '../types/formulaOne';

export const useSeasons = (params: PaginationParams) => {
  return useQuery({
    queryKey: ['seasons', params],
    queryFn: () => getSeasons(params),
  });
};
