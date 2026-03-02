import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";
import getPage from "@/lib/pagination";
import type { TmdbPopularSeriesResponse, TmdbGenreResponse } from "@/types/tmdb";
import type { Series } from "@/types/series";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = getPage(searchParams);

    const params = new URLSearchParams();
    params.set('page', page.toString());

    const genreData = await tmdb<TmdbGenreResponse>("/genre/tv/list");
    const genresMap: Record<number, string> = Object.fromEntries(
        genreData.genres.map((genre) => [genre.id, genre.name])
    );

    const popularSeriesData = await tmdb<TmdbPopularSeriesResponse>(`/tv/popular?${params.toString()}`); 

    const popularSeries: Series[] = popularSeriesData.results.map((show) => ({
        id: show.id,
        title: show.name,
        poster: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
        genres: show.genre_ids.map((id) => genresMap[id]).filter(Boolean),
        year: show.first_air_date?.substring(0, 4) ?? null,
        rating: Math.round(show.vote_average / 2),
    }));

    return NextResponse.json({
        results: popularSeries,
        page: popularSeriesData.page,
        totalPages: popularSeriesData.total_pages,
    });
}