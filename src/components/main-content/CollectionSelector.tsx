import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useCollectionStore } from '@/store/collections-store';
import { ImageItem } from '@/type';
import { IconChevronDown } from '@tabler/icons-react';

interface CollectionSelectorProps {
  selectedCollections: number[];
  setSelectedCollections: (collections: number[]) => void;
  image: ImageItem;
}

const CollectionSelector = ({
  selectedCollections,
  setSelectedCollections,
  image,
}: CollectionSelectorProps) => {

  const collections = useCollectionStore((state) => state.collections);
  const addImageToCollection = useCollectionStore(
    (state) => state.addImageToCollection
  );
  const removeImageFromCollection = useCollectionStore(
    (state) => state.removeImageFromCollection
  );

  const handleSelectCollection = (collectionId: number) => {
    const isAdded = selectedCollections.includes(collectionId);
    const updatedCollections = isAdded 
    ? selectedCollections.filter((colId) => colId !== collectionId)
    : [...selectedCollections, collectionId]

    setSelectedCollections(updatedCollections)

    if (isAdded) {
        removeImageFromCollection(collectionId, image.id).catch(console.error)
    } else {
        addImageToCollection(
          collectionId, image
        ).catch(console.error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center w-28 h-6 mx-auto gap-1 items-center">
        {/* SHOW THE COLLECTION NAME IF EXIST */}

        {selectedCollections.length > 0 ? (
          <span className="text-sm">
            {selectedCollections
              .map((collectionId) => {
                const collection = collections.find(
                  (col) => col.id === collectionId
                );
                return collection?.name ?? "";
              })
              .slice(-1)
              .join(", ")}
          </span>
        ) : (
          <span className="text-sm"></span> // If collection not exist show nothing for default
        )}

        <IconChevronDown size={15} stroke={1} />
  
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 rounded-2xl px-3 border-transparent bg-white/10 backdrop-blur z-auto">
        <DropdownMenuLabel>Save</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* SHOWING ALL THE COLLECTIONS */}
        <div className="flex flex-col gap-2">
          {collections.map((collection) => {
            const isAdded = selectedCollections.includes(collection.id);
            return (
              <label key={collection.id}>
                <input
                  type="checkbox"
                  value={collection.id}
                  onChange={() => handleSelectCollection(collection.id)}
                  checked={isAdded}
                  className="input"
                />
                <span className="custom-checkbox"></span>
                {collection.name} {/* {isAdded && "(Added)"} */}
              </label>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollectionSelector