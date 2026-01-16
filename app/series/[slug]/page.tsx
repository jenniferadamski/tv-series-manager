import type { Metadata } from "next";
import MainTitle from "@/app/_components/ui/MainTitle";

// AJOUTER DANS LE TITLE UNE VARIABLE DYNAMIQUE QUI RECUPERE LE NOM DE LA SERIE SI POSSIBLE
export const metadata: Metadata = {
    title: "TV Series Manager",
    description: "Retrouvez toutes les informations détaillées sur la série",
};

export default function Detail() {
    return (
        <section className="flex-[1_0_auto] mx-5">
            <MainTitle title={"Série"} />
        </section>
    )
}