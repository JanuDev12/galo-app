import Layout from '@/components/main-content/Layout';
import { useSearchContext } from '@/context/SearchContext';
import { useSearch } from '@/hooks/useSearch';
import { useImageStore } from '@/store/image-store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconUser, IconUserHeart } from '@tabler/icons-react';

function Artists() {

  const { images } = useImageStore((state) => state);
  const { searchTerm, setPlaceholder } = useSearchContext();

  const navigate = useNavigate();
/* 
  const uniqueArtists = [...new Set(images.map((image) => image.artist))];
 */
  const uniqueArtists = [...new Set(images.map((image) => image.artist))].map(
    (name) => ({ name })
  );


  const filteredArtist = useSearch(uniqueArtists, {
    searchTerm,
    searchFields: ["name"],
    ignoreTags: true
  });


   useEffect(() => {
     setPlaceholder("Search in Artists");
   }, [setPlaceholder]);


  return (
    <Layout title="Artists" icon={<IconUserHeart size={24} stroke={2} />}>
      <div className="grid grid-cols-4 gap-x-5 gap-y-7">
        {filteredArtist.map((artist) => (
          <div
            key={artist.name}
            className="p-4 bg-[--color-secondary] border border-[--color-gray] rounded  cursor-pointer flex  items-center gap-3"
            onClick={() => navigate(`/artists/${artist.name}`)}
          >
            <div className=" rounded-2xl overflow-hidden">
              <IconUser size={30} stroke={1.75}/>
  
            </div>

            <div className="w-full flex items-center justify-between">
              <span className="font-semibold text-[--color-light] text-sm ">
                @{artist.name}
              </span>
              <p className="text-[--color-light-tertiary] text-xs">
                {images.filter((image) => image.artist === artist.name).length}{" "}
                works
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Artists