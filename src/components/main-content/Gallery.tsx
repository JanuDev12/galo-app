import { ImageItem, useImageStore } from "@/store/image-store";
import { Masonry } from "masonic"
import { useCallback, useEffect,  useState } from "react";
import { useCollectionStore } from "@/store/collections-store";
import EditImageDialog from "./EditImageDialog";
import CollectionSelector from "./CollectionSelector";



interface MasonryCardProps {
  data: ImageItem;
}

function MasonryCard({ data }: MasonryCardProps) {
  const deleteImage = useImageStore((state) => state.deleteImage);

  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);

   const handleDeleteImage = useCallback(() => {
     deleteImage(data.id);
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
 
  return (
    <Masonry
      items={images}
      render={MasonryCard}
      columnGutter={16}
      columnWidth={172}
      overscanBy={20}
      maxColumnCount={4}
    ></Masonry>
  );
}



export default Gallery
