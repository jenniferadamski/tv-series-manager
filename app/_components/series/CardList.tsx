import { Suspense } from "react";
import Card from "./Card";
import CardListSkeleton from "./CardListSkeleton";
import Pagination from "../ui/Pagination";
import type { Series } from "@/types/series";

interface CardListProps {
    series: Series[];
    page: number;
    totalPages: number;
}

export default function CardList({ series, page, totalPages }: CardListProps) {
    return (
        <>
            <Suspense fallback={<CardListSkeleton />}>
                <ul className="flex flex-row justify-between flex-wrap">
                    {series.map((serie: Series) => (
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

            <Pagination page={page} totalPages={totalPages} />
        </>
    )
}