import { Button } from '@/components/ui/button';
import Layout from '@/components/main-content/Layout';
import { useCollectionStore } from '@/store/collections-store';
import { useNavigate } from 'react-router-dom';
import { useCallback,  useEffect,  useMemo} from 'react';
import EditCollectionDialog from '@/components/main-content/EditCollectionDialog';
import { useSearch } from '@/hooks/useSearch';
import { useSearchContext } from '@/context/SearchContext';

function Collections() {
  const navigate = useNavigate();
  const { searchTerm, setPlaceholder } = useSearchContext();

  const collections = useCollectionStore((state) => state.collections);
  const deleteCollection = useCollectionStore(
    (state) => state.deleteCollection
  );
  const createCollection = useCollectionStore(
    (state) => state.createCollection
  );



  const placeholderImage = "/placeholder.jpg";

  

  const filteredCollections = useSearch(collections, {
    searchTerm,
    searchFields: ["name"],
  });


  const handleCreateCollection = useCallback(()  => {
    const collectionName = prompt("Write name collection:");
    if (collectionName) {
      createCollection(collectionName).catch(console.error);
    }
  }, [createCollection]);

  const handleDeleteCollection = useCallback(
      (collectionId: number) => {
        deleteCollection(collectionId);
      },
      [deleteCollection]
    );

  const rightHeader = useMemo(() => (
    <Button
      size="sm"
      variant="outline"
      className="flex gap-2 "
      onClick={handleCreateCollection}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-folder-plus"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
      </svg>
      New
    </Button>
  ), [handleCreateCollection]);


  useEffect(() => {
    setPlaceholder("Search in Collections");
  }, [setPlaceholder]);


  return (
    <Layout
      title="Collections"
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
          class="icon icon-tabler icons-tabler-outline icon-tabler-folders"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
          <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
        </svg>
      }
      pageHeader={rightHeader}
    >
      <div className="py-2 flex gap-x-8 gap-y-16 flex-wrap">
        {filteredCollections.length === 0 ? (
          <p>Not Collection created.</p>
        ) : (
          filteredCollections.map((collection) => {
            // Get images to display
            const imagesToShow = collection.imagesCollected.slice(1, 3);
            const firstImageToShow =
              collection.imagesCollected[0] || placeholderImage;

            return (
              <div
                key={collection.id}
                className="max-w-52 max-h-36 cursor-pointer group relative"
                onClick={() => navigate(`/collections/${collection.id}`)}
              >
                <div className="flex gap-[2px] w-full h-full rounded-xl overflow-hidden relative">
                  <div className="w-full h-full">
                    <img
                      src={firstImageToShow.src}
                      alt="Img 1"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-[2px] w-1/2 h-full">
                    {imagesToShow.map((image, index) => (
                      <img
                        key={index}
                        src={image.src}
                        alt={`Img ${index + 2}`}
                        className="object-cover h-1/2  "
                      />
                    ))}
                  </div>

                  {/* hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 right-0 p-3">
                      <EditCollectionDialog
                        onDelete={() => handleDeleteCollection(collection.id)}
                      />
                    </div>
                  </div>
                </div>

                <div className="my-2 mx-1">
                  <span className="text-sm font-medium">{collection.name}</span>
                  <p className="text-xs text-[--color-gray-tertiary]">
                    {collection.imagesCollected.length} photos
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}

export default Collections








