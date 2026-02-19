'use client';

import useLists from "@/hooks/useLists";
import type { Series } from "@/types/series";

export default function SeriesButton({ show }: { show: Series }) {
    const { favorites } = useLists();
    const isFav = favorites.isListed(show.id);

    const { watchlist } = useLists();
    const isOnWatchlist = watchlist.isListed(show.id);

    function toggleStatus(list: string) {
        if (list === 'fav') {
            const favStatus = isFav ? favorites.removeItem(show.id) : favorites.addItem(show);
            return favStatus;
        } else if (list === 'watchlist') {
            const watchlistStatus = isOnWatchlist ? watchlist.removeItem(show.id) : watchlist.addItem(show);
            return watchlistStatus;
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:w-2/3 w-1/2 justify-evenly items-center m-auto mb-8">
            <button
                className={`px-4 py-2 rounded font-bold text-white dark:text-[#EBECF0] hover:cursor-pointer transition-colors mb-6 md:mb-0 ${isFav ? 'bg-red-900 hover:bg-red-700' : 'bg-[#0f396d] dark:bg-[#4b83c6] hover:bg-blue-800 dark:hover:bg-[#0f396d]'}`}
                onClick={() => toggleStatus('fav')}
            >
                {isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>

            <button
                className={`px-4 py-2 rounded font-bold text-white dark:text-[#EBECF0] hover:cursor-pointer transition-colors ${isOnWatchlist ? 'bg-red-900 hover:bg-red-700' : 'bg-[#0f396d] dark:bg-[#4b83c6] hover:bg-blue-800 dark:hover:bg-[#0f396d]'}`}
                onClick={() => toggleStatus('watchlist')}
            >
                {isOnWatchlist ? 'Retirer de la Watchlist' : 'Ajouter à la Watchlist'}
            </button>
        </div>
    )
}