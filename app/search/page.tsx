import type { Metadata } from "next";
import MainTitle from "../_components/MainTitle";

export const metadata: Metadata = {
    title: " Rechercher une série | TV Series Manager",
    description: "Rechercher de nouvelles séries à regarder",
};

export default function Search() {
    return (
        <section className="flex-[1_0_auto]">
            <MainTitle title={"Rechercher une série"} />
        </section>
    )
}