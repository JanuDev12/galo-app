import Gallery from '@/components/main-content/Gallery';
import ControlButtons from '@/components/main-content/header-controls/ControlButtons';
import HeaderInfo from '@/components/main-content/header-controls/HeaderInfo';
import Layout from '@/components/main-content/Layout'
import { Input } from '@/components/ui/input';
import { useSearchContext } from '@/context/SearchContext';
import { useSearch } from '@/hooks/useSearch';
import { useImageStore } from '@/store/image-store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

function ArtistDetail() {

  const { artist } = useParams<{ artist: string}>()
  const images = useImageStore((state) => state.images);
 
  const { searchTerm, setPlaceholder } = useSearchContext();


  // filter images for artist selected
  const artistImages = images.filter(image => image.artist === artist)

   const filteredImages = useSearch(artistImages, {
     searchTerm,
     searchFields: ["name", "artist", "tags"],
   });

  const controls = <ControlButtons images={filteredImages} />;

    useEffect(() => {
      setPlaceholder(`Search in @${artist}`);
    }, [setPlaceholder]);


  return (
    <Layout
      title={artist ?? "Artist not found"}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
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
      pageHeader={controls}
      info={<HeaderInfo countPhotos={filteredImages.length} />}
    >
      <Gallery images={filteredImages} />
    </Layout>
  );
}

export default ArtistDetail