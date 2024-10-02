import React, { useState } from 'react'
import { Input } from '../ui/input';
import { useSearchContext } from '@/context/SearchContext';
import { Button } from '../ui/button';
import { IconSearch } from '@tabler/icons-react';

function SearchBar() {
  const { searchTerm, setSearchTerm, placeholder, tags, setTags} = useSearchContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTagRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };
  return (
    <>
      <Button
        variant="outline"
        className="lg:hidden px-1 h-7 w-7 fixed top-4 left-30 z-30"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <IconSearch size={24} stroke={2} />
      </Button>
      <Input
        placeholder={placeholder}
        className={`w-40 md:w-72 transition-transform fixed lg:static lg:block ${
          isSidebarOpen
            ? "top-20 right-16 "
            : "-top-20 lg:top-0 "
        }`}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="tags-container">
        {tags.map((tag) => (
          <span key={tag}>
            {tag}
            <button
              onClick={() => handleTagRemove(tag)}
              className="remove-tag-button"
            >
              x
            </button>
          </span>
        ))}
      </div>
    </>
  );
}

export default SearchBar