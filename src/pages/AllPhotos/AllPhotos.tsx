import Gallery from '@/components/main-content/Gallery';
import Layout from '@/components/main-content/Layout';
import { useImageStore } from '@/store/image-store';
import HeaderInfo from '@/components/main-content/header-controls/HeaderInfo';
import ControlButtons from '@/components/main-content/header-controls/ControlButtons';
import { useSearch } from '@/hooks/useSearch';
import { useSearchContext } from '@/context/SearchContext';
import { useEffect } from 'react';

function AllPhotos() {
  const images = useImageStore((state) => state.images);
  const { searchTerm, setPlaceholder } = useSearchContext();
  
   const filteredImages = useSearch(images, {
     searchTerm,
     searchFields: ["name", "artist", "tags"],
   });

  /*  const handleSearch = (term: string) => {
     setSearchTerm(term);
   }; */

  
  const controls = (
    <ControlButtons images={filteredImages} />
  );

   useEffect(() => {
     setPlaceholder("Search in All Photos");
   }, [setPlaceholder]);

  return (
    <Layout
      title="All Photos"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-photo"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8h.01" />
          <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
          <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
          <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
        </svg>
      }
      pageHeader={controls}
      info={<HeaderInfo countPhotos={filteredImages.length} />}
    >
      
      {/* <SearchBar placeholder="Search in All Photos" onSearch={handleSearch} /> */}
      <Gallery images={filteredImages} />
    </Layout>
  );
}

export default AllPhotos