import { Route, Routes } from 'react-router-dom';
import Collections from '../../pages/Collections';
import Artists from '../../pages/Artists';
import AllPhotos from '../../pages/AllPhotos';
import CollectionName from '@/pages/CollectionName';

function Content() {
  
  return (
    <main className="content  bg-[--color-primary] overflow-scroll overflow-x-hidden">
      <div className="h-full w-full">
        <div className="flex flex-col mx-16 my-7 gap-3">
          <Routes>
            <Route path="/" element={<AllPhotos />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/artist" element={<Artists />} />

            <Route path="/collections/:id" element={<CollectionName/>} />
          </Routes>
          
        </div>
      </div>
    </main>
  );
}

export default Content