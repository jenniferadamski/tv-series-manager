import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MainTitle from "@/app/_components/ui/MainTitle";
import { SeriesDetails } from "@/types/seriesDetails";

async function getCurrentShow(id: string): Promise<SeriesDetails> {
    const res = await fetch(`/api/tv/${id}`, {
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
    params: {
        id: string;
    };
}

// AJOUTER DANS LE TITLE UNE VARIABLE DYNAMIQUE QUI RECUPERE LE NOM DE LA SERIE SI POSSIBLE
export const metadata: Metadata = {
    title: "TV Series Manager",
    description: "Retrouvez toutes les informations détaillées sur la série",
};

export default async function Detail({ params }: DetailProps) {
    const currentShow = await getCurrentShow(params.id);

    return (
        <section className="flex-[1_0_auto] mx-5">
            <MainTitle title={currentShow.title} />
        </section>
    )
}