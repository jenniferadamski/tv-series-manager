'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ListNav() {
    const pathname = usePathname();

    const ListNavLinks = [
        { title: 'Mes favoris', href: '/favorites' },
        { title: 'Ma Watchlist', href: '/watchlist' }
    ];

    return (
        <nav className="flex mb-8">
            {ListNavLinks.map((link) => {
                const isCurrentPage = pathname === link.href;

                return (
                    <Link href={link.href} key={link.href}
                        className={`w-1/2 h-12 flex justify-center items-center border-b dark:text-[#EBECF0] ${link.href === '/favorites' ? 'border-r' : ''} ${isCurrentPage ? 'font-bold' : 'font-normal'}`}>
                        {link.title}
                    </Link>
                )
            })}
        </nav>
    )
}