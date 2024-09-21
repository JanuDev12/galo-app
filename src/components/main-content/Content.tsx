import { Route, Routes } from 'react-router-dom';
import Collections from '../../pages/Collections/Collections';
import Artists from '../../pages/Artists/Artists';
import AllPhotos from '../../pages/AllPhotos/AllPhotos';
import CollectionName from '@/pages/Collections/CollectionName';
import ArtistDetail from '@/pages/Artists/ArtistDetail';

function Content() {
  
  return (
    <main className="content  bg-[--color-primary] overflow-scroll overflow-x-hidden">
      <div className="h-full w-full">
        <div className="flex flex-col mx-16 my-7 gap-3">
          <Routes>
            <Route path="/" element={<AllPhotos />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/artist" element={<Artists />} />

            <Route path="/collections/:id" element={<CollectionName />} />
            <Route path="/artists/:artist" element={<ArtistDetail />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default Content