export interface TmdbPopularSeries {
    id: number;
    name: string;
    poster_path: string | null;
    first_air_date: string | null;
    genre_ids: number[];
    vote_average: number;
}

export interface TmdbPopularSeriesResponse {
    results: TmdbPopularSeries[];
}

export interface TmdbGenre {
    id: number;
    name: string;
}

export interface TmdbGenreResponse {
    genres: TmdbGenre[];
}