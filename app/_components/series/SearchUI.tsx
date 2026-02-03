'use client';

import { useState, useEffect } from "react";
import CardList from "./CardList";
import Searchbar from "../ui/Searchbar";
import useDebounce from "@/lib/useDebounce";
import type { Genre } from "@/types/genre";
import type { Series } from "@/types/series";

interface SearchUIProps {
    genres: Genre[];
}

export default function SearchUI({ genres }: SearchUIProps) {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query);
    const [results, setResults] = useState<Series[]>([]);

    // useEffect(() => {
    //     if (debouncedQuery) {
    //         fetch(`/api/tv/search?query=${encodeURIComponent(debouncedQuery)}`)
    //     }
    // }, [debouncedQuery])

    async function handleSearch() {
        const res = await fetch(`/api/tv/search?query=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();

        setResults(data);
    }

    return (
        <>
            <Searchbar
                placeholder="Entrez le nom d'une série"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    handleSearch();
                }}
            // onChange={(e) => {
            //     if (e.target.value === '') {
            //         setResults([]);
            //     } else {
            //         setQuery(e.target.value);
            //     }
            // }}
            />

            {/* <Filters /> */}

            <CardList series={results} />
        </>
    )
}



// import { useEffect, useState } from "react";
// import CardList from "@/app/_components/series/CardList";
// import Filters from "@/app/_components/series/Filters";
// import MainTitle from "../../_components/ui/MainTitle";
// import Searchbar from "@/app/_components/ui/Searchbar";
// import useDebounce from "@/lib/useDebounce";
// import type { Series } from "@/types/series";

// export default function SearchPage() {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState<Series[]>([]);
//     const debouncedQuery = useDebounce(query);

//     useEffect(() => {
//         if (!debouncedQuery) {
//             return;
//         }

//         async function handleSearch() {
//             const res = await fetch(`/api/tv/search?query=${encodeURIComponent(debouncedQuery)}`);
//             const data: Series[] = await res.json();
//             setResults(data);
//         }

//         handleSearch();
//     }, [debouncedQuery]);

//     return (
//         <section className="flex-[1_0_auto] mx-5">
//             <MainTitle title={"Rechercher une série"} />

//             <Searchbar
//                 placeholder="Rechercher une série..."
//                 value={query}
//                 onChange={(e) => {
//                     setQuery(e.target.value);

//                     if (e.target.value === "") {
//                         setResults([]);
//                     }
//                 }}
//             />

//             {/* <Filters /> */}

//             {results.map((series) => (
//                 <CardList series={results} key={series.id} />
//             ))}
//         </section>
//     )
// }