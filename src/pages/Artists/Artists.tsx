import Layout from '@/components/main-content/Layout';
import { useSearchContext } from '@/context/SearchContext';
import { useSearch } from '@/hooks/useSearch';
import { useImageStore } from '@/store/image-store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  });


   useEffect(() => {
     setPlaceholder("Search in Artists");
   }, [setPlaceholder]);


  return (
    <Layout
      title="Artists"
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
          class="icon icon-tabler icons-tabler-outline icon-tabler-user-heart"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
          <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
        </svg>
      }
    >

      <div className="grid grid-cols-4 gap-x-5 gap-y-7">
        {filteredArtist.map((artist) => (
          <div
            key={artist.name}
            className="p-4 bg-[--color-secondary] border border-[--color-gray] rounded  cursor-pointer flex  items-center gap-3"
            onClick={() => navigate(`/artists/${artist.name}`)}
          >
            <div className=" rounded-2xl overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-user"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </div>

            <div className="w-full flex items-center justify-between">
              <span className="font-semibold text-[--color-light] text-sm ">
                @{artist.name}
              </span>
              <p className="text-[--color-light-tertiary] text-xs">
                {images.filter((image) => image.artist === artist.name).length} works
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Artists