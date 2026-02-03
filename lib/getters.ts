import type { Genre } from "@/types/genre";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default async function getGenres(): Promise<Genre[]> {
    const res = await fetch(`${baseUrl}/api/tv/genres`, {
        next: { revalidate: 60 },
    });

    if(!res.ok){
        throw new Error("Failed to fetch genres");
    }

    return res.json();
}