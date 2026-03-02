import MainTitle from "./_components/ui/MainTitle";
import CardList from "./_components/series/CardList";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

async function getPopularSeries(page: number) {
    const res = await fetch(`${baseUrl}/api/popular?page=${page}`,
        { cache: 'no-store' }
    );

    return res.json();
}

export default async function Home(props: { searchParams: Promise<{ page?: string }>; }) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page ?? '1');
    const data = await getPopularSeries(page);

    return (
        <section className="flex-[1_0_auto] mx-5 md:mx-8 lg:mx-10 xl:mx-15">
            <MainTitle title={"Séries populaires"} />
            <CardList series={data.results} page={data.page} totalPages={data.totalPages} />
        </section>
    );
}