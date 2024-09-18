import { useImageStore } from "@/store/image-store";
import { Masonry } from "masonic"
import { useEffect } from "react";

interface MasonryCardProps {
  data: {
    id: number;
    src: string;
    artist: string
  }
}

function MasonryCard({ data: { id, src, artist } }: MasonryCardProps) {
  return (
    <div className="relative">
      <img src={src} alt="" />
    </div>
  );
}


const Gallery: React.FC = () => {
  // Fetching images
  const images = useImageStore((state) => state.images);
  const fetchImages = useImageStore((state) => state.fetchImages);

  useEffect(() => {
    // handling the promise fetchImages
    fetchImages().catch(console.error); // Manejar errores de fetchImages
  }, [fetchImages]);

  return (
    <Masonry
      items={images}
      render={MasonryCard}
      columnGutter={16}
      columnWidth={172}
      overscanBy={5}
      maxColumnCount={4}
    ></Masonry>
  );
}




export default Gallery