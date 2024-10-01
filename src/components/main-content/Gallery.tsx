import { useImageStore } from "@/store/image-store";
import { Masonry, useInfiniteLoader } from "masonic"
import { useCallback, useEffect,  useMemo,  useState } from "react";
import { useCollectionStore } from "@/store/collections-store";
import EditImageDialog from "./EditImageDialog";
import CollectionSelector from "./CollectionSelector";
import { ImageItem } from "@/type";

interface MasonryCardProps {
  data: ImageItem;
}

function MasonryCard({ data }: MasonryCardProps) {
  const deleteImage = useImageStore((state) => state.deleteImage);

  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);

   const handleDeleteImage = useCallback(() => {
     deleteImage(data.id).catch(console.error);
   }, [deleteImage, data.id]);


  // Logic to handle the initial collection selection
  useEffect(() => {
    const collections = useCollectionStore.getState().collections;
    const imageCollections = collections
      .filter((collection) =>
        collection.imagesCollected.some((image) => image.id === data.id)
      )
      .map((collection) => collection.id);
    setSelectedCollections(imageCollections);
  }, [data.id]);

  return (
    <div className="relative group">
      <img
        src={data.src}
        alt={data.name}
        className="rounded-xl shadow w-full"
      />
      <div className="bg-black/0 hover:bg-black/50 absolute w-full h-full top-0 left-0 opacity-0 hover:opacity-100 p-3 flex flex-col justify-between transition-opacity duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto ">
        {/* BUTTON COLLECTION SELECTOR */}

        <CollectionSelector
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
          image={data}
        />

        {/*  EDIT IMAGE DIALOG */}

        <div className="flex justify-between items-end">
          <p className="text-xs text-[--color-light-tertiary]">
            @{data.artist}
          </p>

          <EditImageDialog
            imageId={data.id}
            imageSrc={data.src}
            onDelete={handleDeleteImage}
          />

         
        </div>
      </div>
    </div>
  );
}  
   
 interface GalleryProps {
   images: ImageItem[]; 
 }

// eslint-disable-next-line react/prop-types
const Gallery: React.FC<GalleryProps> = ({ images }) => {

  const size = useImageStore((state) => state.size)

  const maxColumnCount = useMemo(() => {
    switch (size) {
      case "small":
        return 5;
      case "medium":
        return 4;
      case "large":
      default:
        return 3;
    }
  }, [size]);
 
  return (
    <Masonry
      key={images.length}
      items={images}
      render={MasonryCard}
      columnGutter={16}
      columnWidth={170}
      overscanBy={images.length}
      maxColumnCount={maxColumnCount}
    ></Masonry>
  );
}


export default Gallery
