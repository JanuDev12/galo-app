import React from 'react'
import { Input } from '../ui/input';
import { useSearchContext } from '@/context/SearchContext';

function SearchBar() {

  const { searchTerm, setSearchTerm, placeholder} = useSearchContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };
  return (
    <Input placeholder={placeholder} className="w-72 inline-flex" value={searchTerm} onChange={handleSearchChange}/>
  );
}

export default SearchBar