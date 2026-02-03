import type { Metadata } from "next";
import MainTitle from "@/app/_components/ui/MainTitle";
import SearchUI from "@/app/_components/series/SearchUI";
import getGenres from "@/lib/getters";

export const metadata: Metadata = {
    title: "Rechercher une série | TV Series Manager",
    description: "Rechercher de nouvelles séries à regarder",
};

export default async function SearchPage() {
    const genres = await getGenres();

    return (
        <section className="flex-[1_0_auto] mx-5">
            <MainTitle title="Rechercher une série" />
            <SearchUI genres={genres} />
        </section>
    )
}