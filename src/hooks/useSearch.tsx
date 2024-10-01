import { useState,  useEffect } from "react"

interface SearchOptions {
    searchTerm: string;
    searchFields: string[];
    tags?: string[]
    ignoreTags?: boolean;
}

export function useSearch<T>(data: T[], options: SearchOptions): T[] {
    const { searchTerm, searchFields, tags = [], ignoreTags = false } = options;
    const [filteredData, setFilteredData] = useState<T[]>(data);

    useEffect(() => {
        /* if(searchTerm.trim() === "") {
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
        } */

          let result = data;

          if (searchTerm.trim() !== "") {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            result = result.filter((item) =>
              searchFields.some((field) => {
                const fieldValue = (item as any)[field]
                  ?.toString()
                  .toLowerCase();
                return fieldValue?.includes(lowerCaseSearchTerm);
              })
            );
          }

          if (!ignoreTags && tags.length > 0) {
            result = result.filter((item) =>
              tags.every((tag) => (item as any).tags.includes(tag))
            );
          }

          setFilteredData(result);
    }, [data, searchTerm, searchFields, tags, ignoreTags])

    return filteredData
}