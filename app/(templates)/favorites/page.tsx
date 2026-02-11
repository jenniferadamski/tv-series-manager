'use client';

// import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import MainTitle from "@/app/_components/ui/MainTitle";
import Card from "@/app/_components/series/Card";
import DetailElement from "@/app/_components/ui/DetailElement";
import CardListSkeleton from "@/app/_components/series/CardListSkeleton";
import useFavorites from "@/hooks/useFavorites";
import type { Series } from "@/types/series";

// export const metadata: Metadata = {
//     title: "Favoris | TV Series Manager",
//     description: "Gérer votre liste de séries télévisées préférées",
// };

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    if (favorites.length === 0) {
        return (
            <section className="flex-[1_0_auto] mx-5 md:mx-8 lg:mx-10 xl:mx-15 mb-6">
                <MainTitle title="Séries favorites" />

                <div className="flex flex-col items-center justify-center">
                    <p className="mb-4">Vous n&apos;avez pas encore ajouté de séries à vos favoris.</p>
                    <Link href="/search" className="text-[#0f396d] underline">Rechercher des séries</Link>
                </div>
            </section>
        );
    }

    return (
        <section className="flex-[1_0_auto] mx-5 md:mx-8 lg:mx-10 xl:mx-15 mb-6">
            <MainTitle title="Séries favorites" />

            <Suspense fallback={<CardListSkeleton />}>
                <ul className={`flex flex-row flex-wrap ${favorites.length > 3 ? 'justify-between' : 'justify-evenly'}`}>
                    {favorites.map((serie: Series) => (
                        <Card
                            id={serie.id}
                            key={serie.id}
                            title={serie.title}
                            poster={serie.poster}
                            year={serie.year}
                            genres={serie.genres}
                            rating={serie.rating}
                        />
                    ))}
                </ul>
            </Suspense>

            <DetailElement elementTitle="Nombre total de séries favorites" element={favorites.length} />
        </section>
    )
}