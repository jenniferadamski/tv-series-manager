import type { Metadata } from "next";
import MainTitle from "@/app/_components/ui/MainTitle";
import SearchSeries from "@/app/_components/series/SearchSeries";
import { tmdb } from "@/lib/tmdb";

export const metadata: Metadata = {
    title: "Rechercher une série | TV Series Manager",
    description: "Rechercher de nouvelles séries à regarder",
};

export default async function Search() {
    const data = await tmdb<{ genres: { id: number; name: string }[] }>("/genre/tv/list");

    return (
        <section className="flex-[1_0_auto] mx-5 md:mx-8 lg:mx-10 xl:mx-15">
            <MainTitle title={"Rechercher une série"} />
            <SearchSeries genres={data.genres} />
        </section>
    )
}