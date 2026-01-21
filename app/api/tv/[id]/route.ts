import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";
import type { TmdbSeriesDetails } from "@/types/tmdb";
import { SeriesDetails } from "@/types/seriesDetails";

export async function GET(_request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const seriesId = params.id;
    const seriesDetailsData = await tmdb<TmdbSeriesDetails>(`/tv/${seriesId}`);

    const seriesDetails: SeriesDetails = {
        id: seriesDetailsData.id,
        title: seriesDetailsData.name,
        originalTitle: seriesDetailsData.original_name,
        overview: seriesDetailsData.overview,
        poster: seriesDetailsData.poster_path ? `https://image.tmdb.org/t/p/w500${seriesDetailsData.poster_path}` : null,
        firstAirYear: seriesDetailsData.first_air_date?.slice(0, 4) ?? null,
        lastAirYear: seriesDetailsData.last_air_date?.slice(0, 4) ?? null,
        inProduction: seriesDetailsData.in_production,
        seasonsCount: seriesDetailsData.number_of_seasons,
        episodesCount: seriesDetailsData.number_of_episodes,
        runtime: seriesDetailsData.episode_run_time[0] ?? null,
        countries: seriesDetailsData.origin_country,
        genres: seriesDetailsData.genres.map((g) => g.name),
        creators: seriesDetailsData.created_by.map((c) => c.name),
        seasons: seriesDetailsData.seasons.map((season) => ({
            id: season.id,
            name: season.name,
            seasonNumber: season.season_number,
            episodes: season.episode_count,
            year: season.air_date?.slice(0, 4) ?? null,
        })),
    };

    return NextResponse.json(seriesDetails);
}