import { useQuery } from '@tanstack/react-query';
import { getRaceResults, getRaces, getSeasons } from '../services/formulaOneApi';
import type { PaginationParams, RaceResultsParams, RacesParams } from '../types/formulaOne';

export const useSeasons = (params: PaginationParams) => {
  return useQuery({
    queryKey: ['seasons', params],
    queryFn: () => getSeasons(params),
  });
};

export const useRaces = (params: RacesParams) => {
  return useQuery({
    queryKey: ['races', params],
    queryFn: () => getRaces(params),
  });
};

export const useRaceResults = (params: RaceResultsParams) => {
  return useQuery({
    queryKey: ['raceResults', params],
    queryFn: () => getRaceResults(params),
  });
};
