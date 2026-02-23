import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";
import type { TmdbPopularSeriesResponse, TmdbSeriesDetails } from "@/types/tmdb";
import type { Series } from "@/types/series";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const genres = searchParams.get('genres');
    const yearFrom = searchParams.get('yearFrom');
    const yearTo = searchParams.get('yearTo');
    const status = searchParams.get('status');
    const MIN_YEAR = 1940;
    const CURRENT_YEAR = new Date().getFullYear();

    const params = new URLSearchParams();

    if (genres){
        params.set('with_genres', genres);
    }

    if (yearFrom){
        const from = Number(yearFrom);

        if (Number.isNaN(from) || from < MIN_YEAR || from > CURRENT_YEAR) {
            return NextResponse.json(
                { error: "Invalid yearFrom" },
                { status: 400 }
            );
        } 

        params.set('first_air_date.gte', `${yearFrom}-01-01`);
    } 

    if (yearTo) {
        const to = Number(yearTo);

        if (Number.isNaN(to) || to < MIN_YEAR || to > CURRENT_YEAR) {
            return NextResponse.json(
                { error: "Invalid yearTo" },
                { status: 400 }
            );
        } 

        params.set('first_air_date.lte', `${yearTo}-12-31`);
    }

    if (yearFrom && yearTo) {
        const from = Number(yearFrom);
        const to = Number(yearTo);

        if (from > to) {
            return NextResponse.json(
                { error: "yearFrom cannot be greater than yearTo" },
                { status: 400 }
            );
        }
    }

    if (status === 'ongoing'){
        params.set('with_status', '0');
    } else if(status === 'ended') {
        params.set('with_status', '3');
    }

    const data = await tmdb<TmdbPopularSeriesResponse>(`/discover/tv?${params.toString()}`);
    const ids = data.results.map(show => show.id);
    const detailedShows = await Promise.all(ids.map(id => tmdb<TmdbSeriesDetails>(`/tv/${id}`)));

    const results: Series[] = detailedShows.map(show => ({
        id: show.id,
        title: show.name,
        poster: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null,
        year: show.first_air_date?.slice(0, 4) ?? null,
        rating: Math.round(show.vote_average / 2),
        genres: [],
    }));

    return NextResponse.json(results);
}