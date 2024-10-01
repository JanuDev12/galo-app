import Gallery from '@/components/main-content/Gallery';
import ControlButtons from '@/components/main-content/header-controls/ControlButtons';
import HeaderInfo from '@/components/main-content/header-controls/HeaderInfo';
import Layout from '@/components/main-content/Layout'
import { useSearchContext } from '@/context/SearchContext';
import { useSearch } from '@/hooks/useSearch';
import { useImageStore } from '@/store/image-store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { IconUserHeart } from '@tabler/icons-react';

function ArtistDetail() {

  const { artist } = useParams<{ artist: string}>()
  const images = useImageStore((state) => state.filteredImages);
 
  const { searchTerm, setPlaceholder, tags } = useSearchContext();


  // filter images for artist selected
  const artistImages = images.filter(image => image.artist === artist)

   const filteredImages = useSearch(artistImages, {
     searchTerm,
     searchFields: ["name", "artist"],
     tags
   });

  const controls = <ControlButtons images={filteredImages} />;

    useEffect(() => {
      setPlaceholder(`Search in @${artist}`);
    }, [setPlaceholder]);


  return (
    <Layout
      title={artist ?? "Artist not found"}
      icon={<IconUserHeart size={24} stroke={2} />}
      pageHeader={controls}
      info={<HeaderInfo countPhotos={filteredImages.length} />}
    >
      <Gallery images={filteredImages} />
    </Layout>
  );
}

export default ArtistDetail