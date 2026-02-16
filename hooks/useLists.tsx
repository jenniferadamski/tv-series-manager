'use client';

import { useContext } from "react";
import { ListsContext } from "@/context/ListsContext";

export default function useLists() {
    const context = useContext(ListsContext);

    if (!context) {
        throw new Error("useLists must be used within the ListsProvider");
    }

    return context;
}