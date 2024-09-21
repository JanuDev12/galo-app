import { Collection } from "@/store/collections-store";
import { openDB } from "idb";

const DB_NAME = "collectionsDB";
const STORE_NAME = "collections";
const DB_VERSION = 1;

export const initDB = async () => {
  // INICIAR BASE DE DATOS INDEXADA
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return db;
};

export const getCollectionsFromDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION);
  const collections = await db.getAll(STORE_NAME) as Collection[];
  return collections;
}

export const addCollectionToDB = async (name: string) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.add(STORE_NAME, { name, imagesCollected: [] });
};

export const deleteCollectionFromDB = async (collectionId: number) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.delete(STORE_NAME, collectionId);
};

export const updateCollectionInDB = async (
  collectionId: number,
  updatedCollection: Collection
) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.put(STORE_NAME, { ...updatedCollection, id: collectionId });
};