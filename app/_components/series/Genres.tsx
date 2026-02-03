// import type { Genre } from "@/types/genre";

// const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

// async function getGenres() {
//     const res = await fetch(`${baseUrl}/api/tv/genres`, {
//         next: { revalidate: 60 },
//     });

//     return res.json();
// }

// export default async function Genres() {
//     const genres = await getGenres();

//     return (
//         <fieldset>
//             <legend>Genres</legend>
//             {genres.map((genre: Genre) => (
//                 <label key={genre.id}>
//                     <input type="checkbox" />
//                     {genre.name}
//                 </label>
//             ))}
//         </fieldset>
//     )
// }