'use client';

import { createContext, useSyncExternalStore, useMemo } from "react";
import { createLocalStorageStore } from "@/lib/storeFactory";
import type { Series } from "@/types/series";

interface ListActions {
    series: Series[];
    addItem: (show: Series) => void;
    removeItem: (id: number) => void;
    isListed: (id: number) => boolean;
};

interface ListsContextType {
    favorites: ListActions;
    watchlist: ListActions;
};

export const ListsContext = createContext<ListsContextType | undefined>(undefined);

const favoritesStore = createLocalStorageStore('favorites_list');
const watchlistStore = createLocalStorageStore('watchlist');

export const ListsProvider = ({ children }: { children: React.ReactNode }) => {
    const favData = useSyncExternalStore(favoritesStore.subscribe, favoritesStore.getSnapshot, favoritesStore.getServerSnapshot);
    const watchlistData = useSyncExternalStore(watchlistStore.subscribe, watchlistStore.getSnapshot, watchlistStore.getServerSnapshot);

    const favoritesList: Series[] = useMemo(() => JSON.parse(favData), [favData]);
    const watchlist_fullList: Series[] = useMemo(() => JSON.parse(watchlistData), [watchlistData]);

    const createActions = (currentList: Series[], store: ReturnType<typeof createLocalStorageStore>): ListActions => (
        {
            series: currentList,
            addItem: (show) => {
                if (!currentList.some(s => s.id === show.id)) {
                    store.dispatch([...currentList, show]);
                }
            },
            removeItem: (id) => {
                store.dispatch(currentList.filter(s => s.id !== id));
            },
            isListed: (id) => {
                return currentList.some(s => s.id === id);
            }
        }
    );

    const value = {
        favorites: createActions(favoritesList, favoritesStore),
        watchlist: createActions(watchlist_fullList, watchlistStore),
    };

    return (
        <ListsContext.Provider value={value}>
            {children}
        </ListsContext.Provider>
    )
}