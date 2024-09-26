import { ImageItem } from '@/store/image-store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useCollectionStore } from '@/store/collections-store';

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
        removeImageFromCollection(collectionId, image.id)
    } else {
        addImageToCollection(
          collectionId,
          image.id,
          image.name,
          image.src,
          image.lastModified,
          image.artist,
          image.tags
        );
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center w-28 h-6 mx-auto gap-1 items-center">
        {selectedCollections.length > 0 ? (
          <span className="text-sm">
            {selectedCollections
              .map((collectionId) => {
                const collection = collections.find(
                  (col) => col.id === collectionId
                );
                return collection?.name ?? ""; // Muestra el nombre de la colección si está
              })
              .slice(-1)
              .join(", ")}
          </span>
        ) : (
          <span className="text-sm"></span> // Texto por defecto si no pertenece a ninguna colección
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 9l6 6l6 -6" />
        </svg>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 rounded-2xl px-3 border-transparent bg-white/10 backdrop-blur z-auto">
        <DropdownMenuLabel>Save</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-2">
          {collections.map((collection) => {
            const isAdded = selectedCollections.includes(collection.id);
            return (
              <label key={collection.id}>
                {/*  Añadimos la imagen al cambiar de selección */}
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