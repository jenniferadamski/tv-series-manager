export interface SeriesFilters {
    genres: number[];
    yearFrom?: number;
    yearTo?: number;
    status?: "ongoing" | "ended";
}