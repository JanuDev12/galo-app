import { Button } from '@/components/ui/button';
import Layout from '@/components/main-content/Layout';
import { useCollectionStore } from '@/store/collections-store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

function Collections() {
  const navigate = useNavigate();

  const collections = useCollectionStore((state) => state.collections);
  const deleteCollection = useCollectionStore((state) => state.deleteCollection)

  const createCollection = useCollectionStore(
    (state) => state.createCollection
  );

  const placeholderImage = "/placeholder.jpg";

  const handleCreateCollection = () => {
    const collectionName = prompt("Write name collection:");
    if (collectionName) {
      createCollection(collectionName);
    }
  };

  const rightHeader = (
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
  );

  // Fetching images

  const getCollections = useCollectionStore((state) => state.getCollections);

  // handling the promise fetchImages
  useEffect(() => {
    getCollections().catch(console.error);
  }, []);

    function handleDeleteCollection(collectionId: number) {
      deleteCollection(collectionId);
    }

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
        {collections.length === 0 ? (
          <p>Not Collection created.</p>
        ) : (
          collections.map((collection) => {
            // Getting images to show
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
                      <Dialog>
                        <DialogTrigger
                          asChild
                          className="z-50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="outline"
                            className="bg-transparent border-[--color-light-tertiary] size-8 p-1 rounded-3xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                              <path d="M13.5 6.5l4 4" />
                            </svg>
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          className="max-w-[350px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DialogHeader>
                            <DialogTitle>Edit Collection</DialogTitle>
                          </DialogHeader>

                          <div className="flex flex-col w-full gap-3">
                            <div className="flex flex-col gap-2 justify-between">
                              <span className="text-sm">Name</span>
                              <Input />
                            </div>
                          </div>

                          <DialogFooter className="justify-between mt-6">
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteCollection(collection.id)}
                            >
                              Delete Collection
                            </Button>
                            <Button variant="white"> Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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








