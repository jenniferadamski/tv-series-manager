import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";
import { Genre } from "@/types/genre";
import { TmdbGenreResponse } from "@/types/tmdb";

export async function GET(){
    const data = await tmdb<TmdbGenreResponse>(`/genre/tv/list`);

    const genres: Genre[] = data.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
    }));

    return NextResponse.json(genres);
}