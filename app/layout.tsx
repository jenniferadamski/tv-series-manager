import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
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
        <html lang="fr" className="bg-[#ececec] h-full">
            <body className={`${raleway.className} h-full flex flex-col`}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
