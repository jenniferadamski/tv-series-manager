import { Series } from "@/types/series";
import { SeriesDetails } from "@/types/seriesDetails";

export function simplifiedSeriesDetails(details: SeriesDetails): Series {
    return {
        id: details.id,
        title: details.title,
        poster: details.poster,
        year: details.firstAirYear,
        rating: details.rating,
        genres: details.genres,
    };
}