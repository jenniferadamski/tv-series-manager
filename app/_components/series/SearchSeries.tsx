'use client';

import { useState, useEffect, Suspense } from "react";
import Card from "./Card";
import CardListSkeleton from "./CardListSkeleton";
import FiltersBar, { FiltersValues } from "../ui/FiltersBar";
import LoadingSpinner from "../ui/LoadingSpinner";
import SearchBar from "../ui/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import type { Series } from "@/types/series";

type SearchMode = 'name' | 'filters';

interface SearchSeriesProps {
    genres: { id: number; name: string }[];
}

export default function SearchSeries({ genres }: SearchSeriesProps) {
    const [mode, setMode] = useState<SearchMode>('name');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Series[]>([]);
    const [loading, setLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    async function handleFiltersSearch(filters: FiltersValues) {
        setLoading(true);

        const params = new URLSearchParams();

        if (filters.genres.length) {
            params.set('genres', filters.genres.join(','));
        }

        if (filters.yearFrom) {
            params.set('yearFrom', filters.yearFrom);
        }

        if (filters.yearTo) {
            params.set('yearTo', filters.yearTo);
        }

        if (filters.status) {
            params.set('status', filters.status);
        }

        const res = await fetch(`/api/tv/filters?${params.toString()}`);
        const data = await res.json();

        setResults(data);
        setLoading(false);
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            let url = '';

            if (mode === 'name' && debouncedQuery) {
                url = `/api/tv/search?query=${debouncedQuery}`;
            }

            if (!url) {
                setResults([]);
                setLoading(false);

                return;
            }

            const res = await fetch(url);
            const data = await res.json();

            setResults(data);
            setLoading(false);
        }

        fetchData();
    }, [mode, debouncedQuery]);

    return (
        <>
            <div className="flex flex-col items-start">
                {mode === 'name' ? (
                    <SearchBar value={query} onChange={setQuery} />
                ) : (
                    <FiltersBar
                        genres={genres}
                        onSearch={handleFiltersSearch}
                    />
                )}

                <button onClick={() => setMode(mode === 'name' ? 'filters' : 'name')} className="my-4 underline text-[#0f396d] dark:text-[#4b83c6] cursor-pointer">
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

        </>
    );
}