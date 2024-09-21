import { create } from "zustand"
import { ImageItem } from "./image-store";

 interface Collection {
    id: number,
    name: string,
    imagesCollected: ImageItem[]
}

interface CollectionStore {
  collections: Collection[];
  setImagesCollections: (collectionId: number, newImagesCollection: ImageItem[]) => void;
  createCollection: (name: string) => void;
  addImageToCollection: (
    collectionId: number,
    imageId: number,
    imageName: string,
    imageUrls: string,
    imageDate: number,
    artist: string,
    tags: string[]
  ) => void;
  removeImageFromCollection: (collectionId: number, imageId: number) => void;
  deleteCollection: (collectionId: number) => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],

  setImagesCollections: (collectionId, newImagesCollection) =>
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === collectionId
          ? { ...collection, imagesCollected: newImagesCollection }
          : collection
      ),
    })),
  createCollection: (name) =>
    set((state) => ({
      collections: [
        ...state.collections,
        {
          id: Date.now(),
          name,
          imagesCollected: [],
        },
      ],
    })),
  addImageToCollection: (
    collectionId,
    imageIds,
    imageName,
    imageUrl,
    lastModified,
    artist,
    tags
  ) =>
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              imagesCollected: [
                ...collection.imagesCollected,
                {
                  id: imageIds,
                  name: imageName,
                  src: imageUrl,
                  createdDate: collection.imagesCollected.length + 1,
                  lastModified,
                  artist,
                  tags: tags,
                },
              ],
            }
          : collection
      ),
    })),

  removeImageFromCollection: (collectionId, imageId) =>
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              imagesCollected: collection.imagesCollected.filter(
                (image) => image.id !== imageId
              ),
            }
          : collection
      ),
    })),

  deleteCollection: (collectionId) =>
    set((state) => ({
      collections: state.collections.filter(
        (collection) => collection.id !== collectionId
      ),
    })),
}));