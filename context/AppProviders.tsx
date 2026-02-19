'use client';

import { ListsProvider } from "./ListsContext";
import { ThemeProvider } from "./ThemeContext";

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <ListsProvider>
                {children}
            </ListsProvider>
        </ThemeProvider>
    )
}