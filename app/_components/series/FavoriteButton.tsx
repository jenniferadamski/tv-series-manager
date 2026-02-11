'use client';

import useFavorites from "@/hooks/useFavorites";
import { Series } from "@/types/series";

interface FavoriteButtonProps {
    show: Series;
}

export default function FavoriteButton({ show }: FavoriteButtonProps) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
    const isFav = isFavorite(show.id);

    function toggleFavorite() {
        const favStatus = isFav ? removeFromFavorites(show.id) : addToFavorites(show);
        return favStatus;
    }

    return (
        <button
            className={`px-4 py-2 rounded font-bold text-white hover:cursor-pointer transition-colors ${isFav ? 'bg-red-900 hover:bg-red-700' : 'bg-[#0f396d] hover:bg-blue-800'}`}
            onClick={toggleFavorite}
        >
            {isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        </button>
    )
}