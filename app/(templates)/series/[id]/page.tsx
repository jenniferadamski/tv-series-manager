import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailElement from "@/app/_components/ui/DetailElement";
import FavoriteButton from "@/app/_components/series/FavoriteButton";
import MainTitle from "@/app/_components/ui/MainTitle";
import { SeriesDetails } from "@/types/seriesDetails";
import truncateGenres from "@/lib/formatters";
import { simplifiedSeriesDetails } from "@/lib/mappers";
import posterAlternative from "@/public/assets/poster-not-available.jpg";

async function getCurrentShow(id: string): Promise<SeriesDetails> {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const url = `${origin}/api/tv/${id}`;

    const res = await fetch(url, {
        next: { revalidate: 60 },
    });

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        console.log(`Fetch failed for URL: ${url} (Status: ${res.status})`);
        throw new Error(`Failed fetch. Error Status: ${res.status})`);
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
    const airDates = currentShow.firstAirYear === currentShow.lastAirYear ? currentShow.firstAirYear : `${currentShow.firstAirYear} - ${currentShow.lastAirYear}`;
    const stars_rating = "⭐".repeat(currentShow.rating);
    const simplifiedSeries = simplifiedSeriesDetails(currentShow);

    return (
        <section className="flex-[1_0_auto] mx-5 md:mx-8 lg:mx-10 xl:mx-15 showDetails">
            <div className="flex flex-col items-center justify-center">
                <MainTitle title={currentShow.title} />
                {currentShow.title != currentShow.originalTitle && <span>(Titre original&nbsp;:&nbsp;{currentShow.originalTitle})</span>}

                <Image
                    src={currentShow.poster ? currentShow.poster : posterAlternative}
                    alt={`Affiche de la série ${currentShow.title}`}
                    height={300}
                    width={200}
                    className="my-5"
                />

                <div className="mb-5">{stars_rating}</div>
            </div>

            {currentShow.overview &&
                <div className="flex flex-col mb-2">
                    <span className="font-bold text-[#0f396d]">Synopsis&nbsp;:&nbsp;</span>
                    <p>{currentShow.overview}</p>
                </div>
            }

            <div className="flex flex-col justify-center mb-5">
                <DetailElement elementTitle="Créateur(s)" element={currentShow.creators.join(", ")} />
                <DetailElement elementTitle="Genres" element={genresList} />
                <DetailElement elementTitle="Pays d&apos;origine" element={currentShow.countries.join(", ")} />
                <DetailElement elementTitle="Statut" element={currentShow.inProduction ? "en cours" : "terminée"} />
                <DetailElement
                    elementTitle="Diffusion"
                    element={currentShow.inProduction ? `Depuis ${currentShow.firstAirYear}` : `${airDates}`}
                />
                <DetailElement elementTitle="Nombre de saisons" element={currentShow.seasonsCount} />
                <DetailElement elementTitle="Nombre d&apos;épisodes" element={currentShow.episodesCount} />
                {currentShow.runtime && <DetailElement elementTitle="Durée moyenne d&apos;un épisode" element={`${currentShow.runtime} minutes`} />}
            </div>

            <div className="mb-6">
                <FavoriteButton show={simplifiedSeries} />
            </div>
        </section>
    )
}