'use client';

import { useState } from "react";
import type { TmdbGenre } from "@/types/tmdb";

interface FiltersBarProps {
    genres: TmdbGenre[];
    onSearch: (filters: FiltersValues) => void;
}

export interface FiltersValues {
    genres: number[];
    yearFrom?: string;
    yearTo?: string;
    status?: 'ongoing' | 'ended';
}

export default function FiltersBar({ genres, onSearch }: FiltersBarProps) {
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [yearFrom, setYearFrom] = useState('');
    const [yearTo, setYearTo] = useState('');
    const [status, setStatus] = useState<'ongoing' | 'ended' | ''>('');
    const [error, setError] = useState<string | null>(null);
    const MIN_YEAR = 1940;
    const CURRENT_YEAR = new Date().getFullYear();

    function validateYears() {
        if (!yearFrom && !yearTo) {
            return true;
        }

        const yearRegex = /^\d{4}$/;

        if (yearFrom && !yearRegex.test(yearFrom)) {
            setError("L'année minimale doit être au format YYYY (ex: 1997).");
            return false;
        }

        if (yearTo && !yearRegex.test(yearTo)) {
            setError("L'année maximale doit être au format YYYY (ex: 2005).");
            return false;
        }

        const from = Number(yearFrom);
        const to = Number(yearTo);

        if (yearFrom && (from < MIN_YEAR || from > CURRENT_YEAR)) {
            setError(`L'année minimale doit être entre ${MIN_YEAR} et ${CURRENT_YEAR}.`);
            return false;
        }

        if (yearTo && (to < MIN_YEAR || to > CURRENT_YEAR)) {
            setError(`L'année maximale doit être entre ${MIN_YEAR} et ${CURRENT_YEAR}.`);
            return false;
        }

        if (yearFrom && yearTo && from > to) {
            setError("L'année minimale ne peut pas être supérieure à l'année maximale.");
            return false;
        }

        setError(null);

        return true;
    }

    function handleSubmit() {
        if (!validateYears()) {
            return;
        }

        onSearch({
            genres: selectedGenres,
            yearFrom,
            yearTo,
            status: status || undefined,
        });
    }

    function toggleGenre(id: number) {
        setSelectedGenres(prev =>
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        );
    }

    return (
        <div className="flex flex-col rounded-2xl border-2 border-transparent bg-white dark:bg-gray-700 shadow-lg dark:text-[#EBECF0] p-2 md:p-3 lg:px-4 lg:pb-2">
            <div>
                <span className="text-[#0f396d] dark:text-[#4b83c6] font-bold">Genres</span>

                <div className="mt-3 flex flex-wrap">
                    {genres.map(genre => (
                        <label key={genre.id} className="mr-3 mb-2">
                            <input
                                type="checkbox"
                                checked={selectedGenres.includes(genre.id)}
                                onChange={() => toggleGenre(genre.id)}
                                className="mr-1 cursor-pointer"
                            />
                            {genre.name}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <span className="text-[#0f396d] dark:text-[#4b83c6] font-bold">Années de diffusion</span>

                <div className="mb-2 flex justify-between md:justify-start">
                    <input
                        placeholder="Min (ex: 1950)"
                        value={yearFrom}
                        onChange={e => setYearFrom(e.target.value)}
                        className="w-[48%] md:w-1/3 lg:w-1/6 p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-gray-700 shadow focus:border-[#0f396d] dark:focus:border-[#4b83c6] focus:outline-none transition-all dark:text-[#EBECF0] mt-2 md:mr-4 dark:border dark:border-[#EBECF0]"
                    />
                    <input
                        placeholder="Max (ex: 2026)"
                        value={yearTo}
                        onChange={e => setYearTo(e.target.value)}
                        className="w-[48%] md:w-1/3 lg:w-1/6 p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-gray-700 shadow focus:border-[#0f396d] dark:focus:border-[#4b83c6] focus:outline-none transition-all dark:text-[#EBECF0] dark:border dark:border-[#EBECF0]"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>
                )}
            </div>

            <div className="flex flex-col">
                <span className="text-[#0f396d] dark:text-[#4b83c6] font-bold mb-2">Statut</span>

                <select
                    value={status}
                    onChange={e =>
                        setStatus(e.target.value as 'ongoing' | 'ended' | '')
                    }
                    className="md:w-1/3 lg:w-1/6 p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-gray-700 focus:border-[#0f396d] dark:focus:border-[#4b83c6] focus:outline-none shadow dark:text-[#EBECF0] cursor-pointer"
                >
                    <option value=''>Statut</option>
                    <option value='ongoing'>En cours</option>
                    <option value='ended'>Terminée</option>
                </select>
            </div>

            <button onClick={handleSubmit} className="w-3/4 md:w-1/3 lg:w-1/6 mx-auto lg:mx-0 my-4 px-4 py-2 rounded text-white dark:text-[#EBECF0] cursor-pointer transition-colors bg-[#0f396d] dark:bg-[#4b83c6] hover:bg-blue-800 dark:hover:bg-[#0f396d]">
                Rechercher
            </button>
        </div>
    );
}