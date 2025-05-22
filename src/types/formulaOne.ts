export interface Season {
  season: string;
  url: string;
}

export interface SeasonResponse {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    SeasonTable: {
      Seasons: Season[];
    };
  };
}

export interface PaginationParams {
  limit: number;
  offset: number;
} 