'use client';

import { createContext, useSyncExternalStore } from "react";
import { Series } from "@/types/series";

const subscribe = (callback: () => void) => {
    window.addEventListener('storage', callback);
    window.addEventListener('favorites-updated', callback);

    return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener('favorites-updated', callback);
    };
};

const getSnapshot = () => {
    if (typeof window === 'undefined') {
        return '[]';
    }

    return localStorage.getItem('tv_favorites') || '[]';
};

const getServerSnapshot = () => '[]';

interface FavoritesContextType {
    favorites: Series[];
    addToFavorites: (show: Series) => void;
    removeFromFavorites: (showId: number) => void;
    isFavorite: (showId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const favoritesData = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const favorites: Series[] = JSON.parse(favoritesData);

    const notifyUpdate = () => {
        window.dispatchEvent(new Event('favorites-updated'));
    };

    const addToFavorites = (show: Series) => {
        const current = JSON.parse(localStorage.getItem('tv_favorites') || '[]');
        if (!current.some((f: Series) => f.id === show.id)) {
            const next = [...current, show];
            localStorage.setItem('tv_favorites', JSON.stringify(next));
            notifyUpdate();
        }
    };

    const removeFromFavorites = (showId: number) => {
        const current = JSON.parse(localStorage.getItem('tv_favorites') || '[]');
        const next = current.filter((f: Series) => f.id !== showId);
        localStorage.setItem('tv_favorites', JSON.stringify(next));
        notifyUpdate();
    };

    const isFavorite = (showId: number) => {
        return favorites.some((f) => f.id === showId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};