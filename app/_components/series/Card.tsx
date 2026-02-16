import Image from "next/image";
import Link from "next/link";
import truncateGenres from "@/lib/formatters";
import type { Series } from "@/types/series";
import posterAlternative from "@/public/assets/poster-not-available.jpg";

export default function Card({ id, title, poster, year, genres, rating }: Series) {
    const stars_rating = "⭐".repeat(rating);
    const genresList = truncateGenres(genres, 2);

    return (
        <li className="w-45/100 md:w-30/100 lg:w-20/100 mb-5 lg:mb-10 lg:mr-5 shadow-xl/10" key={id}>
            <Link href={`/series/${id}`}>
                <Image
                    src={poster ? poster : posterAlternative}
                    alt={`Affiche de la série ${title}`}
                    height={500}
                    width={500}
                    className="min-h-[236px] md:min-h-[340px] min-[51rem]:min-h-[400px] min-[59rem]:min-h-[420px] min-[62rem]:min-h-[428px] lg:min-h-[420px] m-auto object-cover bg-neutral-200"
                />
                <div className="h-[12rem] bg-white flex flex-col justify-around items-center text-center rounded-b-lg px-2">
                    <div>
                        <h2 className="text-base font-semibold">{title}</h2>
                        <span>{year}</span>
                    </div>

                    <span className="px-1">{genresList}</span>
                    <div>{stars_rating}</div>
                </div>
            </Link>
        </li>
    )
}