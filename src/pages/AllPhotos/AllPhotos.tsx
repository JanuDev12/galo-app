import Gallery from '@/components/main-content/Gallery';
import Layout from '@/components/main-content/Layout';
import { useImageStore } from '@/store/image-store';
import HeaderInfo from '@/components/main-content/header-controls/HeaderInfo';
import ControlButtons from '@/components/main-content/header-controls/ControlButtons';
import { useSearch } from '@/hooks/useSearch';
import { useSearchContext } from '@/context/SearchContext';
import { useEffect } from 'react';
import { IconPhoto } from '@tabler/icons-react';

function AllPhotos() {
  const images = useImageStore((state) => state.filteredImages);
  const { searchTerm, setPlaceholder , tags} = useSearchContext();
  
   const filteredImages = useSearch(images, {
     searchTerm,
     searchFields: ["name", "artist"],
     tags
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
      icon={<IconPhoto size={24} stroke={2} />}
      pageHeader={controls}
      info={<HeaderInfo countPhotos={filteredImages.length} />}
    >
      {/* <SearchBar placeholder="Search in All Photos" onSearch={handleSearch} /> */}
      <Gallery images={filteredImages} />
    </Layout>
  );
}

export default AllPhotos