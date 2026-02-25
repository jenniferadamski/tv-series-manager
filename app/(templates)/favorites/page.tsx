import type { Metadata } from "next";
import FavoriteContent from "@/app/_components/series/FavoriteContent";

export const metadata: Metadata = {
    title: "Favoris | TV Series Manager",
    description: "Gérer votre liste de séries télévisées préférées",
};

export default function FavoritesPage() {
    return (
        <section className="flex-[1_0_auto] mx-5 md:mx-8 lg:mx-10 xl:mx-15 mb-6">
            <FavoriteContent />
        </section>
    )
}