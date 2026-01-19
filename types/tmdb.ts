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

export interface TmdbSeriesDetails {
    created_by: { id: number; name: string }[];
    episode_run_time: number[];
    first_air_date: string | null;
    genres: { id: number; name: string }[];
    id: number;
    in_production: boolean;
    last_air_date: string | null;
    name: string;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_name: string;
    overview: string;
    poster_path: string | null;
    seasons: {
        id: number;
        name: string;
        season_number: number;
        episode_count: number;
        air_date: string | null;
    }[];
}