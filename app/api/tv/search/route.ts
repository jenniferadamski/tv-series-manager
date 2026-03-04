import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";
import type { TmdbPopularSeriesResponse } from "@/types/tmdb";
import type { Series } from "@/types/series";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') ?? '1';

    if (!query){
        return NextResponse.json({
            page: 1,
            totalPages: 1,
            results: [],
        });
    }

    const data = await tmdb<TmdbPopularSeriesResponse>(`/search/tv?query=${encodeURIComponent(query)}&page=${page}`);

    const results: Series[] = data.results.map(show => ({
        id: show.id,
        title: show.name,
        poster: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null,
        year: show.first_air_date?.slice(0, 4) ?? null,
        rating: Math.round(show.vote_average / 2),
        genres: [],
    }));

    return NextResponse.json({
        page: data.page,
        totalPages: data.total_pages,
        results,
    });
}