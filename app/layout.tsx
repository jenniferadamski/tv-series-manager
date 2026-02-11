import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "./_components/ui/Header";
import Footer from "./_components/ui/Footer";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "./globals.css";

const raleway = Raleway({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TV Series Manager",
    description: "Une application pour trouver et gérer des séries TV",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="fr" className="bg-[#ececec] h-screen">
            <body className={`${raleway.className} h-full flex flex-col`}>
                <FavoritesProvider>
                    <Header />
                    {children}
                    <Footer />
                </FavoritesProvider>
            </body>
        </html>
    );
}
