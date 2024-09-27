import { create } from "zustand"
import { addCollectionToDB, getCollectionsFromDB, initDB, updateCollectionInDB, deleteCollectionFromDB } from "@/db/db-collections";
import { ImageItem } from "./image-store";

export interface Collection {
    id: number,
    name: string,
    imagesCollected: ImageItem[]
}

interface CollectionStore {
  collections: Collection[];
  getCollections: () => Promise<void>;
  setImagesCollections: (
    collectionId: number,
    newImagesCollection: ImageItem[]
  ) => Promise<void>;
  createCollection: (name: string) => Promise<void>;
  addImageToCollection: (
    collectionId: number,
    image: ImageItem
  ) => Promise<void>;
  removeImageFromCollection: (
    collectionId: number,
    imageId: number
  ) => Promise<void>;
  deleteCollection: (
    collectionId: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const useCollectionStore = create<CollectionStore>((set, get) => ({
  collections: [],
  getCollections: async () => {
    try {
      await initDB(); // Start Database Collection
      const storedCollections: Collection[] = await getCollectionsFromDB();

      set({
        collections: storedCollections,
      });
    } catch (error) {
      console.error("Error fetching collections from IndexedDB:", error);
    }
  },

  setImagesCollections: async (collectionId, newImagesCollection) => {
    try {
      set((state) => {
        const updateCollections = state.collections.map((collection) =>
          collection.id === collectionId
            ? { ...collection, imagesCollected: newImagesCollection }
            : collection
        );
        return { collections: updateCollections };
      });
      // Update CollectionDB
      await updateCollectionInDB(
        collectionId,
        get().collections.find((c) => c.id === collectionId)!
      );
    } catch (error) {
      console.error("Error updating collection in IndexedDB: ", error);
    }
  },

  createCollection: async (name) => {
    try {
      const newCollection = {
        id: Date.now(),
        name,
        imagesCollected: [],
      };
      await addCollectionToDB(newCollection.name);
      set((state) => ({
        collections: [...state.collections, newCollection],
      }));
    } catch (error) {
      console.error("Error creating collection in indexedCollectionsDB", error);
    }
  },

  addImageToCollection: async (collectionId, image) => {
    try {
      set((state) => {
        const updatedCollections = state.collections.map((collection) => {
          if (collection.id === collectionId) {
            const newImage = {
              id: image.id,
              name: image.name || "Unnamed Image",
              src: image.src || "",
              createdDate: collection.imagesCollected.length + 1, // Mantener el orden
              lastModified: image.lastModified || new Date(),
              artist: image.artist || "Unknown Artist",
              tags: image.tags || [],
            };

            return {
              ...collection,
              imagesCollected: [...collection.imagesCollected, newImage],
            };
          }
          return collection;
        });

        return { collections: updatedCollections };
      });

      // Updating IndexedCollectionDB
      await updateCollectionInDB(
        collectionId,
        get().collections.find((c) => c.id === collectionId)!
      );
    } catch (error) {
      console.error(
        "Error adding image to collection in IndexedCollectionDB",
        error
      );
    }
  },

  removeImageFromCollection: async (collectionId, imageId) => {
    try {
      set((state) => {
        const updatedCollections = state.collections.map((collection) =>
          collection.id === collectionId
            ? {
                ...collection,
                imagesCollected: collection.imagesCollected.filter(
                  (img) => img.id !== imageId
                ),
              }
            : collection
        );
        return { collections: updatedCollections };
      });
      // Update IndexedCollectionDB
      await updateCollectionInDB(
        collectionId,
        get().collections.find((c) => c.id === collectionId)!
      );
    } catch (error) {
      console.error(
        "Error removing image from collection in IndexedDB:",
        error
      );
    }
  },

  deleteCollection: async (collectionId) => {
    try {
      await deleteCollectionFromDB(collectionId);
      set((state) => ({
        collections: state.collections.filter(
          (collection) => collection.id !== collectionId
        ),
      }));
    } catch (error) {
      console.error("Error deleting collection from IndexedDB:", error);
    }
  },
}));

