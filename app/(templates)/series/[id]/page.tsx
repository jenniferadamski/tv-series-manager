import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MainTitle from "@/app/_components/ui/MainTitle";
import { SeriesDetails } from "@/types/seriesDetails";
import truncateGenres from "@/lib/formatters";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function getCurrentShow(id: string): Promise<SeriesDetails> {
    const res = await fetch(`${baseUrl}/api/tv/${id}`, {
        next: { revalidate: 60 },
    });

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        throw new Error("Failed to fetch series details");
    }

    return res.json();
}

interface DetailProps {
    params: Promise<{ id: string; }>;
}

// AJOUTER DANS LE TITLE UNE VARIABLE DYNAMIQUE QUI RECUPERE LE NOM DE LA SERIE SI POSSIBLE
export const metadata: Metadata = {
    title: "TV Series Manager",
    description: "Retrouvez toutes les informations détaillées sur la série",
};

export default async function DetailPage(props: DetailProps) {
    const params = await props.params;
    const currentShow = await getCurrentShow(params.id);
    const genresList = truncateGenres(currentShow.genres, 10);

    return (
        <section className="flex-[1_0_auto] mx-5 showDetails">
            <div className="flex flex-col items-center justify-center">
                <MainTitle title={currentShow.title} />
                {currentShow.title != currentShow.originalTitle && <span>(Titre original&nbsp;:&nbsp;{currentShow.originalTitle})</span>}

                {/* TO DO : Mettre dans le dossier public une image de placeholder dans le cas où y'a pas de poster et faire src={currentShow.poster ?? "/poster-placeholder.png"} */}

                {currentShow.poster && (
                    <Image
                        src={currentShow.poster}
                        alt={`Affiche de la série ${currentShow.title}`}
                        height={300}
                        width={200}
                        className="my-5"
                    />
                )}

                {/* @todo ajouter note */}
            </div>

            <div className="flex flex-col">
                <span className="font-bold">Synopsis&nbsp;:&nbsp;</span>
                <p>{currentShow.overview}</p>
            </div>

            <div className="flex flex-col justify-center">
                <span>Genres : {genresList}</span>
                <span>Créateur(s) : {currentShow.creators.join(", ")}</span>
                <span>Pays d&apos;origine : {currentShow.countries.join(", ")}</span>
                <span>Nombre de saisons : {currentShow.seasonsCount}</span>
                <span>Nombre d&apos;épisodes: {currentShow.episodesCount}</span>
                {currentShow.runtime && <span>Durée moyenne d&apos;un épisode : {currentShow.runtime} minutes</span>}
                <span>Statut : {currentShow.inProduction ? "en cours" : "terminée"}</span>
                <span>Diffusion : {currentShow.inProduction ?
                    `Depuis ${currentShow.firstAirYear}` :
                    `${currentShow.firstAirYear} - ${currentShow.lastAirYear}`}
                </span>
            </div>
        </section>
    )
}



//     seasons: {
//       id: number;
//       name: string;
//       seasonNumber: number;
//       episodes: number;
//       year: string | null;
//     }[];