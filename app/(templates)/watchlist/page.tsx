import type { Metadata } from "next";
import WatchlistContent from "@/app/_components/series/WatchlistContent";

export const metadata: Metadata = {
    title: "Watchlist | TV Series Manager",
    description: "Gérer votre liste de séries télévisées à regarder",
};

export default function WatchlistPage() {
    return (
        <section className="flex-[1_0_auto] mx-5 md:mx-8 lg:mx-10 xl:mx-15 mb-6">
            <WatchlistContent />
        </section>
    )
}