'use client';

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
    page: number;
    totalPages: number;
};

export default function Pagination({ page, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    }

    const displayedPages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
        displayedPages.push(i);
    }

    return (
        <div className="flex items-center gap-4 justify-center flex-wrap mt-4 mb-8">
            <button
                aria-label="Page précédente"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded shadow-xl/20 text-white dark:text-[#EBECF0] bg-[#0f396d] dark:bg-[#4b83c6] hover:bg-blue-800 dark:hover:bg-[#0f396d] disabled:opacity-10 cursor-pointer disabled:cursor-auto"
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            {displayedPages.map((currentPage) => (
                <button
                    aria-label={`Page ${currentPage}`}
                    key={currentPage}
                    onClick={() => handlePageChange(currentPage)}
                    className={`px-3 py-2 rounded shadow-xl/20 transition bg-white dark:bg-[#4c5360] dark:text-[#EBECF0] cursor-pointer ${currentPage === page
                        ? "border border-[#0f396d] dark:border-[#4b83c6] text-[#0f396d] dark:text-[#4b83c6] font-bold"
                        : "hover:text-[#0f396d] hover:dark:text-[#4b83c6] hover:font-bold"}`}
                >
                    {currentPage}
                </button>
            ))}

            <button
                aria-label="Page suivante"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded shadow-xl/20 cursor-pointer text-white dark:text-[#EBECF0] bg-[#0f396d] dark:bg-[#4b83c6] hover:bg-blue-800 dark:hover:bg-[#0f396d] disabled:opacity-10 disabled:cursor-auto"
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        </div>
    )
}