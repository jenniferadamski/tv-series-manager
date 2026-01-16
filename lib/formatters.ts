export default function truncateGenres(genres: string[], max: number): string {
    return genres.length > max ? `${genres.slice(0, max).join(", ")}, …` : genres.join(", ");
}