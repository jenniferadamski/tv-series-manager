'use client';

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Card from "./Card";
import CardListSkeleton from "./CardListSkeleton";
import FiltersBar, { FiltersValues } from "../ui/FiltersBar";
import LoadingSpinner from "../ui/LoadingSpinner";
import Pagination from "../ui/Pagination";
import SearchBar from "../ui/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import type { Series } from "@/types/series";

type SearchMode = 'name' | 'filters';

interface SearchSeriesProps {
    genres: { id: number; name: string }[];
}

export default function SearchSeries({ genres }: SearchSeriesProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get('query') || '';
    const page = Number(searchParams.get('page')) || 1;

    const [mode, setMode] = useState<SearchMode>('name');
    const [results, setResults] = useState<Series[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const debouncedQuery = useDebounce(query, 500);

    const toggleMode = () => {
        const newMode = mode === 'name' ? 'filters' : 'name';
        setMode(newMode);
        setResults([]);
        router.push(pathname);
    };

    const updateSearch = (newQuery: string) => {
        const params = new URLSearchParams();

        if (newQuery) params.set('query', newQuery);

        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`);
    };

    async function handleFiltersSearch(filters: FiltersValues) {
        const params = new URLSearchParams();

        if (filters.genres.length) params.set('genres', filters.genres.join(','));
        if (filters.yearFrom) params.set('yearFrom', filters.yearFrom);
        if (filters.yearTo) params.set('yearTo', filters.yearTo);
        if (filters.status) params.set('status', filters.status);

        router.push(`${pathname}?${params.toString()}`);
    }

    useEffect(() => {
        async function fetchData() {
            const hasParams = searchParams.toString().length > 0;

            if ((mode === 'name' && !debouncedQuery) || (mode === 'filters' && !hasParams)) {
                setResults([]);
                setTotalPages(1);
                return;
            }

            setLoading(true);
            let url = '';

            if (mode === 'name' && debouncedQuery) {
                url = `/api/tv/search?query=${debouncedQuery}&page=${page}`;
            } else if (mode === 'filters') {
                url = `/api/tv/filters?${searchParams.toString()}`;
            }

            try {
                const res = await fetch(url);
                const data = await res.json();

                setResults(data.results || []);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                console.error("Erreur fetch:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [searchParams, mode, page, debouncedQuery]);

    return (
        <>
            <div className="flex flex-col items-start">
                {mode === 'name' ? (
                    <SearchBar value={query} onChange={updateSearch} />
                ) : (
                    <FiltersBar
                        genres={genres}
                        onSearch={handleFiltersSearch}
                    />
                )}

                <button onClick={toggleMode} className="my-4 underline text-[#0f396d] dark:text-[#4b83c6] cursor-pointer">
                    {mode === 'name' ? 'Effectuer une recherche par filtres' : 'Effectuer une recherche par nom'}
                </button>
            </div>

            {loading && <LoadingSpinner />}

            <Suspense fallback={<CardListSkeleton />}>
                <ul className="flex flex-row justify-between flex-wrap my-4">
                    {results.map((serie: Series) => (
                        <Card
                            id={serie.id}
                            key={serie.id}
                            title={serie.title}
                            poster={serie.poster}
                            year={serie.year}
                            genres={serie.genres}
                            rating={serie.rating}
                        />
                    ))}
                </ul>
            </Suspense>

            {results.length > 0 && (<Pagination page={page} totalPages={totalPages} />)}
        </>
    );
}