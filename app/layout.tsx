import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "./_components/ui/Header";
import Footer from "./_components/ui/Footer";
import AppProviders from "@/context/AppProviders";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const raleway = Raleway({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TV Series Manager",
    description: "Une application pour trouver et gérer des séries TV",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            try {
                                if (localStorage.getItem('app-theme') === 'dark' || 
                                (!('app-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                    document.documentElement.classList.add('dark');
                                } else {
                                    document.documentElement.classList.remove('dark');
                                }
                            } catch (_) {}
                        `,
                    }}
                />
            </head>
            <body className={`${raleway.className} flex flex-col bg-[#ececec] dark:bg-gray-800 min-h-screen transition-colors duration-300`}>
                <AppProviders>
                    <Header />
                    {children}
                    <Footer />
                </AppProviders>
            </body>
        </html>
    );
}
