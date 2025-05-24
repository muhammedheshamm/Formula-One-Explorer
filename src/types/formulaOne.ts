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

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
}

export interface RaceResponse {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable: {
      season: string;
      Races: Race[];
    };
  };
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface RacesParams extends PaginationParams {
  season: string;
}

export interface Driver {
  driverId: string;
  url?: string;
  givenName: string;
  familyName: string;
  dateOfBirth?: string;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  url?: string;
  name: string;
  nationality?: string;
}

export interface RaceTime {
  millis?: string;
  time: string;
}

export interface RaceResult {
  number?: string;
  position: string;
  positionText?: string;
  points?: string;
  Driver: Driver;
  Constructor: Constructor;
  grid?: string;
  laps?: string;
  status: string;
  Time?: RaceTime;
}

export interface RaceWithResults extends Race {
  Results: RaceResult[];
}

export interface RaceResultResponse {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable: {
      season: string;
      round: string;
      Races: RaceWithResults[];
    };
  };
}

export interface RaceResultsParams {
  season: string;
  round: string;
}
