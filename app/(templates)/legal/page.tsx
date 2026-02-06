import type { Metadata } from "next";
import MainTitle from "@/app/_components/ui/MainTitle";

export const metadata: Metadata = {
    title: "Mentions légales | TV Series Manager",
    description: "Les mentions légales du site TV Series Manager",
};

export default function Legal() {
    return (
        <section className="flex-[1_0_auto] mx-5 md:mx-8 lg:mx-10 xl:mx-15">
            <MainTitle title={"Mentions légales"} />
        </section>
    )
}