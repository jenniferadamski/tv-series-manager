'use client';

import { createContext, useSyncExternalStore, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const subscribe = (callback: () => void) => {
    window.addEventListener('storage', callback);
    window.addEventListener('updated-theme', callback);

    return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener('updated-theme', callback);
    };
};

const getSnapshot = () => (typeof window !== 'undefined' ? localStorage.getItem('app-theme') || 'light' : 'light');

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'light') as Theme;

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';

        localStorage.setItem('app-theme', nextTheme);
        window.dispatchEvent(new Event('updated-theme'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};