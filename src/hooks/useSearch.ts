import { useState,  useEffect } from "react"

interface SearchOptions {
    searchTerm: string;
    searchFields: string[];
}

export function useSearch<T>(data: T[], {searchTerm, searchFields}: SearchOptions): T[] {
    const [filteredData, setFilteredData] = useState<T[]>(data);

    useEffect(() => {
        if(searchTerm.trim() === "") {
            setFilteredData(data)
        } else {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();

            const filtered = data.filter((item) => {
                return searchFields.some((field) => {
                    const fieldValue = (item as any)[field]?.toString().toLowerCase();
                    return fieldValue?.includes(lowerCaseSearchTerm)
                });
            });

            setFilteredData(filtered)
        }
    }, [data, searchTerm, searchFields])

    return filteredData
}