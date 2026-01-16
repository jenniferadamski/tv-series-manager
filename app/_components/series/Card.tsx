import Image from "next/image";
import { Series } from "@/types/series";
import truncateGenres from "@/lib/formatters";

export default function Card({ id, title, poster, year, genres, rating }: Series) {
    const stars_rating = "⭐".repeat(rating);
    const genresList = truncateGenres(genres, 2);

    return (
        <li className="w-45/100 mb-5 shadow-xl/10" key={id}>
            <Image
                src={poster}
                alt={`Affiche de la série ${title}`}
                height={500}
                width={500}
            />
            <div className="h-[12rem] bg-white flex flex-col justify-around items-center text-center rounded-b-lg">
                <div>
                    <h2 className="text-base font-semibold">{title}</h2>
                    <span>{year}</span>
                </div>

                <span className="px-1">{genresList}</span>

                <div>{stars_rating}</div>
            </div>
        </li>
    )
}