import { create } from "zustand"


interface Image {
  id: number;
  src: string;
}


interface Collection {
    id: number,
    name: string,
    imagesCollected: Image[]
}

interface CollectionStore {
    collections: Collection[],
    createCollection: (name: string) => void;
    addImageToCollection: (collectionId: number, imageId: number, imageUrls: string) => void
    removeImageFromCollection: (collectionId: number, imageId: number) => void;
    deleteCollection: (collectionId: number) => void
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],
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
  addImageToCollection: (collectionId, imageIds, imageUrl) =>
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              imagesCollected: [
                ...collection.imagesCollected,
                { id: imageIds, src: imageUrl },
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