import Card from "./Card";
import { Series } from "@/types/series";

async function getPopularSeries() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/popular`, {
        next: { revalidate: 60 },
    });

    return res.json();
}

export default async function CardList() {
    const series = await getPopularSeries();

    return (
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
    )
}