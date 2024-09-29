import React from 'react'
import { Input } from '../ui/input';
import { useSearchContext } from '@/context/SearchContext';

function SearchBar() {

  const { searchTerm, setSearchTerm, placeholder, tags, setTags} = useSearchContext();

  const handleTagRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };
  return (
    <>
      <Input
        placeholder={placeholder}
        className="w-72 inline-flex"
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