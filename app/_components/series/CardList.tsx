import Card from "./Card";
import { Series } from "@/types/series";

interface CardListProps {
    series: Series[];
}

export default function CardList({ series }: CardListProps) {
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