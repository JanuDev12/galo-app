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
  ) => void;
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
  deleteCollection: (
    collectionId: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],

  getCollections: async () => {
    try {
      await initDB(); // Iniciar base de datos de IndexedDB
      const storedCollections: Collection[] = await getCollectionsFromDB();

      set({
        collections: storedCollections.map((col) => ({
          id: col.id,
          name: col.name,
          imagesCollected: col.imagesCollected || [], // Si no tiene imágenes, asigna un array vacío
        })),
      });
    } catch (error) {
      console.error("Error fetching collections from IndexedDB:", error);
    }
  },

  setImagesCollections: (collectionId, newImagesCollection) =>
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === collectionId
          ? { ...collection, imagesCollected: newImagesCollection }
          : collection
      ),
    })),
  /* createCollection: (name) =>
    set((state) => ({
      collections: [
        ...state.collections,
        {
          id: Date.now(),
          name,
          imagesCollected: [],
        },
      ],
    })), */
  createCollection: async (name) => {
    const newCollection = {
      id: Date.now(),
      name,
      imagesCollected: [],
    };

    // Agregar colección a IndexedDB
    await addCollectionToDB(newCollection.name);

    set((state) => ({
      collections: [...state.collections, newCollection],
    }));
  },
  addImageToCollection: async (
    collectionId,
    imageId,
    imageName,
    imageUrl,
    lastModified,
    artist,
    tags
  ) => {
    set((state) => {
      const updatedCollections = state.collections.map((collection) => {
        if (collection.id === collectionId) {
          const newImage = {
            id: imageId,
            name: imageName,
            src: imageUrl,
            createdDate: collection.imagesCollected.length + 1, // Este valor es el orden
            lastModified,
            artist,
            tags: tags,
          };

          const updatedCollection = {
            ...collection,
            imagesCollected: [...collection.imagesCollected, newImage],
          };

          // Actualizar IndexedDB con la nueva colección modificada
          updateCollectionInDB(collectionId, updatedCollection);

          return updatedCollection;
        }
        return collection;
      });

      return { collections: updatedCollections };
    });
  },

  removeImageFromCollection: async (collectionId, imageId) => {
    set((state) => {
      const updatedCollections = state.collections.map((collection) => {
        if (collection.id === collectionId) {
          const updatedImages = collection.imagesCollected.filter(
            (image) => image.id !== imageId
          );

          const updatedCollection = {
            ...collection,
            imagesCollected: updatedImages,
          };

          // Actualizar IndexedDB con la colección modificada
          updateCollectionInDB(collectionId, updatedCollection);

          return updatedCollection;
        }
        return collection;
      });

      return { collections: updatedCollections };
    });
  },

  deleteCollection:  (collectionId) => {
    try {
       deleteCollectionFromDB(collectionId);

      // Si la eliminación es exitosa, actualiza el estado global
      set((state) => ({
        collections: state.collections.filter((collection) => collection.id !== collectionId),
      }));
    } catch (error) {
      console.error("Error al eliminar la imagen de la base de datos:", error);
    }
  },
}));

