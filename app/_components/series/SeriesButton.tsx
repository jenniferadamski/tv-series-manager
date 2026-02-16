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
        <div>
            <button
                className={`px-4 py-2 rounded font-bold text-white hover:cursor-pointer transition-colors ${isFav ? 'bg-red-900 hover:bg-red-700' : 'bg-[#0f396d] hover:bg-blue-800'}`}
                onClick={() => toggleStatus('fav')}
            >
                {isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>

            <button
                className={`px-4 py-2 rounded font-bold text-white hover:cursor-pointer transition-colors ${isOnWatchlist ? 'bg-red-900 hover:bg-red-700' : 'bg-[#0f396d] hover:bg-blue-800'}`}
                onClick={() => toggleStatus('watchlist')}
            >
                {isOnWatchlist ? 'Retirer de la Watchlist' : 'Ajouter à la Watchlist'}
            </button>

        </div>
    )
}