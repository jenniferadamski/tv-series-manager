import type { Metadata } from "next";
import MainTitle from "../_components/MainTitle";

export const metadata: Metadata = {
    title: "Mentions légales | TV Series Manager",
    description: "Les mentions légales du site TV Series Manager",
};

export default function Legal() {
    return (
        <section className="flex-[1_0_auto]">
            <MainTitle title={"Mentions légales"} />
        </section>
    )
}