import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";
import { Series } from "@/types/series";
import type { TmdbSeries, TmdbSeriesResponse } from "@/types/tmdb";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const genres = searchParams.get('genres');
    const yearFrom = searchParams.get('yearFrom');
    const yearTo = searchParams.get('yearTo');
    const status = searchParams.get('status');

    const params = new URLSearchParams();

    if (genres) params.set("with_genres", genres);
    if (yearFrom) params.set("first_air_date.gte", `${yearFrom}-01-01`);
    if (yearTo) params.set("first_air_date.lte", `${yearTo}-12-31`);
    if (status === "ongoing") params.set("with_status", "0");
    if (status === "ended") params.set("with_status", "3");

    const data = await tmdb<TmdbSeriesResponse>(`/discover/tv?${params.toString()}`);

    const results: Series[] = data.results.map((show: TmdbSeries) => ({
        id: show.id,
        title: show.name,
        poster: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null,
        year: show.first_air_date?.slice(0, 4) ?? null,
        rating: Math.round(show.vote_average / 2),
        genres: [],
    }));

  return NextResponse.json(results);
}