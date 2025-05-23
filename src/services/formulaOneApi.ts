import { api } from './api';
import type { PaginationParams, RaceResponse, RaceResultResponse, RaceResultsParams, RacesParams, SeasonResponse } from '../types/formulaOne';

export const getSeasons = async ({ limit = 30, offset = 0 }: PaginationParams): Promise<SeasonResponse> => {
  const response = await api.get<SeasonResponse>(`/seasons.json?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getRaces = async ({ season, limit = 30, offset = 0 }: RacesParams): Promise<RaceResponse> => {
  const response = await api.get<RaceResponse>(`/${season}/races.json?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const getRaceResults = async ({ season, round }: RaceResultsParams): Promise<RaceResultResponse> => {
  const response = await api.get<RaceResultResponse>(`/${season}/${round}/results.json`);
  return response.data;
};
