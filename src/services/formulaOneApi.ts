import { api } from './api';
import type { PaginationParams, SeasonResponse } from '../types/formulaOne';

export const getSeasons = async ({ limit = 30, offset = 0 }: PaginationParams): Promise<SeasonResponse> => {
  const response = await api.get<SeasonResponse>(`/seasons.json?limit=${limit}&offset=${offset}`);
  return response.data;
};
