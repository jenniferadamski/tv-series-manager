import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailElement from "@/app/_components/ui/DetailElement";
import MainTitle from "@/app/_components/ui/MainTitle";
import { SeriesDetails } from "@/types/seriesDetails";
import truncateGenres from "@/lib/formatters";
import posterAlternative from "@/public/assets/poster-not-available.jpg";

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

// AJOUTER DANS LE TITLE UNE VARIABLE DYNAMIQUE QUI RECUPERE LE NOM DE LA SERIE
export const metadata: Metadata = {
    title: "TV Series Manager",
    description: "Retrouvez toutes les informations détaillées sur la série",
};

export default async function DetailPage(props: DetailProps) {
    const params = await props.params;
    const currentShow = await getCurrentShow(params.id);
    const genresList = truncateGenres(currentShow.genres, 10);
    const airDates = currentShow.firstAirYear === currentShow.lastAirYear ? currentShow.firstAirYear : `${currentShow.firstAirYear} - ${currentShow.lastAirYear}`;

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

                {/* @todo ajouter note */}
            </div>

            {currentShow.overview &&
                <div className="flex flex-col mb-2">
                    <span className="font-bold text-[#0f396d]">Synopsis&nbsp;:&nbsp;</span>
                    <p>{currentShow.overview}</p>
                </div>
            }

            <div className="flex flex-col justify-center mb-6">
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
        </section>
    )
}