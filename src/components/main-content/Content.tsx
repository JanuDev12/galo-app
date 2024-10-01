import { Route, Routes } from 'react-router-dom';
import Collections from '../../pages/Collections/Collections';
import Artists from '../../pages/Artists/Artists';
import AllPhotos from '../../pages/AllPhotos/AllPhotos';
import CollectionName from '@/pages/Collections/CollectionName';
import ArtistDetail from '@/pages/Artists/ArtistDetail';
import { useImageStore } from '@/store/image-store';
import { useEffect} from 'react';
import { useCollectionStore } from '@/store/collections-store';

function Content() {
  // Fetching images & collections
  const fetchImages = useImageStore((state) => state.fetchImages);
  const getCollections = useCollectionStore((state) => state.getCollections);

  // Fetch collections & images on mount
  useEffect(() => {
    fetchImages().catch(console.error);
  }, []);

  useEffect(() => {
     getCollections().catch(console.error);
  }, [])

  return (
    <main className="content ml-48 mt-16">
        
          <div className="flex flex-col mx-16 my-7 gap-3">
            <Routes>
              <Route path="/" element={<AllPhotos />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/artist" element={<Artists />} />

              <Route path="/collections/:id" element={<CollectionName />} />
              <Route path="/artists/:artist" element={<ArtistDetail />} />
            </Routes>
          </div>
        
    </main>
  );
}

export default Content