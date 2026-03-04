export default function truncateGenres(genres: string[], max: number): string {
    if (max <= 0) return '';

    return genres.length > max ? `${genres.slice(0, max).join(", ")}, ...` : genres.join(", ");
}