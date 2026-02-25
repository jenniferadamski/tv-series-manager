'use client';

import { Suspense } from "react";
import Link from "next/link";
import MainTitle from "@/app/_components/ui/MainTitle";
import Card from "@/app/_components/series/Card";
import ListNav from "@/app/_components/ui/ListNav";
import CardListSkeleton from "@/app/_components/series/CardListSkeleton";
import useLists from "@/hooks/useLists";
import type { Series } from "@/types/series";

export default function FavoriteContent() {
    const { favorites } = useLists();
    const favoritesItems = favorites.series;

    if (favoritesItems.length === 0) {
        return (
            <>
                <ListNav />
                <MainTitle title="Séries favorites" />

                <div className="flex flex-col items-center justify-center">
                    <p className="mb-4 dark:text-[#EBECF0]">Vous n&apos;avez pas encore ajouté de séries à vos favoris.</p>
                    <Link href="/search" className="text-[#0f396d] dark:text-[#4b83c6] underline">Rechercher des séries</Link>
                </div>
            </>
        );
    }

    return (
        <>
            <ListNav />
            <MainTitle title="Séries favorites" />

            <Suspense fallback={<CardListSkeleton />}>
                <ul className={`flex flex-row flex-wrap ${favoritesItems.length > 3 ? 'justify-between' : 'justify-evenly'}`}>
                    {favoritesItems.map((serie: Series) => (
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
        </>
    )
}