import type { Series } from "@/types/series";

export const createLocalStorageStore = (key: string) => {
    const eventName = `updated-${key}-store`;

    return {
        subscribe: (callback: () => void) => {
            window.addEventListener('storage', (e) => {
                if(e.key === key){
                    return callback;
                }
            } );

            window.addEventListener(eventName, callback);

            return () => {
                window.removeEventListener('storage', callback);
                window.removeEventListener(eventName, callback);
            };
        },
        getSnapshot: () => {
            if(typeof window === 'undefined'){
                return '[]';
            }

            return localStorage.getItem(key) || '[]';
        },
        getServerSnapshot: () => '[]',
        dispatch: (newList: Series[]) => {
            localStorage.setItem(key, JSON.stringify(newList));
            window.dispatchEvent(new Event(eventName));
        }
    }
}