const BASE_URL = "https://api.themoviedb.org/3";

export async function tmdb<T>(path: string, params: Record<string, string> = {}) : Promise<T> {
    const url = new URL(`${BASE_URL}${path}`);

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });

    url.searchParams.set("api_key", process.env.TMDB_API_KEY!);
    url.searchParams.set("language", "fr-FR");

    const res = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`TMDB error: ${res.status}`);
    }

    return res.json();
}