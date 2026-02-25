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

            <div className="flex flex-col mb-5 dark:text-[#EBECF0]">
                <h2 className="text-lg text-[#0f396d] dark:text-[#4b83c6] font-bold mb-2">Identité</h2>
                <span>Développement Web & Webdesign du site : <a href="https://www.jenniferadamski.fr/" target="_blank" className="underline cursor-pointer text-[#0f396d] dark:text-[#4b83c6]">Jennifer Adamski</a>.</span>

                <a href="https://www.linkedin.com/in/jennifer-adamski/" className="mt-2 w-fit font-bold underline cursor-pointer text-[#0f396d] dark:text-[#4b83c6]">Me contacter</a>
            </div>

            <div className="flex flex-col mb-5 dark:text-[#EBECF0]">
                <h2 className="text-lg text-[#0f396d] dark:text-[#4b83c6] font-bold mb-2">Informations générales</h2>
                <p>Cette application a été mise en place à l&apos;aide de l&apos;<a href="https://developer.themoviedb.org/docs/getting-started" className="underline cursor-pointer text-[#0f396d] dark:text-[#4b83c6]">API de The Movie DataBase</a>.</p>
            </div>
        </section>
    )
}