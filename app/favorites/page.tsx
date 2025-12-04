import type { Metadata } from "next";
import MainTitle from "../_components/MainTitle";

export const metadata: Metadata = {
    title: "Favoris | TV Series Manager",
    description: "Gérer votre liste de séries télévisées préférées",
};

export default function Favorites() {
    return (
        <section className="flex-[1_0_auto]">
            <MainTitle title="Séries favorites" />
        </section>
    )
}