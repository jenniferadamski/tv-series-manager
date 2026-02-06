export interface SeriesDetails {
    id: number;
    title: string;
    originalTitle: string;
    overview: string;
    poster: string | null;
    firstAirYear: string | null;
    lastAirYear: string | null;
    inProduction: boolean;
    seasonsCount: number;
    episodesCount: number;
    runtime: number | null;
    countries: string[];
    genres: string[];
    creators: string[];
    seasons: {
      id: number;
      name: string;
      seasonNumber: number;
      episodes: number;
      year: string | null;
    }[];
    rating: number;
}