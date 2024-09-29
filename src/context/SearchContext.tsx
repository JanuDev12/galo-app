import React, { createContext, useContext, useState } from 'react'


interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
  setPlaceholder: (placeholder: string) => void;
  tags: string[]; // support for tags
  setTags: (tags: string[]) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [tags, setTags] = useState<string[]>([])

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, placeholder, setPlaceholder, tags, setTags }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error(
          "useSearchContext must be used within a SearchProvider"
        );
    }

    return context;
}
