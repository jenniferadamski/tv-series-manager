import MainTitle from "./_components/ui/MainTitle";
import CardList from "./_components/series/CardList";

export default function Home() {
    return (
        <section className="flex-[1_0_auto] mx-5 md:mx-8 lg:mx-10 xl:mx-15">
            <MainTitle title={"Séries populaires"} />
            <CardList />
        </section>
    );
}
