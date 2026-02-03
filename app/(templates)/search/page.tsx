import type { Metadata } from "next";
import MainTitle from "@/app/_components/ui/MainTitle";

export const metadata: Metadata = {
    title: " Rechercher une série | TV Series Manager",
    description: "Rechercher de nouvelles séries à regarder",
};

export default function Search() {
    return (
        <section className="flex-[1_0_auto] mx-5">
            <MainTitle title={"Rechercher une série"} />
        </section>
    )
}