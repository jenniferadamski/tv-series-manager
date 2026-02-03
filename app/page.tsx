import MainTitle from "./_components/ui/MainTitle";
import CardList from "./_components/series/CardList";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function getPopularSeries() {
    const res = await fetch(`${baseUrl}/api/popular`, {
        next: { revalidate: 60 },
    });

    return res.json();
}

export default async function Home() {
    const series = await getPopularSeries();

    return (
        <section className="flex-[1_0_auto] mx-5">
            <MainTitle title={"Séries populaires"} />

            <CardList series={series} />
        </section>
    );
}
